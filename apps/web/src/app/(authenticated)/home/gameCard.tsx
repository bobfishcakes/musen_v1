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

const statusMap = {
  NS: "Not Started",
  Q1: "1st Quarter",
  Q2: "2nd Quarter",
  Q3: "3rd Quarter",
  Q4: "4th Quarter",
  OT: "Overtime",
  BT: "Break",
  HT: "Halftime",
  FT: "Final",
  AOT: "After Over Time",
  POST: "Game Postponed",
  CANC: "Game Cancelled",
  SUSP: "Game Suspended",
  AWD: "Game Awarded",
  ABD: "Game Abandoned"
};


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
  margin-left: 50px;
`;

const TeamScore = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 90px; 
  margin-bottom: 10px;
`;

const ScoreLeft = styled.span`
  font-size: 30px;
  font-weight: 600;
  min-width: 24px; 
  text-align: center;
  margin-left: 100px;
`;

const ScoreRight = styled.span`
  font-size: 30px;
  font-weight: 600;
  min-width: 24px; 
  text-align: center;
  margin-right: 100px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
  font-size: 18px;
`;

const TeamLeft = styled.span`
  flex: 1;
  text-align: center;
`;

const TeamRight = styled.span`
  flex: 1;
  text-align: center;
`;

const Separator = styled.span`
  flex: 0;
  padding: 0 4px;
`;

const Description = styled.div`
  margin-top: 4px;
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
          <ScoreLeft>{game.scores?.away.total || 0}</ScoreLeft>
        </TeamScore>
      <ContentContainer>
        <Title>
          <TeamLeft>{game.teams.away.name}</TeamLeft>
          <Separator>-</Separator>
          <TeamRight>{game.teams.home.name}</TeamRight>
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
            <div>{statusMap[game.status.short] || 'Status unavailable'}</div>
          )}
        </Description>
      </ContentContainer>
        <TeamScore>
          <ScoreRight>{game.scores?.home.total || 0}</ScoreRight>
          {/* <Logo src={game.teams.home.logo} alt={game.teams.home.name} /> */}
        </TeamScore>
        <StreamContainer>
  <div>
    <StreamData>
      <FontAwesomeIcon icon={faBroadcastTower }  style={{ color: '#c1dfc2' }} />
      <span>{streamers ? streamers : 0}</span>
    </StreamData>
    <StreamLabel>streams</StreamLabel>
  </div>
  <div>
    <StreamData>
      <FontAwesomeIcon icon={faRadio}  style={{ color: '#c1dfc2' }} />
      <span>{listeners ? listeners : 0}</span>
    </StreamData>
    <StreamLabel>listeners</StreamLabel>
  </div>
</StreamContainer>
    </StyledCard>
  );
};

export default GameCard;