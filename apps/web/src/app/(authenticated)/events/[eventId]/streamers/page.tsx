'use client'

import { Api, Model } from '@web/domain'
import { Button, Card, List, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const { Title, Text } = Typography

export default function EventStreamersPage() {
  const [streams, setStreams] = useState<Model.Stream[]>([])
  const [eventName, setEventName] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const fetchEventAndStreams = async () => {
      try {
        const eventId = 'selected-event-id' // Replace with actual event ID
        const events = await Api.SportingEvent.findMany({
          filters: { id: eventId },
          includes: ['streams.streamer'],
        })
        if (events.length > 0) {
          const event = events[0]
          setEventName(event.name || '')
          setStreams(event.streams || [])
        }
      } catch (error) {
        console.error('Failed to fetch event and streams:', error)
      }
    }

    fetchEventAndStreams()
  }, [])

  const dummyStreamers = [
    {
      id: '1',
      name: 'Emily Jones',
      listeners: 120,
      description:
        'Let me teach you how the game is played with pop culture references!',
    },
    {
      id: '2',
      name: 'John Doe',
      listeners: 80,
      description:
        'I hit my 5 last parlays - make another $1000 with me this game',
    },
    {
      id: '3',
      name: 'José Ramirez',
      listeners: 150,
      description: '¡Qué divertido! Veamos a los Chiefs ganar juntos',
    },
  ]

  const handleListenNow = (streamerId: string) => {
    const eventId = 'selected-event-id' // Replace with actual event ID
    router.push(`/events/${eventId}/streamers/${streamerId}`)
  }

  return (
    <div
      style={{
        padding: '20px',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <Title level={2} style={{ fontSize: '50px' }}>
        Live Commentators for Super Bowl LIII {eventName}
      </Title>
      <Card style={{ backgroundColor: '#81A18B' }} bordered={false}>
        <List
          itemLayout="horizontal"
          dataSource={streams.length > 0 ? streams : dummyStreamers}
          renderItem={(item: any) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  onClick={() => handleListenNow(item.id)}
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: '25px',
                    padding: '12px 24px',
                    height: 'auto',
                  }}
                >
                  Listen Now
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  <Text strong style={{ fontSize: '30px' }}>
                    {item.streamer?.name || item.name}
                    <br></br>
                  </Text>
                }
                description={
                  <div style={{ fontSize: '20px' }}>
                    <Text>{item.description || 'N/A'}</Text>
                    <br></br>
                    <br></br>

                    <Text style={{ fontSize: '18px', fontStyle: 'italic' }}>
                      Listeners: {item.listeners || 'N/A'}
                    </Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}
