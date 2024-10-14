export namespace SubscriptionApplicationEvent {
  export namespace SubscriptionCreated {
    export const key = 'subscription.application.subscription.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
