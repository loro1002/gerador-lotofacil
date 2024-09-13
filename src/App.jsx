import React, { useState } from 'react';
import './App.css';
import DonationComponent from './components/Doacao';
import Footer from './components/Footer';
import Header from './components/Header';
import ParseDataComponent from './components/ParseDataComponent';

function App() {
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  const [showDonationModal, setShowDonationModal] = useState(false);

  // Função para lidar com a verificação de idade
  const handleAgeVerification = (isOldEnough) => {
    if (isOldEnough) {
      setShowAgeVerification(false);
      setShowDonationModal(true); // Mostra o modal de doação após a confirmação
    } else {
      alert('Você precisa ter 18 anos ou mais para acessar este site.');
    }
  };

  return (
    <div className="app">
      {/* Modal de verificação de idade */}
      {showAgeVerification && (
        <div className="modal-age-verification">
          <h2>Você tem 18 anos ou mais?</h2>
          <button onClick={() => handleAgeVerification(true)}>Sim</button>
          <button onClick={() => handleAgeVerification(false)}>Não</button>
        </div>
      )}

      {!showAgeVerification && (
        <>
          <Header />
          <DonationComponent />

          {/* Modal de doação (aparece logo após a verificação de idade) */}
          {showDonationModal && (
            <div className="modal-donation">
              <div className="modal-content">
                <h2>Contribuição Voluntária</h2>
                <p>
                  Este site é gratuito, mas sua doação nos ajuda a mantê-lo
                  funcionando e a melhorá-lo continuamente. Caso queira
                  contribuir, faça uma doação via Pix. Muito obrigado!
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

          <ParseDataComponent />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
