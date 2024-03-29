'use client'
import Footer from '@/components/footer'
import Header from '@/components/header'
import HeaderGap from '@/components/headerGap'
import { useEffect, useState } from 'react'
import ProgressIndicator from '@/components/modules/progressIndicator'
import ShowComponent from '@/components/modules/showComponent'
import BackComponent from '@/components/utils/backComponent'
import { motion, useAnimation } from 'framer-motion'
import { usePathname } from 'next/navigation'

const Quiz = () => {
  const getPath = usePathname()
  const [checkStorage, setCheckStorage] = useState(true)
  const [reset, setReset] = useState(false)
  const [color, setColor] = useState({
    header: '#FFF7E9',
    bg: '#DFF2F7',
  })
  const [currentSection, setCurrentSection] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [status, setStatus] = useState('progress')
  const [quiz, setQuiz] = useState(null)
  const controls = useAnimation()
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const handleFetchData = () => {
    fetch('https://herbana.id/quiz-api.php', { cache: 'force-cache' })
      .then((res) => res.json())
      .then((quizData) => {
        let totalQuestion = []

        quizData.sections
          .filter((data) => data.type !== 'fundamental')
          .forEach((data) => {
            totalQuestion.push(...data.questions)
          })

        quizData.sections = quizData.sections.map((data) => {
          if (data.type !== 'fundamental') {
            return {
              ...data,
              questions: data.questions.map((e, index) => {
                return {
                  ...e,
                  current: index + 1,
                }
              }),
            }
          } else {
            return data
          }
        })

        // quizData.totalQuestion = totalQuestion.length

        setQuiz(quizData)

        const dataQuestionnaire = JSON.parse(
          localStorage.getItem('questionnaire'),
        )
        if (dataQuestionnaire) {
          if (dataQuestionnaire.currentSection !== null) {
            setColor({
              header:
                quizData.sections[dataQuestionnaire.currentSection].bgColor,
              bg: quizData.sections[dataQuestionnaire.currentSection].bgColor,
            })
          }
        }
      })
  }

  useEffect(() => {
    if (reset) {
      setReset(false)
      localStorage.removeItem('questionnaire')
      setCurrentSection(null)
      setCurrentQuestion(null)
      setCheckStorage(false)
      setStatus('progress')
      setColor({
        header: '#FFF7E9',
        bg: '#DFF2F7',
      })
    }
    handleFetchData()
  }, [reset])

  useEffect(() => {
    window.scroll(0, 0)
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))
    if (dataQuestionnaire) {
      if (dataQuestionnaire.currentSection === null) {
        setColor({
          header: '#FFF7E9',
          bg: '#DFF2F7',
        })
      } else {
        if (quiz) {
          setColor({
            header: quiz.sections[dataQuestionnaire.currentSection].bgColor,
            bg: quiz.sections[dataQuestionnaire.currentSection].bgColor,
          })
        }
      }
    }
  }, [currentSection])

  useEffect(() => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))
    if (dataQuestionnaire) {
      if (Date.now() > dataQuestionnaire.expired) {
        localStorage.removeItem('questionnaire')
        window.location.reload()
      } else {
        setCurrentSection(dataQuestionnaire.currentSection)
        setCurrentQuestion(dataQuestionnaire.currentQuestion)
        setStatus(dataQuestionnaire.status)
        setCheckStorage(true)
      }
    } else {
      setStatus('progress')
      setCheckStorage(false)
    }
  }, [])

  return !quiz ? (
    <></>
  ) : (
    <>
      <main
        className="w-full  flex flex-col justify-between"
        style={{
          backgroundColor: color.bg,
        }}
      >
        <div className="relative min-h-screen w-full h-full flex flex-col grow overflow-hidden">
          <Header
            background={color.header}
            header={quiz.headerData}
            setCheckStorage={setCheckStorage}
            setStatus={setStatus}
            setColor={setColor}
            setCurrentSection={setCurrentSection}
            setCurrentQuestion={setCurrentQuestion}
            setReset={setReset}
          />
          <HeaderGap />
          {checkStorage &&
          status === 'progress' &&
          currentQuestion !== null &&
          quiz.sections[currentSection].type !== 'fundamental' ? (
            <div className="relative md:hidden w-full border-b md:border-b-default border-black">
              <div className="relative z-10 text-center text-footer font-maisonMono pt-3.5 pb-3">
                <span className="relative uppercase">
                  {getPath === '/en'
                    ? quiz.sections[currentSection].title.en
                    : quiz.sections[currentSection].title.id}
                </span>
              </div>
              <div
                className={`absolute top-0 left-0 h-full bg-yellow transition-all duration-300`}
                style={{
                  width: `${
                    ((quiz.sections[currentSection].questions[currentQuestion]
                      .current -
                      1) /
                      quiz.sections[currentSection].questions.length) *
                    100
                  }%`,
                }}
              />
            </div>
          ) : (
            <></>
          )}
          <motion.div
            animate={controls}
            variants={variants}
            transition={{ ease: 'linear' }}
            className="relative w-full h-full grow flex items-center"
          >
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
              controls={controls}
              setReset={setReset}
            />
          </motion.div>

          {checkStorage && status === 'progress' ? (
            quiz.sections[currentSection].type === 'fundamental' ? (
              <div className="relative flex flex-col w-full">
                <BackComponent
                  backButtonTitle={getPath === '/en' ? 'Back' : 'Kembali'}
                  currentSection={currentSection}
                  currentQuestion={currentQuestion}
                  setCurrentSection={setCurrentSection}
                  setCurrentQuestion={setCurrentQuestion}
                  setCheckStorage={setCheckStorage}
                  sections={quiz.sections}
                  setStatus={setStatus}
                  setColor={setColor}
                  type={quiz.sections[currentSection].type}
                  setReset={setReset}
                />
                <div className="hidden md:block h-[41px] w-full" />
              </div>
            ) : (
              <ProgressIndicator
                backButtonTitle={getPath === '/en' ? 'Back' : 'Kembali'}
                currentSection={currentSection}
                currentQuestion={currentQuestion}
                setCurrentSection={setCurrentSection}
                setCurrentQuestion={setCurrentQuestion}
                setCheckStorage={setCheckStorage}
                sections={quiz.sections}
                setStatus={setStatus}
                setColor={setColor}
              />
            )
          ) : (
            <></>
          )}
        </div>
        <Footer footer={quiz.footerData} />
      </main>
    </>
  )
}

export default Quiz
