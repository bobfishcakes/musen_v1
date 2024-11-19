'use client'

import {
  CommentOutlined,
  DollarOutlined,
  HeartOutlined,
} from '@ant-design/icons'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  List,
  Row,
  Space,
  Typography,
} from 'antd'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

const { Title, Text: TypographyText } = Typography

interface GameInfo {
  id: string
  homeTeam: string
  awayTeam: string
  league: string
}

interface StreamerInfo {
  id: string
  name: string
  listeners: number
  description: string
}

interface PageInfo {
  game: GameInfo
  streamer: StreamerInfo
}

export default function UserStreamPage() {
  const router = useRouter()
  const params = useParams<any>()
  const searchParams = useSearchParams()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null)
  const [stream, setStream] = useState<Model.Stream | null>(null)
  const [comments, setComments] = useState<Model.Comment[]>([])
  const [newComment, setNewComment] = useState<string>('')
  const [donationAmount, setDonationAmount] = useState<number>(0)

  useEffect(() => {
    const infoParam = searchParams.get('info')
    if (infoParam) {
      const decodedInfo = JSON.parse(decodeURIComponent(infoParam))
      setPageInfo(decodedInfo)
    }
  }, [searchParams])

  useEffect(() => {
    const fetchStream = async () => {
      try {
        const streamData = await Api.Stream.findOne(params.streamId, {
          includes: ['streamer', 'comments.user'],
        })
        setStream(streamData)
        setComments(streamData.comments || [])
      } catch (error) {
        enqueueSnackbar('Failed to load stream data', { variant: 'error' })
      }
    }

    fetchStream()
  }, [params.streamId])

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return
    try {
      const comment = await Api.Comment.createOneByStreamId(params.streamId, {
        content: newComment,
        userId: userId,
        commentTime: new Date().toISOString(),
      })
      setComments([...comments, comment])
      setNewComment('')
    } catch (error) {
      enqueueSnackbar('Failed to post comment', { variant: 'error' })
    }
  }

  const handleDonationSubmit = async () => {
    if (donationAmount <= 0) return
    try {
      await Api.Donation.createOneByUserId(userId, {
        amount: donationAmount,
        donationTime: new Date().toISOString(),
        streamerId: stream?.streamerId,
      })
      enqueueSnackbar('Donation successful', { variant: 'success' })
      setDonationAmount(0)
    } catch (error) {
      enqueueSnackbar('Failed to donate', { variant: 'error' })
    }
  }

  const handleSubscribe = async () => {
    try {
      await Api.Subscription.createOneByUserId(userId, {
        startDate: new Date().toISOString(),
        streamerId: stream?.streamerId,
      })
      enqueueSnackbar('Subscription successful', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to subscribe', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      {pageInfo && (
        <div>
          <Title level={2}>
            {pageInfo.streamer.name} - {pageInfo.game.awayTeam} @{' '}
            {pageInfo.game.homeTeam}
          </Title>

          <TypographyText style={{ display: 'block', marginBottom: '16px' }}>
            Current Listeners: {pageInfo.streamer.listeners}
          </TypographyText>

          {/* Chat Section */}
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card>
                <List
                  className="chat-box"
                  style={{
                    height: '200px',
                    overflowY: 'auto',
                    marginBottom: '16px',
                  }}
                  dataSource={comments}
                  renderItem={comment => (
                    <List.Item key={comment.id}>
                      <List.Item.Meta
                        avatar={<Avatar src={comment.user?.pictureUrl} />}
                        title={comment.user?.name}
                        description={comment.content}
                      />
                    </List.Item>
                  )}
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <Input.TextArea
                    rows={2}
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Type your comment here..."
                  />
                  <Button
                    style={{
                      alignSelf: 'center',
                      backgroundColor: '#81A18B',
                      color: 'black',
                    }}
                    onClick={handleCommentSubmit}
                    icon={<CommentOutlined />}
                  >
                    Comment
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Support Cards Row */}
          <Row gutter={16} style={{ marginTop: '16px' }}>
            <Col span={12}>
              <Card title="Want to show support?">
                <Form layout="inline" onFinish={handleDonationSubmit}>
                  <Space>
                    <InputNumber
                      min={1}
                      value={donationAmount}
                      onChange={value => setDonationAmount(value ? value : 0)}
                      placeholder="Amount"
                    />
                    <Button
                      style={{ backgroundColor: '#81A18B', color: 'black' }}
                      htmlType="submit"
                      icon={<DollarOutlined />}
                    >
                      Donate
                    </Button>
                  </Space>
                </Form>
              </Card>
            </Col>

            <Col span={12}>
              <Card title="Want exclusive content?">
                <Button
                  style={{
                    width: '100%',
                    backgroundColor: '#81A18B',
                    color: 'black',
                  }}
                  icon={<HeartOutlined />}
                  onClick={handleSubscribe}
                >
                  Subscribe to {pageInfo.streamer.name}
                </Button>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </PageLayout>
  )
}
