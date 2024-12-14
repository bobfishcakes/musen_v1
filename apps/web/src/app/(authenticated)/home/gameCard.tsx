// GameCard.tsx
import { faBroadcastTower, faRadio } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { Game } from './interfaces';

interface GameCardProps {
  game: Game;
  streamers?: number;
  listeners?: number;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
`;

const TeamScore = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 90px; 
  margin-bottom: 10px;
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
  min-width: 24px; 
  text-align: center;
`;

const Title = styled.div`
  font-size: 18px;
  margin-bottom: 8px;
`;

const Description = styled.div`
  font-size: 16px;
  color: #BAE0C0;
  align-items: center;
`;

const StreamContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin-left: auto;
  align-items: center;
`;

const StreamData = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    width: 24px;
    height: 24px;
  }
  
  span {
    font-size: 20px;
    font-weight: 600;
  }
`;

const StreamLabel = styled.div`
  font-size: 12px;
  color: white;
  text-align: center;
  margin-top: 4px;
`;

const GameCard: React.FC<GameCardProps> = ({ game, onNavigate, streamers, listeners }) => {
  return (
    <StyledCard onClick={() => onNavigate(game.id, game)}>
      <TeamScore>
          {/* <Logo src={game.teams.away.logo} alt={game.teams.away.name} /> */}
          <Score>{game.scores?.away.total || 0}</Score>
        </TeamScore>
      <ContentContainer>
        <Title>
          {game.teams.away.name} @ {game.teams.home.name}
        </Title>
        <Description>
        {!game.status ? 'Status unavailable' : 
          game.status.short === 'NS' ? (
            game.date
              ? dayjs(game.date).tz('America/Chicago').format('h:mm A [CT]')
              : game.game?.date
                ? dayjs(`${game.game.date.date} ${game.game.date.time}`)
                    .tz('America/Chicago')
                    .format('h:mm A [CT]')
                : 'Time TBD'
          ) : (
            <div>{game.status?.long || 'Status unavailable'}</div>
          )}
        </Description>
      </ContentContainer>
        <TeamScore>
          <Score>{game.scores?.home.total || 0}</Score>
          {/* <Logo src={game.teams.home.logo} alt={game.teams.home.name} /> */}
        </TeamScore>
        <StreamContainer>
  <div>
    <StreamData>
      <FontAwesomeIcon icon={faBroadcastTower} />
      <span>{streamers ? streamers : 0}</span>
    </StreamData>
    <StreamLabel>streams</StreamLabel>
  </div>
  <div>
    <StreamData>
      <FontAwesomeIcon icon={faRadio} />
      <span>{listeners ? listeners : 0}</span>
    </StreamData>
    <StreamLabel>listeners</StreamLabel>
  </div>
</StreamContainer>
    </StyledCard>
  );
};

export default GameCard;