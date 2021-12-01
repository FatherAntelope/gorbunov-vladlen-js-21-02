import React, { useContext, useState } from 'react';
import { Select, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
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
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleChangeLanguage = (e: any) => {
    setLanguage(e);
    i18n.changeLanguage(e);
  };

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
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Select value={language} size="small" onChange={handleChangeLanguage}>
              <Select.Option value="ru">Руc.</Select.Option>
              <Select.Option value="en">Eng.</Select.Option>
            </Select>
            <Switch
              checked={themeCheckboxContext.isDarkTheme}
              onClick={themeCheckboxContext.handleSwitchTheme}
              style={
                themeCheckboxContext.isDarkTheme ? { backgroundColor: '#817D7DCC' } : { backgroundColor: '#15355C' }
              }
              checkedChildren={t('footer.themeSwitcher.darkTheme')}
              unCheckedChildren={t('footer.themeSwitcher.lightTheme')}
            />
          </div>
        </Footer.Body>
      </Container>
    </Footer>
  );
};

export default FooterForm;
