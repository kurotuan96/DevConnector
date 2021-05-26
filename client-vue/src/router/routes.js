import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import Landing from "@/components/layout/Landing";
import Profiles from "@/components/page/Profiles";
import Profile from "@/components/page/Profile";
import CreateProfile from "@/components/page/CreateProfile";
import Dashboard from "@/components/page/Dashboard";
import Experience from "@/components/page/Experience";
import Education from "@/components/page/Education";
import { AuthGuard, ResolveGuard } from "@/router/guards";

export const routes = [
  {
    path: "",
    name: "Landing",
    component: Landing
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/profiles",
    name: "Profiles",
    component: Profiles,
    beforeEnter: ResolveGuard([AuthGuard])
  },
  {
    path: "/profiles/:profile_id",
    name: "Profile",
    component: Profile,
    beforeEnter: ResolveGuard([AuthGuard])
  },
  {
    path: "/profile/create",
    name: "ProfileCreate",
    component: CreateProfile,
    beforeEnter: ResolveGuard([AuthGuard])
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: ResolveGuard([AuthGuard])
  },
  {
    path: "/profile/experience",
    name: "Experience",
    component: Experience,
    beforeEnter: ResolveGuard([AuthGuard])
  },
  {
    path: "/profile/education",
    name: "Education",
    component: Education,
    beforeEnter: ResolveGuard([AuthGuard])
  }
];
