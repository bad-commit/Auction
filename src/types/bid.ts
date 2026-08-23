export interface Bid {
  id: number | null
  lotId: number
  user: string
  amount: number
  timestamp: number | string | null
}