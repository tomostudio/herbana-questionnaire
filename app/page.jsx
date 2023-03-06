'use client'

import Layout from '@/components/layout'
import { NextSeo } from 'next-seo'

export default function Home() {

  return (
    <Layout>
      <NextSeo title="Home" />
      <div className='font-maison'>HELLO FAISON</div>
      <div className='font-maisonMono'>HELLO FAISON MONO</div>
    </Layout>
  )
}
