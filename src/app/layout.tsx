'use client'

import './globals.css'
import './font.css'
import './styles.scss'
import { ConfigProvider } from 'antd'

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3B97CB',
        }
      }}
    >
      <html lang="en">
        <title>Skite Social</title>
        <body>{children}</body>
      </html>
    </ConfigProvider>
  )
}
