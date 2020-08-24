import * as React from 'react';

const Footer = (): JSX.Element => (
  <footer>
    <div>
      <span>LogifyTime / </span>
        <div>
        The source is on{' '}
          <a className="footer__link" href="https://github.com/askeroff/timetracker">
          Github
          </a>
        </div>
    </div>
  </footer>
);

export default Footer;
