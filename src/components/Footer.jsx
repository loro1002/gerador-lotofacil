import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h1></h1>
        </div>
        <div className="footer-links">
          <a href="#about">Sobre</a>
          <a href="#contact">Contato</a>
          <a href="#privacy">Privacidade</a>
        </div>
        <div className="footer-contact">
          <p><a href="mailto:contato@seusite.com"></a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
