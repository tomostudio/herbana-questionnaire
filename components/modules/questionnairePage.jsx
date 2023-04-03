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
        <Header background={color.header} header={quiz.headerData} />
        <HeaderGap />
        <div className="relative w-full h-full flex flex-col grow overflow-hidden">
          <div className="w-full h-full grow flex items-center">
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
            />
          </div>

          {checkStorage && status === 'progress' ? (
            quiz.sections[currentSection].type === 'fundamental' ? (
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
                  }
                }}
              >
                <ArrowLeft className="mr-4" />
                BACK
              </DefaultButton>
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
