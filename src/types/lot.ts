import type { Bid } from './bid'
import type { UploadFile } from 'element-plus'

export interface Lot {
  id: number
  title: string
  description: string
  startPrice: number
  photo: UploadFile[]
  isClosed: boolean
  bids: Bid[]
}