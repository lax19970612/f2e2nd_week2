import React from 'react';
import CardGroup from './CardGroup';

const cardTypeList: string[] = ['spade', 'heart', 'diamond', 'club'];

const Foundation: React.FC<{ cards: number[][]; dropEvent: Function }> = ({
  cards,
  dropEvent
}) => {
  return (
    <div className="foundation-wrapper">
      {cards.map((cardGroup: number[], index: number) => {
        return (
          <div
            className={`cell-wrapper foundation-box-${cardTypeList[index]}`}
            key={`Foundation-row-${index}`}
          >
            <CardGroup
              type={'foundation'}
              row={index}
              cards={cardGroup}
              dropEvent={dropEvent}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Foundation;
