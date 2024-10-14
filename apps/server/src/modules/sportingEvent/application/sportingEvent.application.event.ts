export namespace SportingEventApplicationEvent {
  export namespace SportingEventCreated {
    export const key = 'sportingEvent.application.sportingEvent.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
