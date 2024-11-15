import { lazy } from 'react';

const Login = lazy(() => import('@afx/views/base/login/index.layout'))

export default async function LoginScreenPage() {
  return <Login />
}