'use client'

import dynamic from 'next/dynamic'
 
const MainPage = dynamic(() => import('@/views/MainPage/MainPage'), { ssr: false })
 
export function ClientOnly() {
  return <MainPage />
}