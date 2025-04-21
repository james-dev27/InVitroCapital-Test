
import { specialties } from "@/mock/doctors";
import { ChevronDown } from "lucide-react";

type Props = {
  selectedSpecialty: string;
  onSpecialtyChange: (value: string) => void;
};

const FilterBar = ({
  selectedSpecialty,
  onSpecialtyChange,
}: Props) => {
  return (
    <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
      <label className="block">
        <span className="mr-2 font-semibold text-gray-700">Specialty</span>
        <div className="relative inline-block">
          <select
            aria-label="Filter by doctor specialty"
            className="appearance-none rounded-lg px-4 py-2 bg-white border border-gray-300 shadow-sm focus:ring-2 focus:ring-violet-400 focus:outline-none pr-8 cursor-pointer"
            value={selectedSpecialty}
            onChange={(e) => onSpecialtyChange(e.target.value)}
          >
            {specialties.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={20}
            aria-hidden="true"
          />
        </div>
      </label>
    </div>
  );
};

export default FilterBar;
