'use client'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PageLayout } from '@web/layouts/Page.layout'
import { Button, Card } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

library.add(faPlay, faPause)

interface GameInfo {
  id: string
  homeTeam: string
  awayTeam: string
  league: string
}

interface TimerProps {
  initialTime: number
  maxTime: number
  onTimeChange: (time: number) => void
  onPauseChange: (isPaused: boolean) => void
}

const TimeButton = styled.button`
  padding: 12px 16px;
  background-color: #3e3e3e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #3A5241;
  }
`;

const FontAwesomeButton = styled(TimeButton)`
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledRangeInput = styled.input`
  width: 100%;
  height: 20px;
  background-color: #808080; // Changed to gray for the unfilled area
  border-radius: 10px;
  cursor: pointer;
  appearance: none;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 40px;
    height: 40px;
    background-color: #ffffff;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    margin-top: -10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  &::-webkit-slider-runnable-track {
    height: 20px;
    border-radius: 10px;
    background: linear-gradient(to right, 
      #2A3E31 0%, 
      #2A3E31 var(--value-percent, 50%), 
      #808080 var(--value-percent, 50%), 
      #808080 100%
    );
  }

  &::-moz-range-thumb {
    width: 40px;
    height: 40px;
    background-color: #ffffff;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  &::-moz-range-track {
    height: 20px;
    border-radius: 10px;
    background: linear-gradient(to right, 
      #2A3E31 0%, 
      #2A3E31 var(--value-percent, 50%), 
      #808080 var(--value-percent, 50%), 
      #808080 100%
    );
  }
`;

const PlayButtonContainer = styled.div`
  display: flex;           // Add this
  align-items: center;     // Add this
  justify-content: center; // Add this
  padding: 12px 16px;
  background-color: #3e3e3e;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #3A5241;
  }
`;

const PlaySVG = styled.svg`
  width: 24px; // Make the SVG smaller
  height: 24px;

  .circle {
    stroke: #ffffff;
    stroke-dasharray: 650;
    stroke-dashoffset: 0;
    opacity: 1;
  }

  .triangle {
    stroke: #ffffff;
    stroke-dashoffset: 0;
    opacity: 1;
  }
`;

interface TimeButtonConfig {
  label: string;
  change: number | 'pause';
}

const Timer: React.FC<TimerProps> = ({ initialTime, maxTime, onTimeChange, onPauseChange }) => {
  const [time, setTime] = useState(initialTime)
  const [isPaused, setIsPaused] = useState(false)

  const updateTime = (newTime: number) => {
    setTime(newTime);
    onTimeChange(newTime);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const percent = (time / maxTime) * 100;
    const rangeInput = document.querySelector('input[type="range"]') as HTMLElement;
    if (rangeInput) {
      rangeInput.style.setProperty('--value-percent', `${percent}%`);
    }
  }, [time, maxTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime <= 0 ? 0 : prevTime - 0.1;
          onTimeChange(newTime);
          return newTime;
        });
      }, 100);
    }
  
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPaused, onTimeChange]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    updateTime(newTime);
  };

  const timeButtons: TimeButtonConfig[] = [
    { label: '-10s', change: -10 },
    { label: '-1s', change: -1 },
    { label: '', change: 'pause' }, // Empty label since we're using FontAwesome
    { label: '+1s', change: 1 },
    { label: '+10s', change: 10 }
  ];

  const handleTimeButtonClick = (btn: TimeButtonConfig) => {
    if (btn.change === 'pause') {
      const newPausedState = !isPaused;
      setIsPaused(newPausedState);
      onPauseChange(newPausedState);
    } else {
      const newTime = btn.change < 0 
        ? Math.max(0, time + btn.change)
        : Math.min(maxTime, time + btn.change);
      updateTime(newTime);
    }
  };

  return (
    <div style={{ marginBottom: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <StyledRangeInput
        type="range"
        min="0"
        max={maxTime}
        step="0.1"
        value={time}
        onChange={handleRangeChange}
      />
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '1rem',
        color: '#ffffff',
        fontSize: '1.2rem'
      }}>
        <span>0:00</span>
        <span>{formatTime(maxTime)}</span>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '1.5rem'
      }}>
{timeButtons.map((btn) => (
  <FontAwesomeButton
    key={btn.label}
    onClick={() => handleTimeButtonClick(btn)}
  >
    {btn.change === 'pause' ? (
      <FontAwesomeIcon 
  icon={isPaused ? faPlay : faPause} 
  style={{ fontSize: '20px' }}
/>
    ) : (
      btn.label
    )}
  </FontAwesomeButton>
))}
      </div>

      <div style={{ 
        position: 'relative',
        height: '80px',
        width: '300px',
        backgroundColor: '#3A5241',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '1rem',
        alignSelf: 'center'
      }}>
        <h2 style={{ 
          color: '#ffffff', 
          fontSize: '4rem', 
          margin: 0,
          fontFamily: 'monospace',
        }}>
          {formatTime(Math.round(time))}
        </h2>
      </div>
    </div>
  )
}

const QuarterButton = styled.div<{ selected: boolean }>`
  padding: 24px 32px;
  background: ${props => props.selected ? '#3A5241' : '#3e3e3e'};
  border-radius: 12px;
  transition: background-color 0.2s ease;
  cursor: pointer;
  text-align: center;
  width: 200px; // Fixed width for all quarter buttons
`;

const QuarterTitle = styled.div`
  font-size: 24px;
  color: white;
