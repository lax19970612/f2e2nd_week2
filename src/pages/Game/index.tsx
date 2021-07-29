import { useState, useEffect } from 'react';
import HeaderBar from '../../components/HeaderBar';
import OpenCells from './components/OpenCells';
import Foundation from './components/Foundation';
import CardGroup from './components/CardGroup';

import GameUtils from '../../assets/utils/GameUtils';
import './main.css';

import GameDataInterface from '../../interface/GameData';

const Game: React.FC = () => {
  const [gameData, setGameData] = useState<GameDataInterface>({
    foundation: new Array(GameUtils.FOUNDATION_LENGTH).fill([]),
    mainCardList: new Array(GameUtils.ROW_NUMBER).fill([]),
    openCellList: new Array(GameUtils.OPEN_CELL_LENGTH).fill([])
  });
  const [initialGameData, setInitialGameData] = useState<GameDataInterface>({
    foundation: new Array(GameUtils.FOUNDATION_LENGTH).fill([]),
    mainCardList: new Array(GameUtils.ROW_NUMBER).fill([]),
    openCellList: new Array(GameUtils.OPEN_CELL_LENGTH).fill([])
  });
  const [timer, setTimer] = useState<number>(0);
  const [timerStatus, setTimerStatus] = useState<boolean>(true);

  const toggleTimer: Function = () => {
    setTimerStatus((prevData: boolean) => !prevData);
  };

  // initialize cardList
  useEffect(() => {
    const randomCardList: number[][] = GameUtils.GetRandomCardList();
    let data = {
      foundation: new Array(GameUtils.FOUNDATION_LENGTH).fill([]),
      mainCardList: randomCardList,
      openCellList: new Array(GameUtils.OPEN_CELL_LENGTH).fill([])
    };
    setGameData(data);
    setInitialGameData(data);
  }, []);

  // timer
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (timerStatus) {
      intervalId = setInterval(() => {
        setTimer((timer: number) => timer + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timerStatus]);

  return (
    <>
      <HeaderBar
        timer={timer}
        toggleTimer={toggleTimer}
        restart={() => setGameData(initialGameData)}
      />
      <div className="stacking-area">
        <OpenCells cards={gameData.openCellList} dropEvent={setGameData} />
        <Foundation cards={gameData.foundation} dropEvent={setGameData} />
      </div>
      <div className="main">
        {gameData.mainCardList.map((cards: number[], row: number) => {
          return (
            <CardGroup
              key={row}
              type={'main'}
              row={row}
              cards={cards}
              dropEvent={setGameData}
            />
          );
        })}
      </div>
    </>
  );
};

export default Game;
