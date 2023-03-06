'use client'

import Layout from '@/components/layout'
import { NextSeo } from 'next-seo'

export default function Home() {

  return (
    <Layout>
      <NextSeo title="Home" />
      <div className='font-maison'>HELLO FAISON</div>
      <div className='font-maisonMono'>HELLO FAISON MONO</div>
      <div className='flex flex-col w-96'>
        <div className='w-full h-36 bg-orange'/>
        <div className='w-full h-36 bg-beige'/>
        <div className='w-full h-36 bg-blue'/>
        <div className='w-full h-36 bg-grey'/>
        <div className='w-full h-36 bg-green'/>
        <div className='w-full h-36 bg-pink'/>
      </div>
    </Layout>
  )
}
