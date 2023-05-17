'use client'

import Image from 'next/image'
import Container from '../container'
import { RoundedFullButton } from '../utils/buttons'
import ResultComponent from './resultComponent'
import TitleComponent from './titleComponent'
import parse from 'html-react-parser'
import QuestionComponent from './questionComponent'

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
}) => {
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
              {parse(quiz.coverPage.title.en)}
            </h1>
            <p className="max-w-[260px] md:max-w-md lg:mb-12 text-center lg:text-left text-[15px] md:text-body leading-[19.5px]">
              {parse(quiz.coverPage.description.en)}
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
                    expired: new Date(Date.now() + 86400 * 1000).getTime(),
                  }),
                )
                setColor({
                  header: section.bgColor,
                  bg: section.bgColor,
                })
                setCurrentSection(0)
                setCurrentQuestion(0)
                setCheckStorage(true)
              }}
            >
              {quiz.coverPage.buttonText.en}
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
            loading='eager'
          />
        </div>
        <div className="lg:hidden absolute bottom-0 right-0 w-full h-[379px] md:h-[400px] bg-white">
          <Image
            src={quiz.coverPage.coverImage}
            fill
            style={{
              objectFit: 'cover',
            }}
            loading='eager'
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
                  expired: new Date(Date.now() + 86400 * 1000).getTime(),
                }),
              )
              setColor({
                header: section.bgColor,
                bg: section.bgColor,
              })
              setCurrentSection(0)
              setCurrentQuestion(0)
              setCheckStorage(true)
            }}
          >
            {quiz.coverPage.buttonText.en}
          </RoundedFullButton>
        </div>
      </div>
    )
  } else {
    if (status === 'progress') {
      if (section.type === 'fundamental') {
        return (
          <QuestionComponent
            sections={quiz.sections}
            questionId={question.ID}
            nextSection={nextSection}
            nextQuestion={nextQuestion}
            subTitle={question.content.en}
            placeholder={question.content.placeholder?.en}
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
            />
          )
        } else {
          return (
            <QuestionComponent
              sections={quiz.sections}
              questionId={question.ID}
              nextSection={nextSection}
              nextQuestion={nextQuestion}
              subTitle={question.content.en}
              placeholder={question.content.placeholder?.en}
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
            />
          )
        }
      }
    } else {
      return <ResultComponent quiz={quiz} />
    }
  }
}

export default ShowComponent
