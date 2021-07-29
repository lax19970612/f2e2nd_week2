import React from 'react';
import './HeaderBar.css';

const HeaderBar: React.FC<{
  timer: number;
  toggleTimer: Function;
  restart: Function;
}> = ({ timer, toggleTimer, restart }) => {
  const passTime: string = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`;

  return (
    <div className="header-bar">
      <div className="logo">
        <span>FREE</span>
        <span>CELL</span>
      </div>
      <div className="timer">{passTime}</div>
      <div className="game-handle">
        <ul className="game-handle-list">
          <li
            className="game-handle-list-item handle-undo"
            onClick={() => alert('哈哈哈還想反悔阿')}
          >
            UNDO
          </li>
          <li
            className="game-handle-list-item handle-pause"
            onClick={() => toggleTimer()}
          >
            PAUSE
          </li>
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
