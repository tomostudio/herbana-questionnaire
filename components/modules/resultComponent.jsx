'use client'

import { useEffect, useState } from 'react'
import Container from '../container'
import { DefaultButton, RoundedFullButton } from '../utils/buttons'
import { motion } from 'framer-motion'
import Image from 'next/image'
import parse from 'html-react-parser'
import { usePathname } from 'next/navigation'

const ResultComponent = ({ quiz, setReset }) => {
  const getPath = usePathname()
  const [resultData, setResultData] = useState([])
  const [isOpen, setIsOpen] = useState([false, false, false])
  const [messageError, setMessageError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))
    setResultData(dataQuestionnaire.questionnaireRespond)

    if (dataQuestionnaire.updatedAt !== quiz.timestamp) {
      setReset(true)
    }
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
            {parse(
              getPath === '/en'
                ? quiz.beforeResult.title.en
                : quiz.beforeResult.title.id,
            )}
          </h1>
        </Container>
        <Image
          src={quiz.beforeResult.coverImage}
          fill
          style={{
            objectFit: 'cover',
          }}
          loading="eager"
          priority={true}
          className="hidden md:block"
        />
        <Image
          src={quiz.beforeResult.coverImageMobile}
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
          <h2 className="text-mqHeadingb w-full md:text-qHeadingb m-0 font-normal text-left md:text-center whitespace-pre-wrap leading-tight px-6 md:px-9">
            {parse(
              getPath === '/en'
                ? quiz.beforeResult.description.en
                : quiz.beforeResult.description.id,
            )}
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
                    <span className="uppercase">
                      {getPath === '/en' ? data.title.en : data.title.id}
                    </span>
                    <div className="dropdown"></div>
                  </div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={isOpen[index] ? 'open' : 'closed'}
                    variants={variants}
                    className="overflow-hidden w-full"
                  >
                    <ul className="list-disc list-inside pt-5 md:pt-7 text-[0.938rem] md:text-body text-left">
                      {resultData
                        .filter(
                          (f) => parseInt(f.sectionID) === parseInt(data.ID),
                        )
                        .map((f) =>
                          getPath === '/en'
                            ? f.answer.map((g) => (
                                <li>
                                  {
                                    quiz.sections
                                      .find(
                                        (e) =>
                                          parseInt(e.ID) ===
                                          parseInt(f.sectionID),
                                      )
                                      .questions.find(
                                        (e) =>
                                          parseInt(e.ID) ===
                                          parseInt(f.questionID),
                                      )
                                      .answers.find((h) => h.value === g)
                                      .summaryText.en
                                  }
                                </li>
                              ))
                            : f.answer.map((g) => (
                                <li>
                                  {
                                    quiz.sections
                                      .find(
                                        (e) =>
                                          parseInt(e.ID) ===
                                          parseInt(f.sectionID),
                                      )
                                      .questions.find(
                                        (e) =>
                                          parseInt(e.ID) ===
                                          parseInt(f.questionID),
                                      )
                                      .answers.find((h) => h.value === g)
                                      .summaryText.id
                                  }
                                </li>
                              )),
                        )}
                    </ul>
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
                {parse(
                  getPath === '/en'
                    ? quiz.beforeResult.formTitle.en
                    : quiz.beforeResult.formTitle.id,
                )}
              </span>
            </div>
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault()
                const dataQuestionnaire = JSON.parse(
                  localStorage.getItem('questionnaire'),
                )
                let regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+[.][A-Za-z.]{2,}$/
                if (
                  !regex.test(e.target[0].value) &&
                  (e.target[1].value.split('').length === 0 ||
                    e.target[1].value.split('').length < 8)
                ) {
                  setMessageError(3)
                } else if (!regex.test(e.target[0].value)) {
                  setMessageError(1)
                } else if (
                  e.target[1].value.split('').length === 0 ||
                  e.target[1].value.split('').length < 8
                ) {
                  setMessageError(2)
                } else {
                  setLoading(true)
                  setMessageError(null)

                  fetch('https://herbana.id/quiz-api.php', {
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
                      setLoading(false)
                      if (res.status === 1) {
                        window.location = `https://herbana.id/quiz-result.php?s=${res.data}`
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
                  id="inputEmail"
                  type="email"
                  placeholder={
                    getPath === '/en'
                      ? quiz.beforeResult.emailPlaceholder.en
                      : quiz.beforeResult.emailPlaceholder.id
                  }
                  className="rounded-none	border-y md:border-y-2 border-black py-3 md:py-4 outline-none text-mInput md:text-body placeholder:text-black placeholder:opacity-30"
                  required
                />
                <input
                  type="number"
                  placeholder={
                    getPath === '/en'
                      ? quiz.beforeResult.phonePlaceholder.en
                      : quiz.beforeResult.phonePlaceholder.id
                  }
                  className="rounded-none	mt-4 border-b md:border-b-2 border-black pb-3 md:pb-4 outline-none text-mInput md:text-body placeholder:text-black placeholder:opacity-30"
                  required
                />
                {messageError && (
                  <span className="text-red text-[12px] md:text-[13px] mt-[6px] transition-all duration-300">
                    {messageError === 1
                      ? 'Please input a valid email address.'
                      : messageError === 2
                      ? 'Please input a valid phone number.'
                      : messageError === 3
                      ? 'Please input a valid email address & phone number.'
                      : ''}
                  </span>
                )}
              </div>
              <div className="flex justify-center md:justify-end items-end w-full md:w-1/2 mt-7 md:mt-0">
                <RoundedFullButton
                  icon={!loading}
                  color="text-white"
                  bg="bg-orange hover:bg-white"
                  borderColor="border-orange"
                  hoverTextIcon="hover-orange"
                  disabled={loading}
                  className={
                    loading
                      ? '!pointer-events-none !bg-[#C7C7C7] !border-[#C7C7C7]'
                      : ''
                  }
                >
                  {loading ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="animate-spin"
                    >
                      <mask
                        id="path-1-outside-1_501_515"
                        width="24"
                        height="24"
                        x="0"
                        y="0"
                        fill="#000"
                        maskUnits="userSpaceOnUse"
                      >
                        <path fill="#fff" d="M0 0H24V24H0z"></path>
                        <path
                          fillRule="evenodd"
                          d="M1.727 8.379h.003L1 5.072l1.272-.33.543 2.456C4.472 3.529 7.953 1 11.98 1c4.928 0 9.037 3.783 9.99 8.814l-1.282.285c-.83-4.385-4.414-7.682-8.708-7.682-3.5 0-6.527 2.19-7.977 5.374l2.048-.53.304 1.379L2.03 9.757 1.727 8.38zm10.29 13.204c-4.294 0-7.878-3.297-8.708-7.682l-1.282.285C2.98 19.216 7.09 23 12.017 23c4.03 0 7.51-2.53 9.167-6.2l.543 2.462L23 18.933l-.73-3.313.003-.001-.305-1.378-4.308 1.115.305 1.378 2.03-.525c-1.451 3.184-4.478 5.374-7.978 5.374z"
                          clipRule="evenodd"
                        ></path>
                      </mask>
                      <path
                        fill="#fff"
                        fillRule="evenodd"
                        d="M1.727 8.379h.003L1 5.072l1.272-.33.543 2.456C4.472 3.529 7.953 1 11.98 1c4.928 0 9.037 3.783 9.99 8.814l-1.282.285c-.83-4.385-4.414-7.682-8.708-7.682-3.5 0-6.527 2.19-7.977 5.374l2.048-.53.304 1.379L2.03 9.757 1.727 8.38zm10.29 13.204c-4.294 0-7.878-3.297-8.708-7.682l-1.282.285C2.98 19.216 7.09 23 12.017 23c4.03 0 7.51-2.53 9.167-6.2l.543 2.462L23 18.933l-.73-3.313.003-.001-.305-1.378-4.308 1.115.305 1.378 2.03-.525c-1.451 3.184-4.478 5.374-7.978 5.374z"
                        clipRule="evenodd"
                      ></path>
                      <path
                        fill="#fff"
                        d="M1.73 8.378l.131.507.49-.126-.11-.494-.511.113zm-.003 0l-.13-.506-.49.126.109.494.511-.113zM1 5.074l-.131-.507-.49.127.11.493L1 5.073zm1.272-.33l.512-.113-.117-.53-.526.136.131.507zM2.815 7.2l-.512.112.34 1.54.649-1.437-.477-.215zM21.97 9.814l.113.512.496-.11-.095-.499-.514.097zm-1.282.285l-.515.098.101.53.528-.117-.114-.51zM4.004 7.791l-.477-.217-.455.999 1.063-.275-.131-.507zm2.048-.53l.512-.112-.117-.53-.526.135.131.508zm.304 1.379l.13.507.49-.126-.109-.494-.511.113zM2.03 9.757l-.512.113.117.53.526-.136-.131-.507zm1.278 4.144l.514-.098-.1-.53-.528.117.114.51zm-1.282.285l-.113-.512-.496.11.094.499.515-.097zm19.157 2.613l.512-.113-.34-1.54-.65 1.438.478.215zm.543 2.463l-.511.113.117.53.526-.136-.132-.507zM23 18.933l.131.507.49-.126-.11-.494-.511.113zm-.73-3.313l-.132-.507-.489.126.109.493.511-.112zm.003-.001l.13.507.49-.127-.109-.493-.511.113zm-.305-1.378l.512-.113-.117-.53-.526.136.131.507zm-4.308 1.115l-.13-.507-.49.127.109.493.511-.113zm.305 1.378l-.512.113.117.53.526-.136-.131-.507zm2.03-.525l.476.217.456-1-1.064.276.132.507zM1.599 7.87h-.003l.262 1.015h.003L1.599 7.87zM.489 5.186l.73 3.305 1.022-.226-.73-3.305-1.022.226zm1.652-.95l-1.272.33.262 1.014 1.273-.33-.263-1.014zm1.185 2.85L2.784 4.63l-1.023.226.542 2.455 1.023-.225zm8.655-6.61c-4.26 0-7.912 2.674-9.644 6.507l.955.431c1.584-3.506 4.891-5.89 8.69-5.89V.476zm10.504 9.241c-.992-5.244-5.291-9.24-10.504-9.24v1.047c4.643 0 8.563 3.57 9.475 8.388l1.03-.195zm-1.682.893l1.281-.284-.227-1.023-1.281.285.227 1.022zM11.98 2.94c4.01 0 7.404 3.085 8.193 7.257l1.03-.195c-.87-4.599-4.644-8.109-9.223-8.109v1.048zm-7.5 5.068c1.376-3.02 4.23-5.067 7.5-5.067V1.893c-3.73 0-6.93 2.333-8.454 5.68l.953.435zm1.44-1.254l-2.049.53.263 1.014 2.048-.53-.262-1.014zm.946 1.773L6.564 7.15l-1.023.225.303 1.378 1.023-.225zm-4.705 1.737l4.325-1.117-.262-1.014L1.9 9.25l.262 1.014zm-.946-1.772l.303 1.378 1.024-.226-.304-1.378-1.023.226zm1.578 5.506c.87 4.599 4.644 8.109 9.223 8.109v-1.048c-4.01 0-7.404-3.084-8.194-7.256l-1.029.195zm-.653.699l1.281-.285-.227-1.022-1.281.284.227 1.023zm9.876 7.78c-4.643 0-8.563-3.571-9.475-8.389l-1.03.195c.994 5.244 5.292 9.24 10.505 9.24v-1.047zm8.69-5.893c-1.583 3.507-4.892 5.892-8.69 5.892v1.048c4.26 0 7.914-2.675 9.645-6.51l-.955-.43zm1.532 2.566l-.543-2.464-1.023.226.543 2.463 1.023-.226zm.63-.724l-1.273.33.263 1.013 1.272-.329-.262-1.014zm-1.111-2.693l.73 3.313 1.024-.226-.731-3.313-1.023.226zm.383-.621h-.003l.263 1.015.003-.001-.263-1.014zm-.684-.758l.304 1.378 1.023-.226-.304-1.378-1.023.226zm-3.665 1.51l4.308-1.116-.263-1.014-4.308 1.115.263 1.014zm.684.757l-.304-1.378-1.023.226.304 1.378 1.023-.226zm1.387-.92l-2.03.526.263 1.014 2.03-.525-.263-1.014zm-7.846 6.406c3.73 0 6.93-2.334 8.454-5.681l-.953-.434c-1.376 3.02-4.231 5.067-7.501 5.067v1.048z"
                        mask="url(#path-1-outside-1_501_515)"
                      ></path>
                    </svg>
                  ) : (
                    <span className="mr-3 md:mr-0">
                      {getPath === '/en'
                        ? quiz.beforeResult.buttonText.en
                        : quiz.beforeResult.buttonText.id}
                    </span>
                  )}
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
