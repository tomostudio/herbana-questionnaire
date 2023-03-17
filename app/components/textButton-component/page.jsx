'use client'

import Container from '@/components/container'
import Footer from '@/components/footer'
import Header from '@/components/header'
import HeaderGap from '@/components/headerGap'
import Layout from '@/components/layout'
import TextButtonComponent from '@/components/modules/textButtonComponent'
import { DefaultButton } from '@/components/utils/buttons'
import { NextSeo } from 'next-seo'

export default function Icon() {
  const subTitle = 'When it comes to herbal supplements, \n you are...'
  return (
    <Layout>
      <NextSeo title="Home" />
      <main className="bg-blue w-full min-h-screen flex flex-col justify-between">
        <Header />
        <HeaderGap />
        <div className="w-full h-full min-h-screen md:min-h-fit flex items-center grow">
          <TextButtonComponent />
        </div>
        <div className="relative w-full grid md:grid-cols-3 border-y-2 border-black">
          <div className="relative md:border-r-2 border-black text-center text-footer md:text-nav font-maisonMono py-3">
            <span className='relative z-20'>ABOUT YOU</span>
            <div className="absolute top-0 left-0 w-1/2 h-full z-10 bg-yellow" />
          </div>
          <div className="relative z-20 border-r-2 border-black text-center text-nav font-maisonMono py-3">
            FURTHER GOALS
          </div>
          <div className="relative z-20 text-center text-nav font-maisonMono py-3">
            GENERAL HEALTH
          </div>
        </div>
        <Footer />
      </main>
    </Layout>
  )
}
