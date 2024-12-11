// GameCard.tsx
import dayjs from 'dayjs';
import styled from 'styled-components';
import { Game } from './interfaces';

interface GameCardProps {
  game: Game;
  onNavigate: (gameId: string, game: Game) => void;
}

const StyledCard = styled.div`
  padding: 24px; 
  background: #3e3e3e;
  border-radius: 12px;
  margin-bottom: 20px; 
  transition: background-color 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #3A5241;
    cursor: pointer;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  font-size: 1.1em; 
`;

const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px; 
`;

const TeamScore = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 90px; 
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  
font-size: 10px;
color: white;
opacity: 0.7;
&::before {
    content: attr(alt);
}
`;

const Score = styled.span`
  font-size: 30px;
  font-weight: 600;
  color: #BAE0C0;
  min-width: 24px; // Ensure consistent spacing
  text-align: center;
`;

const Title = styled.div`
  font-size: 18px;
  margin-bottom: 8px;
`;

const Description = styled.div`
  font-size: 16px;
  color: #BAE0C0;
`;

const GameCard: React.FC<GameCardProps> = ({ game, onNavigate }) => {
  return (
    <StyledCard onClick={() => onNavigate(game.id, game)}>
      <ContentContainer>
        <Title>
          {game.teams.away.name} @ {game.teams.home.name}
        </Title>
        <Description>
        {game.status?.short === 'NS' ? (
  game.date
    ? dayjs(game.date).tz('America/Chicago').format('h:mm A [CT]')
    : game.game?.date
      ? dayjs(`${game.game.date.date} ${game.game.date.time}`)
          .tz('America/Chicago')
          .format('h:mm A [CT]')
      : 'Time TBD'
) : (
  <div>{game.status.long}</div>
)}
        </Description>
      </ContentContainer>
      <ScoreContainer>
        <TeamScore>
          <Logo src={game.teams.away.logo} alt={game.teams.away.name} />
          <Score>{game.scores?.away.total || 0 }</Score>
        </TeamScore>
        <TeamScore>
          <Score>{game.scores?.home.total|| 0}</Score>
          <Logo src={game.teams.home.logo} alt={game.teams.home.name} />
        </TeamScore>
      </ScoreContainer>
    </StyledCard>
  );
};

export default GameCard;