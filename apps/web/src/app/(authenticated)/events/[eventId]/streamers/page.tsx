'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { List, Button, Typography } from 'antd'
import { Api, Model } from '@web/domain'

const { Title, Text } = Typography

export default function EventStreamersPage() {
  const [streams, setStreams] = useState<Model.Stream[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const eventId = 'selected-event-id' // Replace with actual event ID
        const streams = await Api.SportingEvent.findMany({
          filters: { id: eventId },
          includes: ['streams.streamer']
        })
        setStreams(streams[0].streams || [])
      } catch (error) {
        console.error('Failed to fetch streams:', error)
      }
    }

    fetchStreams()
  }, [])

  const dummyStreamers = [
    {
      id: '1',
      name: 'Streamer One',
      listeners: 120,
      duration: '2h 30m',
    },
    {
      id: '2',
      name: 'Streamer Two',
      listeners: 80,
      duration: '1h 45m',
    },
    {
      id: '3',
      name: 'Streamer Three',
      listeners: 150,
      duration: '3h 15m',
    },
  ]

  const handleListenNow = (streamerId: string) => {
    const eventId = 'selected-event-id' // Replace with actual event ID
    router.push(`/events/${eventId}/streamers/${streamerId}`)
  }

  return (
    <div>
      <Title level={2}>Streamers</Title>
      <List
        itemLayout="horizontal"
        dataSource={streams.length > 0 ? streams : dummyStreamers}
        renderItem={(item: any) => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => handleListenNow(item.id)}>
                Listen Now
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.streamer?.name || item.name}
              description={
                <>
                  <Text>Listeners: {item.listeners || 'N/A'}</Text>
                  <br />
                  <Text>Duration: {item.duration || 'N/A'}</Text>
                </>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
}
