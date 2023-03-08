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
    "You're one step closer to meet your\npersonalised vitamins. But before that,\nhere's a recap of what you've told us:"
  return (
    <Layout>
      <NextSeo title="Home" />
      <main className="w-full min-h-screen flex flex-col justify-between">
        <Header background="bg-beige" />
        <HeaderGap />
        <div className="w-full h-full flex flex-col grow">
          <div className="relative w-full h-[65vh] min-h-[500px] aspect-video">
            <Image
              src="/result.png"
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
          <div className="w-full bg-blue flex justify-center">
            <div className="max-w-3xl w-full mt-20 mb-16 flex flex-col">
              <h1 className="text-qHeadingb m-0 font-normal text-center whitespace-pre-wrap leading-tight">
                {title}
              </h1>
              <div className="w-full flex flex-col mt-20 space-y-8">
                <div className="flex flex-col w-full bg-beige p-10 rounded-xl">
                  <div className="flex w-full justify-between items-center text-orange font-maisonMono font-bold text-qHeadingb">
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
                    <p className="pt-8">
                      Praesent tellus ligula, laoreet ac qsuam id, aliquet
                      auctor augue tempor imperdiet. Suspendisse id orci orci,
                      Suspendisseaa felis magna aliquet baami id lorem. Praesent
                      tellus ligula, laoreet ac qsuam id, aliquet auctor augue
                      tempor imperdiet. Suspendisse id orci orci, Suspendisseaa
                      felis magna aliquet baami id lorem.
                    </p>
                  </motion.div>
                </div>
                <div className="flex flex-col w-full bg-beige p-10 rounded-xl">
                  <div className="flex w-full justify-between items-center text-orange font-maisonMono font-bold text-qHeadingb">
                    <span>FURTHER GOALS</span>
                    <DefaultButton className="dropdown"></DefaultButton>
                  </div>
                </div>
                <div className="flex flex-col w-full bg-beige p-10 rounded-xl">
                  <div className="flex w-full justify-between items-center text-orange font-maisonMono font-bold text-qHeadingb">
                    <span>GENERAL HEALTH</span>
                    <DefaultButton className="dropdown"></DefaultButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-beige flex justify-center">
            <div className="w-full max-w-5xl mx-auto py-20">
              <div className="flex flex-col rounded-2xl border-2 border-orange bg-orange overflow-hidden">
                <div className="h-72 text-left p-12">
                  <span className="text-white text-qHeadingb">
                    To get products we recommend, <br />
                    please fill in your details here:
                  </span>
                </div>
                <div className="bg-white rounded-t-2xl p-12 flex justify-between">
                  <div className="flex flex-col w-1/2">
                    <input
                      placeholder="INSERT EMAIL"
                      className="border-y-2 border-black py-4 outline-none placeholder:text-black placeholder:opacity-50"
                    />
                    <input
                      placeholder="INSERT PHONE NUMBER"
                      className="mt-4 border-b-2 border-black pb-4 outline-none placeholder:text-black placeholder:opacity-50"
                    />
                  </div>
                  <div className="flex justify-end items-end w-1/2">
                    <RoundedFullButton
                      destination="/"
                      icon
                      color="text-white"
                      bg="bg-orange"
                      borderColor="border-orange"
                    >
                      CHECKOUT HERE
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
