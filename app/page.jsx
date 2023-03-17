'use client'

import Container from '@/components/container'
import Footer from '@/components/footer'
import Header from '@/components/header'
import HeaderGap from '@/components/headerGap'
import Layout from '@/components/layout'
import TextImageComponent from '@/components/modules/textImageComponent'
import { RoundedButton, RoundedFullButton } from '@/components/utils/buttons'
import { NextSeo } from 'next-seo'
import Image from 'next/image'

export default function Home() {
  const subTitle = 'When it comes to herbal supplements, \n you are...'
  return (
    <Layout>
      <NextSeo title="Home" />
      <main className="bg-blue w-full min-h-screen flex flex-col justify-between">
        <Header background='bg-beige' />
        <HeaderGap />
        <div className="relative w-full h-full flex items-center grow">
          <div className="w-full flex flex-col lg:flex-row self-stretch">
            <Container className="w-full h-full flex flex-col lg:flex-row items-end lg:items-center">
              <div className="w-full lg:w-1/2 min-h-[50vh] lg:h-full flex flex-col items-center lg:items-start justify-center pt-16 pb-20 lg:pt-0 lg:pb-0 lg:pr-8">
                <h1 className="uppercase text-mopHeading max-w-md md:max-w-lg lg:max-w-none text-center lg:text-left lg:text-opHeading m-0 leading-none mb-6">
                  Know Your Personal Companions
                </h1>
                <p className="max-w-sm md:max-w-md lg:max-w-lg lg:mb-12 text-center lg:text-left">
                  You've taken the first step into a healthier lifestyle. Get to
                  know more about the best products curated just for you, by
                  filling this simple quiz.
                </p>
                <RoundedFullButton icon className="hidden lg:flex w-fit">
                  START QUIZ
                </RoundedFullButton>
              </div>
              <div className="lg:hidden w-full h-[379px] md:h-[400px]" />
            </Container>
            <div className="hidden lg:block absolute top-0 right-0 w-full lg:w-1/2 h-[50vh] lg:h-full">
              <Image
                src="/opImage.png"
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
            <div className="lg:hidden absolute bottom-0 right-0 w-full h-[379px] md:h-[400px]">
              <Image
                src="/opImageMobile.png"
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
              <RoundedFullButton icon className="lg:hidden relative z-20 -top-6 mx-auto w-fit">
                START QUIZ
              </RoundedFullButton>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </Layout>
  )
}
