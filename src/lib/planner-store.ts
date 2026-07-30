// Simple localStorage-backed store for planner form state (auto-save).
export type QuickPlannerData = {
  destination?: string;
  departureCountry?: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  adults?: number;
  children?: number;
  budget?: string;
  travelStyle?: string[];
};

export type PlannerData = QuickPlannerData & {
  // basic
  fullName?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  // passengers
  travellingWithChildren?: boolean;
  childrenDetails?: { name: string; age: string }[];
  passengerNames?: string;
  nationality?: string;
  // destination
  multipleCountries?: string;
  flexibleDates?: boolean;
  // priorities
  travelStylePref?: string;
  budgetPriority?: string;
  accommodationComfort?: string;
  budgetFlexibility?: string;
  // transport
  departureCity?: string;
  preferredAirport?: string;
  transportToAirport?: boolean;
  parkingRequired?: boolean;
  transfersToHotel?: boolean;
  destinationTransport?: string[];
  luggage?: string;
  transportBudget?: string;
  transportRestrictions?: string;
  // accommodation
  accommodationTypes?: string[];
  locationPreference?: string[];
  meals?: string;
  budgetPerNight?: string;
  specialRequests?: string;
  bookingPreference?: string;
  // itinerary
  travelPace?: string;
  dailyStructure?: string;
  activities?: string[];
  specialExperiences?: string;
  mustSee?: string;
  avoidActivities?: string;
  travelVibe?: string[];
  importantGoal?: string;
  // support
  travelSupport?: string;
  acknowledged?: boolean;
};

const KEY = "viarra-planner-v1";

export function loadPlanner(): PlannerData {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PlannerData) : {};
  } catch {
    return {};
  }
}

export function savePlanner(data: PlannerData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function clearPlanner() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
