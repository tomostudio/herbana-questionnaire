'use client'

import Layout from '@/components/layout'
import {
  BorderButton,
  DefaultButton,
  ImageButton,
  RoundedButton,
  RoundedFullButton,
} from '@/components/utils/buttons'
import { Plus } from '@/components/utils/svg'
import { NextSeo } from 'next-seo'

export default function Components() {
  return (
    <Layout>
      <NextSeo title="Home" />
      <div className="font-maison">HELLO FAISON</div>
      <div className="font-maisonMono">HELLO FAISON MONO</div>
      <div className="flex w-full space-x-6">
        <div className="flex flex-col w-96">
          <div className="w-full h-36 bg-orange" />
          <div className="w-full h-36 bg-beige" />
          <div className="w-full h-36 bg-blue" />
          <div className="w-full h-36 bg-grey" />
          <div className="w-full h-36 bg-green" />
          <div className="w-full h-36 bg-pink" />
        </div>
        <div className="flex flex-col space-y-6 items-center">
          <RoundedButton destination="/">Diabetes</RoundedButton>
          <RoundedFullButton destination="/">LET'S GO</RoundedFullButton>
          <RoundedFullButton destination="/" icon>
            CHECKOUT HERE
          </RoundedFullButton>
          <BorderButton destination="/">CONTINUE</BorderButton>
          <ImageButton
            destination="/"
            src="/icons/informed1.png"
            fill={false}
            width={70}
            height={70}
          >
            Informed
          </ImageButton>
          <ImageButton
            destination="/"
            src="/pregnant.png"
            icon={false}
            fill={true}
            style={{
              objectFit: 'cover',
            }}
          >
            Pregnant
          </ImageButton>
        </div>
      </div>
      <div className="w-full px-20 py-8">
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
                className="border-y-2 border-black py-4 placeholder:text-black placeholder:opacity-50"
              />
              <input
                placeholder="INSERT PHONE NUMBER"
                className="mt-4 border-b-2 border-black pb-4 placeholder:text-black placeholder:opacity-50"
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
      <div className="w-[45rem] flex flex-col space-y-6 m-6 bg-blue p-6">
        <div className="flex flex-col w-full bg-beige p-10 rounded-xl">
          <div className="flex w-full justify-between items-center text-orange font-maisonMono font-bold text-qHeadingb">
            <span>ABOUT YOU</span>
            <DefaultButton>
              <Plus color="#E46B37" />
            </DefaultButton>
          </div>
          <div className="border-t-2 border-orange mt-4">
            <p className="pt-8">
              Praesent tellus ligula, laoreet ac qsuam id, aliquet auctor augue
              tempor imperdiet. Suspendisse id orci orci, Suspendisseaa felis
              magna aliquet baami id lorem. Praesent tellus ligula, laoreet ac
              qsuam id, aliquet auctor augue tempor imperdiet. Suspendisse id
              orci orci, Suspendisseaa felis magna aliquet baami id lorem.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full bg-beige p-10 rounded-xl">
          <div className="flex w-full justify-between items-center text-orange font-maisonMono font-bold text-qHeadingb">
            <span>FURTHER GOALS</span>
            <DefaultButton>
              <Plus color="#E46B37" />
            </DefaultButton>
          </div>
        </div>
        <div className="flex flex-col w-full bg-beige p-10 rounded-xl">
          <div className="flex w-full justify-between items-center text-orange font-maisonMono font-bold text-qHeadingb">
            <span>GENERAL HEALTH</span>
            <DefaultButton>
              <Plus color="#E46B37" />
            </DefaultButton>
          </div>
        </div>
      </div>
    </Layout>
  )
}
