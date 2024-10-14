export namespace StreamApplicationEvent {
  export namespace StreamCreated {
    export const key = 'stream.application.stream.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
