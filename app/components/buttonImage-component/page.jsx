'use client'

import Footer from '@/components/footer'
import Header from '@/components/header'
import HeaderGap from '@/components/headerGap'
import Layout from '@/components/layout'
import IconComponent from '@/components/modules/iconComponent'
import ImageComponent from '@/components/modules/imageComponent'
import NameComponent from '@/components/modules/nameComponent'
import TextButtonComponent from '@/components/modules/textButtonComponent'
import {
  BorderButton,
  ImageButton,
  RoundedButton,
  RoundedFullButton,
} from '@/components/utils/buttons'
import { Plus } from '@/components/utils/svg'
import { NextSeo } from 'next-seo'

export default function ButtonImage() {
  return (
    <Layout>
      <NextSeo title="Home" />
      <main className="bg-blue w-full min-h-screen flex flex-col justify-between">
        <Header />
        <HeaderGap />
        <div className="w-full h-full min-h-screen md:min-h-fit flex flex-col justify-center items-center grow">
          <ImageComponent />
        </div>
        <Footer />
      </main>
    </Layout>
  )
}
