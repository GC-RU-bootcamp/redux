import React from 'react';

const Footer = () => (
  <footer className="flex bt b--red justify-center">
    <div className="flex-column flex items-center mv2">
      <p className="f6 mt3 mb0"><a className="ttu">© 2018 Uberlift Inc</a>, All Rights Reserved</p>
      <p className="f7 mb2">
         Built with
         <a
           className="red link"
           href="https://tachyons.io"
           target="_blank"
           rel="noopener noreferrer"
         >Tachyons</a>
      </p>
    </div>
  </footer>
)

export default Footer;
