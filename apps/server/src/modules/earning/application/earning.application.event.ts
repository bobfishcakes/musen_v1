export namespace EarningApplicationEvent {
  export namespace EarningCreated {
    export const key = 'earning.application.earning.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
