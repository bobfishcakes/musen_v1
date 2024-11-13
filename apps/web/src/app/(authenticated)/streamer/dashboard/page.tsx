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
import {
  Avatar,
  Button,
  Card,
  Col,
  List,
  Row,
  Select,
  Spin,
  Typography,
} from 'antd'
import dayjs from 'dayjs'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

const { Title, Text, Paragraph } = Typography
const { Option } = Select

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

        // Filter unique events using Object.values and reduce
        const uniqueEvents = Object.values(
          formattedEvents.reduce(
            (acc, event) => {
              acc[event.id] = event
              return acc
            },
            {} as Record<string, Model.SportingEvent>,
          ),
        )
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
      Api.Stream.createOneBySportingEventId(selectedEvent, {
        streamerId: userId,
      })
        .then(stream =>
          router.push(`/events/${selectedEvent}/streamers/${userId}`),
        )
        .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
    } else {
      enqueueSnackbar('Please select a sporting event', { variant: 'error' })
    }
  }

  if (loading) {
    return <Spin size="large" />
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Streamer Dashboard</Title>
      <Paragraph>
        Welcome to your dashboard. Here you can monitor your profits, access
        pre-generated clips, and start a new live stream.
      </Paragraph>
      <Row gutter={[16, 16]} justify="center">
        <Col span={24}>
          <Card
            title={
              <>
                <DollarCircleOutlined style={{ marginRight: 8 }} />
                Your Earnings
              </>
            }
            bordered={false}
          >
            <List
              itemLayout="horizontal"
              dataSource={user?.earningsAsStreamer}
              renderItem={earning => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<DollarCircleOutlined />} />}
                    title={`$${earning.amount}`}
                    description={dayjs(earning.earningTime).format(
                      'MMMM D, YYYY',
                    )}
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
                <VideoCameraOutlined style={{ marginRight: 8 }} />
                Pre-generated Clips
              </>
            }
            bordered={false}
          >
            <List
              itemLayout="horizontal"
              dataSource={user?.streamsAsStreamer?.flatMap(
                stream => stream.clips,
              )}
              renderItem={clip => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<VideoCameraOutlined />} />}
                    title={
                      <a
                        href={clip.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Clip
                      </a>
                    }
                    description={dayjs(clip.creationTime).format(
                      'MMMM D, YYYY',
                    )}
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
                <PlayCircleOutlined style={{ marginRight: 8 }} />
                Start a Live Stream
              </>
            }
            bordered={false}
          >
            <Select
              style={{
                width: '100%',
              }}
              dropdownStyle={{
                backgroundColor: '#628A6E',
              }}
              className="custom-select"
              placeholder="Select a sporting event"
              onChange={value => setSelectedEvent(value)}
            >
              {Array.isArray(sportingEvents) &&
                sportingEvents.map(event => (
                  <Option key={event.id} value={event.id}>
                    {event.name} -{' '}
                    {dayjs(event.startTime).format('h:mm A [CT]')}
                  </Option>
                ))}
            </Select>
            <Button
              type="primary"
              onClick={handleStartStream}
              style={{ marginTop: '16px', color: 'black' }}
            >
              Start Streaming
            </Button>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
