export const SportingEventApplicationEvent = {
  SportingEventCreated: {
    key: 'sportingEvent.application.sportingEvent.created',
  },
} as const

export interface SportingEventCreatedPayload {
  id: string
  userId: string
}
