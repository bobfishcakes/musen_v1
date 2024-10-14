export namespace DonationApplicationEvent {
  export namespace DonationCreated {
    export const key = 'donation.application.donation.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
