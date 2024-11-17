'use client'
import LynxStorages from '@afx/utils/storage.util'
import { useRouter } from 'next/navigation'
import React, { useLayoutEffect } from 'react'

export default function LoadingScreenPage() {
  const token = LynxStorages.getItem('@UTOKEN')?.data[0]
  const router = useRouter()


  useLayoutEffect(() => {
    if (token === null) {
      return router.replace('/auth/login')
    } else {
      return router.replace('/dashboard')
    }
  }, [])


  return <div />
}
