'use client'

import { useState } from 'react'
import Container from '../container'
import { DefaultButton, RoundedFullButton } from '../utils/buttons'
import { motion } from 'framer-motion'
import Image from 'next/image'

const ResultComponent = ({
  title = '',
  description = '',
  formTitle = '',
  emailPlaceholder = '',
  phonePlaceholder = '',
  buttonText = '',
  coverImage,
}) => {
  const [isOpen, setIsOpen] = useState([false, false, false])

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
  return (
    <div className="w-full flex flex-col">
      <div className="relative w-full h-[405px] md:h-[521px]">
        <Container className="relative z-10 text-center h-full flex justify-center items-center">
          <h1 className="whitespace-pre-wrap uppercase text-mendHeading md:text-endHeading max-w-lg">
            {title}
          </h1>
        </Container>
        <Image
          src={coverImage}
          fill
          style={{
            objectFit: 'cover',
          }}
          className="hidden md:block"
        />
        <Image
          src={coverImage}
          fill
          style={{
            objectFit: 'cover',
          }}
          className="md:hidden"
        />
      </div>
      <div className="w-full bg-blue flex justify-center px-6 md:px-0">
        <div className="max-w-3xl w-full mt-20 mb-16 flex flex-col items-center">
          <h2 className="text-mheading1 max-w-xl md:text-qHeadingb m-0 font-normal text-left md:text-center whitespace-pre-wrap leading-tight">
            {description}
          </h2>
          <div className="w-full flex flex-col mt-20 space-y-5">
            <DefaultButton
              hover={false}
              onClick={(e) => {
                setIsOpen([!isOpen[0], false, false])
                const dropdown = document.getElementsByClassName('dropdown')
                if (!dropdown[0].classList.contains('dropdown-active')) {
                  dropdown[0].classList.add('dropdown-active')
                  dropdown[1].classList.remove('dropdown-active')
                  dropdown[2].classList.remove('dropdown-active')
                } else {
                  dropdown[0].classList.remove('dropdown-active')
                }
              }}
              className="flex flex-col w-full bg-beige p-6 md:p-9 rounded-xl hover:opacity-70 transition-opacity"
            >
              <div className="flex w-full justify-between items-center text-orange font-maisonMono font-bold text-mqHeadingb md:text-qHeadingb">
                <span>ABOUT YOU</span>
                <div className="dropdown"></div>
              </div>
              <motion.div
                initial={{ height: 0 }}
                animate={isOpen[0] ? 'open' : 'closed'}
                variants={variants}
                className="overflow-hidden"
              >
                <p className="pt-8 text-[0.938rem] md:text-body text-left">
                  Praesent tellus ligula, laoreet ac qsuam id, aliquet auctor
                  augue tempor imperdiet. Suspendisse id orci orci,
                  Suspendisseaa felis magna aliquet baami id lorem. Praesent
                  tellus ligula, laoreet ac qsuam id, aliquet auctor augue
                  tempor imperdiet. Suspendisse id orci orci, Suspendisseaa
                  felis magna aliquet baami id lorem.
                </p>
              </motion.div>
            </DefaultButton>
            <DefaultButton
              hover={false}
              onClick={(e) => {
                setIsOpen([false, !isOpen[1], false])
                const dropdown = document.getElementsByClassName('dropdown')
                if (!dropdown[1].classList.contains('dropdown-active')) {
                  dropdown[0].classList.remove('dropdown-active')
                  dropdown[1].classList.add('dropdown-active')
                  dropdown[2].classList.remove('dropdown-active')
                } else {
                  dropdown[1].classList.remove('dropdown-active')
                }
              }}
              className="flex flex-col w-full bg-beige p-6 md:p-9 rounded-xl hover:opacity-70 transition-opacity"
            >
              <div className="flex w-full justify-between items-center text-orange font-maisonMono font-bold text-mqHeadingb md:text-qHeadingb">
                <span>FURTHER GOALS</span>
                <div className="dropdown"></div>
              </div>
              <motion.div
                initial={{ height: 0 }}
                animate={isOpen[1] ? 'open' : 'closed'}
                variants={variants}
                className="overflow-hidden"
              >
                <p className="pt-8 text-[0.938rem] md:text-body text-left">
                  Praesent tellus ligula, laoreet ac qsuam id, aliquet auctor
                  augue tempor imperdiet. Suspendisse id orci orci,
                  Suspendisseaa felis magna aliquet baami id lorem. Praesent
                  tellus ligula, laoreet ac qsuam id, aliquet auctor augue
                  tempor imperdiet. Suspendisse id orci orci, Suspendisseaa
                  felis magna aliquet baami id lorem.
                </p>
              </motion.div>
            </DefaultButton>
            <DefaultButton
              hover={false}
              onClick={(e) => {
                setIsOpen([false, false, !isOpen[2]])
                const dropdown = document.getElementsByClassName('dropdown')
                if (!dropdown[2].classList.contains('dropdown-active')) {
                  dropdown[0].classList.remove('dropdown-active')
                  dropdown[1].classList.remove('dropdown-active')
                  dropdown[2].classList.add('dropdown-active')
                } else {
                  dropdown[2].classList.remove('dropdown-active')
                }
              }}
              className="flex flex-col w-full bg-beige p-6 md:p-9 rounded-xl hover:opacity-70 transition-opacity"
            >
              <div className="flex w-full justify-between items-center text-orange font-maisonMono font-bold text-mqHeadingb md:text-qHeadingb">
                <span>GENERAL HEALTH</span>
                <div className="dropdown"></div>
              </div>
              <motion.div
                initial={{ height: 0 }}
                animate={isOpen[2] ? 'open' : 'closed'}
                variants={variants}
                className="overflow-hidden"
              >
                <p className="pt-8 text-[0.938rem] md:text-body text-left">
                  Praesent tellus ligula, laoreet ac qsuam id, aliquet auctor
                  augue tempor imperdiet. Suspendisse id orci orci,
                  Suspendisseaa felis magna aliquet baami id lorem. Praesent
                  tellus ligula, laoreet ac qsuam id, aliquet auctor augue
                  tempor imperdiet. Suspendisse id orci orci, Suspendisseaa
                  felis magna aliquet baami id lorem.
                </p>
              </motion.div>
            </DefaultButton>
          </div>
        </div>
      </div>
      <div className="w-full bg-beige flex justify-center px-6 md:px-0">
        <div className="w-full max-w-5xl mx-auto py-10 md:py-20">
          <div className="flex flex-col rounded-2xl border-2 border-orange bg-orange overflow-hidden">
            <div className="h-full md:h-72 text-left px-6 pb-16 pt-6 md:p-12">
              <span className="text-white text-mheading1 md:text-qHeadingb whitespace-pre-wrap">
                {formTitle}
              </span>
            </div>
            <form
              onSubmit={(e) => {
                const dataQuestionnaire = JSON.parse(
                  localStorage.getItem('questionnaire'),
                )
                localStorage.setItem(
                  'questionnaire',
                  JSON.stringify({
                    currentSection: dataQuestionnaire.currentSection,
                    currentQuestion: dataQuestionnaire.currentQuestion,
                    questionnaireRespond:
                      dataQuestionnaire.questionnaireRespond,
                    endFormRespond: {
                      email: e.target[0].value,
                      phoneNumber: e.target[1].value,
                    },
                    language: 'en',
                    status: dataQuestionnaire.status,
                    expired: dataQuestionnaire.expired,
                  }),
                )
              }}
              className="bg-white rounded-t-2xl p-6 md:p-12 flex flex-col md:flex-row justify-between"
            >
              <div className="flex flex-col w-full md:w-1/2">
                <input
                  type="text"
                  placeholder={emailPlaceholder}
                  className="border-y md:border-y-2 border-black py-3 md:py-4 outline-none text-mInput md:text-body placeholder:text-black placeholder:opacity-30"
                  required
                />
                <input
                  type="text"
                  placeholder={phonePlaceholder}
                  className="mt-4 border-b md:border-b-2 border-black pb-3 md:pb-4 outline-none text-mInput md:text-body placeholder:text-black placeholder:opacity-30"
                  required
                />
              </div>
              <div className="flex justify-center md:justify-end items-end w-full md:w-1/2 mt-7 md:mt-0">
                <RoundedFullButton
                  icon
                  color="text-white"
                  bg="bg-orange hover:bg-white"
                  borderColor="border-orange"
                  hoverTextIcon="hover-orange"
                >
                  <span className="mr-3 md:mr-0">{buttonText}</span>
                </RoundedFullButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultComponent
