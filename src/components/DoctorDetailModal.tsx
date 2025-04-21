
import { Doctor } from "@/mock/doctors";
import { X, Clock } from "lucide-react";

type Props = {
  doctor: Doctor | null;
  onClose: () => void;
  bookedSlots?: string[];
};

const DoctorDetailModal = ({ doctor, onClose, bookedSlots = [] }: Props) => {
  if (!doctor) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="doctorDetailTitle"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition"
      tabIndex={-1}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl p-6 shadow-lg w-[95vw] max-w-md mx-auto outline-none relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-red-500 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500"
          aria-label="Close details modal"
        >
          <X size={22} />
        </button>
        <div className="flex flex-col items-center mb-4">
          <img
            src={doctor.photo}
            alt={`Portrait of ${doctor.name}`}
            className="rounded-full w-24 h-24 object-cover border-2 border-primary mb-3"
            width={96}
            height={96}
          />
          <h3
            id="doctorDetailTitle"
            className="text-2xl font-bold text-violet-800 mb-1"
          >
            {doctor.name}
          </h3>
          <div className="text-sm font-medium text-gray-600 mb-1">{doctor.specialty}</div>
          <div className="text-gray-500 text-xs">{doctor.location}</div>
        </div>
        <div className="mb-2">
          <span className="font-semibold text-gray-700">Availability: </span>
          <span className="text-green-700">{doctor.availability.join(", ")}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Upcoming Slots: </span>
          <ul className="list-none text-gray-800 mt-1 space-y-2">
            {doctor.slots.length > 0 ? doctor.slots.map((slot) => {
              const isBooked = bookedSlots.includes(slot);
              return (
                <li key={slot} className="flex items-center gap-2">
                  <Clock size={16} className={isBooked ? "text-gray-400" : "text-green-700"} />
                  <span className={isBooked ? "text-gray-400 line-through" : ""}>
                    {new Date(slot).toLocaleString("en-US", {
                      weekday: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  {isBooked && <span className="ml-1 px-2 py-0.5 rounded bg-gray-200 text-xs text-red-500">Already booked</span>}
                </li>
              );
            }) : (
              <li><span className="text-gray-400 italic">No time slots</span></li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailModal;
