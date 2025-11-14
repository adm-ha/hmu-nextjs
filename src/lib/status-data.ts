// src/lib/status-data.ts
import { WaitlistUserStatus } from "@/hooks/use-waitlist-user";

export interface StatusLevelData {
  id: WaitlistUserStatus;
  minReferrals: number;
  title: string;
  logo: string; // large badge SVG path
  icon: string; // mini badge SVG path
  benefits: string[];
  color: string; // Tailwind *name* of the color
  shadowColor: string; // The hex value for the shadow
}

export const STATUS_LEVELS: StatusLevelData[] = [
  {
    id: "Insider",
    minReferrals: 1,
    title: "Insider",
    logo: "/insider-badge.svg",
    icon: "/insider-badge-mini.svg",
    color: "status-insider",
    shadowColor: "#ff974f",
    benefits: [
      "Early Access Notification",
      "Poster: Early Access to App",
      "Seeker: 1 free job app per referral",
      "Waitlist position tracking",
    ],
  },
  {
    id: "Main Character",
    minReferrals: 2,
    title: "Main Character",
    logo: "/mc-badge.svg",
    icon: "/mc-badge-mini.svg",
    color: "status-main-character",
    shadowColor: "#cb171a",
    benefits: [
      "All Insider Status benefits plus:",
      "Enhanced Profile Visibility (Stands out on posts/applications)",
      "Exclusive Main Character Badge",
      "Job Poster Boost: First job post boosted",
      "Job Seeker Perk: 2 free job applications per referral",
    ],
  },
  {
    id: "Power Up",
    minReferrals: 5,
    title: "Power Up",
    logo: "/pu-badge.svg",
    icon: "/pu-badge-mini.svg",
    color: "status-power-up",
    shadowColor: "#9cde47",
    benefits: [
      "All Main Character benefits plus:",
      "Guaranteed Early Access (regardless of geo)",
      "Triple Job Boost (Poster): First 3 job posts boosted",
      "Triple Job Boost (Seeker): First 3 job applications boosted",
      "Exclusive Job Access: View jobs 24h before others",
      "Enhanced Perks: 3 free job applications per referral",
    ],
  },
  {
    id: "G.O.A.T",
    minReferrals: 10,
    title: "G.O.A.T",
    logo: "/goat-badge.svg",
    icon: "/goat-mini-badge.svg",
    color: "status-goat",
    shadowColor: "#9f7af5",
    benefits: [
      "All Power Up benefits plus:",
      "Early Access to New Features",
      "Ultimate Status Symbol: G.O.A.T. Badge",
      "Permanent Max Visibility",
      "Job Poster Priority: First job post permanently boosted",
    ],
  },
];