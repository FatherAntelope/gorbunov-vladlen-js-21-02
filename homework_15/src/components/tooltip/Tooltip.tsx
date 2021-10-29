import React from 'react';
import './Tooltip.css';

class Tooltip extends React.Component {
  render() {
    return (
      <div className="tooltip">
        <div className="tooltip__info tooltip__info_theme_dark">
          Подсказка
        </div>
      </div>
    );
  }
}

export default Tooltip;
