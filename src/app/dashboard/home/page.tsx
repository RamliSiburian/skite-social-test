import { lazy } from 'react'

const Home = lazy(
  () => import('@afx/views/dashboard/home/index.layout')
)
export default function RouteHome() {
  return <Home />
}
