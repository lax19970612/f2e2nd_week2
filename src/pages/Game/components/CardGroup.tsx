import Card from '../../../components/Card';

const CardGroup: React.FC<{ cards: number[] }> = ({ cards }) => {
  return (
    <div className="card-group">
      {cards.map((card: number) => {
        return <Card key={card} value={card} />;
      })}
    </div>
  );
};

export default CardGroup;
