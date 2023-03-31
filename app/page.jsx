'use client'

import Container from '@/components/container'
import Footer from '@/components/footer'
import Header from '@/components/header'
import HeaderGap from '@/components/headerGap'
import Layout from '@/components/layout'
import FundamentalComponent from '@/components/modules/fundamentalComponent'
import IconComponent from '@/components/modules/iconComponent'
import ImageComponent from '@/components/modules/imageComponent'
import PickupComponent from '@/components/modules/pickupComponent'
import TextButtonComponent from '@/components/modules/textButtonComponent'
import TextImageComponent from '@/components/modules/textImageComponent'
import TitleComponent from '@/components/modules/titleComponent'
import { DefaultButton, RoundedFullButton } from '@/components/utils/buttons'
import { ArrowLeft } from '@/components/utils/svg'
import { useAppContext } from 'context/state'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import quiz from './sample-data.json'
import { motion } from 'framer-motion'
import ResultComponent from '@/components/modules/resultComponent'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [checkStorage, setCheckStorage] = useState(true)
  const [color, setColor] = useState({
    header: '#FFF7E9',
    bg: '#DFF2F7',
  })
  const [currentSection, setCurrentSection] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [status, setStatus] = useState('progress')
  const [skipQuestion, setSkipQuestion] = useState(false)

  let totalQuestion = []

  quiz.data.sections
    .filter((data) => data.type !== 'fundamental')
    .forEach((data) => {
      totalQuestion.push(...data.questions)
    })

  quiz.data.sections = quiz.data.sections.map((data) => {
    if (data.type !== 'fundamental') {
      return {
        ...data,
        questions: data.questions.map((e) => {
          return {
            ...e,
            current:
              totalQuestion.indexOf(totalQuestion.find((f) => f.ID === e.ID)) +
              1,
          }
        }),
      }
    } else {
      return data
    }
  })

  quiz.data.totalQuestion = totalQuestion.length

  useEffect(() => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))
    if (dataQuestionnaire && dataQuestionnaire.status === 'progress') {
      if (
        quiz.data.sections[dataQuestionnaire.currentSection].questions[
          dataQuestionnaire.currentQuestion
        ]?.display.state === 0
      ) {
        if (
          quiz.data.sections[dataQuestionnaire.currentSection].questions[
            dataQuestionnaire.currentQuestion
          ].display.condition
            .filter(
              (e) =>
                e.questionID ===
                dataQuestionnaire.questionnaireRespond
                  .find((f) =>
                    f.responds.find((g) => g.questionID === e.questionID),
                  )
                  .responds.find((h) => h.questionID === e.questionID)
                  .questionID,
            )
            .find((i) =>
              i.answer.find(
                (j) =>
                  j ===
                  dataQuestionnaire.questionnaireRespond
                    .find((f) =>
                      f.responds.find((g) => g.questionID === i.questionID),
                    )
                    .responds.find((h) => h.questionID === i.questionID)
                    .answer.find((k) => k === j),
              ),
            )
        ) {
          setSkipQuestion(true)

          const nextQuestion =
            quiz.data.sections[currentSection].questions[currentQuestion + 1]
          const nextSection = quiz.data.sections[currentSection + 1]

          if (nextQuestion) {
            setCurrentSection(currentSection)
            setCurrentQuestion(currentQuestion + 1)
            setSkipQuestion(false)
            localStorage.setItem(
              'questionnaire',
              JSON.stringify({
                currentSection: currentSection,
                currentQuestion: currentQuestion + 1,
                questionnaireRespond: dataQuestionnaire.questionnaireRespond,
                status: 'progress',
                expired: dataQuestionnaire.expired,
              }),
            )
          } else if (nextSection?.type === 'quiz') {
            setCurrentSection(currentSection + 1)
            setCurrentQuestion(null)
            setSkipQuestion(false)
            localStorage.setItem(
              'questionnaire',
              JSON.stringify({
                currentSection: currentSection + 1,
                currentQuestion: null,
                questionnaireRespond: dataQuestionnaire.questionnaireRespond,
                status: 'progress',
                expired: dataQuestionnaire.expired,
              }),
            )
          } else if (nextSection?.type === 'fundamental') {
            setCurrentSection(currentSection + 1)
            setCurrentQuestion(0)
            setSkipQuestion(false)
            localStorage.setItem(
              'questionnaire',
              JSON.stringify({
                currentSection: currentSection + 1,
                currentQuestion: 0,
                questionnaireRespond: dataQuestionnaire.questionnaireRespond,
                status: 'progress',
                expired: dataQuestionnaire.expired,
              }),
            )
          } else if (!nextSection && nextQuestion) {
            setCurrentSection(currentSection + 1)
            setCurrentQuestion(0)
            setSkipQuestion(false)
            localStorage.setItem(
              'questionnaire',
              JSON.stringify({
                currentSection: currentSection + 1,
                currentQuestion: 0,
                questionnaireRespond: dataQuestionnaire.questionnaireRespond,
                status: 'progress',
                expired: dataQuestionnaire.expired,
              }),
            )
          }
        } else {
          setSkipQuestion(false)
        }
      }
    }
  }, [currentSection, currentQuestion])

  useEffect(() => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))
    if (dataQuestionnaire) {
      if (Date.now() > dataQuestionnaire.expired) {
        localStorage.removeItem('questionnaire')
        setCurrentSection(0)
        setCurrentQuestion(0)
        setStatus('progress')
        setCheckStorage(false)
      } else {
        setCurrentSection(dataQuestionnaire.currentSection)
        setCurrentQuestion(dataQuestionnaire.currentQuestion)
        setStatus(dataQuestionnaire.status)
        setCheckStorage(true)
      }
      setLoading(false)
    } else {
      setLoading(false)
      setCheckStorage(false)
    }
  }, [])

  const ProgressIndicator = () => {
    return (
      <div className="relative flex flex-col w-full">
        <DefaultButton
          className="absolute -top-6 left-0 hidden w-fit md:flex items-center text-nav font-maisonMono mx-6 md:mx-8 uppercase"
          onClick={() => {
            if (currentQuestion > 0) {
              const dataQuestionnaire = JSON.parse(
                localStorage.getItem('questionnaire'),
              )
              dataQuestionnaire.questionnaireRespond.pop()
              localStorage.setItem(
                'questionnaire',
                JSON.stringify({
                  currentSection: currentSection,
                  currentQuestion: currentQuestion - 1,
                  questionnaireRespond: dataQuestionnaire.questionnaireRespond,
                  status: 'progress',
                  expired: dataQuestionnaire.expired,
                }),
              )
              setCurrentQuestion(currentQuestion - 1)
            } else {
              const dataQuestionnaire = JSON.parse(
                localStorage.getItem('questionnaire'),
              )
              dataQuestionnaire.questionnaireRespond.pop()
              localStorage.setItem(
                'questionnaire',
                JSON.stringify({
                  currentSection: currentSection,
                  currentQuestion: null,
                  questionnaireRespond: dataQuestionnaire.questionnaireRespond,
                  status: 'progress',
                  expired: dataQuestionnaire.expired,
                }),
              )
              setCurrentQuestion(null)
            }
          }}
        >
          <ArrowLeft className="mr-4" />
          Back
        </DefaultButton>
        <div className="relative w-full grid md:grid-cols-3 border-y-2 border-black">
          {quiz.data.sections.map(
            (data, id) =>
              data.type !== 'fundamental' && (
                <div
                  key={id}
                  className="relative md:border-r-2 z-10 border-black text-center text-footer md:text-nav font-maisonMono py-3"
                >
                  <span className="relative uppercase">{data.title.en}</span>
                </div>
              ),
          )}
          <div
            className={`absolute top-0 left-0 h-full bg-yellow transition-all duration-300`}
            style={{
              width: `${
                (quiz.data.sections[currentSection].questions[currentQuestion]
                  .current /
                  quiz.data.totalQuestion) *
                100
              }%`,
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <NextSeo title="Home" />
      {!loading && (
        <main
          className="w-full min-h-screen flex flex-col justify-between"
          style={{
            backgroundColor: color.bg,
          }}
        >
          <Header background={color.header} header={quiz.data.headerData} />
          <HeaderGap />
          <div className="relative w-full h-full flex flex-col grow overflow-hidden">
            <div className="w-full h-full grow flex items-center">
              {!checkStorage ? (
                <div className="w-full flex flex-col lg:flex-row self-stretch">
                  <Container className="w-full h-full flex flex-col lg:flex-row items-end lg:items-center">
                    <div className="w-full lg:w-1/2 min-h-[50vh] lg:h-full flex flex-col items-center lg:items-start justify-center pt-16 pb-20 lg:pt-0 lg:pb-0 lg:pr-8">
                      <h1 className="uppercase text-mopHeading max-w-md md:max-w-lg lg:max-w-none text-center lg:text-left lg:text-opHeading m-0 leading-none mb-6">
                        {quiz.data.coverPage.title.en}
                      </h1>
                      <p className="max-w-sm md:max-w-md lg:max-w-lg lg:mb-12 text-center lg:text-left">
                        {quiz.data.coverPage.description.en}
                      </p>
                      <RoundedFullButton
                        icon
                        className="hidden lg:flex w-fit"
                        onClick={() => {
                          localStorage.setItem(
                            'questionnaire',
                            JSON.stringify({
                              currentSection: 0,
                              currentQuestion: 0,
                              questionnaireRespond: [],
                              status: 'progress',
                              expired: new Date(
                                Date.now() + 86400 * 1000,
                              ).getTime(),
                            }),
                          )
                          // setColor({
                          //   header: '#FFF7E9',
                          //   bg: '#FFF7E9',
                          // })
                          setCheckStorage(true)
                        }}
                      >
                        {quiz.data.coverPage.buttonText.en}
                      </RoundedFullButton>
                    </div>
                    <div className="lg:hidden w-full h-[379px] md:h-[400px]" />
                  </Container>
                  <div className="hidden lg:block absolute top-0 right-0 w-full lg:w-1/2 h-[50vh] lg:h-full">
                    <Image
                      src={quiz.data.coverPage.coverImage}
                      fill
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <div className="lg:hidden absolute bottom-0 right-0 w-full h-[379px] md:h-[400px]">
                    <Image
                      src={quiz.data.coverPage.coverImage}
                      fill
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                    <RoundedFullButton
                      icon
                      className="lg:hidden relative z-20 -top-6 mx-auto w-fit"
                      onClick={() => {
                        localStorage.setItem(
                          'questionnaire',
                          JSON.stringify({
                            currentSection: 0,
                            currentQuestion: 0,
                            questionnaireRespond: [],
                            status: 'progress',
                            expired: new Date(
                              Date.now() + 86400 * 1000,
                            ).getTime(),
                          }),
                        )
                        // setColor({
                        //   header: '#FFF7E9',
                        //   bg: '#FFF7E9',
                        // })
                        setCheckStorage(true)
                      }}
                    >
                      {quiz.data.coverPage.buttonText.en}
                    </RoundedFullButton>
                  </div>
                </div>
              ) : quiz.data.sections[currentSection]?.type === 'fundamental' &&
                !skipQuestion ? (
                <FundamentalComponent
                  sectionId={quiz.data.sections[currentSection].ID}
                  questionId={
                    quiz.data.sections[currentSection].questions[
                      currentQuestion
                    ].ID
                  }
                  nextSection={quiz.data.sections[currentSection + 1]}
                  nextQuestion={
                    quiz.data.sections[currentSection].questions[
                      currentQuestion + 1
                    ]
                  }
                  title={quiz.data.sections[currentSection].title.en}
                  subTitle={
                    quiz.data.sections[currentSection].questions[
                      currentQuestion
                    ].content.en
                  }
                  placeholder={
                    quiz.data.sections[currentSection].questions[
                      currentQuestion
                    ].content.placeholder.en
                  }
                  currentSection={currentSection}
                  currentQuestion={currentQuestion}
                  setCurrentSection={setCurrentSection}
                  setCurrentQuestion={setCurrentQuestion}
                  setStatus={setStatus}
                />
              ) : quiz.data.sections[currentSection]?.type === 'quiz' &&
                !skipQuestion ? (
                !currentQuestion && currentQuestion !== 0 ? (
                  <TitleComponent
                    nextSection={quiz.data.sections[currentSection + 1]}
                    nextQuestion={0}
                    title={quiz.data.sections[currentSection].title.en}
                    subTitle={quiz.data.sections[currentSection].cover.title.en}
                    button={quiz.data.sections[currentSection].cover.button.en}
                    imageLeft={
                      quiz.data.sections[currentSection].cover.image.left
                    }
                    imageRight={
                      quiz.data.sections[currentSection].cover.image.right
                    }
                    currentSection={currentSection}
                    currentQuestion={currentQuestion}
                    setCurrentSection={setCurrentSection}
                    setCurrentQuestion={setCurrentQuestion}
                    setStatus={setStatus}
                  />
                ) : quiz.data.sections[currentSection].questions[
                    currentQuestion
                  ].type === 'option' ? (
                  quiz.data.sections[currentSection].questions[currentQuestion]
                    .answerType === 'icon' ? (
                    <IconComponent
                      sectionId={quiz.data.sections[currentSection].ID}
                      questionId={
                        quiz.data.sections[currentSection].questions[
                          currentQuestion
                        ].ID
                      }
                      nextSection={quiz.data.sections[currentSection + 1]}
                      nextQuestion={
                        quiz.data.sections[currentSection].questions[
                          currentQuestion + 1
                        ]
                      }
                      title={quiz.data.sections[currentSection].title.en}
                      subTitle={
                        quiz.data.sections[currentSection].questions[
                          currentQuestion
                        ].content.en
                      }
                      answers={
                        quiz.data.sections[currentSection].questions[
                          currentQuestion
                        ].answers
                      }
                      currentSection={currentSection}
                      currentQuestion={currentQuestion}
                      setCurrentSection={setCurrentSection}
                      setCurrentQuestion={setCurrentQuestion}
                      setStatus={setStatus}
                    />
                  ) : quiz.data.sections[currentSection].questions[
                      currentQuestion
                    ].content.image ? (
                    <TextImageComponent
                      sectionId={quiz.data.sections[currentSection].ID}
                      questionId={
                        quiz.data.sections[currentSection].questions[
                          currentQuestion
                        ].ID
                      }
                      nextSection={quiz.data.sections[currentSection + 1]}
                      nextQuestion={
                        quiz.data.sections[currentSection].questions[
                          currentQuestion + 1
                        ]
                      }
                      title={quiz.data.sections[currentSection].title.en}
                      subTitle={
                        quiz.data.sections[currentSection].questions[
                          currentQuestion
                        ].content.en
                      }
                      answers={
                        quiz.data.sections[currentSection].questions[
                          currentQuestion
                        ].answers
                      }
                      image={
                        quiz.data.sections[currentSection].questions[
                          currentQuestion
                        ].content.image
                      }
                      currentSection={currentSection}
                      currentQuestion={currentQuestion}
                      setCurrentSection={setCurrentSection}
                      setCurrentQuestion={setCurrentQuestion}
                      setStatus={setStatus}
                    />
                  ) : quiz.data.sections[currentSection].questions[
                      currentQuestion
                    ].answerType === 'text' ? (
                    <TextButtonComponent
                      sectionId={quiz.data.sections[currentSection].ID}
                      questionId={
                        quiz.data.sections[currentSection].questions[
                          currentQuestion
                        ].ID
                      }
                      nextSection={quiz.data.sections[currentSection + 1]}
                      nextQuestion={
                        quiz.data.sections[currentSection].questions[
                          currentQuestion + 1
                        ]
                      }
                      title={quiz.data.sections[currentSection].title.en}
                      subTitle={
                        quiz.data.sections[currentSection].questions[
                          currentQuestion
                        ].content.en
                      }
                      answers={
                        quiz.data.sections[currentSection].questions[
                          currentQuestion
                        ].answers
                      }
                      currentSection={currentSection}
                      currentQuestion={currentQuestion}
                      setCurrentSection={setCurrentSection}
                      setCurrentQuestion={setCurrentQuestion}
                      setStatus={setStatus}
                    />
                  ) : (
                    <ImageComponent
                      sectionId={quiz.data.sections[currentSection].ID}
                      questionId={
                        quiz.data.sections[currentSection].questions[
                          currentQuestion
                        ].ID
                      }
                      nextSection={quiz.data.sections[currentSection + 1]}
                      nextQuestion={
                        quiz.data.sections[currentSection].questions[
                          currentQuestion + 1
                        ]
                      }
                      title={quiz.data.sections[currentSection].title.en}
                      subTitle={
                        quiz.data.sections[currentSection].questions[
                          currentQuestion
                        ].content.en
                      }
                      answers={
                        quiz.data.sections[currentSection].questions[
                          currentQuestion
                        ].answers
                      }
                      currentSection={currentSection}
                      currentQuestion={currentQuestion}
                      setCurrentSection={setCurrentSection}
                      setCurrentQuestion={setCurrentQuestion}
                      setStatus={setStatus}
                    />
                  )
                ) : (
                  <PickupComponent
                    sectionId={quiz.data.sections[currentSection].ID}
                    questionId={
                      quiz.data.sections[currentSection].questions[
                        currentQuestion
                      ].ID
                    }
                    nextSection={quiz.data.sections[currentSection + 1]}
                    nextQuestion={
                      quiz.data.sections[currentSection].questions[
                        currentQuestion + 1
                      ]
                    }
                    title={quiz.data.sections[currentSection].title.en}
                    subTitle={
                      quiz.data.sections[currentSection].questions[
                        currentQuestion
                      ].content.en
                    }
                    answers={
                      quiz.data.sections[currentSection].questions[
                        currentQuestion
                      ].answers
                    }
                    currentSection={currentSection}
                    currentQuestion={currentQuestion}
                    setCurrentSection={setCurrentSection}
                    setCurrentQuestion={setCurrentQuestion}
                    setStatus={setStatus}
                  />
                )
              ) : status === 'finish' ? (
                <ResultComponent
                  title={quiz.data.beforeResult.title.en}
                  description={quiz.data.beforeResult.description.en}
                  formTitle={quiz.data.beforeResult.formTitle.en}
                  emailPlaceholder={quiz.data.beforeResult.emailPlaceholder.en}
                  phonePlaceholder={quiz.data.beforeResult.phonePlaceholder.en}
                  buttonText={quiz.data.beforeResult.buttonText.en}
                  coverImage={quiz.data.beforeResult.coverImage}
                />
              ) : (
                <></>
              )}
            </div>

            {checkStorage && status === 'progress' ? (
              quiz.data.sections[currentSection].type === 'fundamental' ? (
                <DefaultButton
                  className="absolute bottom-0 left-0 w-fit hidden md:flex items-center text-nav font-maisonMono mx-6 md:mx-8 mb-3 uppercase"
                  onClick={() => {
                    if (currentSection === 0) {
                      localStorage.removeItem('questionnaire')
                      setCheckStorage(false)
                    } else {
                      const dataQuestionnaire = JSON.parse(
                        localStorage.getItem('questionnaire'),
                      )
                      dataQuestionnaire.questionnaireRespond.pop()
                      localStorage.setItem(
                        'questionnaire',
                        JSON.stringify({
                          currentSection: currentSection - 1,
                          currentQuestion:
                            quiz.data.sections[currentSection - 1].questions
                              .length - 1,
                          questionnaireRespond:
                            dataQuestionnaire.questionnaireRespond,
                          status: 'progress',
                          expired: dataQuestionnaire.expired,
                        }),
                      )
                      setCurrentSection(currentSection - 1)
                      setCurrentQuestion(
                        quiz.data.sections[currentSection - 1].questions
                          .length - 1,
                      )
                    }
                  }}
                >
                  <ArrowLeft className="mr-4" />
                  BACK
                </DefaultButton>
              ) : currentQuestion !== null ? (
                <ProgressIndicator />
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </div>
          <Footer footer={quiz.data.footerData} />
        </main>
      )}
    </Layout>
  )
}
