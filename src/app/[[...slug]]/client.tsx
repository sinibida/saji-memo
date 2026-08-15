'use client'
 
import React from 'react'
import dynamic from 'next/dynamic'
 
const MainPage = dynamic(() => import('@/pages/MainPage/MainPage'), { ssr: false })
 
export function ClientOnly() {
  return <MainPage />
}