'use client'

import {
  CommentOutlined,
  DollarOutlined,
  HeartOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  List,
  Row,
  Space,
  Typography,
} from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
const { Title, Paragraph } = Typography

export default function UserStreamPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [stream, setStream] = useState<Model.Stream | null>(null)
  const [comments, setComments] = useState<Model.Comment[]>([])
  const [newComment, setNewComment] = useState<string>('')
  const [donationAmount, setDonationAmount] = useState<number>(0)

  useEffect(() => {
    const fetchStream = async () => {
      try {
        const streams = await Api.Stream.findManyByStreamerId(
          params.streamerId,
          {
            includes: ['streamer', 'comments.user'],
          },
        )

        if (streams.length > 0) {
          setStream(streams[0])
          setComments(streams[0].comments || [])
        } else {
          const newStream = await Api.Stream.createOneBySportingEventId(
            params.eventId,
            {
              streamerId: params.streamerId,
              status: 'active',
            },
          )
          setStream(newStream)
          setComments([])
        }
      } catch (error) {
        enqueueSnackbar('Failed to load stream data', { variant: 'error' })
      }
    }

    fetchStream()
  }, [params.streamerId, params.eventId])

  const handleCommentSubmit = async () => {
    if (!newComment.trim() || !stream) {
      return
    }

    try {
      const comment = await Api.Comment.createOneByStreamId(stream.id, {
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
    if (donationAmount <= 0) {
      return
    }

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
      <Title level={2}>Live Stream</Title>
      <Paragraph>
        Follow the live sporting event and interact with the streamer and other
        listeners.
      </Paragraph>
      {stream && (
        <div>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={4}>{stream.streamer?.name}'s Stream</Title>
              <Space>
                <Button type="primary" icon={<PlayCircleOutlined />}>
                  Listen to Stream
                </Button>
                <Button
                  type="default"
                  icon={<HeartOutlined />}
                  onClick={handleSubscribe}
                >
                  Subscribe
                </Button>
              </Space>
            </Col>
            <Col span={24}>
              <Title level={5}>
                Game Time Remaining: {stream.gameTimeRemaining}
              </Title>
            </Col>
            <Col span={24}>
              <Title level={5}>Donate to Support</Title>
              <Form layout="inline" onFinish={handleDonationSubmit}>
                <Form.Item>
                  <InputNumber
                    min={1}
                    value={donationAmount}
                    onChange={value => setDonationAmount(value ? value : 0)}
                    placeholder="Amount"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<DollarOutlined />}
                  >
                    Donate
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col span={24}>
              <Title level={5}>Live Chat</Title>
              <List
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
              <Input.TextArea
                rows={4}
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Type your comment here..."
              />
              <Button
                type="primary"
                onClick={handleCommentSubmit}
                icon={<CommentOutlined />}
              >
                Comment
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </PageLayout>
  )
}
