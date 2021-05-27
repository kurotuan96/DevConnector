import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Landing from '@/components/layout/Landing'
import Profiles from '@/components/page/Profiles'
import Profile from '@/components/page/Profile'
import ProfileForm from '@/components/page/ProfileForm'
import Dashboard from '@/components/page/Dashboard'
import SubProfileForm from '@/components/page/SubProfileForm'
import { AuthGuard, ResolveGuard } from '@/router/guards'

export const routes = [
  {
    path: '',
    name: 'Landing',
    component: Landing,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/profiles',
    name: 'Profiles',
    component: Profiles,
    beforeEnter: ResolveGuard([AuthGuard])
  },
  {
    path: '/profiles/:userId',
    name: 'Profile',
    component: Profile,
    beforeEnter: ResolveGuard([AuthGuard])
  },
  {
    path: '/profile/create',
    name: 'ProfileCreate',
    component: ProfileForm,
    beforeEnter: ResolveGuard([AuthGuard])
  },
  {
    path: '/profile/edit',
    name: 'ProfileEdit',
    component: ProfileForm,
    beforeEnter: ResolveGuard([AuthGuard])
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: ResolveGuard([AuthGuard])
  },
  {
    path: '/profile/experience',
    name: 'Experience',
    component: SubProfileForm,
    beforeEnter: ResolveGuard([AuthGuard])
  },
  {
    path: '/profile/education',
    name: 'Education',
    component: SubProfileForm,
    beforeEnter: ResolveGuard([AuthGuard])
  }
]
