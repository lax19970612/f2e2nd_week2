import Card from '../../../components/Card';

const CardGroup: React.FC<{
  row: number;
  cards: number[];
  dropEvent: Function;
}> = ({ row, cards, dropEvent }) => {
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    cancelDefault(e);
    const data = JSON.parse(e.dataTransfer.getData('data'));
    const [moveCardPreRow, moveCardValue] = [data.row, data.value];

    dropEvent((prevData: number[][]) => {
      let copy: number[][] = [...prevData];
      copy[moveCardPreRow] = copy[moveCardPreRow].filter(
        (cardValue: number) => cardValue !== moveCardValue
      );
      copy[row] = [...copy[row], moveCardValue];
      return copy;
    });
  };
  const cancelDefault = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  return (
    <div
      className="card-group"
      onDrop={onDrop}
      onDragEnter={cancelDefault}
      onDragOver={cancelDefault}
    >
      {cards.map((card: number) => {
        return <Card key={card} row={row} value={card} />;
      })}
    </div>
  );
};

export default CardGroup;
