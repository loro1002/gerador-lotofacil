import React from 'react';
import './header.css'; // O arquivo de estilos associado

const Header = () => {
  // Função para rolar suavemente até o componente ParseDataComponent
  const scrollToParseDataComponent = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do link
    const section = document.getElementById('parse-data-section'); // Localiza o componente pelo ID
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' }); // Rola suavemente até o componente
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="title">
          <span className="highlight">Gerador</span> de Resultados <span className="highlight">Lotofácil</span>
        </h1>
        <p className="subtitle">Aumente suas chances com nossos cálculos precisos e estatísticas avançadas!</p>
        {/* Link que ao ser clicado, rola para o ParseDataComponent */}
        <a href="#parse-data-section" onClick={scrollToParseDataComponent} className="action-link">
          <button className="action-button">Gerar Jogo Agora</button>
        </a>
      </div>
    </header>
  );
};

export default Header;
