'use client'

import { UserOutlined } from '@ant-design/icons'
import * as solidIcons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Api, Model } from '@web/domain'
import { AiApi } from '@web/domain/ai/ai.api'
import { AmericanFootballApi } from '@web/domain/americanFootball/americanFootball.api'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { Avatar, Button, Card, Col, List, Row, Typography } from 'antd'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

const { Title } = Typography
dayjs.extend(utc)
dayjs.extend(timezone)

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [sportingEvents, setSportingEvents] = useState<Model.SportingEvent[]>(
    [],
  )
  const [games, setGames] = useState([])
  const [gameDescriptions, setGameDescriptions] = useState<string[]>([])
  const [user, setUser] = useState<Model.User | null>(null)
  const [isStreamingLive, setIsStreamingLive] = useState<boolean>(false)

  useEffect(() => {
    const fetchGames = async () => {
      const today = dayjs().format('YYYY-MM-DD')
      try {
        const response = await AmericanFootballApi.getGames({
          date: today,
          timezone: 'America/Chicago',
          live: 'all',
        })
        setGames(response.response)
        await fetchGameDescriptions(response.response)
      } catch (error) {
        console.error('Error fetching games:', error)
        enqueueSnackbar('Failed to fetch games', { variant: 'error' })
      }
    }

    const fetchGameDescriptions = async (games: any[]) => {
      const descriptions = await Promise.all(
        games.map(async game => {
          const prompt = `Describe the NFL game between ${game.teams.home.name} and ${game.teams.away.name} in exactly 10 words.`
          try {
            const response = await AiApi.chat(prompt) // Remove the { prompt } object
            return response
          } catch (error) {
            console.error('Error fetching description:', error)
            return 'Description unavailable'
          }
        }),
      )
      setGameDescriptions(descriptions)
    }

    const fetchUserProfile = async () => {
      if (userId) {
        try {
          const userProfile = await Api.User.findOne(userId, {
            includes: ['streamsAsStreamer'],
          })
          setUser(userProfile)
          const activeStream = userProfile.streamsAsStreamer?.some(
            stream => stream.status === 'live',
          )
          setIsStreamingLive(!!activeStream)
        } catch (error) {
          enqueueSnackbar('Failed to fetch user profile', { variant: 'error' })
        }
      }
    }

    fetchGames()
    fetchUserProfile()
  }, [userId, enqueueSnackbar])

  const navigateToStreamerDashboard = () => {
    router.push('/streamer/dashboard')
  }

  const navigateToStream = (eventId: string, streamerId: string) => {
    router.push(`/events/${eventId}/streamers/${streamerId}`)
  }

  return (
    <PageLayout layout="narrow">
      <Row justify="center" style={{ marginBottom: '40px' }}>
        <Col>
          <Title
            level={2}
            style={{
              fontSize: '125px',
              marginBottom: '20px',
              marginLeft: '100x',
            }}
          >
            musen
          </Title>
          <Title
            level={2}
            style={{ fontSize: '35px', fontWeight: 'normal', marginTop: '0px' }}
          >
            sports how you want it
          </Title>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Card
            title={<span style={{ fontSize: '30px' }}>today's games</span>}
            bordered={false}
          >
            <List
              itemLayout="horizontal"
              dataSource={games}
              renderItem={(game, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <FontAwesomeIcon icon={solidIcons.faFootballBall} />
                    }
                    title={
                      <>
                        <span style={{ fontSize: '22px' }}>
                          {game.teams.home.name} vs {game.teams.away.name}
                        </span>
                        <br />
                        <span
                          style={{ fontSize: '18px', fontWeight: 'normal' }}
                        >
                          {gameDescriptions[index] || 'Loading description...'}
                        </span>
                      </>
                    }
                    description={
                      <span style={{ fontSize: '16px' }}>
                        {`Start time: ${dayjs(game.date)
                          .tz('America/Chicago')
                          .format('MMM D, YYYY h:mm A')} CST`}
                      </span>
                    }
                  />
                  <Button
                    type="primary"
                    onClick={() => navigateToStream(game.id, '')}
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
      <Row gutter={16} style={{ marginTop: '75px' }}>
        <Col span={12}>
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
        <Col span={12}>
          <Card
            title={<span style={{ fontSize: '30px' }}>streamer dashboard</span>}
            bordered={false}
            actions={[
              <Button
                key="dashboard"
                type="primary"
                onClick={navigateToStreamerDashboard}
              >
                <span style={{ fontSize: '20px', color: 'black' }}>
                  go to dashboard
                </span>
              </Button>,
            ]}
          >
            <List
              itemLayout="horizontal"
              dataSource={user?.streamsAsStreamer}
              renderItem={stream => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<FontAwesomeIcon icon={solidIcons.faMicrophone} />}
                    title={
                      <span style={{ fontSize: '18px' }}>
                        {stream.sportingEvent?.name}
                      </span>
                    }
                    description={
                      <span style={{ fontSize: '18px' }}>
                        {dayjs(stream.startTime).format('MMMM D, YYYY')}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
