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
        <Footer />
      </main>
    </Layout>
  )
}
