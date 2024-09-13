import React, { useState } from 'react';
import './doacao.css';
import Qrcode from '../assets/qrcode.jpg';

const DonationComponent = () => {
  const [pixKey] = useState('d0fa62a6-c151-40ed-81a8-e675214e1802'); // Substitua pela chave Pix correta

  const copyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    alert('Chave Pix copiada para a área de transferência!');
  };

  return (
    <div className="donation-section">
      <div className="content-container">
        {/* Seção Esquerda */}
        <div className="left-section">
          <h2 className="animated-heading">Como geramos os jogos?</h2>
          <p className="animated-text">
            Nosso sistema usa algoritmos avançados para calcular combinações de números
            com base em estatísticas passadas, trazendo maiores chances para você. 
            Esses cálculos levam em consideração a frequência e padrões dos sorteios anteriores.
          </p>
          <p className="animated-text">
            Ao gerar os jogos, consideramos probabilidades matemáticas para entregar os 
            melhores resultados possíveis. Isso é feito de forma automática e gratuita!
          </p>
        </div>

        {/* Seção Direita */}
        <div className="right-section">
          <h2>Faça uma doação e ajude o site a crescer</h2>
          <p>
            O site é totalmente gratuito e desenvolvemos esse projeto com muito carinho. 
            Se você achar útil e quiser contribuir, sua doação é muito bem-vinda e ajudará 
            a manter o site funcionando e a melhorar ainda mais! 
             <strong>Qualquer Valor ajuda!</strong>
          </p>
          <div className="pix-donation">
            <p>
              Chave aleatória:
              <input
                type="text"
                value={pixKey}
                readOnly
                className="pix-input"
              />
              <button onClick={copyPixKey} className="copy-button">Copiar</button>
            </p>
          </div>
          <div className="qr-code-container">
            <img src={Qrcode} alt="QR Code para Doação" className="qr-code" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationComponent;
