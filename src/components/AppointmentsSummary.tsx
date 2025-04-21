
import { useBookingStore } from "@/hooks/useBookingStore";
import { CalendarCheck, MapPin, X } from "lucide-react";

const AppointmentsSummary = () => {
  const { bookedAppointments, cancel } = useBookingStore();

  if (bookedAppointments.length === 0) {
    return (
      <section
        className="max-w-3xl mx-auto px-2 py-8 mt-6 bg-white rounded-xl shadow transition"
        aria-label="Appointments summary"
      >
        <h2 className="text-2xl font-bold mb-3 text-violet-900">My Appointments</h2>
        <p className="italic text-gray-500">You have no booked appointments.</p>
      </section>
    );
  }

  return (
    <section
      className="max-w-3xl mx-auto px-2 py-8 mt-6 bg-white rounded-xl shadow transition"
      aria-label="Appointments summary"
    >
      <h2 className="text-2xl font-bold mb-3 text-violet-900">My Appointments</h2>
      <ul>
        {bookedAppointments.map(({ doctor, slot }, idx) => (
          <li
            key={doctor.id + slot + idx}
            className="border-b last:border-b-0 py-4 flex gap-4 items-center group"
            tabIndex={0}
            aria-label={`Appointment with ${doctor.name} on ${new Date(slot).toLocaleString()}`}
          >
            <img
              src={doctor.photo}
              alt={`Photo of ${doctor.name}`}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary"
              width={48}
              height={48}
            />
            <div className="flex-1">
              <div className="font-bold text-violet-800">{doctor.name}</div>
              <div className="text-gray-600 text-sm">{doctor.specialty}</div>
              <div className="flex items-center gap-2 text-gray-700">
                <CalendarCheck size={16} aria-hidden="true" />
                <span>
                  {new Date(slot).toLocaleString("en-US", {
                    weekday: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin size={16} aria-hidden="true" />
                <span>{doctor.location}</span>
              </div>
            </div>
            <button
              type="button"
              className="ml-2 p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Cancel appointment"
              title="Cancel appointment"
              onClick={() => cancel(doctor.id, slot)}
            >
              <X size={18} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AppointmentsSummary;
