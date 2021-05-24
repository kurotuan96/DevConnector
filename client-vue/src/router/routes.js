import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import Landing from "@/components/layout/Landing";

export const routes = [
  {
    path: '',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]