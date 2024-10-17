'use client'

import { UserOutlined } from '@ant-design/icons'
import * as solidIcons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Api, Model } from '@web/domain'
import { AiApi } from '@web/domain/ai/ai.api'
import { SportingEventApi } from '@web/domain/sportingEvent/sportingEvent.api'
import { SportingEvent } from '@web/domain/sportingEvent/sportingEvent.model'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { Avatar, Button, Card, Col, List, Row, Typography } from 'antd'
import dayjs from 'dayjs'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
const { Title, Paragraph } = Typography

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [sportingEvents, setSportingEvents] = useState<SportingEvent[]>([])
  const [eventDescriptions, setEventDescriptions] = useState<string[]>([])
  const [liveEvents, setLiveEvents] = useState([])
  const [user, setUser] = useState<Model.User | null>(null)
  const [isStreamingLive, setIsStreamingLive] = useState<boolean>(false)

  useEffect(() => {
    const fetchLiveEvents = async () => {
      try {
        const today = dayjs().format('YYYY-MM-DD')
        const events = await SportingEventApi.fetchLiveEvents(today)
        console.log('Fetched events:', events) // Add this line to check the data
        setSportingEvents(events) // Change this line from setLiveEvents to setSportingEvents
      } catch (error) {
        console.error('Error fetching live events:', error)
      }
    }

    const fetchEventDescriptions = async (events: SportingEvent[]) => {
      const descriptions = await Promise.all(
        events.map(async event => {
          const prompt = `Describe the sporting event "${event.name}" in 10 words. \
          Use the internet to find the most recent information about the event. \
          Don't mention the name of the event in the 10-word description.`
          try {
            const response = await AiApi.chat(prompt)
            return response
          } catch (error) {
            console.error('Error fetching description:', error)
            return 'Description unavailable'
          }
        }),
      )
      setEventDescriptions(descriptions)
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

    fetchLiveEvents()
    fetchUserProfile()
  }, [userId])

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
            title={<span style={{ fontSize: '30px' }}>live sports</span>}
            bordered={false}
          >
            <List
              itemLayout="horizontal"
              dataSource={sportingEvents}
              renderItem={(event, index) => (
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
                          style={{ fontSize: '18px', fontWeight: 'normal' }}
                        >
                          {event.league.name}
                        </span>
                      </>
                    }
                    description={
                      <>
                        <p style={{ fontSize: '16px', margin: '5px 0' }}>
                          Start Time: {dayjs(event.startTime).format('HH:mm')}
                        </p>
                        <p style={{ fontSize: '16px', margin: '5px 0' }}>
                          Home Team: {event.teams.home.name}
                        </p>
                        <p style={{ fontSize: '16px', margin: '5px 0' }}>
                          Away Team: {event.teams.away.name}
                        </p>
                      </>
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
