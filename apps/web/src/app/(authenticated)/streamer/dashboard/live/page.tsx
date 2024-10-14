'use client'

import { useEffect, useState } from 'react'
import { Typography, Row, Col, List, Avatar, Statistic, Card } from 'antd'
import {
  CommentOutlined,
  DollarCircleOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function StreamerLiveFeedPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [comments, setComments] = useState<Model.Comment[]>([])
  const [earnings, setEarnings] = useState<Model.Earning[]>([])
  const [subscribers, setSubscribers] = useState<Model.Subscription[]>([])

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
        setComments(currentStream.comments || [])
      }
      setEarnings(user.earningsAsStreamer || [])
      setSubscribers(user.subscriptionsAsStreamer || [])
    } catch (error) {
      enqueueSnackbar('Failed to fetch data', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Live Stream Dashboard</Title>
      <Text>
        Interact with your audience and track your earnings and new subscribers
        in real-time.
      </Text>
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24} md={12}>
          <Card
            title="Audience Comments"
            bordered={false}
            extra={<CommentOutlined />}
          >
            <List
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={comment => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={comment.user?.pictureUrl} />}
                    title={comment.user?.name}
                    description={comment.content}
                  />
                  <Text type="secondary">
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
                title="Real-Time Earnings"
                bordered={false}
                extra={<DollarCircleOutlined />}
              >
                <Statistic
                  value={earnings.reduce(
                    (total, earning) => total + (earning.amount || 0),
                    0,
                  )}
                  precision={2}
                  prefix="$"
                />
              </Card>
            </Col>
            <Col span={24}>
              <Card
                title="New Subscribers"
                bordered={false}
                extra={<UserAddOutlined />}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={subscribers}
                  renderItem={subscriber => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={subscriber.user?.pictureUrl} />}
                        title={subscriber.user?.name}
                      />
                      <Text type="secondary">
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
  )
}
