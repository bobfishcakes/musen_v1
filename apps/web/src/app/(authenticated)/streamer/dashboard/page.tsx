'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  Row,
  Col,
  Card,
  Button,
  List,
  Avatar,
  Spin,
  Select,
} from 'antd'
import {
  DollarCircleOutlined,
  VideoCameraOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

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
    Api.SportingEvent.findMany()
      .then(setSportingEvents)
      .catch(error => enqueueSnackbar(error.message, { variant: 'error' }))
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
              style={{ width: '100%' }}
              placeholder="Select a sporting event"
              onChange={value => setSelectedEvent(value)}
            >
              {sportingEvents?.map(event => (
                <Option key={event.id} value={event.id}>
                  {event.name}
                </Option>
              ))}
            </Select>
            <Button
              type="primary"
              onClick={handleStartStream}
              style={{ marginTop: '16px' }}
            >
              Start Streaming
            </Button>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
