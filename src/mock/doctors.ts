
export type Doctor = {
  id: string;
  name: string;
  photo: string;
  specialty: string;
  rating: number;
  availability: string[]; // days
  location: string;
  slots: string[]; // mocked slots in ISO time string
};

export const specialties = [
  "All",
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "General Medicine",
  "Psychiatry",
  "Orthopedics",
];

export const doctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Lena Patel",
    photo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=facearea&w=200&h=200",
    specialty: "Cardiology",
    rating: 4.9,
    availability: ["Mon", "Wed", "Fri"],
    location: "Downtown Medical Center",
    slots: [
      "2025-04-22T09:00",
      "2025-04-22T10:00",
      "2025-04-24T14:00",
    ],
  },
  {
    id: "d2",
    name: "Dr. Fiona Chen",
    photo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=facearea&w=200&h=200",
    specialty: "Dermatology",
    rating: 4.7,
    availability: ["Tue", "Thu"],
    location: "Riverfront Clinic",
    slots: [
      "2025-04-23T13:00",
      "2025-04-23T14:30",
    ],
  },
  {
    id: "d3",
    name: "Dr. Mateo Rossi",
    photo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=facearea&w=200&h=200",
    specialty: "Pediatrics",
    rating: 4.8,
    availability: ["Mon", "Tue", "Fri"],
    location: "Green Desk Health",
    slots: [
      "2025-04-22T11:00",
      "2025-04-25T10:30",
    ],
  },
  {
    id: "d4",
    name: "Dr. Ayesha Singh",
    photo: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=facearea&w=200&h=200",
    specialty: "General Medicine",
    rating: 4.6,
    availability: ["Mon", "Thu", "Sat"],
    location: "Westside Family Care",
    slots: [
      "2025-04-24T16:00",
      "2025-04-26T09:30",
    ],
  },
  {
    id: "d5",
    name: "Dr. Noel Okafor",
    photo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=facearea&w=200&h=200",
    specialty: "Psychiatry",
    rating: 4.9,
    availability: ["Wed", "Fri"],
    location: "Bright Minds Center",
    slots: [
      "2025-04-22T15:00",
      "2025-04-29T12:00",
    ],
  },
];
