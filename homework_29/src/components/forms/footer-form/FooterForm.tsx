import React, { useContext } from 'react';
import { Switch } from 'antd';
import Container from '../../container/Container';
import Footer from '../../footer/Footer';
import {
  APPLICATION_COPYRIGHT_SYMBOL,
  APPLICATION_NAME,
  APPLICATION_YEAR_CURRENT,
  APPLICATION_YEAR_FOUNDATION
} from '../../../constants/common';
import { ThemeCheckboxContext } from '../../../contexts/theme-checkbox/ThemeCheckboxContext';

const FooterForm = () => {
  const themeCheckboxContext = useContext(ThemeCheckboxContext);

  return (
    <Footer isDarkTheme={themeCheckboxContext.isDarkTheme}>
      <Container>
        <Footer.Body>
          <Footer.Copyright>
            {`
            ${APPLICATION_NAME} 
            ${APPLICATION_COPYRIGHT_SYMBOL} 
            ${APPLICATION_YEAR_FOUNDATION}-${APPLICATION_YEAR_CURRENT}
          `}
          </Footer.Copyright>
          <Switch
            checked={themeCheckboxContext.isDarkTheme}
            onClick={themeCheckboxContext.handleSwitchTheme}
            style={
              themeCheckboxContext.isDarkTheme ? { backgroundColor: '#817D7DCC' } : { backgroundColor: '#15355C' }
            }
            checkedChildren="Темная тема"
            unCheckedChildren="Светлая тема"
          />
        </Footer.Body>
      </Container>
    </Footer>
  );
};

export default FooterForm;
