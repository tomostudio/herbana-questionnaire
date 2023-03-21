'use client'

import Footer from '@/components/footer'
import Header from '@/components/header'
import HeaderGap from '@/components/headerGap'
import Layout from '@/components/layout'
import NameComponent from '@/components/modules/fundamentalComponent'
import { NextSeo } from 'next-seo'

export default function Name() {
  return (
    <Layout>
      <NextSeo title="Home" />
      <main className="bg-beige w-full min-h-screen flex flex-col justify-between">
        <Header />
        <HeaderGap />
        <div className="w-full h-full min-h-screen md:min-h-fit flex flex-col justify-center items-center grow">
          <NameComponent />
        </div>
        <Footer />
      </main>
    </Layout>
  )
}
