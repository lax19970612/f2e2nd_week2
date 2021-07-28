import { useState, useEffect } from 'react';
import HeaderBar from '../../components/HeaderBar';
import OpenCells from './components/OpenCells';
import Foundation from './components/Foundation';
import CardGroup from './components/CardGroup';
import './main.css';

const CARD_LENGTH: number = 52;
const ROW_NUMBER: number = 8;
const isUsed: boolean[] = new Array(CARD_LENGTH).fill(false);

const getRandCardNum: Function = () => {
  let value: number;
  while (true) {
    value = Math.floor(Math.random() * CARD_LENGTH); // 0 - 51
    if (!isUsed[value]) {
      isUsed[value] = true;
      return value;
    }
  }
};

const getRandomCardList: Function = (): number[][] => {
  let list: number[][] = new Array(ROW_NUMBER).fill([])
  for (let i = 0; i < CARD_LENGTH; ++i) {
    let row: number = i % ROW_NUMBER;
    let cardValue: number = getRandCardNum();
    list[row] = [...list[row], cardValue];
  }

  return list;
}

const Game: React.FC = () => {
  const [cardList, setCardList] = useState<number[][]>(new Array(ROW_NUMBER).fill([]));

  // initialize cardList
  useEffect(() => {
    const randomCardList: number[][] = getRandomCardList()
    setCardList(randomCardList);
  }, []);

  return (
    <>
      <HeaderBar />
      <div className="stacking-area">
        <OpenCells />
        <Foundation />
      </div>
      <div className="main">
        {cardList.map((cards: number[], row: number) => {
          return (
            <CardGroup
              key={row}
              row={row}
              cards={cards}
              dropEvent={setCardList}
            />
          );
        })}
      </div>
    </>
  );
};

export default Game;
