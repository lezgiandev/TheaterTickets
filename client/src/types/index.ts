export interface User {
  id: number
  username: string
}

export interface Theatre {
  id: number
  name: string
  address: string
  capacity: string
}

export interface Genre {
  id: number
  name: string
}

export interface Session {
  id: number
  title: string
  picture: string
  theatre: Theatre
  genre: Genre
  description: string
  date_time: string
  duration: string
  price: number
}

export interface Seat {
  id: number
  theatre: Theatre
  row: number
  number: number
}

export interface SeatResponse {
  id: number
  row: number
  number: number
  is_available: boolean
}

export interface Booking {
  id: number
  user: User | number
  session: Session
  seat: Seat
  booking_date: string
  is_paid: boolean
}
