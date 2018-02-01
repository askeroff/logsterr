import React from 'react';

const Footer = () => (
  <footer>
    <p>
      <span>&copy; TimeTracker {new Date().getFullYear()} / </span>
      <span>
        The source is on{' '}
        <a
          className="footer__link"
          href="https://github.com/askeroff/timetracker"
        >
          Github
        </a>
      </span>
    </p>
  </footer>
);

export default Footer;
