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
  Typography
} from 'antd'
import { UserStatus } from 'apps/web/src/domain/user/user.model'
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

const buttonStyle = {
  backgroundColor: '#3e3e3e',
  color: 'white',
  border: 'none',
  transition: 'background-color 0.2s ease',
};

const buttonHoverStyle = `
  .ant-btn:hover {
    background-color: #3A5241 !important;
    border-color: #3A5241 !important;
    color: white !important;
  }
`;

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

const initialComments: Model.Comment[] = [
  {
    id: 'dummy1',
    content:
      "Home team's defense is looking solid tonight. Spread might be too wide.",
    user: {
      id: 'bot1',
      name: 'oldhead563',
      pictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=expert',
      status: 'VERIFIED' as UserStatus,
      dateCreated: new Date(Date.now() - 300000).toISOString(),
      dateUpdated: new Date(Date.now() - 300000).toISOString(),
    },
    commentTime: new Date(Date.now() - 300000).toISOString(),
    dateCreated: new Date(Date.now() - 300000).toISOString(),
    dateUpdated: new Date(Date.now() - 300000).toISOString(),
    dateDeleted: new Date(Date.now() - 300000).toISOString(),
    streamId: 'dummy-stream-1',
    userId: 'bot1',
  },
  {
    id: 'dummy2',
    content: 'Line just moved to -3.5. Sharp money coming in...',
    user: {
      id: 'bot2',
      name: 'bullslover23',
      pictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=watcher',
      status: 'VERIFIED' as UserStatus,
      dateCreated: new Date(Date.now() - 240000).toISOString(),
      dateUpdated: new Date(Date.now() - 240000).toISOString(),
    },
    commentTime: new Date(Date.now() - 240000).toISOString(),
    dateCreated: new Date(Date.now() - 240000).toISOString(),
    dateUpdated: new Date(Date.now() - 240000).toISOString(),
    dateDeleted: new Date(Date.now() - 240000).toISOString(),
    streamId: 'dummy-stream-1',
    userId: 'bot2',
  },
  {
    id: 'dummy3',
    content: 'Over/Under set at 47.5. Weather looks good for scoring.',
    user: {
      id: 'bot3',
      name: 'marissa87',
      pictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pro',
      status: 'VERIFIED' as UserStatus,
      dateCreated: new Date(Date.now() - 180000).toISOString(),
      dateUpdated: new Date(Date.now() - 180000).toISOString(),
    },
    commentTime: new Date(Date.now() - 180000).toISOString(),
    dateCreated: new Date(Date.now() - 180000).toISOString(),
    dateUpdated: new Date(Date.now() - 180000).toISOString(),
    dateDeleted: new Date(Date.now() - 180000).toISOString(),
    streamId: 'dummy-stream-1',
    userId: 'bot3',
  },
  {
    id: 'dummy4',
    content: 'Lavine just cleared to play - this changes everything!',
    user: {
      id: 'bot4',
      name: 'kfreeman23',
      pictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=insider',
      status: 'VERIFIED' as UserStatus,
      dateCreated: new Date(Date.now() - 120000).toISOString(),
      dateUpdated: new Date(Date.now() - 120000).toISOString(),
    },
    commentTime: new Date(Date.now() - 120000).toISOString(),
    dateCreated: new Date(Date.now() - 120000).toISOString(),
    dateUpdated: new Date(Date.now() - 120000).toISOString(),
    dateDeleted: new Date(Date.now() - 120000).toISOString(),
    streamId: 'dummy-stream-1',
    userId: 'bot4',
  },
]

export default function UserStreamPage() {
  const router = useRouter()
  const params = useParams<any>()
  const searchParams = useSearchParams()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null)
  const [stream, setStream] = useState<Model.Stream | null>(null)
  const [comments, setComments] = useState<Model.Comment[]>(initialComments)
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
        setComments([...initialComments, ...(streamData.comments || [])])
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

  // ... (previous imports and code remain the same)

  return (
    <PageLayout layout="narrow">
      <style jsx global>{buttonHoverStyle}</style>
      {pageInfo && (
        <div>
          <Title level={2}>
            {pageInfo.streamer.name} - {pageInfo.game.awayTeam} @ {pageInfo.game.homeTeam}
          </Title>
  
          <TypographyText style={{ display: 'block', marginBottom: '16px' }}>
            Current Listeners: {pageInfo.streamer.listeners}
          </TypographyText>
  
          <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card style={cardStyle}>
              <List
                className="chat-box"
                style={{
                  height: '400px',
                  overflowY: 'auto',
                  marginBottom: '16px',
                }}
                dataSource={comments} // This keeps your dummy comments
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Input.TextArea
                  rows={2}
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="Type your comment here..."
                  style={{ borderRadius: '4px' }}
                />
                <Button
                  style={{...buttonStyle, alignSelf: 'center'}}
                  onClick={handleCommentSubmit}
                  icon={<CommentOutlined style={{ color: 'white' }} />}
                >
                  Comment
                </Button>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: '16px' }}>
          <Col span={12}>
            <Card title="Want to show support?" style={cardStyle}>
              <Form layout="inline" onFinish={handleDonationSubmit}>
                <Space>
                  <InputNumber
                    min={1}
                    value={donationAmount}
                    onChange={value => setDonationAmount(value ? value : 0)}
                    placeholder="Amount"
                  />
                  <Button
                    style={buttonStyle}
                    htmlType="submit"
                    icon={<DollarOutlined style={{ color: 'white' }} />}
                  >
                    Donate
                  </Button>
                </Space>
              </Form>
            </Card>
          </Col>

          <Col span={12}>
            <Card title="Want exclusive content?" style={cardStyle}>
              <Button
                style={{...buttonStyle, width: '100%'}}
                icon={<HeartOutlined style={{ color: 'white' }} />}
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
  );
}
