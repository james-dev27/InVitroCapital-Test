
import { Doctor } from "@/mock/doctors";
import { Star, MapPin, Clock } from "lucide-react";

type Props = {
  doctor: Doctor;
  onBook: () => void;
  onShowDetail?: () => void;
  bookedSlots: string[];
};

const DoctorCard = ({ doctor, onBook, onShowDetail, bookedSlots }: Props) => (
  <article
    className="group bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition focus-within:ring-2 focus-within:ring-primary cursor-pointer"
    tabIndex={0}
    role="region"
    aria-label={`Doctor ${doctor.name}`}
    onClick={(e) => {
      // Prevent opening detail when clicking the Book button
      if (
        (e.target as HTMLElement).closest("button") &&
        (e.target as HTMLElement).closest("button")?.getAttribute("aria-label")?.startsWith("Book")
      ) {
        return;
      }
      onShowDetail?.();
    }}
    onKeyDown={(e) => {
      // Make card keyboard accessible for opening detail
      if (e.key === "Enter" && onShowDetail) {
        onShowDetail();
      }
    }}
  >
    <div className="flex gap-4 items-center">
      <img
        src={doctor.photo}
        alt={`Portrait of ${doctor.name}`}
        className="rounded-full w-16 h-16 object-cover border-2 border-primary"
        width={64}
        height={64}
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-xl text-violet-800">{doctor.name}</h3>
        <p className="text-sm text-gray-600">{doctor.specialty}</p>
        <div className="flex items-center gap-1 mt-1 text-yellow-500" aria-label={`Rating ${doctor.rating} out of 5`}>
          <Star size={16} fill="currentColor" strokeWidth={0} aria-hidden="true" />
          <span className="font-medium">{doctor.rating}</span>
        </div>
        <div className="flex items-center gap-1 mt-1 text-gray-700">
          <MapPin size={16} className="mr-1" aria-hidden="true" />
          <span>{doctor.location}</span>
        </div>
        <div className="flex items-center gap-1 mt-1 text-green-700">
          <Clock size={16} className="mr-1" aria-hidden="true" />
          <span>
            {doctor.availability.join(", ")}
          </span>
        </div>
        {/* Show all slots, mark the ones that are already booked */}
        <div className="mt-3">
          <span className="block text-xs font-semibold text-gray-600 mb-1">Available Slots:</span>
          <ul className="flex flex-wrap gap-2">
            {doctor.slots.map(slot => {
              const isBooked = bookedSlots.includes(slot);
              return (
                <li key={slot}>
                  <button
                    disabled
                    className={`px-2 py-1 text-xs rounded border
                      ${isBooked
                        ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-green-100 text-green-800 border-green-200"}
                    `}
                    aria-disabled={isBooked}
                    title={isBooked ? "You already booked this slot" : "Available slot"}
                  >
                    {new Date(slot).toLocaleString("en-US", {
                      weekday: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                      month: "short",
                      day: "numeric",
                    })}
                    {isBooked && <span className="ml-2 text-red-400">(Already booked)</span>}
                  </button>
                </li>
              );
            })}
            {doctor.slots.length === 0 && (
              <li>
                <span className="text-gray-400 italic">No time slots</span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <button
        className="ml-4 px-4 py-2 bg-violet-600 text-white rounded-lg shadow hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition"
        onClick={(e) => {
          e.stopPropagation();
          onBook();
        }}
        aria-label={`Book appointment with ${doctor.name}`}
        tabIndex={0}
      >
        Book
      </button>
    </div>
  </article>
);

export default DoctorCard;
