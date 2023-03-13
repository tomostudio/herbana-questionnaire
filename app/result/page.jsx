'use client'

import Footer from '@/components/footer'
import Header from '@/components/header'
import HeaderGap from '@/components/headerGap'
import Layout from '@/components/layout'
import NameComponent from '@/components/modules/nameComponent'
import { DefaultButton, RoundedFullButton } from '@/components/utils/buttons'
import { Plus } from '@/components/utils/svg'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Container from '@/components/container'

export default function Name() {
  const [isOpen, setIsOpen] = useState(false)

  // const variants = {
  //   open: {
  //     height: 'auto',
  //     marginTop: '1rem',
  //     borderTopWidth: '2px',
  //     borderColor: '#E46B37',
  //   },
  //   closed: {
  //     height: 0,
  //     marginTop: 0,
  //     borderTopWidth: 0,
  //     borderColor: '#E46B37',
  //   },
  // }

  const variants = {
    open: {
      height: 'auto',
      marginTop: '1rem',
      borderTop: '2px solid #E46B37',
    },
    closed: {
      height: 0,
      marginTop: 0,
    },
  }

  const title =
    "You're one step closer to meet your personalised vitamins. But before that, here's a recap of what you've told us:"
  const title2 = 'Thank you for\ncompleting our\nquestionnaire!'
  return (
    <Layout>
      <NextSeo title="Home" />
      <main className="w-full min-h-screen flex flex-col justify-between">
        <Header background="bg-beige" />
        <HeaderGap />
        <div className="w-full h-full flex flex-col grow">
          <div className="relative w-full h-[405px] md:h-[521px]">
            <Container className="relative z-10 text-center h-full flex justify-center items-center">
              <h1 className='whitespace-pre-wrap uppercase text-mendHeading md:text-endHeading'>{title2}</h1>
            </Container>
            <Image
              src="/result.png"
              fill
              style={{
                objectFit: 'cover',
              }}
              className="hidden md:block"
            />
            <Image
              src="/resultMobile.png"
              fill
              style={{
                objectFit: 'contain',
                objectPosition: 'center top',
              }}
              className="md:hidden"
            />
          </div>
          <div className="w-full bg-blue flex justify-center px-6 md:px-0">
            <div className="max-w-3xl w-full mt-20 mb-16 flex flex-col items-center">
              <h2 className="text-mheading1 max-w-xl md:text-qHeadingb m-0 font-normal text-left md:text-center whitespace-pre-wrap leading-tight">
                {title}
              </h2>
              <div className="w-full flex flex-col mt-20 space-y-5">
                <div className="flex flex-col w-full bg-beige p-6 md:p-9 rounded-xl">
                  <div className="flex w-full justify-between items-center text-orange font-maisonMono font-bold text-mqHeadingb md:text-qHeadingb">
                    <span>ABOUT YOU</span>
                    <DefaultButton
                      onClick={(e) => {
                        setIsOpen(!isOpen)
                        e.target.classList.toggle('dropdown-active')
                      }}
                      className="dropdown"
                    ></DefaultButton>
                  </div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={isOpen ? 'open' : 'closed'}
                    variants={variants}
                    className="overflow-hidden"
                  >
                    <p className="pt-8 text-[0.938rem] md:text-body">
                      Praesent tellus ligula, laoreet ac qsuam id, aliquet
                      auctor augue tempor imperdiet. Suspendisse id orci orci,
                      Suspendisseaa felis magna aliquet baami id lorem. Praesent
                      tellus ligula, laoreet ac qsuam id, aliquet auctor augue
                      tempor imperdiet. Suspendisse id orci orci, Suspendisseaa
                      felis magna aliquet baami id lorem.
                    </p>
                  </motion.div>
                </div>
                <div className="flex flex-col w-full bg-beige p-6 md:p-9 rounded-xl">
                  <div className="flex w-full justify-between items-center text-orange font-maisonMono font-bold text-mqHeadingb md:text-qHeadingb">
                    <span>FURTHER GOALS</span>
                    <DefaultButton className="dropdown"></DefaultButton>
                  </div>
                </div>
                <div className="flex flex-col w-full bg-beige p-6 md:p-9 rounded-xl">
                  <div className="flex w-full justify-between items-center text-orange font-maisonMono font-bold text-mqHeadingb md:text-qHeadingb">
                    <span>GENERAL HEALTH</span>
                    <DefaultButton className="dropdown"></DefaultButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-beige flex justify-center px-6 md:px-0">
            <div className="w-full max-w-5xl mx-auto py-10 md:py-20">
              <div className="flex flex-col rounded-2xl border-2 border-orange bg-orange overflow-hidden">
                <div className="h-full md:h-72 text-left px-6 pb-12 pt-6 md:p-12">
                  <span className="text-white text-mheading1 md:text-qHeadingb">
                    To get products we recommend, <br />
                    please fill in your details here:
                  </span>
                </div>
                <div className="bg-white rounded-t-2xl p-6 md:p-12 flex flex-col md:flex-row justify-between">
                  <div className="flex flex-col w-full md:w-1/2">
                    <input
                      placeholder="INSERT EMAIL"
                      className="border-y md:border-y-2 border-black py-3 md:py-4 outline-none text-mInput md:text-body placeholder:text-black placeholder:opacity-30"
                    />
                    <input
                      placeholder="INSERT PHONE NUMBER"
                      className="mt-4 border-b md:border-b-2 border-black pb-3 md:pb-4 outline-none text-mInput md:text-body placeholder:text-black placeholder:opacity-30"
                    />
                  </div>
                  <div className="flex justify-center md:justify-end items-end w-full md:w-1/2 mt-7 md:mt-0">
                    <RoundedFullButton
                      destination="/"
                      icon
                      color="text-white"
                      bg="bg-orange"
                      borderColor="border-orange"
                    >
                      VIEW RESULT
                    </RoundedFullButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </Layout>
  )
}
