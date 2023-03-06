'use client'

import Footer from '@/components/footer'
import Header from '@/components/header'
import HeaderGap from '@/components/headerGap'
import Layout from '@/components/layout'
import {
  BorderButton,
  ImageButton,
  RoundedButton,
  RoundedFullButton,
} from '@/components/utils/buttons'
import { Plus } from '@/components/utils/svg'
import { NextSeo } from 'next-seo'

export default function Home() {
  return (
    <Layout>
      <NextSeo title="Home" />
      <Header />
      <div className="bg-beige w-full flex flex-col">
        <HeaderGap />
        <div className="max-w-md w-full mx-auto h-screen flex flex-col justify-center items-center">
          <span>Whats your name?</span>
        </div>
      </div>
      <Footer/>
    </Layout>
  )
}
