import type { Bid } from './bid'

export interface Lot {
  id: number
  title: string
  description: string
  startPrice: number
  step: number
  isClosed: boolean
  bids: Bid[]
}