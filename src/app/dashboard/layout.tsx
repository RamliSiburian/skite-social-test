'use client'

import { lazy } from 'react'

const Dashboard = lazy(() => import('@afx/views/base/index.layout'))

export default function PortalLayout({
  children
}: {
  children: React.ReactNode
}) {

  return <Dashboard>{children}</Dashboard>
}