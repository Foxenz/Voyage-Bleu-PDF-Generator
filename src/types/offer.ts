export interface Offer {
  destination: string
  agentId: string
  dateStart: string
  dateEnd: string
  adults: number
  children: string[]
  departureFlight: Flight
  returnFlight: Flight
  hotels: Hotel[]
  totalAmount: string
  deposit: string
}

interface Flight {
  departure: string
  arrival: string
  baggage: string
  company: string
}

interface Hotel {
  name: string
  roomType: string
  nights: number
  halfBoard: boolean
  image?: File | null
  imageUrl?: string
}
