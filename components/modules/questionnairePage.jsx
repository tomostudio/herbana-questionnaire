'use client'

import Footer from '@/components/footer'
import Header from '@/components/header'
import HeaderGap from '@/components/headerGap'
import { DefaultButton } from '@/components/utils/buttons'
import { ArrowLeft } from '@/components/utils/svg'
import { useEffect, useState } from 'react'
import quizData from '../../app/sample-data.json'
import ProgressIndicator from '@/components/modules/progressIndicator'
import ShowComponent from '@/components/modules/showComponent'
import Container from '../container'

const QuestionnairePage = () => {
  const quiz = quizData.data
  const [loading, setLoading] = useState(true)
  const [checkStorage, setCheckStorage] = useState(true)
  const [color, setColor] = useState({
    header: '#FFF7E9',
    bg: '#DFF2F7',
  })
  const [currentSection, setCurrentSection] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [status, setStatus] = useState('progress')

  let totalQuestion = []

  quiz.sections
    .filter((data) => data.type !== 'fundamental')
    .forEach((data) => {
      totalQuestion.push(...data.questions)
    })

  quiz.sections = quiz.sections.map((data) => {
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

  quiz.totalQuestion = totalQuestion.length

  useEffect(() => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))
    if (dataQuestionnaire) {
      if (currentSection === undefined || currentSection === null) {
        setColor({
          header: '#FFF7E9',
          bg: '#DFF2F7',
        })
      } else {
        setColor({
          header: quiz.sections[currentSection].bgColor,
          bg: quiz.sections[currentSection].bgColor,
        })
      }
    }
  }, [currentSection])

  useEffect(() => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))
    if (dataQuestionnaire) {
      if (Date.now() > dataQuestionnaire.expired) {
        localStorage.removeItem('questionnaire')
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

  if (loading) {
    return <></>
  } else {
    return (
      <main
        className="w-full min-h-screen flex flex-col justify-between"
        style={{
          backgroundColor: color.bg,
        }}
      >
        <div className="relative w-full h-full flex flex-col grow overflow-hidden">
          <Header
            background={color.header}
            header={quiz.headerData}
            setCheckStorage={setCheckStorage}
            setStatus={setStatus}
            setColor={setColor}
            setCurrentSection={setCurrentSection}
            setCurrentQuestion={setCurrentQuestion}
          />
          <HeaderGap />
          {checkStorage && status === 'progress' && currentQuestion !== null && quiz.sections[currentSection].type !== 'fundamental' ? (
            <div className="relative md:hidden w-full border-b-default border-black">
              <div className="relative z-10 text-center text-footer font-maisonMono py-3">
                <span className="relative uppercase">
                  {quiz.sections[currentSection].title.en}
                </span>
              </div>
              <div
                className={`absolute top-0 left-0 h-full bg-yellow transition-all duration-300`}
                style={{
                  width: `${
                    (quiz.sections[currentSection].questions[currentQuestion]
                      .current /
                      quiz.totalQuestion) *
                    100
                  }%`,
                }}
              />
            </div>
          ) : (
            <></>
          )}
          <div className="relative w-full h-full grow flex items-center">
            <ShowComponent
              quiz={quiz}
              checkStorage={checkStorage}
              setCheckStorage={setCheckStorage}
              status={status}
              setStatus={setStatus}
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              setColor={setColor}
            />
          </div>

          {checkStorage && status === 'progress' ? (
            quiz.sections[currentSection].type === 'fundamental' ? (
              <Container className="absolute bottom-3 left-1/2 -translate-x-1/2">
                <DefaultButton
                  className="w-fit flex items-center text-footer md:text-nav font-maisonMono uppercase"
                  onClick={() => {
                    if (currentSection === 0) {
                      localStorage.removeItem('questionnaire')
                      setCurrentSection(0)
                      setCurrentQuestion(0)
                      setCheckStorage(false)
                      setColor({
                        header: '#FFF7E9',
                        bg: '#DFF2F7',
                      })
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
                            quiz.sections[currentSection - 1].questions.length -
                            1,
                          questionnaireRespond:
                            dataQuestionnaire.questionnaireRespond,
                          status: 'progress',
                          expired: dataQuestionnaire.expired,
                        }),
                      )
                      setCurrentSection(currentSection - 1)
                      setCurrentQuestion(
                        quiz.sections[currentSection - 1].questions.length - 1,
                      )
                      setColor({
                        header: quiz.sections[currentSection].bgColor,
                        bg: quiz.sections[currentSection].bgColor,
                      })
                    }
                  }}
                >
                  <ArrowLeft className="mr-3 md:mr-4 w-[23px] md:w-auto" />
                  BACK
                </DefaultButton>
              </Container>
            ) : currentQuestion !== null ? (
              <ProgressIndicator
                currentSection={currentSection}
                currentQuestion={currentQuestion}
                setCurrentSection={setCurrentSection}
                setCurrentQuestion={setCurrentQuestion}
                sections={quiz.sections}
                totalQuestion={quiz.totalQuestion}
              />
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
        <Footer footer={quiz.footerData} />
      </main>
    )
  }
}

export default QuestionnairePage