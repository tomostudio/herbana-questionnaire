'use client'

import Footer from '@/components/footer'
import Header from '@/components/header'
import HeaderGap from '@/components/headerGap'
import Layout from '@/components/layout'
import ImageComponent from '@/components/modules/imageComponent'
import FundamentalComponent from '@/components/modules/fundamentalComponent'
import TitleComponent from '@/components/modules/titleComponent'
import { NextSeo } from 'next-seo'
import quiz from './sample-data.json'
import { useEffect, useState } from 'react'
import { useAppContext } from 'context/state'
import IconComponent from '@/components/modules/iconComponent'
import TextImageComponent from '@/components/modules/textImageComponent'
import TextButtonComponent from '@/components/modules/textButtonComponent'
import PickupComponent from '@/components/modules/pickupComponent'

export default function Quiz() {
  const appContext = useAppContext()
  const maxSections = quiz.data.sections.length
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))
    if (!dataQuestionnaire) {
      localStorage.setItem(
        'questionnaire',
        JSON.stringify({
          id: 1,
          currentSection: 0,
          currentQuestion: 0,
        }),
      )
    } else {
      appContext.setCurrentSection(dataQuestionnaire.currentSection)
      appContext.setCurrentQuestion(dataQuestionnaire.currentQuestion)
      setLoading(false)
    }

    let totalQuestion = []

    quiz.data.sections
      .filter((data) => data.type !== 'fundamental')
      .forEach((data) => {
        totalQuestion.push(...data.questions)
      })
    quiz.data.totalQuestion = totalQuestion.length
  }, [])

  const ProgressIndicator = () => {
    if (
      quiz.data.sections[appContext.currentSection].type !== 'fundamental' &&
      appContext.currentQuestion !== null
    ) {
      return (
        <div className="relative w-full grid md:grid-cols-3 border-y-2 border-black">
          {quiz.data.sections.map(
            (data, id) =>
              data.type !== 'fundamental' && (
                <div
                  key={id}
                  className="relative md:border-r-2 border-black text-center text-footer md:text-nav font-maisonMono py-3"
                >
                  <span className="relative z-20 uppercase">
                    {data.title.en}
                  </span>
                </div>
              ),
          )}
          <div
            className={`absolute top-0 left-0 h-full z-10 bg-yellow`}
            style={{
              width: `${
                (appContext.currentQuestion / quiz.data.totalQuestion) * 100
              }%`,
            }}
          />
        </div>
      )
    }
  }

  return (
    <Layout>
      <NextSeo title="Home" />
      <main className="bg-blue w-full min-h-screen flex flex-col justify-between">
        <Header />
        <HeaderGap />
        <div className="relative w-full h-full min-h-screen md:min-h-fit flex flex-col justify-center items-center grow">
          {!loading ? (
            quiz.data.sections[appContext.currentSection].type ===
            'fundamental' ? (
              <FundamentalComponent
                nextSection={quiz.data.sections[appContext.currentSection + 1]}
                nextQuestion={
                  quiz.data.sections[appContext.currentSection].questions[
                    appContext.currentQuestion + 1
                  ]
                }
                title={quiz.data.sections[appContext.currentSection].title.en}
                subTitle={
                  quiz.data.sections[appContext.currentSection].questions[
                    appContext.currentQuestion
                  ].content.en
                }
                placeholder={
                  quiz.data.sections[appContext.currentSection].questions[
                    appContext.currentQuestion
                  ].content.placeholder.en
                }
              />
            ) : quiz.data.sections[appContext.currentSection].type ===
              'quiz' ? (
              !appContext.currentQuestion &&
              appContext.currentQuestion !== 0 ? (
                <TitleComponent
                  nextSection={
                    quiz.data.sections[appContext.currentSection + 1]
                  }
                  nextQuestion={0}
                  title={quiz.data.sections[appContext.currentSection].title.en}
                  subTitle={
                    quiz.data.sections[appContext.currentSection].cover.title.en
                  }
                  button={
                    quiz.data.sections[appContext.currentSection].cover.button
                      .en
                  }
                  imageLeft={
                    quiz.data.sections[appContext.currentSection].cover.image
                      .left
                  }
                  imageRight={
                    quiz.data.sections[appContext.currentSection].cover.image
                      .right
                  }
                />
              ) : quiz.data.sections[appContext.currentSection].questions[
                  appContext.currentQuestion
                ].type === 'option' ? (
                quiz.data.sections[appContext.currentSection].questions[
                  appContext.currentQuestion
                ].answerType === 'icon' ? (
                  <IconComponent
                    nextSection={
                      quiz.data.sections[appContext.currentSection + 1]
                    }
                    nextQuestion={
                      quiz.data.sections[appContext.currentSection].questions[
                        appContext.currentQuestion + 1
                      ]
                    }
                    title={
                      quiz.data.sections[appContext.currentSection].title.en
                    }
                    subTitle={
                      quiz.data.sections[appContext.currentSection].questions[
                        appContext.currentQuestion
                      ].content.en
                    }
                    answers={
                      quiz.data.sections[appContext.currentSection].questions[
                        appContext.currentQuestion
                      ].answers
                    }
                  />
                ) : quiz.data.sections[appContext.currentSection].questions[
                    appContext.currentQuestion
                  ].content.image ? (
                  <TextImageComponent
                    nextSection={
                      quiz.data.sections[appContext.currentSection + 1]
                    }
                    nextQuestion={
                      quiz.data.sections[appContext.currentSection].questions[
                        appContext.currentQuestion + 1
                      ]
                    }
                    title={
                      quiz.data.sections[appContext.currentSection].title.en
                    }
                    subTitle={
                      quiz.data.sections[appContext.currentSection].questions[
                        appContext.currentQuestion
                      ].content.en
                    }
                    answers={
                      quiz.data.sections[appContext.currentSection].questions[
                        appContext.currentQuestion
                      ].answers
                    }
                    image={
                      quiz.data.sections[appContext.currentSection].questions[
                        appContext.currentQuestion
                      ].content.image
                    }
                  />
                ) : quiz.data.sections[appContext.currentSection].questions[
                    appContext.currentQuestion
                  ].answerType === 'text' ? (
                  <TextButtonComponent
                    nextSection={
                      quiz.data.sections[appContext.currentSection + 1]
                    }
                    nextQuestion={
                      quiz.data.sections[appContext.currentSection].questions[
                        appContext.currentQuestion + 1
                      ]
                    }
                    title={
                      quiz.data.sections[appContext.currentSection].title.en
                    }
                    subTitle={
                      quiz.data.sections[appContext.currentSection].questions[
                        appContext.currentQuestion
                      ].content.en
                    }
                    answers={
                      quiz.data.sections[appContext.currentSection].questions[
                        appContext.currentQuestion
                      ].answers
                    }
                  />
                ) : (
                  <ImageComponent
                    nextSection={
                      quiz.data.sections[appContext.currentSection + 1]
                    }
                    nextQuestion={
                      quiz.data.sections[appContext.currentSection].questions[
                        appContext.currentQuestion + 1
                      ]
                    }
                    title={
                      quiz.data.sections[appContext.currentSection].title.en
                    }
                    subTitle={
                      quiz.data.sections[appContext.currentSection].questions[
                        appContext.currentQuestion
                      ].content.en
                    }
                    answers={
                      quiz.data.sections[appContext.currentSection].questions[
                        appContext.currentQuestion
                      ].answers
                    }
                  />
                )
              ) : (
                <>
                  <PickupComponent
                    nextSection={
                      quiz.data.sections[appContext.currentSection + 1]
                    }
                    nextQuestion={
                      quiz.data.sections[appContext.currentSection].questions[
                        appContext.currentQuestion + 1
                      ]
                    }
                    title={
                      quiz.data.sections[appContext.currentSection].title.en
                    }
                    subTitle={
                      quiz.data.sections[appContext.currentSection].questions[
                        appContext.currentQuestion
                      ].content.en
                    }
                    answers={
                      quiz.data.sections[appContext.currentSection].questions[
                        appContext.currentQuestion
                      ].answers
                    }
                  />
                  {console.log('pickup')}
                </>
              )
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
        <ProgressIndicator />
        <Footer />
      </main>
    </Layout>
  )
}
