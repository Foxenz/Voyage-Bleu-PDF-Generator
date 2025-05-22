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
  totalAmount: number
  deposit: number
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

export type boardType =
  | 'null'
  | 'allInclusive'
  | 'breakfast'
  | 'halfBoard'
  | 'fullBoard'
  | 'selfCatering'

export const boardTypeTranslations: Record<boardType, string> = {
  null: 'Non spécifié',
  selfCatering: 'Logement seul',
  breakfast: 'Petit-déjeuner',
  halfBoard: 'Demi-pension',
  fullBoard: 'Pension complète',
  allInclusive: 'Tout inclus',
}
