'use client'

import { UserOutlined } from '@ant-design/icons'
import * as solidIcons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Api, Model } from '@web/domain'
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
const { Title, Paragraph } = Typography
dayjs.extend(utc)
dayjs.extend(timezone)

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [games, setGames] = useState([])

  const [sportingEvents, setSportingEvents] = useState<Model.SportingEvent[]>(
    [],
  )
  const [user, setUser] = useState<Model.User | null>(null)
  const [isStreamingLive, setIsStreamingLive] = useState<boolean>(false)

  useEffect(() => {
    const fetchSportingEvents = async () => {
      try {
        const events = await Api.SportingEvent.findMany({
          includes: ['streams', 'streams.streamer'],
        })
        setSportingEvents(events)
      } catch (error) {
        enqueueSnackbar('Failed to fetch sporting events', { variant: 'error' })
      }
    }

    const fetchGames = async () => {
      const today = dayjs().format('YYYY-MM-DD')
      try {
        const response = await AmericanFootballApi.getGames({
          date: today,
          timezone: 'America/Chicago',
          live: 'all',
        })
        setGames(response.response)
      } catch (error) {
        console.error('Error fetching games:', error)
      }
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

    fetchSportingEvents()
    fetchUserProfile()
    fetchGames()
  }, [userId])

  const navigateToStreamerDashboard = () => {
    router.push('/streamer/dashboard')
  }

  const navigateToStream = (eventId: string, streamerId: string) => {
    router.push(`/events/${eventId}/streamers/${streamerId}`)
  }

  const renderGames = () => {
    return games.map(game => (
      <List.Item key={game.id}>
        <List.Item.Meta
          avatar={<FontAwesomeIcon icon={solidIcons.faFootballBall} />}
          title={
            <span style={{ fontSize: '18px' }}>
              {game.teams.home.name} vs {game.teams.away.name}
            </span>
          }
          description={
            <>
              <p>League: {game.league.name}</p>
              <p>
                Start Time:{' '}
                {dayjs(game.date)
                  .tz('America/Chicago')
                  .format('MMMM D, YYYY h:mm A')}
              </p>
              <p>Status: {game.status.long}</p>
            </>
          }
        />
      </List.Item>
    ))
  }

  return (
    <PageLayout layout="narrow">
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col>
          <Title
            level={2}
            style={{
              fontSize: '100px',
              marginBottom: '10px',
              marginLeft: '27x',
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
            title={<span style={{ fontSize: '30px' }}>live sports</span>}
            bordered={false}
          >
            <List
              itemLayout="horizontal"
              dataSource={sportingEvents}
              renderItem={event => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <FontAwesomeIcon icon={solidIcons.faMicrophoneLines} />
                    }
                    title={
                      <>
                        <span style={{ fontSize: '22px' }}>{event.name}</span>
                        <br />
                        <span
                          style={{ fontSize: '16px', fontWeight: 'normal' }}
                        >
                          {event.description} <span />
                        </span>
                      </>
                    }
                    description={
                      <span style={{ fontSize: '16px' }}>
                        {'Event started at ' +
                          dayjs(event.startTime).format('h:mm A') +
                          ', expected to end at ' +
                          dayjs(event.endTime).format('h:mm A')}
                      </span>
                    }
                  />
                  <Button
                    type="primary"
                    onClick={() =>
                      navigateToStream(
                        event.id,
                        event.streams?.[0]?.streamerId || '',
                      )
                    }
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
              <Button type="primary" onClick={navigateToStreamerDashboard}>
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
