import React, { useState, useEffect } from 'react';
import { initialData } from '../initialData'; // Assumindo que você tem o arquivo initialData.js

const generateGames = (data, numberOfGames) => {
  const allNumbers = [];
  data.forEach(numbers => {
    numbers.forEach(num => {
      if (!allNumbers.includes(num)) {
        allNumbers.push(num);
      }
    });
  });

  const generateGame = () => {
    const shuffled = [...allNumbers].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 15).sort((a, b) => a - b);
  };

  return Array.from({ length: numberOfGames }, generateGame);
};

const allLotofacilNumbers = Array.from({ length: 25 }, (_, i) => i + 1);

const ParseDataComponent = () => {
  const [input, setInput] = useState(initialData);
  const [result, setResult] = useState([]);
  const [games, setGames] = useState([]);
  const [filters, setFilters] = useState({
    paresImpares: false,
    somaNumeros: false,
    dezenasLinha: false,
    dezenasColuna: false,
    repetidasAnterior: false,
    sequenciaNumeros: false,
    sequenciaSaltos: false,
    pareto: false,
  });
  const [numberOfGames, setNumberOfGames] = useState(1);
  const [isInverse, setIsInverse] = useState(false);
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [pixKey, setPixKey] = useState('1234 5678 9101 1121'); // Substitua pela chave Pix correta

  // Efeito para exibir o modal de verificação de idade ao carregar o componente
  useEffect(() => {
    const ageVerified = localStorage.getItem('ageVerified');
    if (ageVerified === 'true') {
      setShowAgeVerification(false);
      setShowDonationModal(true);
    }
  }, []);

  const parseData = (input) => {
    const lines = input.trim().split('\n');
    const results = [];
    lines.forEach(line => {
      const parts = line.split(' ');
      const numbers = parts.slice(2).map(Number).sort((a, b) => a - b);
      results.push(numbers);
    });
    return results;
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  };

  const handleParseClick = () => {
    const parsedResult = parseData(input);
    setResult(parsedResult);
  };

  const handleGenerateGames = () => {
    const parsedData = parseData(input);
    const generatedGames = generateGames(parsedData, numberOfGames);
    setGames(generatedGames);
  };

  const handleAgeVerification = (isOldEnough) => {
    if (isOldEnough) {
      setShowAgeVerification(false);
      localStorage.setItem('ageVerified', 'true'); // Armazena a confirmação de idade no localStorage
      setShowDonationModal(true); // Mostra o modal de doação após a verificação de idade
    } else {
      alert("Você precisa ter 18 anos ou mais para acessar este site.");
    }
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    alert('Chave Pix copiada para a área de transferência!');
  };

  return (
    <div id='parse-data-section' className="app">
      {/* Modal de verificação de idade */}
      {showAgeVerification && (
        <div className="modal-age-verification">
          <h2>Você tem 18 anos ou mais?</h2>
          <button onClick={() => handleAgeVerification(true)}>Sim</button>
          <button onClick={() => handleAgeVerification(false)}>Não</button>
        </div>
      )}

      {/* Modal de contribuição */}
      {showDonationModal && !showAgeVerification && (
        <div className="modal-donation">
          <div className="modal-content">
            <h2>Contribuição Voluntária</h2>
            <p>
              Este site é gratuito, mas sua doação nos ajuda a mantê-lo
              funcionando e a melhorá-lo continuamente. Caso queira contribuir,
              faça uma doação via Pix. Muito obrigado!
            </p>
            <button
              className="close-modal"
              onClick={() => setShowDonationModal(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Conteúdo principal */}
      <section className="hero">
        <div className="container">
          <div className="left-section">
            <div className="parse-data-container">
              <textarea
                value={input}
                onChange={handleInputChange}
                rows="10"
                cols="40"
                placeholder="Insira seus dados aqui..."
              />
              <div>
                <button onClick={handleParseClick}>
                  Resultados de todos os jogos
                </button>
              </div>
              <div className="filters">
                <h4>Filtros e Regras:</h4>
                <label>
                  <input
                    type="checkbox"
                    name="paresImpares"
                    checked={filters.paresImpares}
                    onChange={handleFilterChange}
                  />
                  Números Pares e Ímpares
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="somaNumeros"
                    checked={filters.somaNumeros}
                    onChange={handleFilterChange}
                  />
                  Soma dos Números
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="dezenasLinha"
                    checked={filters.dezenasLinha}
                    onChange={handleFilterChange}
                  />
                  Dezenas por Linha
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="dezenasColuna"
                    checked={filters.dezenasColuna}
                    onChange={handleFilterChange}
                  />
                  Dezenas por Coluna
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="repetidasAnterior"
                    checked={filters.repetidasAnterior}
                    onChange={handleFilterChange}
                  />
                  Repetidas no Concurso Anterior
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="sequenciaNumeros"
                    checked={filters.sequenciaNumeros}
                    onChange={handleFilterChange}
                  />
                  Sequência grande de Números
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="sequenciaSaltos"
                    checked={filters.sequenciaSaltos}
                    onChange={handleFilterChange}
                  />
                  Sequência grande de Saltos
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="pareto"
                    checked={filters.pareto}
                    onChange={handleFilterChange}
                  />
                  Princípio de Pareto
                </label>
              </div>
              <div className="select-games">
                <label>
                  Quantidade de Jogos:
                  <select
                    value={numberOfGames}
                    onChange={(e) => setNumberOfGames(e.target.value)}
                  >
                    <option value={1}>1 Jogo</option>
                    <option value={3}>3 Jogos</option>
                    <option value={6}>6 Jogos</option>
                  </select>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={isInverse}
                    onChange={(e) => setIsInverse(e.target.checked)}
                  />
                  Inverso
                </label>
              </div>
              <button onClick={handleGenerateGames}>Gerar Jogos</button>
            </div>
          </div>
          <div className="right-section">
            <div className="games-container">
              {games.map((game, index) => (
                <div key={index} className="game">
                  <h4>Jogo {index + 1}</h4>
                  <div className="lotofacil-numbers">
                    {allLotofacilNumbers.map((num) => (
                      <span
                        key={num}
                        className={`number ${
                          game.includes(num) ? 'highlight' : ''
                        }`}
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParseDataComponent;
