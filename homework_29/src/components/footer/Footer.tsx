import React from 'react';
import './Footer.scss';

interface IProps {
  children: React.ReactNode;
  isDarkTheme?: boolean
}

interface IPropsBody {
  children: React.ReactNode;
}

interface IPropsCopyright {
  children: string;
}

const Footer = ({ children, isDarkTheme }: IProps) => (
  <footer className={`footer ${isDarkTheme ? 'footer_theme_dark' : ''} `}>
    {children}
  </footer>
);

Footer.defaultProps = {
  isDarkTheme: false
};

Footer.Body = ({ children }: IPropsBody) => (
  <div className="footer__body">
    {children}
  </div>
);

Footer.Copyright = ({ children }: IPropsCopyright) => (
  <p className="footer__copyright">{children}</p>
);

export default Footer;
