import type { Bid } from './bid'
import type { UploadFile } from 'element-plus'

export interface Lot {
  id: number
  title: string
  yearManufacture: number | null
  description: string
  startPrice: number
  step: number
  drive: string
  engineType: string
  engineDisplacement: number | null
  power: number | null
  mileage: number | null
  photo: UploadFile[]
  photoBase64: string[]
  isClosed: boolean
  bids: Bid[]
}