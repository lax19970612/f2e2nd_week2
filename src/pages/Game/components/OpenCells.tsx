import React from 'react';
import CardGroup from './CardGroup';

const OpenCells: React.FC<{ cards: number[][]; dropEvent: Function }> = ({
  cards,
  dropEvent
}) => {
  return (
    <div className="open-cells-wrapper">
      {cards.map((cardGroup: number[], index: number) => {
        return (
          <div key={`open-cell-row-${index}`} className="cell-wrapper">
            <CardGroup
              type={'opencell'}
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

export default OpenCells;
