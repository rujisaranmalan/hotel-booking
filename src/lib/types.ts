export type RoomType = 'standard' | 'deluxe' | 'suite';

export interface Room {
  code: RoomType;
  label: string;
  baseRatePerNight: number; // THB
}

export interface Hotel {
  id: string;
  name: string;
  location: string;  // city/area
  thumbnail: string;
  rating: number;    // 0-5
  roomTypes: Room[];
}

export interface PricingInput {
  roomType: RoomType;
  days: number;
}

export interface PricingResult {
  subtotal: number;  // before VAT
  vat: number;       // 7%
  total: number;
}

export type Booking = {
  id: string;                 // unique booking id
  hotelId: string;
  hotelName: string;
  location: string;
  thumbnail?: string;
  roomType: string;           // "standard" | "deluxe" | "suite"
  checkIn: string;            // date (yyyy-mm-dd)
  checkOut: string;           // date
  guests: number;
  totalTHB: number;
  method: string;             // payment method used
  createdAt: string;          // timestamp
};