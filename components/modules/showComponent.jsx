'use client'

import Image from 'next/image'
import Container from '../container'
import { RoundedFullButton } from '../utils/buttons'
import ResultComponent from './resultComponent'
import TitleComponent from './titleComponent'
import parse from 'html-react-parser'
import QuestionComponent from './questionComponent'
import { usePathname } from 'next/navigation'

const ShowComponent = ({
  quiz,
  checkStorage,
  setCheckStorage,
  status,
  setStatus,
  currentSection,
  setCurrentSection,
  currentQuestion,
  setCurrentQuestion,
  setColor,
  controls,
  setReset,
}) => {
  const getPath = usePathname()
  const section = quiz.sections[currentSection]
  const question = section?.questions[currentQuestion]
  const nextSection = quiz.sections[currentSection + 1]
  const nextQuestion = section?.questions[currentQuestion + 1]

  if (!checkStorage) {
    return (
      <div className="w-full flex flex-col lg:flex-row self-stretch">
        <Container className="w-full h-full flex flex-col lg:flex-row items-end lg:items-center">
          <div className="w-full lg:w-1/2 min-h-[50vh] lg:h-full flex flex-col items-center lg:items-start justify-center pt-[40px] pb-14 lg:pt-0 lg:pb-0 lg:pr-8">
            <h1 className="uppercase text-mopHeading max-w-md md:max-w-lg lg:max-w-none text-center lg:text-left lg:text-opHeading m-0 leading-none mb-6">
              {parse(
                getPath === '/en'
                  ? quiz.coverPage.title.en
                  : quiz.coverPage.title.id,
              )}
            </h1>
            <p className="max-w-[260px] md:max-w-md lg:mb-12 text-center lg:text-left text-[15px] md:text-body leading-[19.5px]">
              {parse(
                getPath === '/en'
                  ? quiz.coverPage.description.en
                  : quiz.coverPage.description.id,
              )}
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
                    updatedAt: quiz.timestamp,
                    expired: new Date(Date.now() + 86400 * 1000).getTime(),
                  }),
                )
                controls.start('hidden')
                setTimeout(() => {
                  controls.start('visible')
                  setColor({
                    header: quiz.sections[0].bgColor,
                    bg: quiz.sections[0].bgColor,
                  })
                  setCurrentSection(0)
                  setCurrentQuestion(0)
                  setCheckStorage(true)
                }, 500)
              }}
            >
              {getPath === '/en'
                ? quiz.coverPage.buttonText.en
                : quiz.coverPage.buttonText.id}
            </RoundedFullButton>
          </div>
          <div className="lg:hidden w-full h-[379px] md:h-[400px]" />
        </Container>
        <div className="hidden lg:block absolute top-0 right-0 w-full lg:w-1/2 h-[50vh] lg:h-full bg-white">
          <Image
            src={quiz.coverPage.coverImage}
            fill
            style={{
              objectFit: 'cover',
            }}
            loading="eager"
            priority={true}
          />
        </div>
        <div className="lg:hidden absolute bottom-0 right-0 w-full h-[379px] md:h-[400px] bg-white">
          <Image
            src={quiz.coverPage.coverImage}
            fill
            style={{
              objectFit: 'cover',
            }}
            loading="eager"
            priority={true}
          />
          <RoundedFullButton
            icon
            className="lg:hidden relative z-20 -top-5 mx-auto w-fit"
            onClick={() => {
              localStorage.setItem(
                'questionnaire',
                JSON.stringify({
                  currentSection: 0,
                  currentQuestion: 0,
                  questionnaireRespond: [],
                  status: 'progress',
                  updatedAt: quiz.timestamp,
                  expired: new Date(Date.now() + 86400 * 1000).getTime(),
                }),
              )
              controls.start('hidden')
              setTimeout(() => {
                controls.start('visible')
                setColor({
                  header: quiz.sections[0].bgColor,
                  bg: quiz.sections[0].bgColor,
                })
                setCurrentSection(0)
                setCurrentQuestion(0)
                setCheckStorage(true)
              }, 500)
            }}
          >
            {getPath === '/en'
              ? quiz.coverPage.buttonText.en
              : quiz.coverPage.buttonText.id}
          </RoundedFullButton>
        </div>
      </div>
    )
  } else {
    if (status === 'progress') {
      if (section.type === 'fundamental') {
        return (
          <QuestionComponent
            continueTitle={
              getPath === '/en'
                ? quiz.defaultData.continueButtonText.en
                : quiz.defaultData.continueButtonText.id
            }
            sections={quiz.sections}
            questionId={question.ID}
            nextSection={nextSection}
            nextQuestion={nextQuestion}
            subTitle={
              getPath === '/en' ? question.content.en : question.content.id
            }
            placeholder={
              getPath === '/en'
                ? question.content.placeholder?.en
                : question.content.placeholder?.id
            }
            answers={question.answers}
            image={question.content.image}
            currentSection={currentSection}
            currentQuestion={currentQuestion}
            setCurrentSection={setCurrentSection}
            setCurrentQuestion={setCurrentQuestion}
            setStatus={setStatus}
            type={question.type}
            answerType={question.answerType}
            answerLimit={question.answerLimit}
            controls={controls}
          />
        )
      } else if (section.type === 'quiz') {
        if (currentQuestion === null) {
          return (
            <TitleComponent
              sections={quiz.sections}
              nextSection={nextSection}
              nextQuestion={section?.questions[0]}
              currentSection={currentSection}
              currentQuestion={currentQuestion}
              setCurrentSection={setCurrentSection}
              setCurrentQuestion={setCurrentQuestion}
              setStatus={setStatus}
              controls={controls}
            />
          )
        } else {
          return (
            <QuestionComponent
              continueTitle={
                getPath === '/en'
                  ? quiz.defaultData.continueButtonText.en
                  : quiz.defaultData.continueButtonText.id
              }
              sections={quiz.sections}
              questionId={question.ID}
              nextSection={nextSection}
              nextQuestion={nextQuestion}
              subTitle={
                getPath === '/en' ? question.content.en : question.content.id
              }
              placeholder={
                getPath === '/en'
                  ? question.content.placeholder?.en
                  : question.content.placeholder?.id
              }
              answers={question.answers}
              image={question.content.image}
              currentSection={currentSection}
              currentQuestion={currentQuestion}
              setCurrentSection={setCurrentSection}
              setCurrentQuestion={setCurrentQuestion}
              setStatus={setStatus}
              type={question.type}
              answerType={question.answerType}
              answerLimit={question.answerLimit}
              controls={controls}
            />
          )
        }
      }
    } else {
      return <ResultComponent quiz={quiz} setReset={setReset} />
    }
  }
}

export default ShowComponent
