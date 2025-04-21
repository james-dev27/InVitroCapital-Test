
// Doctor Booking UI Homepage

import DoctorDirectory from "@/components/DoctorDirectory";
import AppointmentsSummary from "@/components/AppointmentsSummary";

const Index = () => {
  return (
    <main className="bg-gray-100 min-h-screen py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-violet-700 drop-shadow mb-2">Book Your Doctor</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Find the best healthcare professionals and book your appointment in a few clicks. Accessible, responsive, and easy to use.
        </p>
      </header>
      <DoctorDirectory />
      <AppointmentsSummary />
      <footer className="text-center text-gray-400 py-8 mt-10 text-xs">
        © {new Date().getFullYear()} Doctor Booking UI – Demo only
      </footer>
    </main>
  );
};

export default Index;
