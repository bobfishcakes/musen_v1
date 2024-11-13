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

  const navigateToStream = gameId => {
    router.push(`/events/${gameId}/streamers`)
  }

  const GameList = ({ games, icon }: { games: Game[]; icon: any }) => (
    <List
      itemLayout="horizontal"
      dataSource={games}
      renderItem={game => (
        <List.Item>
          <List.Item.Meta
            avatar={<FontAwesomeIcon icon={icon} />}
            title={
              <span style={{ fontSize: '22px' }}>
                {game.teams.away.name} @ {game.teams.home.name}
              </span>
            }
            description={
              <span style={{ fontSize: '16px' }}>
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
          <Button type="primary" onClick={() => navigateToStream(game.id)}>
            <span style={{ fontSize: '20px', color: 'black' }}>listen now</span>
          </Button>
        </List.Item>
      )}
    />
  )

  return (
    <PageLayout layout="narrow">
      <Row justify="center" style={{ marginBottom: '40px' }}>
        <Col>
          <Title
            level={2}
            style={{
              fontSize: '125px',
              marginBottom: '20px',
              marginLeft: '85px',
            }}
          >
            musen
          </Title>
          <Title
            level={2}
            style={{ fontSize: '35px', fontWeight: 'normal', marginTop: '0px' }}
          >
            sports commentary how you want it
          </Title>
        </Col>
      </Row>

      {/* NFL Games */}
      <Row gutter={16}>
        <Col span={24}>
          <Card
            title={<span style={{ fontSize: '30px' }}>NFL Games</span>}
            bordered={false}
          >
            <GameList games={nflGames} icon={solidIcons.faFootballBall} />
          </Card>
        </Col>
      </Row>

      {/* NCAA Football Games */}
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Card
            title={
              <span style={{ fontSize: '30px' }}>NCAA Football Games</span>
            }
            bordered={false}
          >
            <GameList
              games={ncaaFootballGames}
              icon={solidIcons.faFootballBall}
            />
          </Card>
        </Col>
      </Row>

      {/* NBA Games */}
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Card
            title={<span style={{ fontSize: '30px' }}>NBA Games</span>}
            bordered={false}
          >
            <GameList games={nbaGames} icon={solidIcons.faBasketballBall} />
          </Card>
        </Col>
      </Row>

      {/* NCAA Basketball Games */}
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Card
            title={
              <span style={{ fontSize: '30px' }}>NCAA Basketball Games</span>
            }
            bordered={false}
          >
            <GameList
              games={ncaaBasketballGames}
              icon={solidIcons.faBasketballBall}
            />
          </Card>
        </Col>
      </Row>

      {/* User Profile Section */}
      <Row gutter={16} style={{ marginTop: '75px' }}>
        <Col span={24}>
          <Card
            title={<span style={{ fontSize: '30px' }}>my profile</span>}
            bordered={false}
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