`;

const GameTitle = styled.h1`
  color: #ffffff;
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
`;

const GameSubtitle = styled.h2`
  color: #BAE0C0;
  font-size: 2rem;
  font-weight: normal;
`;

const StyledCard = styled(Card)`
  background-color: #1e1e1e;
  border-radius: 10px;
  padding: 40px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const ContinueButton = styled(Button)`
  background-color: ${props => props.disabled ? '#808080' : '#3A5241'};
  border-color: ${props => props.disabled ? '#808080' : '#3A5241'};
  height: auto;
  padding: 12px 40px;
  font-size: 1.2rem;

  &:hover {
    background-color: ${props => props.disabled ? '#808080' : '#2A3E31'} !important;
    border-color: ${props => props.disabled ? '#808080' : '#2A3E31'} !important;
  }

  &:disabled {
    background-color: #808080 !important;
    border-color: #808080 !important;
    cursor: not-allowed;
  }
`;


export default function SyncPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null)
  const [selectedTime, setSelectedTime] = useState<number>(0)
  const [selectedQuarter, setSelectedQuarter] = useState<string>('1')

  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const quarters = [
    { value: '1', title: '1st Quarter' },
    { value: '2', title: '2nd Quarter' },
    { value: '3', title: '3rd Quarter' },
    { value: '4', title: '4th Quarter' }
  ];

  useEffect(() => {
    const teamsParam = searchParams.get('teams')
    if (teamsParam) {
      try {
        const decodedGameInfo = JSON.parse(decodeURIComponent(teamsParam))
        setGameInfo(decodedGameInfo)
        
        const maxTime = decodedGameInfo.league.includes('NFL') || 
                       decodedGameInfo.league.includes('NCAA Football') 
                       ? 900 
                       : 720
        setSelectedTime(Math.floor(maxTime / 2))
      } catch (error) {
        console.error('Error parsing game info:', error)
      }
    }
  }, [searchParams])

  const handleContinue = () => {
    if (isTimerPaused) {
      setErrorMessage("Cannot confirm time when clock is stopped");
      return;
    }

    setErrorMessage(null);
    const gameId = searchParams.get('gameId');
    const teams = searchParams.get('teams');
    
    if (gameId && teams) {
      const gameInfoWithTime = {
        ...gameInfo,
        selectedQuarter,
        timeOnClock: selectedTime
      };
      
      const encodedInfo = encodeURIComponent(JSON.stringify(gameInfoWithTime));
      router.push(`/events/${gameId}/streamers?teams=${encodedInfo}`);
    }
  };

  const handlePauseChange = (isPaused: boolean) => {
    setIsTimerPaused(isPaused);
    setErrorMessage(isPaused ? "Cannot confirm time when clock is stopped" : null);
  };

  const getMaxTime = () => {
    if (!gameInfo) return 720
    return gameInfo.league.includes('NFL') || 
           gameInfo.league.includes('NCAA Football') 
           ? 900 
           : 720
  }

  return (
    <PageLayout layout="narrow">
      {gameInfo && (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <GameTitle>{gameInfo.awayTeam} @ {gameInfo.homeTeam}</GameTitle>
          <GameSubtitle>Where are you in the game right now?</GameSubtitle>
        </div>
      )}  
      <StyledCard>
        {/* Quarter buttons container */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px', 
          marginBottom: '40px'
        }}>
          {quarters.map(quarter => (
            <QuarterButton
              key={quarter.value}
              selected={selectedQuarter === quarter.value}
              onClick={() => setSelectedQuarter(quarter.value)}
              style={{ margin: 0 }} // Override margin-bottom
            >
              <QuarterTitle>{quarter.title}</QuarterTitle>
            </QuarterButton>
          ))}
        </div>
  
        {/* Timer section */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
          {gameInfo && (
            <>
              <Timer 
                initialTime={selectedTime} 
                maxTime={getMaxTime()}
                onTimeChange={setSelectedTime}
                onPauseChange={handlePauseChange}
              />
            </>
          )}
        </div>
  
        {/* Continue button section */}

<div style={{ 
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center',
  width: '100%', // Ensure full width
  position: 'relative' // For absolute positioning of the message
}}>
<ContinueButton
  type="primary"
  size="large"
  onClick={handleContinue}
  style={{
    fontSize: '35px',
    padding: '24px 48px',
    height: 'auto',
    fontWeight: 'bold',
    width: '400px',
    display: 'flex',         // Add display flex
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center',     // Center content vertically
    whiteSpace: 'nowrap',     // Prevent text from wrapping
    overflow: 'hidden',       // Prevent text overflow
    textOverflow: 'ellipsis', // Add ellipsis if text overflows
  }}
  disabled={!selectedQuarter || selectedTime === null || isTimerPaused}
>
  Confirm Time
</ContinueButton>
  
  {isTimerPaused && (
    <div style={{
      color: '#ff4d4f',
      fontSize: '1rem',
      marginTop: '8px',
      fontWeight: 'bold'
    }}>
      Cannot confirm time when clock is stopped
    </div>
  )}
  
  <span style={{
    color: '#BAE0C0',
    fontSize: '0.9rem', // Smaller font
    fontStyle: 'italic',
    position: 'absolute',
    bottom: '-50px', // Position below the button
    right: '-50px', // Align to right
    marginTop: '15px'
  }}>
    *You can fine-tune your stream to the millisecond while listening
  </span>
</div>
      </StyledCard>
    </PageLayout>
  );
}