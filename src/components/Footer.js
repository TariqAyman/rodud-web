import React from 'react';
import '../assets/css/footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Rodud React.js website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
