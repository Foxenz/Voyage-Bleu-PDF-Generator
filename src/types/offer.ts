export interface Offer {
  destination: string
  agentId: string
  dateStart: string
  dateEnd: string
  adults: number
  children: string[]
  departureFlights: Flight[]
  returnFlights: Flight[]
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
  boardType: boardType
  image?: File | null
  imageUrl?: string
}

export type boardType = 'allInclusive' | 'breakfast' | 'halfBoard' | 'fullBoard' | 'selfCatering'

export const boardTypeTranslations: Record<boardType, string> = {
  selfCatering: 'Logement seul',
  breakfast: 'Petit-déjeuner',
  halfBoard: 'Demi-pension',
  fullBoard: 'Pension complète',
  allInclusive: 'Tout inclus',
}
