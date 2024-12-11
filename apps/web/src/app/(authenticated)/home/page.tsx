'use client'

import { UserOutlined } from '@ant-design/icons'
import * as solidIcons from '@fortawesome/free-solid-svg-icons'
import { Api } from '@web/domain'
import { AmericanFootballApi } from '@web/domain/americanFootball/americanFootball.api'
import { BasketballApi } from '@web/domain/basketball/basketball.api'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { Avatar, Card, Col, List, Row, Typography } from 'antd'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import GameCard from './gameCard'
import { Game } from './interfaces'
import { mockNbaGames, mockNcaaBasketballGames, mockNcaaFootballGames, mockNflGames } from './mockData'
import MusenTitle from './musenTitle'

const USE_MOCK_DATA = false; // Developer toggle: Set to false to use real API calls

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
      if (USE_MOCK_DATA) {
        setNcaaFootballGames(mockNcaaFootballGames);
        setNflGames(mockNflGames);
        return;
      }

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
      if (USE_MOCK_DATA) {
        setNcaaBasketballGames(mockNcaaBasketballGames);
        setNbaGames(mockNbaGames);
        return;
      }

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
    opacity: 1.0,
    backgroundColor: '#1e1e1e',
    backgroundSize: '100px 100px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    color: '#ffffff',
    // marginBottom: '20px',
    borderWidth: '0px',
  };

  const GameList = ({ games, icon }: { games: Game[]; icon: any }) => (
    <div style={{ marginTop: '20px' }}>
  {games.map(game => (
    <GameCard 
      key={game.id}
      game={game} 
      onNavigate={navigateToStream}
    />
  ))}
</div>
  )

  return (
    <PageLayout layout="narrow">
      <MusenTitle></MusenTitle>
      {nflGames.length > 0 && (
        <Row gutter={16}>
          <Col span={24}>
            <Card
              title={<span style={{ fontSize: '25px' }}>NFL Games</span>}
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
                <span style={{ fontSize: '25px' }}>NCAA Football Games</span>
              }
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
              title={<span style={{ fontSize: '25px' }}>NBA Games</span>}
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
                <span style={{ fontSize: '25px' }}>NCAA Basketball Games</span>
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
            title={<span style={{ fontSize: '25px' }}>my profile</span>}
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
