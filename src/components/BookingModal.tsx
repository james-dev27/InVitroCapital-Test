
import { useEffect, useRef, useState } from "react";
import { Doctor } from "@/mock/doctors";
import { useBookingStore } from "@/hooks/useBookingStore";
import { X, Check, Clock } from "lucide-react";

interface Props {
  doctor: Doctor | null;
  onClose: () => void;
  bookedSlots: string[];
}

const BookingModal = ({ doctor, onClose, bookedSlots }: Props) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const { book } = useBookingStore();
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Accessibility: close on ESC
  useEffect(() => {
    if (!doctor) return;
    setSelectedSlot(null);
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [doctor, onClose]);

  // Trap focus
  useEffect(() => {
    if (!doctor || !modalRef.current) return;
    const modal = modalRef.current;
    const focusable = modal.querySelectorAll<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );
    if (focusable.length) (focusable[0] as HTMLElement).focus();
  }, [doctor]);

  if (!doctor) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      aria-describedby="modalDesc"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition"
      tabIndex={-1}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl p-6 shadow-lg w-[95vw] max-w-md mx-auto outline-none"
        tabIndex={0}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 id="modalTitle" className="text-2xl font-bold text-violet-800">
            Book with {doctor.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500"
            aria-label="Close booking modal"
          >
            <X size={22} />
          </button>
        </div>
        <div className="mb-5 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">{doctor.specialty}</span>
            <span className="text-gray-500 text-xs">| {doctor.location}</span>
          </div>
          <div className="flex items-center gap-1 text-green-800">
            <Clock size={18} className="mr-1" aria-hidden="true" />
            <span>{doctor.availability.join(", ")}</span>
          </div>
        </div>
        <div id="modalDesc" className="mb-4">
          <span className="font-medium text-gray-700 block mb-1">Available Time Slots</span>
          <ul className="grid gap-2">
            {doctor.slots
              .filter((slot) => !bookedSlots.includes(slot))
              .map((slot) => (
              <li key={slot}>
                <button
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg border 
                    ${selectedSlot === slot
                      ? "bg-violet-600 text-white border-violet-700"
                      : "bg-gray-50 hover:bg-violet-50 text-gray-800 border-gray-200"}
                    focus:outline-none focus:ring-2 focus:ring-violet-400`}
                  aria-pressed={selectedSlot === slot}
                  aria-label={`Choose time ${new Date(slot).toLocaleString("en-US", {
                    weekday: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                    month: "short",
                    day: "numeric",
                  })}`}
                >
                  <Clock size={16} />
                  {new Date(slot).toLocaleString("en-US", {
                    weekday: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                    month: "short",
                    day: "numeric",
                  })}
                  {selectedSlot === slot && <Check size={18} className="ml-auto" />}
                </button>
              </li>
            ))}
            {doctor.slots.filter((slot) => bookedSlots.includes(slot)).length === doctor.slots.length && (
              <li>
                <span className="text-gray-400 italic">All slots booked</span>
              </li>
            )}
          </ul>
        </div>
        <button
          className={`mt-2 w-full px-4 py-2 rounded-lg font-semibold transition
            ${
              selectedSlot
                ? "bg-violet-700 hover:bg-violet-800 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }
            focus:outline-none focus:ring-2 focus:ring-violet-500`}
          onClick={() => {
            if (selectedSlot) {
              book(doctor, selectedSlot);
              onClose();
            }
          }}
          disabled={!selectedSlot}
          aria-disabled={!selectedSlot}
          aria-label="Confirm appointment booking"
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
