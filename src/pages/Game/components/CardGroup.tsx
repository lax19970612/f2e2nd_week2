import Card from '../../../components/Card';
import GameDataInterface from '../../../interface/GameData';
import GameUtils from '../../../assets/utils/GameUtils';

const CardGroup: React.FC<{
  row: number;
  type: string;
  cards: number[];
  dropEvent: Function;
}> = ({ row, type, cards, dropEvent }) => {
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    cancelDefault(e);
    const data = JSON.parse(e.dataTransfer.getData('data'));
    const [moveCardFrom, moveCardPreRow, moveCardValue] = [
      data.from,
      data.row,
      data.value
    ];

    dropEvent((prevData: GameDataInterface) => {
      let copy: GameDataInterface = JSON.parse(JSON.stringify(prevData));
      let datafrom: number[][] = GameUtils.GetListData(copy, moveCardFrom);
      let dataTarget: number[][] = GameUtils.GetListData(copy, type);

      let cardIndex: number = datafrom[moveCardPreRow].findIndex(
        (value) => value === moveCardValue
      );
      let moveCardList: number[] = datafrom[moveCardPreRow].slice(cardIndex);

      if (GameUtils.IsMoveValid(type, row, dataTarget[row], moveCardList)) {
        datafrom[moveCardPreRow].splice(cardIndex);
        dataTarget[row] = [...dataTarget[row], ...moveCardList];
      }
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
        return <Card key={card} from={type} row={row} value={card} />;
      })}
    </div>
  );
};

export default CardGroup;
