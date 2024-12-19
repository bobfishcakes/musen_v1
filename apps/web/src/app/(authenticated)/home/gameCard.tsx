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
  NS: "Upcoming",
  Q1: "1st Quarter",
  Q2: "2nd Quarter",
  Q3: "3rd Quarter",
  Q4: "4th Quarter",
  OT: "Overtime",
  BT: "Break",
  HT: "Halftime",
  FT: "Final",
  AOT: "After OT",
  POST: "Postponed",
  CANC: "Cancelled",
  SUSP: "Suspended",
  AWD: "Awarded",
  ABD: "Abandoned"
};


const StyledCard = styled.div`
  padding: 20px 12px; 
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
`;

const Score = styled.span`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 18px;  // Increased from 18px
`;

const Team = styled.span`
  flex: 1;
  text-align: center;
  width: 100%;
  font-size: 18px;  // Added explicit font size
  font-weight: 600;  // Added font weight to make it more prominent
`;

const Separator = styled.span`
  padding: 12px;
`;

const Status = styled.div`
  min-height: 10px;
  width: 25%;
  font-size: 16px;
  color: #BAE0C0;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-right: 50px;
`;

const StreamContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin-left: 50px;
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
       <Status>
        {!game.status ? 'Unavailable' : 
          game.status.short === 'NS' ? (
            game.date
              ? dayjs(game.date).tz('America/Chicago').format('h:mm A [CT]')
              : game.game?.date
                ? dayjs(`${game.game.date.date} ${game.game.date.time}`)
                    .tz('America/Chicago')
                    .format('h:mm A [CT]')
                : 'Time TBD'
          ) : (
            <div>{statusMap[game.status.short]}</div>
          )}
        </Status>
      <TeamScore>
          <Score>{game.scores?.away.total || 0}</Score>
        </TeamScore>
      <ContentContainer>
        <Title>
          <Team>{game.teams.away.name}</Team>
          <Separator>-</Separator>
          <Team>{game.teams.home.name}</Team>
        </Title>
      </ContentContainer>
        <TeamScore>
          <Score>{game.scores?.home.total || 0}</Score>
        </TeamScore>

        <StreamContainer>
        <div>
          <StreamData>
            <FontAwesomeIcon icon={faBroadcastTower }  style={{ color: '#c1dfc2' }} />
            <span>{streamers ? streamers : game.streamers}</span>
          </StreamData>
          <StreamLabel>streams</StreamLabel>
        </div>
        <div>
          <StreamData>
            <FontAwesomeIcon icon={faRadio}  style={{ color: '#c1dfc2' }} />
            <span>{listeners ? listeners : game.listeners}</span>
          </StreamData>
          <StreamLabel>listeners</StreamLabel>
        </div>
      </StreamContainer>
    </StyledCard>
  );
};

export default GameCard;