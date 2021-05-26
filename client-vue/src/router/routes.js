import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import Landing from "@/components/layout/Landing";
import Profiles from "@/components/page/Profiles";
import Profile from "@/components/page/Profile";

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
    component: Profiles
  },
  {
    path: "/profiles/:profile_id",
    name: "Profile",
    component: Profile
  }
];
