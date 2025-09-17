export interface Movie {
  _id: string;
  title: string;
  description: string;
  genre: string[];
  duration: number;
  rating: number;
  movieLanguage: string;
  poster: string;
  releaseDate: Date;
  cast: string[];
  director: string;
}

export interface Show {
  _id: string;
  movieId: string;
  theater: string;
  screen: string;
  startTime: Date;
  endTime: Date;
  price: number;
  totalSeats: number;
  bookedSeats: number;
}

export interface SeatStatus {
  seatId: string;
  status: 'available' | 'booked' | 'locked';
  lockedBy?: string;
  lockedUntil?: Date;
}

export interface Booking {
  _id: string;
  userId: string;
  showId: string;
  movieTitle: string;
  theater: string;
  screen: string;
  showTime: Date;
  seats: string[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod?: 'cash' | 'online';
  paymentId?: string;
  bookingDate: Date;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
}
