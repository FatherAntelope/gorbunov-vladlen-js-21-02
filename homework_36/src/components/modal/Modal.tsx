import React from 'react';
import './Modal.scss';
import { useActions } from '../../hooks/useActions';

interface IPropsChild {
  children?: React.ReactNode;
  isActive: boolean;
  size?: 'mini' | '';
  isDarkTheme?: boolean;
}

const Modal = ({
  children, isActive, size, isDarkTheme
}: IPropsChild) => {
  const { closeModalsFormAC } = useActions();

  return (
    <div className={`modal ${isActive && 'modal_active'}`}>
      <div className={`modal__close ${isDarkTheme && 'modal__close_theme_dark'}`} onClick={() => closeModalsFormAC()}>
        <span className={`modal__close-icon ${isDarkTheme && 'modal__close-icon_theme_dark'}`} />
      </div>
      <div className={`modal__dialog ${size === 'mini' && 'modal__dialog_mini'} `}>
        <div
          className={`
          modal__content 
          ${isActive && 'modal__content_active'} 
          ${isDarkTheme && 'modal__content_theme_dark'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  size: '',
  isDarkTheme: false,
  children: undefined
};

export default Modal;
