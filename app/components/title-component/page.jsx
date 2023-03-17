'use client'

import Footer from '@/components/footer'
import Header from '@/components/header'
import HeaderGap from '@/components/headerGap'
import Layout from '@/components/layout'
import NameComponent from '@/components/modules/fundamentalComponent'
import TitleComponent from '@/components/modules/titleComponent'
import {
  BorderButton,
  ImageButton,
  RoundedButton,
  RoundedFullButton,
} from '@/components/utils/buttons'
import { Plus } from '@/components/utils/svg'
import { NextSeo } from 'next-seo'

export default function Title() {
  return (
    <Layout>
      <NextSeo title="Home" />
      <main className="bg-blue w-full min-h-screen flex flex-col justify-between">
        <Header />
        <HeaderGap />
        <div className="w-full h-full overflow-hidden flex flex-col justify-center items-center grow">
          <TitleComponent />
        </div>
        <Footer />
      </main>
    </Layout>
  )
}
