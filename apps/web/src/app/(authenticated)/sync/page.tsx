'use client'

import { PageLayout } from '@web/layouts/Page.layout'
import { Button, Card } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

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

const StyledRangeInput = styled.input`
  width: 100%;
  height: 20px;
  background-color: #2A3E31;
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

  &::-moz-range-thumb {
    width: 40px;
    height: 40px;
    background-color: #ffffff;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  &::-webkit-slider-runnable-track {
    height: 20px;
    border-radius: 10px;
    background-color: #2A3E31;
  }

  &::-moz-range-track {
    height: 20px;
    border-radius: 10px;
    background-color: #2A3E31;
  }
`;

const Timer: React.FC<TimerProps> = ({ initialTime, maxTime, onTimeChange }) => {
  const [time, setTime] = useState(initialTime)
  const [isPaused, setIsPaused] = useState(false)

  // Update time and notify parent whenever time changes
  const updateTime = (newTime: number) => {
    setTime(newTime);
    onTimeChange(newTime);
  };

  // Add this function where you need to format time
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime <= 0 ? 0 : prevTime - 0.1;
          onTimeChange(newTime); // Notify parent of time change
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

  // Update the range input handler
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    updateTime(newTime);
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
        {[
          { label: '-10s', change: -10 },
          { label: '-1s', change: -1 },
          { label: '+1s', change: 1 },
          { label: '+10s', change: 10 }
        ].map((btn) => (
          <TimeButton
            key={btn.label}
            onClick={() => {
              const newTime = btn.change < 0 
                ? Math.max(0, time + btn.change)
                : Math.min(maxTime, time + btn.change);
              setTime(newTime);
            }}
          >
            {btn.label}
          </TimeButton>
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
  margin-bottom: 20px;
  transition: background-color 0.2s ease;
  cursor: pointer;
  text-align: center;
  width: 100%;
  max-width: 280px;
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
  background-color: #3A5241;
  border-color: #3A5241;
  height: auto;
  padding: 12px 40px;
  font-size: 1.2rem;

  &:hover {
    background-color: #2A3E31 !important;
    border-color: #2A3E31 !important;
  }
`;



export default function SyncPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null)
  const [selectedTime, setSelectedTime] = useState<number>(0)
  const [selectedQuarter, setSelectedQuarter] = useState<string>('1')

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
    const gameId = searchParams.get('gameId')
    const teams = searchParams.get('teams')
    
    // Log the actual selected time
    console.log('Selected Quarter:', selectedQuarter)
    console.log('Time on Clock:', selectedTime)
    
    if (gameId && teams) {
      // Create an object with the game info and timing details
      const gameInfoWithTime = {
        ...gameInfo,
        selectedQuarter,
        timeOnClock: selectedTime // This will now have the correct time
      }
      
      const encodedInfo = encodeURIComponent(JSON.stringify(gameInfoWithTime))
      router.push(`/events/${gameId}/streamers?teams=${encodedInfo}`)
    }
  }

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
        <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', height: '100%' }}>
          <div style={{ flex: '0 0 auto' }}>
            <div>
              {quarters.map(quarter => (
                <QuarterButton
                  key={quarter.value}
                  selected={selectedQuarter === quarter.value}
                  onClick={() => setSelectedQuarter(quarter.value)}
                >
                  <QuarterTitle>{quarter.title}</QuarterTitle>
                </QuarterButton>
              ))}
            </div>
          </div>

          <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
  {gameInfo && (
    <>
      <h2 style={{ 
        color: '#ffffff', 
        fontSize: '3.5rem', 
        margin: 0, // Remove default margins
        marginBottom: '4.2rem', // Add space between title and slider
        textAlign: 'center',
        fontFamily: 'monospace',
        paddingTop: '15px' // Match the padding of QuarterButton
      }}>
        Time on Clock
      </h2>
      <Timer 
        initialTime={selectedTime} 
        maxTime={getMaxTime()}
        onTimeChange={setSelectedTime} 
      />
    </>
  )}
</div>
        </div>

<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <ContinueButton
type="primary" size="large" onClick={handleContinue} style={{ fontSize: '24px', padding: '24px 32px', height: 'auto' , fontWeight: 'bold' }}
disabled={!selectedQuarter || selectedTime === null}
  >
    Confirm Your Game Time
  </ContinueButton>
  <span style={{ 
    color: '#BAE0C0',  // Using the same green color used elsewhere
    fontSize: '1.2rem',
    marginTop: '15px',
    fontStyle: 'italic'
  }}>
    *You can tune your stream to the millisecond while listening if needed
  </span>
</div>
      </StyledCard>
    </PageLayout>
  );
}