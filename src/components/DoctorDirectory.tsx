
import { useState } from "react";
import { doctors, specialties, Doctor } from "@/mock/doctors";
import FilterBar from "./FilterBar";
import DoctorCard from "./DoctorCard";
import BookingModal from "./BookingModal";
import DoctorDetailModal from "./DoctorDetailModal";
import { useBookingStore } from "@/hooks/useBookingStore";

const DoctorDirectory = () => {
  const [specialty, setSpecialty] = useState("All");
  const [modalDoctor, setModalDoctor] = useState<Doctor | null>(null);
  const [detailDoctor, setDetailDoctor] = useState<Doctor | null>(null);

  const { bookedAppointments } = useBookingStore();
  // Collect all slots booked by the user
  const bookedSlotsByDoctor: Record<string, string[]> = {};
  bookedAppointments.forEach((appt) => {
    if (!bookedSlotsByDoctor[appt.doctor.id]) bookedSlotsByDoctor[appt.doctor.id] = [];
    bookedSlotsByDoctor[appt.doctor.id].push(appt.slot);
  });

  const filtered = doctors.filter(
    (doc) =>
      (specialty === "All" || doc.specialty === specialty)
  );

  return (
    <section aria-label="Doctor Directory" className="max-w-3xl mx-auto px-2">
      <h2 className="text-3xl font-bold mb-2 text-violet-900">Find a Doctor</h2>
      <FilterBar selectedSpecialty={specialty} onSpecialtyChange={setSpecialty} />

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {filtered.length > 0 ? (
          filtered.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBook={() => setModalDoctor(doctor)}
              onShowDetail={() => setDetailDoctor(doctor)}
              bookedSlots={bookedSlotsByDoctor[doctor.id] || []}
            />
          ))
        ) : (
          <p className="text-gray-500 italic">No doctors found for this specialty.</p>
        )}
      </div>

      <BookingModal
        doctor={modalDoctor}
        onClose={() => setModalDoctor(null)}
        bookedSlots={modalDoctor ? bookedSlotsByDoctor[modalDoctor.id] || [] : []}
      />
      {/* Pass bookedSlots to the detail modal for consistent UX */}
      <DoctorDetailModal
        doctor={detailDoctor}
        onClose={() => setDetailDoctor(null)}
        bookedSlots={detailDoctor ? bookedSlotsByDoctor[detailDoctor.id] || [] : []}
      />
    </section>
  );
};

export default DoctorDirectory;
