export enum Availability {
  Weekdays = "Weekdays",
  Weekends = "Weekends",
  Evenings = "Evenings",
  Flexible = "Flexible",
}

export enum SwapStatus {
  Pending = "Pending",
  Accepted = "Accepted",
  Rejected = "Rejected",
  Cancelled = "Cancelled",
}

export interface Skill {
  id: string;
  name: string;
}

export interface Feedback {
  id: string;
  fromUserName: string;
  fromUserPhotoUrl: string;
  rating: number;
  comment: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Made optional so we don't pass it around everywhere
  location?: string;
  profilePhotoUrl: string;
  skillsOffered: Skill[];
  skillsWanted: Skill[];
  availability: Availability;
  isProfilePublic: boolean;
  rating: number;
  reviews: number;
  feedback?: Feedback[];
}

export interface SwapRequest {
  id: string;
  fromUser: User;
  toUser: User;
  offeredSkill: Skill;
  wantedSkill: Skill;
  message: string;
  status: SwapStatus;
  createdAt: string;
}

export interface MatchSuggestion {
  user: User;
  score: number;
  reason: string;
}
