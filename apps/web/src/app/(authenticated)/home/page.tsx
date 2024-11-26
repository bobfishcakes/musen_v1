'use client'

import { UserOutlined } from '@ant-design/icons'
import * as solidIcons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Api } from '@web/domain'
import { AmericanFootballApi } from '@web/domain/americanFootball/americanFootball.api'
import { BasketballApi } from '@web/domain/basketball/basketball.api'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { Avatar, Button, Card, Col, List, Row, Typography } from 'antd'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

interface Team {
  name: string
  id: string
}

interface Teams {
  home: Team
  away: Team
}

interface League {
  name: string
  alias?: string
}

interface GameDate {
  date: string
  time: string
}

interface Game {
  id: string
  teams: Teams
  league: League
  date?: string
  game?: {
    date: GameDate
    status: {
      short: string
    }
  }
}

interface ApiResponse {
  response: Game[]
}

dayjs.extend(utc)
dayjs.extend(timezone)

const { Title } = Typography

export default function HomePage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [nflGames, setNflGames] = useState<Game[]>([])
  const [ncaaFootballGames, setNcaaFootballGames] = useState<Game[]>([])
  const [nbaGames, setNbaGames] = useState<Game[]>([])
  const [ncaaBasketballGames, setNcaaBasketballGames] = useState<Game[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchFootballGames = async () => {
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

        const response = await AmericanFootballApi.getGames({
          date: formattedDate,
          timezone: 'America/Chicago',
        })

        const nflGames = response.response.filter(
          game => game.league?.name === 'NFL' || game.league?.alias === 'NFL',
        )
        const ncaaGames = response.response.filter(
          game => game.league?.name === 'NCAA' || game.league?.alias === 'NCAA',
        )

        setNflGames(nflGames)
        setNcaaFootballGames(ncaaGames)
      } catch (error) {
        enqueueSnackbar('Failed to fetch football games', { variant: 'error' })
      }
    }

    const fetchBasketballGames = async () => {
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

        const response = await BasketballApi.getGames({
          date: formattedDate,
          timezone: 'America/Chicago',
        })

        const nbaGames = response.response.filter(
          game => game.league?.name === 'NBA' || game.league?.alias === 'NBA',
        )
        const ncaaGames = response.response.filter(
          game => game.league?.name === 'NCAA' || game.league?.alias === 'NCAA',
        )

        setNbaGames(nbaGames)
        setNcaaBasketballGames(ncaaGames)
      } catch (error) {
        enqueueSnackbar('Failed to fetch basketball games', {
          variant: 'error',
        })
      }
    }

    const fetchUserProfile = async () => {
      if (userId) {
        try {
          const userProfile = await Api.User.findOne(userId)
          setUser(userProfile)
        } catch (error) {
          enqueueSnackbar('Failed to fetch user profile', { variant: 'error' })
        }
      }
    }

    fetchFootballGames()
    fetchBasketballGames()
    fetchUserProfile()
  }, [userId, enqueueSnackbar])

  const navigateToStream = (gameId: string, game: Game) => {
    const gameInfo = {
      id: gameId,
      homeTeam: game.teams.home.name,
      awayTeam: game.teams.away.name,
      league: game.league.name,
    }

    router.push(
      `/events/${gameId}/streamers?teams=${encodeURIComponent(
        JSON.stringify(gameInfo),
      )}`,
    )
  }

  const cardStyle = {
    border: '1px solid white',
    opacity: 1.0,
    backgroundColor: '#40826d',
    backgroundImage: `
      radial-gradient(farthest-side at -33.33% 50%, transparent 52%, #2A3F30 54% 57%, transparent 59%) 0 70px,
      radial-gradient(farthest-side at 50% 133.33%, transparent 52%, #2A3F30 54% 57%, transparent 59%) 70px 0,
      radial-gradient(farthest-side at 133.33% 50%, transparent 52%, #2A3F30 54% 57%, transparent 59%),
      radial-gradient(farthest-side at 50% -33.33%, transparent 52%, #2A3F30 54% 57%, transparent 59%)
    `,
    backgroundSize: 'calc(140px/4.667) 140px, 140px calc(140px/4.667)',
    backgroundRepeat: 'repeat',
    backgroundPosition: '0 0',
    marginBottom: '20px', // Add spacing between cards
  }

  const GameList = ({ games, icon }: { games: Game[]; icon: any }) => (
    <List
      itemLayout="horizontal"
      dataSource={games}
      renderItem={game => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <FontAwesomeIcon icon={icon} style={{ color: '#FFFFFF' }} />
            }
            title={
              <span style={{ fontSize: '22px' }}>
                {game.teams.away.name} @ {game.teams.home.name}
              </span>
            }
            description={
              <span style={{ fontSize: '16px', color: '#BAE0C0' }}>
                Start time:{' '}
                {game.date
                  ? dayjs(game.date).tz('America/Chicago').format('h:mm A [CT]')
                  : game.game?.date
                    ? dayjs(`${game.game.date.date} ${game.game.date.time}`)
                        .tz('America/Chicago')
                        .format('h:mm A [CT]')
                    : 'Time TBD'}
              </span>
            }
          />
          <Button
            type="primary"
            onClick={() => navigateToStream(game.id, game)}
            style={{
              backgroundColor: '#3A5241',
              borderColor: '#3A5241',
            }}
          >
            <span style={{ fontSize: '20px', color: '#FFFFFF' }}>
              listen now
            </span>
          </Button>
        </List.Item>
      )}
    />
  )

  return (
    <PageLayout layout="narrow">
      <Row justify="center" style={{ marginTop: '20px', marginBottom: '40px' }}>
        <Col xs={24} sm={24} md={20} lg={18}>
          <Card
            bordered={false}
            style={{ ...cardStyle, width: '800px', padding: '10px 20px' }}
          >
            <Row justify="center">
              <Col span={24} style={{ textAlign: 'center' }}>
                <Title
                  level={2}
                  style={{
                    fontSize: '125px',
                    marginBottom: '10px', // Reduced bottom margin
                  }}
                >
                  musen
                </Title>
                <Title
                  level={2}
                  style={{
                    fontSize: '35px',
                    fontWeight: 'normal',
                    marginTop: '10px', // Reduced top margin
                    marginBottom: '10px', // Reduced bottom margin
                    color: '#BAE0C0',
                  }}
                >
                  sports commentary how you want it
                </Title>
                <img
                  src="/musen_logo.png"
                  width={180} // Reduced from 240
                  height={180} // Reduced from 240
                  style={{
                    borderRadius: '10px',
                    marginTop: '10px', // Reduced top margin
                    marginBottom: '10px', // Added bottom margin
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {nflGames.length > 0 && (
        <Row gutter={16}>
          <Col span={24}>
            <Card
              title={<span style={{ fontSize: '30px' }}>NFL Games</span>}
              bordered={true}
              style={cardStyle}
            >
              <GameList games={nflGames} icon={solidIcons.faFootballBall} />
            </Card>
          </Col>
        </Row>
      )}

      {ncaaFootballGames.length > 0 && (
        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={24}>
            <Card
              title={
                <span style={{ fontSize: '30px' }}>NCAA Football Games</span>
              }
              bordered={true}
              style={cardStyle}
            >
              <GameList
                games={ncaaFootballGames}
                icon={solidIcons.faFootballBall}
              />
            </Card>
          </Col>
        </Row>
      )}

      {nbaGames.length > 0 && (
        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={24}>
            <Card
              title={<span style={{ fontSize: '30px' }}>NBA Games</span>}
              bordered={true}
              style={cardStyle}
            >
              <GameList games={nbaGames} icon={solidIcons.faBasketballBall} />
            </Card>
          </Col>
        </Row>
      )}

      {ncaaBasketballGames.length > 0 && (
        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={24}>
            <Card
              title={
                <span style={{ fontSize: '30px' }}>NCAA Basketball Games</span>
              }
              bordered={true}
              style={cardStyle}
            >
              <GameList
                games={ncaaBasketballGames}
                icon={solidIcons.faBasketballBall}
              />
            </Card>
          </Col>
        </Row>
      )}

      <Row gutter={16} style={{ marginTop: '75px' }}>
        <Col span={24}>
          <Card
            title={<span style={{ fontSize: '30px' }}>my profile</span>}
            bordered={true}
            style={cardStyle}
          >
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} src={user?.pictureUrl} />}
              title={<span style={{ fontSize: '24px' }}>{user?.name}</span>}
              description={
                <span style={{ fontSize: '18px' }}>{user?.email}</span>
              }
            />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
