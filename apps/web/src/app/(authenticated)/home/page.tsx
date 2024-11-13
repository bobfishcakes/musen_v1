'use client'

import { UserOutlined } from '@ant-design/icons'
import * as solidIcons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Api } from '@web/domain'
import { AiApi } from '@web/domain/ai/ai.api'
import { AmericanFootballApi } from '@web/domain/americanFootball/americanFootball.api'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { Avatar, Button, Card, Col, List, Row, Typography } from 'antd'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

dayjs.extend(utc)
dayjs.extend(timezone)

const { Title } = Typography

export default function HomePage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [liveGames, setLiveGames] = useState([])
  const [gameDescriptions, setGameDescriptions] = useState({})
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchLiveGames = async () => {
      try {
        // Get today's date in MM-DD-YYYY format for Central Time
        const today = new Date()
          .toLocaleString('en-US', {
            timeZone: 'America/Chicago',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .split(',')[0]
          .split('/')
          .join('-')

        const response = await AmericanFootballApi.getGames({
          date: today,
          timezone: 'America/Chicago',
          live: 'all', // This will get all live games
        })

        // Filter for live games
        const liveGames = response.response.filter(game =>
          ['NS', 'Q1', 'Q2', 'Q3', 'Q4', 'OT', 'HT'].includes(
            game.game.status.short,
          ),
        )

        setLiveGames(liveGames)
        await generateDescriptions(liveGames)
      } catch (error) {
        enqueueSnackbar('Failed to fetch live games', { variant: 'error' })
      }
    }

    const generateDescriptions = async games => {
      const descriptions = {}
      for (const game of games) {
        const prompt = `Describe the NFL game between ${game.teams.home.name} and ${game.teams.away.name} in 10 words.`
        try {
          const description = await AiApi.chat(prompt)
          descriptions[game.id] = description
        } catch (error) {
          descriptions[game.id] =
            'Exciting NFL matchup between two competitive teams'
        }
      }
      setGameDescriptions(descriptions)
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

    fetchLiveGames()
    fetchUserProfile()
  }, [userId])

  const navigateToStream = gameId => {
    router.push(`/events/${gameId}/streamers`)
  }

  return (
    <PageLayout layout="narrow">
      <Row justify="center" style={{ marginBottom: '40px' }}>
        <Col>
          <Title level={2} style={{ fontSize: '125px', marginBottom: '20px' }}>
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
      <Row gutter={16}>
        <Col span={24}>
          <Card
            title={
              <span style={{ fontSize: '30px' }}>live football games</span>
            }
            bordered={false}
          >
            <List
              itemLayout="horizontal"
              dataSource={liveGames}
              renderItem={game => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <FontAwesomeIcon icon={solidIcons.faMicrophoneLines} />
                    }
                    title={
                      <>
                        <span style={{ fontSize: '22px' }}>
                          {game.teams.away.name} @ {game.teams.home.name}
                        </span>
                        <br />
                        <span
                          style={{ fontSize: '18px', fontWeight: 'normal' }}
                        >
                          {gameDescriptions[game.id] ||
                            'Loading description...'}
                        </span>
                      </>
                    }
                    description={
                      <span style={{ fontSize: '16px' }}>
                        {dayjs(game.date)
                          .tz('America/Chicago')
                          .format('MMM D, YYYY h:mm A [CT]')}
                      </span>
                    }
                  />
                  <Button
                    type="primary"
                    onClick={() => navigateToStream(game.id)}
                  >
                    <span style={{ fontSize: '20px', color: 'black' }}>
                      listen now
                    </span>
                  </Button>
                </List.Item>
              )}
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
