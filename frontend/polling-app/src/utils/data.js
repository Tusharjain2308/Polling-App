import { lazy } from "react";
import {
  LuLayoutDashboard,
  LuBadgeCheck,
  LuBookmark,
  LuLogOut,
  LuPenTool,
  LuVote,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Create Poll",
    icon: LuVote,
    path: "/create-polls",
  },
  {
    id: "03",
    label: "My Polls",
    icon: LuPenTool,
    path: "/my-polls",
  },
  {
    id: "04",
    label: "Voted Poll",
    icon: LuBadgeCheck,
    path: "/voted-polls",
  },
  {
    id: "05",
    label: "BookMarks",
    icon: LuBookmark,
    path: "/bookmarked-polls",
  },
  {
    id: "06",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];

export const POLL_TYPE = [
  { 
    id:"01",
    label:"Yes/No",
    value:"yes/no"
  },
  {
    id:"02",
    label:"Single Choice",
    value:"single-choice"
  },
  {
    id:"03",
    label:"Rating",
    value:"rating"
  },
  {
    id:"04",
    label:"Image Based",
    value:"image-based"
  },
  {
    id:"05",
    label:"Open Ended",
    value:"open-ended"
  }
]