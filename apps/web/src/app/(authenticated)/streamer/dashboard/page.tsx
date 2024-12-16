'use client'

import {
  DollarCircleOutlined,
  PlayCircleOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Api, Model } from '@web/domain'
import { AmericanFootballApi } from '@web/domain/americanFootball/americanFootball.api'
import { BasketballApi } from '@web/domain/basketball/basketball.api'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { Avatar, Button, Card, Col, List, Row, Select, Typography } from 'antd'
import dayjs from 'dayjs'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

const { Title, Text, Paragraph } = Typography
const { Option } = Select

const cardStyle = {
  opacity: 1.0,
  backgroundColor: '#1e1e1e',
  backgroundSize: '100px 100px',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  color: '#ffffff',
  borderWidth: '0px',
};

const dateStyle = {
  color: '#BAE0C0'  // Lighter shade of green from home page
};

const buttonStyle = {
  backgroundColor: '#3A5241',
  color: 'white',
  border: 'none',
  marginLeft: '16px'  // Add margin to separate from dropdown
};

const selectStyle = {
  width: 'calc(100% - 140px)',  // Adjust width to accommodate button
  backgroundColor: '#1e1e1e',  // Gray background
};

const globalStyle = `
  .ant-select-dropdown {
    background-color: #1e1e1e !important;  // Gray dropdown background
  }
  .ant-select-item {
    color: white !important;
  }
  .ant-select-item-option-selected,
  .ant-select-item-option-active {
    background-color: #3A5241 !important;  // Green when selected/hovered
  }
  .ant-select-selector {
    background-color: #1e1e1e !important;  // Gray background
    color: white !important;
    border: none !important;
  }
`;

const dummyEarnings: DummyEarning[] = [
  {
    id: '1',
    amount: 25.0,
    earningTime: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  },
  {
    id: '2',
    amount: 15.5,
    earningTime: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    id: '3',
    amount: 30.25,
    earningTime: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
  },
]

const dummyClips: DummyClip[] = [
  {
    id: '1',
    url: 'https://example.com/clip1',
    creationTime: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '2',
    url: 'https://example.com/clip2',
    creationTime: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '3',
    url: 'https://example.com/clip3',
    creationTime: new Date(Date.now() - 259200000).toISOString(),
  },
]

interface GameTeam {
  name: string
}

interface GameTeams {
  home: GameTeam
  away: GameTeam
}

interface GameLeague {
  name: string
  alias?: string
}

interface GameDate {
  date: string
  time: string
}

interface Game {
  id: string
  teams: GameTeams
  league: GameLeague
  date?: string
  game?: {
    date: GameDate
  }
}

interface GameInfo {
  id: string
  homeTeam: string
  awayTeam: string
  league: string
}

interface StreamerInfo {
  id: string
  name: string
  listeners: number
  description: string
}

interface PageInfo {
  game: GameInfo
  streamer: StreamerInfo
}

interface DummyClip {
  id: string
  url: string
  creationTime: string
}

interface DummyEarning {
  id: string
  amount: number
  earningTime: string
}

