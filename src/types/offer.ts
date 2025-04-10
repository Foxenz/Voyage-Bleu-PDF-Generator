export interface Offer {
  destination: string
  agentId: string
  dateStart: string
  dateEnd: string
  adults: number
  children: string[]
  departureFlight: {
    departure: string
    arrival: string
    baggage: string
    company: string
  }
  returnFlight: {
    departure: string
    arrival: string
    baggage: string
    company: string
  }
  hotels: {
    name: string
    roomType: string
    nights: number
    halfBoard: boolean
    image?: File | null
    imageUrl?: string
  }[]
  totalAmount: string
  deposit: string
  reference: string
}
