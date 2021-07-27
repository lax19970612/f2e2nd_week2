import React from 'react';
import './Card.css';

const type = ['club', 'heart', 'diamond', 'spade'];

const Card: React.FC<{ row: number; value: number }> = ({ row, value }) => {
  const cardType = type[Math.floor(value / 13)];
  const cardValue = (value % 13) + 1;

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer!.setData(
      'data',
      JSON.stringify({
        row,
        value
      })
    );
  };

  return (
    <div
      className={`card card-${cardType}-${cardValue}`}
      draggable="true"
      onDragStart={onDragStart}
    />
  );
};

export default Card;
