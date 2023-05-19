'use client'

import { useEffect, useState } from 'react'
import Container from '../container'
import { DefaultButton, RoundedFullButton } from '../utils/buttons'
import { motion } from 'framer-motion'
import Image from 'next/image'
import parse from 'html-react-parser'

const ResultComponent = ({ quiz }) => {
  const title = quiz.beforeResult.title.en
  const description = quiz.beforeResult.description.en
  const formTitle = quiz.beforeResult.formTitle.en
  const emailPlaceholder = quiz.beforeResult.emailPlaceholder.en
  const phonePlaceholder = quiz.beforeResult.phonePlaceholder.en
  const buttonText = quiz.beforeResult.buttonText.en
  const coverImage = quiz.beforeResult.coverImage
  const coverImageMobile = quiz.beforeResult.coverImageMobile

  const [resultData, setResultData] = useState([])
  const [isOpen, setIsOpen] = useState([false, false, false])
  const [numError, setNumError] = useState(false)

  useEffect(() => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))
    setResultData(dataQuestionnaire.questionnaireRespond)
  }, [])

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
      <div className="relative w-full h-[405px] md:h-[521px] bg-white">
        <Container className="relative z-10 text-center h-full flex justify-center items-center">
          <h1 className="whitespace-pre-wrap uppercase text-mendHeading md:text-endHeading max-w-lg">
            {parse(title)}
          </h1>
        </Container>
        <Image
          src={coverImage}
          fill
          style={{
            objectFit: 'cover',
          }}
          loading="eager"
          priority={true}
          className="hidden md:block"
        />
        <Image
          src={coverImageMobile}
          fill
          style={{
            objectFit: 'cover',
          }}
          loading="eager"
          priority={true}
          className="md:hidden"
        />
      </div>
      <div className="w-full bg-blue flex justify-center px-6 md:px-0">
        <div className="max-w-3xl w-full my-[40px] flex flex-col items-center">
          <h2 className="text-mqHeadingb max-w-xl md:text-qHeadingb m-0 font-normal text-left md:text-center whitespace-pre-wrap leading-tight px-6 md:px-0">
            {parse(description)}
          </h2>
          <div className="w-full flex flex-col mt-[40px] space-y-[15px] md:space-y-5">
            {quiz.sections
              .filter((e) => e.type !== 'fundamental')
              .map((data, index) => (
                <DefaultButton
                  hover={false}
                  onClick={(e) => {
                    let dataOpen = []
                    quiz.sections
                      .filter((e) => e.type !== 'fundamental')
                      .forEach((_, id) => {
                        if (id === index) {
                          dataOpen.push(!isOpen[id])
                        } else {
                          dataOpen.push(false)
                        }
                      })
                    setIsOpen(dataOpen)
                    const dropdown = document.getElementsByClassName('dropdown')
                    if (
                      !dropdown[index].classList.contains('dropdown-active')
                    ) {
                      quiz.sections
                        .filter((e) => e.type !== 'fundamental')
                        .forEach((_, id) => {
                          if (id === index) {
                            dropdown[id].classList.add('dropdown-active')
                          } else {
                            dropdown[id].classList.remove('dropdown-active')
                            dropdown[id].classList.remove('dropdown-active')
                          }
                        })
                    } else {
                      dropdown[index].classList.remove('dropdown-active')
                    }
                  }}
                  className="flex flex-col w-full bg-beige p-6 md:p-9 rounded-xl hover:opacity-70 transition-opacity"
                >
                  <div className="flex w-full justify-between items-center text-orange font-maisonMono font-bold text-mqHeadingb md:text-qHeadingb">
                    <span className="uppercase">{data.title.en}</span>
                    <div className="dropdown"></div>
                  </div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={isOpen[index] ? 'open' : 'closed'}
                    variants={variants}
                    className="overflow-hidden w-full"
                  >
                    <p className="pt-5 md:pt-7 text-[0.938rem] md:text-body text-left">
                      {resultData
                        .filter(
                          (f) => parseInt(f.sectionID) === parseInt(data.ID),
                        )
                        .map((f) => (
                          <>
                            {f.answer.toString()}
                            <br />
                          </>
                        ))}
                    </p>
                  </motion.div>
                </DefaultButton>
              ))}
          </div>
        </div>
      </div>
      <div className="w-full bg-beige flex justify-center px-6 md:px-0">
        <div className="w-full max-w-5xl mx-auto py-10 md:py-20">
          <div className="flex flex-col rounded-2xl border md:border-2 border-orange bg-orange overflow-hidden">
            <div className="h-full md:h-72 text-left px-6 pb-16 pt-6 md:p-12 max-w-xl">
              <span className="text-white text-mheading1 md:text-qHeadingb whitespace-pre-wrap">
                {parse(formTitle)}
              </span>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const dataQuestionnaire = JSON.parse(
                  localStorage.getItem('questionnaire'),
                )
                if (e.target[1].value.split('').length < 8) {
                  setNumError(true)
                } else {
                  setNumError(false)
                  fetch('https://demo.herbana.id/quiz-api.php', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({
                      session: Date.now(),
                      email: e.target[0].value,
                      phone: e.target[1].value,
                      answers: dataQuestionnaire.questionnaireRespond.map(
                        (data) => {
                          return {
                            questionID: data.questionID,
                            answer: data.answer,
                          }
                        },
                      ),
                    }),
                  })
                    .then((res) => res.json())
                    .then((res) => {
                      if (res.status === 1) {
                        window.location = `https://demo.herbana.id/quiz-result.php?s=${res.data}`
                      } else {
                        console.log(res)
                      }
                    })
                }
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
                  type="number"
                  min={8}
                  placeholder={phonePlaceholder}
                  className="mt-4 border-b md:border-b-2 border-black pb-3 md:pb-4 outline-none text-mInput md:text-body placeholder:text-black placeholder:opacity-30"
                  required
                />
                {numError && (
                  <span
                    id="numError"
                    className="text-red text-[13px] mt-[6px] transition-all duration-300"
                  >
                    *Please input more than 8 digits
                  </span>
                )}
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
