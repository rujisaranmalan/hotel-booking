"use client";
import { Hotel, RoomType } from "@/lib/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker, { registerLocale } from "react-datepicker";
import { enGB } from "date-fns/locale";
import { addDays, format as formatDate } from "date-fns";

registerLocale("en", enGB);

export default function BookNowForm({ hotel }: { hotel: Hotel }) {
	const router = useRouter();
	const [roomType, setRoomType] = useState<RoomType>("standard");
	const [checkIn, setCheckIn] = useState<Date | null>(null);
	const [checkOut, setCheckOut] = useState<Date | null>(null);
	const [guests, setGuests] = useState(1);

	function goReview(e: React.FormEvent) {
		e.preventDefault();
		if (!checkIn || !checkOut) return; // keep simple required behavior
		const params = new URLSearchParams({
			hotelId: hotel.id,
			roomType,
			checkIn: formatDate(checkIn, "yyyy-MM-dd"),
			checkOut: formatDate(checkOut, "yyyy-MM-dd"),
			guests: String(guests),
		});
		router.push(`/review?${params.toString()}`);
	}

  return (
		<form onSubmit={goReview} className="space-y-3 p-4 border rounded-2xl">
			<div>
				<label className="block text-sm mb-1">Room type</label>
				<select
					id="roomType"
					className="field roomtype-select w-full rounded-xl px-3 py-2"
					value={roomType}
					onChange={(e) => setRoomType(e.target.value as RoomType)}
				>
					{hotel.roomTypes.map(rt => (
						<option key={rt.code} value={rt.code}>
							{rt.label}
						</option>
					))}
				</select>
			</div>

			<div className="grid sm:grid-cols-2 gap-3">
				<div>
					<label className="block text-sm mb-1">Check-in</label>
					<DatePicker
						selected={checkIn}
						onChange={(d) => {
							setCheckIn(d);
							if (d) {
								const minOut = addDays(d, 1);
								if (!checkOut || (checkOut && checkOut <= d)) setCheckOut(minOut);
							}
						}}
						minDate={new Date()}
						dateFormat="dd/MM/yyyy"
						placeholderText="dd/mm/yyyy"
						locale="en"
						className="w-full border rounded-xl px-3 py-2"
					/>
				</div>
				<div>
					<label className="block text-sm mb-1">Check-out</label>
					<DatePicker
						selected={checkOut}
						onChange={(d) => {
							if (checkIn && d && d <= checkIn) {
								setCheckOut(addDays(checkIn, 1));
							} else {
								setCheckOut(d);
							}
						}}
						minDate={checkIn ? addDays(checkIn, 1) : addDays(new Date(), 1)}
						dateFormat="dd/MM/yyyy"
						placeholderText="dd/mm/yyyy"
						locale="en"
						className="w-full border rounded-xl px-3 py-2"
					/>
				</div>
			</div>

			<div>
				<label className="block text-sm mb-1">Guests</label>
				<input type="number" min={1} required className="w-full border rounded-xl px-3 py-2"
						value={guests} onChange={(e)=>setGuests(parseInt(e.target.value || "1"))}/>
			</div>

			<button className="w-full py-2 rounded-xl bg-black text-white">Book now</button>
		</form>
	);
}
