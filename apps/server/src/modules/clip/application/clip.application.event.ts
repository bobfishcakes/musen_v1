export namespace ClipApplicationEvent {
  export namespace ClipCreated {
    export const key = 'clip.application.clip.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
