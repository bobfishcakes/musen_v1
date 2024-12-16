'use client'

import {
  CommentOutlined,
  DollarCircleOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { Avatar, Card, Col, List, Row, Statistic, Typography } from 'antd'
import { UserStatus } from 'apps/web/src/domain/user/user.model'
import dayjs from 'dayjs'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

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

const titleStyle = {
  color: 'white'
};

const textStyle = {
  color: '#BAE0C0'  // Light green color for dates/times
};

const { Title, Text } = Typography

// Sample initial comments
const initialComments: Model.Comment[] = [
  {
    id: 'live1',
    content: 'Great commentary on that last play! Keep it up!',
    user: {
      id: 'viewer1',
      name: 'SportsFanatic',
      pictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fan1',
      status: 'VERIFIED' as UserStatus,
      dateCreated: new Date(Date.now() - 300000).toISOString(),
      dateUpdated: new Date(Date.now() - 300000).toISOString(),
    },
    commentTime: new Date(Date.now() - 300000).toISOString(),
    dateCreated: new Date(Date.now() - 300000).toISOString(),
    dateUpdated: new Date(Date.now() - 300000).toISOString(),
    dateDeleted: null,
    streamId: 'live-stream-1',
    userId: 'viewer1',
  },
  {
    id: 'live2',
    content: 'That analysis of the defense was spot on!',
    user: {
      id: 'viewer2',
      name: 'cade.humphries',
      pictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fan2',
      status: 'VERIFIED' as UserStatus,
      dateCreated: new Date(Date.now() - 240000).toISOString(),
      dateUpdated: new Date(Date.now() - 240000).toISOString(),
    },
    commentTime: new Date(Date.now() - 240000).toISOString(),
    dateCreated: new Date(Date.now() - 240000).toISOString(),
    dateUpdated: new Date(Date.now() - 240000).toISOString(),
    dateDeleted: null,
    streamId: 'live-stream-1',
    userId: 'viewer2',
  },
]

// Sample initial subscribers
const initialSubscribers: Model.Subscription[] = [
  {
    id: 'sub1',
    user: {
      id: 'new1',
      name: 'BettingGuru',
      pictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sub1',
      status: 'VERIFIED' as UserStatus,
      dateCreated: new Date(Date.now() - 3600000).toISOString(),
      dateUpdated: new Date(Date.now() - 3600000).toISOString(),
    },
    startDate: new Date(Date.now() - 3600000).toISOString(),
    streamerId: 'streamer1',
    userId: 'new1',
    dateCreated: new Date(Date.now() - 3600000).toISOString(),
    dateUpdated: new Date(Date.now() - 3600000).toISOString(),
    dateDeleted: null,
  },
  {
    id: 'sub2',
    user: {
      id: 'new2',
      name: 'RadioTroll22',
      pictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sub2',
      status: 'VERIFIED' as UserStatus,
      dateCreated: new Date(Date.now() - 1800000).toISOString(),
      dateUpdated: new Date(Date.now() - 1800000).toISOString(),
    },
    startDate: new Date(Date.now() - 1800000).toISOString(),
    streamerId: 'streamer1',
    userId: 'new2',
    dateCreated: new Date(Date.now() - 1800000).toISOString(),
    dateUpdated: new Date(Date.now() - 1800000).toISOString(),
    dateDeleted: null,
  },
]

const initialEarnings: Model.Earning[] = [
  {
    id: 'earn1',
    amount: 25.0,
    earningTime: new Date(Date.now() - 3600000).toISOString(),
    streamerId: 'streamer1',
    dateCreated: new Date(Date.now() - 3600000).toISOString(),
    dateUpdated: new Date(Date.now() - 3600000).toISOString(),
    dateDeleted: null,
  },
  {
    id: 'earn2',
    amount: 15.0,
    earningTime: new Date(Date.now() - 1800000).toISOString(),
    streamerId: 'streamer1',
    dateCreated: new Date(Date.now() - 1800000).toISOString(),
    dateUpdated: new Date(Date.now() - 1800000).toISOString(),
    dateDeleted: null,
  },
]

export default function StreamerLiveFeedPage() {
  const router = useRouter()
  const params = useParams<any>()
  const searchParams = useSearchParams()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [comments, setComments] = useState<Model.Comment[]>(initialComments)
  const [earnings, setEarnings] = useState<Model.Earning[]>(initialEarnings)
  const [subscribers, setSubscribers] =
    useState<Model.Subscription[]>(initialSubscribers)
  const [pageInfo, setPageInfo] = useState<any>(null)

  useEffect(() => {
    const infoParam = searchParams.get('info')
    if (infoParam) {
      try {
        const decodedInfo = JSON.parse(decodeURIComponent(infoParam))
        setPageInfo(decodedInfo)
      } catch (error) {
        enqueueSnackbar('Error parsing stream information', {
          variant: 'error',
        })
      }
    }
  }, [searchParams])

  useEffect(() => {
    if (userId) {
      fetchData()
    }
  }, [userId])

  const fetchData = async () => {
    try {
      const user = await Api.User.findOne(userId, {
        includes: [
          'streamsAsStreamer.comments',
          'earningsAsStreamer',
          'subscriptionsAsStreamer.user',
        ],
      })

      const currentStream = user.streamsAsStreamer?.find(
        stream => stream.status === 'live',
      )

      if (currentStream) {
        setComments([...initialComments, ...(currentStream.comments || [])])
      }
      setEarnings([...initialEarnings, ...(user.earningsAsStreamer || [])])
      setSubscribers([
        ...initialSubscribers,
        ...(user.subscriptionsAsStreamer || []),
      ])
    } catch (error) {
      enqueueSnackbar('Failed to fetch data', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      {pageInfo && (
        <Title level={2} style={titleStyle}>
          Live Stream: {pageInfo.game.awayTeam} @ {pageInfo.game.homeTeam}
        </Title>
      )}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24} md={12}>
          <Card
            title={<span style={titleStyle}>Audience Comments</span>}
            bordered={false}
            extra={<CommentOutlined style={{ color: 'white' }} />}
            style={cardStyle}
          >
            <List
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={comment => (
                <List.Item
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={comment.user?.pictureUrl} />}
                    title={<span style={{ color: 'white' }}>{comment.user?.name}</span>}
                    description={
                      <div style={{ maxWidth: '500px', color: 'white' }}>
                        {comment.content}
                      </div>
                    }
                  />
                  <Text style={textStyle}>
                    {dayjs(comment.commentTime).format('HH:mm')}
                  </Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card
                title={<span style={titleStyle}>Current Earnings</span>}
                bordered={false}
                extra={<DollarCircleOutlined style={{ color: 'white' }} />}
                style={cardStyle}
              >
                <Statistic
                  value={earnings.reduce(
                    (total, earning) => total + (earning.amount || 0),
                    0,
                  )}
                  precision={2}
                  prefix="$"
                  style={{ color: 'white' }}
                />
              </Card>
            </Col>
            <Col span={24}>
              <Card
                title={<span style={titleStyle}>New Subscribers</span>}
                bordered={false}
                extra={<UserAddOutlined style={{ color: 'white' }} />}
                style={cardStyle}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={subscribers}
                  renderItem={subscriber => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={subscriber.user?.pictureUrl} />}
                        title={<span style={{ color: 'white' }}>{subscriber.user?.name}</span>}
                      />
                      <Text style={textStyle}>
                        {dayjs(subscriber.startDate).format('MMM DD, YYYY')}
                      </Text>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </PageLayout>
);
}
