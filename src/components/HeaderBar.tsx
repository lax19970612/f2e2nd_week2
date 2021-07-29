import React from 'react';
import './HeaderBar.css';

const HeaderBar: React.FC<{ restart: Function }> = ({ restart }) => {
  return (
    <div className="header-bar">
      <div className="logo">
        <span>FREE</span>
        <span>CELL</span>
      </div>
      <div className="timer">00:30</div>
      <div className="game-handle">
        <ul className="game-handle-list">
          <li className="game-handle-list-item handle-undo">UNDO</li>
          <li className="game-handle-list-item handle-pause">PAUSE</li>
          <li
            className="game-handle-list-item handle-restart"
            onClick={() => restart()}
          >
            RESTART
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderBar;