export default function StreamerDashboardPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [user, setUser] = useState<Model.User | null>(null)
  const [sportingEvents, setSportingEvents] = useState<Model.SportingEvent[]>(
    [],
  )
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [nflGames, setNflGames] = useState<Game[]>([])
  const [ncaaFootballGames, setNcaaFootballGames] = useState<Game[]>([])
  const [nbaGames, setNbaGames] = useState<Game[]>([])
  const [ncaaBasketballGames, setNcaaBasketballGames] = useState<Game[]>([])

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, {
        includes: [
          'earningsAsStreamer',
          'streamsAsStreamer',
          'streamsAsStreamer.clips',
        ],
      })
        .then(setUser)
        .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
        .finally(() => setLoading(false))
    }
  }, [userId])

  useEffect(() => {
    const fetchAllGames = async () => {
      try {
        const date = new Date()
        const today = date.toLocaleDateString('en-US', {
          timeZone: 'America/Chicago',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })

        const [month, day, year] = today.split('/')
        const formattedDate = `${year}-${month}-${day}`

        const [footballResponse, basketballResponse] = await Promise.all([
          AmericanFootballApi.getGames({
            date: formattedDate,
            timezone: 'America/Chicago',
          }),
          BasketballApi.getGames({
            date: formattedDate,
            timezone: 'America/Chicago',
          }),
        ])

        const nflGames = footballResponse.response.filter(
          game => game.league?.name === 'NFL' || game.league?.alias === 'NFL',
        )
        const ncaaFootballGames = footballResponse.response.filter(
          game => game.league?.name === 'NCAA' || game.league?.alias === 'NCAA',
        )
        const nbaGames = basketballResponse.response.filter(
          game => game.league?.name === 'NBA' || game.league?.alias === 'NBA',
        )
        const ncaaBasketballGames = basketballResponse.response.filter(
          game => game.league?.name === 'NCAA' || game.league?.alias === 'NCAA',
        )

        const formattedEvents: Model.SportingEvent[] = [
          ...nflGames,
          ...ncaaFootballGames,
          ...nbaGames,
          ...ncaaBasketballGames,
        ].map(game => ({
          id: game.id,
          name: `${game.teams.away.name} @ ${game.teams.home.name} - ${game.league.name}`,
          startTime:
            game.date ||
            (game.game?.date
              ? `${game.game.date.date} ${game.game.date.time}`
              : 'TBD'),
          endTime: null,
          description: `${game.league.name} game`,
          dateCreated: new Date().toISOString(),
          dateUpdated: new Date().toISOString(),
          dateDeleted: null,
          streams: [],
        }))

        setSportingEvents(formattedEvents)
      } catch (error) {
        console.error('Error fetching games:', error)
        enqueueSnackbar('Failed to fetch games', { variant: 'error' })
      }
    }

    fetchAllGames()
  }, [])

  const handleStartStream = () => {
    if (selectedEvent && userId) {
      const selectedEventDetails = sportingEvents.find(
        event => event.id === selectedEvent,
      )

      if (selectedEventDetails) {
        // Parse the event name to get teams and league
        const [awayTeam, rest] = selectedEventDetails.name.split(' @ ')
        const [homeTeam, league] = rest.split(' - ')

        // Create the page info object
        const pageInfo: PageInfo = {
          game: {
            id: selectedEventDetails.id,
            homeTeam: homeTeam,
            awayTeam: awayTeam,
            league: league,
          },
          streamer: {
            id: userId,
            name: user?.name || 'Unknown Streamer',
            listeners: 0,
            description: selectedEventDetails.description || '',
          },
        }

        Api.Stream.createOneBySportingEventId(selectedEvent, {
          streamerId: userId,
        })
          .then(stream => {
            router.push(
              `/streamer/dashboard/live?info=${encodeURIComponent(
                JSON.stringify(pageInfo),
              )}`,
            )
          })
          .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
      }
    } else {
      enqueueSnackbar('Please select a sporting event', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <style jsx global>{globalStyle}</style>
      <Title level={2} style={{ color: 'white' }}>Streamer Dashboard</Title>
      <Paragraph style={{ color: 'white' }}>
        Welcome to your dashboard. Here you can monitor your profits, access
        pre-generated clips, and start a new live stream.
      </Paragraph>
      <Row gutter={[16, 16]} justify="center">
        <Col span={24}>
          <Card
            title={
              <>
                <DollarCircleOutlined style={{ marginRight: 8, color: 'white' }} />
                <span style={{ color: 'white' }}>Your Earnings</span>
              </>
            }
            style={cardStyle}
            bordered={false}
          >
            <List
              itemLayout="horizontal"
              dataSource={dummyEarnings}
              renderItem={earning => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={<DollarCircleOutlined style={{ color: 'white' }} />}
                        style={{ backgroundColor: 'transparent' }}
                      />
                    }
                    title={<span style={{ color: 'white' }}>${earning.amount.toFixed(2)}</span>}
                    description={<span style={dateStyle}>
                      {dayjs(earning.earningTime).format('MMMM D, YYYY')}
                    </span>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={24}>
          <Card
            title={
              <>
                <VideoCameraOutlined style={{ marginRight: 8, color: 'white' }} />
                <span style={{ color: 'white' }}>Pre-generated Clips</span>
              </>
            }
            style={cardStyle}
            bordered={false}
          >
            <List
              itemLayout="horizontal"
              dataSource={dummyClips}
              renderItem={clip => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={<VideoCameraOutlined style={{ color: 'white' }} />}
                        style={{ backgroundColor: 'transparent' }}
                      />
                    }
                    title={
                      <a
                        href={clip.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'white' }}
                      >
                        View Clip
                      </a>
                    }
                    description={<span style={dateStyle}>
                      {dayjs(clip.creationTime).format('MMMM D, YYYY')}
                    </span>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={24}>
        <Card
  title={
    <>
      <PlayCircleOutlined style={{ marginRight: 8, color: 'white' }} />
      <span style={{ color: 'white' }}>Start a Live Stream</span>
    </>
  }
  style={cardStyle}
  bordered={false}
>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Select
      style={selectStyle}
      className="custom-select"
      placeholder="Select a sporting event"
      onChange={value => setSelectedEvent(value)}
    >
      {Array.isArray(sportingEvents) &&
        sportingEvents.map(event => (
          <Option key={event.id} value={event.id}>
            {event.name} -{' '}
            <span style={dateStyle}>
              {dayjs(event.startTime).format('h:mm A [CT]')}
            </span>
          </Option>
        ))}
    </Select>
    <Button
      type="primary"
      onClick={handleStartStream}
      style={buttonStyle}
    >
      Start Streaming
    </Button>
  </div>
</Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
