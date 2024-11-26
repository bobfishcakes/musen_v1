'use client'

import { Button, Card, List, Typography } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const { Title, Text } = Typography

interface GameInfo {
  id: string
  homeTeam: string
  awayTeam: string
  league: string
}

interface Streamer {
  id: string
  name: string
  listeners: number
  description: string
}

export default function EventStreamersPage() {
  const [streams, setStreams] = useState<any[]>([])
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const teamsParam = searchParams.get('teams')
    if (teamsParam) {
      const decodedGameInfo = JSON.parse(decodeURIComponent(teamsParam))
      setGameInfo(decodedGameInfo)
    }
  }, [searchParams])

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

  const handleListenNow = (streamer: Streamer) => {
    if (gameInfo) {
      const pageInfo = {
        game: gameInfo,
        streamer: {
          id: streamer.id,
          name: streamer.name,
          listeners: streamer.listeners,
          description: streamer.description,
        },
      }

      router.push(
        `/events/${gameInfo.id}/streamers/${streamer.id}?info=${encodeURIComponent(
          JSON.stringify(pageInfo),
        )}`,
      )
    }
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
      <Card
        style={{ backgroundColor: '#3A5241', marginBottom: '20px' }}
        bordered={false}
      >
        <Title
          level={2}
          style={{ fontSize: '45px', margin: 0, color: 'white' }}
        >
          {gameInfo
            ? `${gameInfo.awayTeam} @ ${gameInfo.homeTeam}`
            : 'Loading...'}{' '}
          - who's live?
        </Title>
      </Card>
      <Card style={{ backgroundColor: '#3A5241' }} bordered={false}>
        <List
          itemLayout="horizontal"
          dataSource={streams.length > 0 ? streams : dummyStreamers}
          renderItem={(item: any) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  onClick={() => handleListenNow(item)}
                  style={{
                    backgroundColor: '#3A5241',
                    borderColor: '#3A5241',
                    color: 'white',
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
                    <br />
                  </Text>
                }
                description={
                  <div style={{ fontSize: '20px' }}>
                    <Text style={{ color: '#BAE0C0' }}>
                      {item.description || 'N/A'}
                    </Text>
                    <br />
                    <br />
                    <Text
                      style={{
                        fontSize: '18px',
                        fontStyle: 'italic',
                        color: '#BAE0C0',
                      }}
                    >
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
