import './Card.css'

const type = ['club', 'heart', 'diamond', 'spade']

const Card: React.FC<{value: number}> = ({ value }) => {
  const cardType = type[Math.floor(value / 13)]
  const cardValue = value % 13 + 1

  return (
    <div className={`card card-${cardType}-${cardValue}`} />
  )
}

export default Card