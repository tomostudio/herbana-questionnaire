'use client'

import Container from '@/components/container'
import Footer from '@/components/footer'
import Header from '@/components/header'
import HeaderGap from '@/components/headerGap'
import Layout from '@/components/layout'
import IconComponent from '@/components/modules/iconComponent'
import NameComponent from '@/components/modules/fundamentalComponent'
import TextImageComponent from '@/components/modules/textImageComponent'
import {
  BorderButton,
  ImageButton,
  RoundedButton,
  RoundedFullButton,
} from '@/components/utils/buttons'
import Heading from '@/components/utils/heading'
import { Plus } from '@/components/utils/svg'
import { NextSeo } from 'next-seo'

export default function Icon() {
    const subTitle = 'When it comes to herbal supplements, \n you are...'
  return (
    <Layout>
      <NextSeo title="Home" />
      <main className="bg-blue w-full min-h-screen flex flex-col justify-between">
        <Header />
        <HeaderGap />
        <div className="relative w-full h-full flex items-center grow">
          <TextImageComponent/>
        </div>
        <Footer />
      </main>
    </Layout>
  )
}
