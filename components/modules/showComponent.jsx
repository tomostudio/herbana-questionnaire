'use client'

import Image from 'next/image'
import Container from '../container'
import { RoundedFullButton } from '../utils/buttons'
import FundamentalComponent from './fundamentalComponent'
import IconComponent from './iconComponent'
import ImageComponent from './imageComponent'
import PickupComponent from './pickupComponent'
import ResultComponent from './resultComponent'
import TextButtonComponent from './textButtonComponent'
import TextImageComponent from './textImageComponent'
import TitleComponent from './titleComponent'

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
}) => {
  const section = quiz.sections[currentSection]
  const question = section?.questions[currentQuestion]
  const nextSection = quiz.sections[currentSection + 1]
  const nextQuestion = section?.questions[currentQuestion + 1]

  if (!checkStorage) {
    return (
      <div className="w-full flex flex-col lg:flex-row self-stretch">
        <Container className="w-full h-full flex flex-col lg:flex-row items-end lg:items-center">
          <div className="w-full lg:w-1/2 min-h-[50vh] lg:h-full flex flex-col items-center lg:items-start justify-center pt-16 pb-20 lg:pt-0 lg:pb-0 lg:pr-8">
            <h1 className="uppercase text-mopHeading max-w-md md:max-w-lg lg:max-w-none text-center lg:text-left lg:text-opHeading m-0 leading-none mb-6">
              {quiz.coverPage.title.en}
            </h1>
            <p className="max-w-sm md:max-w-md lg:max-w-lg lg:mb-12 text-center lg:text-left">
              {quiz.coverPage.description.en}
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
                // setColor({
                //   header: '#FFF7E9',
                //   bg: '#FFF7E9',
                // })
                setCheckStorage(true)
              }}
            >
              {quiz.coverPage.buttonText.en}
            </RoundedFullButton>
          </div>
          <div className="lg:hidden w-full h-[379px] md:h-[400px]" />
        </Container>
        <div className="hidden lg:block absolute top-0 right-0 w-full lg:w-1/2 h-[50vh] lg:h-full">
          <Image
            src={quiz.coverPage.coverImage}
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <div className="lg:hidden absolute bottom-0 right-0 w-full h-[379px] md:h-[400px]">
          <Image
            src={quiz.coverPage.coverImage}
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
                  expired: new Date(Date.now() + 86400 * 1000).getTime(),
                }),
              )
              // setColor({
              //   header: '#FFF7E9',
              //   bg: '#FFF7E9',
              // })
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
          <FundamentalComponent
            section={section}
            questionId={question.ID}
            nextSection={nextSection}
            nextQuestion={nextQuestion}
            subTitle={question.content.en}
            placeholder={question.content.placeholder.en}
            currentSection={currentSection}
            currentQuestion={currentQuestion}
            setCurrentSection={setCurrentSection}
            setCurrentQuestion={setCurrentQuestion}
            setStatus={setStatus}
          />
        )
      } else if (section.type === 'quiz') {
        if (currentQuestion === null) {
          return (
            <TitleComponent
              nextSection={nextSection}
              nextQuestion={section?.questions[0]}
              title={section.title.en}
              subTitle={section.cover.title.en}
              button={section.cover.button.en}
              imageLeft={section.cover.image.left}
              imageRight={section.cover.image.right}
              currentSection={currentSection}
              currentQuestion={currentQuestion}
              setCurrentSection={setCurrentSection}
              setCurrentQuestion={setCurrentQuestion}
              setStatus={setStatus}
            />
          )
        } else {
          if (question.type === 'option') {
            if (question.answerType === 'icon') {
              return (
                <IconComponent
                  section={section}
                  questionId={question.ID}
                  nextSection={nextSection}
                  nextQuestion={nextQuestion}
                  subTitle={question.content.en}
                  answers={question.answers}
                  currentSection={currentSection}
                  currentQuestion={currentQuestion}
                  setCurrentSection={setCurrentSection}
                  setCurrentQuestion={setCurrentQuestion}
                  setStatus={setStatus}
                />
              )
            } else if (question.answerType === 'text') {
              return (
                <TextButtonComponent
                  section={section}
                  questionId={question.ID}
                  nextSection={nextSection}
                  nextQuestion={nextQuestion}
                  subTitle={question.content.en}
                  answers={question.answers}
                  currentSection={currentSection}
                  currentQuestion={currentQuestion}
                  setCurrentSection={setCurrentSection}
                  setCurrentQuestion={setCurrentQuestion}
                  setStatus={setStatus}
                />
              )
            } else if (question.content.image) {
              return (
                <TextImageComponent
                  section={section}
                  questionId={question.ID}
                  nextSection={nextSection}
                  nextQuestion={nextQuestion}
                  subTitle={question.content.en}
                  answers={question.answers}
                  image={question.content.image}
                  currentSection={currentSection}
                  currentQuestion={currentQuestion}
                  setCurrentSection={setCurrentSection}
                  setCurrentQuestion={setCurrentQuestion}
                  setStatus={setStatus}
                />
              )
            } else {
              return (
                <ImageComponent
                  section={section}
                  questionId={question.ID}
                  nextSection={nextSection}
                  nextQuestion={nextQuestion}
                  subTitle={question.content.en}
                  answers={question.answers}
                  currentSection={currentSection}
                  currentQuestion={currentQuestion}
                  setCurrentSection={setCurrentSection}
                  setCurrentQuestion={setCurrentQuestion}
                  setStatus={setStatus}
                />
              )
            }
          } else {
            return (
              <PickupComponent
                section={section}
                questionId={question.ID}
                nextSection={nextSection}
                nextQuestion={nextQuestion}
                subTitle={question.content.en}
                answers={question.answers}
                currentSection={currentSection}
                currentQuestion={currentQuestion}
                setCurrentSection={setCurrentSection}
                setCurrentQuestion={setCurrentQuestion}
                setStatus={setStatus}
              />
            )
          }
        }
      }
    } else {
      return (
        <ResultComponent
          title={quiz.beforeResult.title.en}
          description={quiz.beforeResult.description.en}
          formTitle={quiz.beforeResult.formTitle.en}
          emailPlaceholder={quiz.beforeResult.emailPlaceholder.en}
          phonePlaceholder={quiz.beforeResult.phonePlaceholder.en}
          buttonText={quiz.beforeResult.buttonText.en}
          coverImage={quiz.beforeResult.coverImage}
        />
      )
    }
  }
}

export default ShowComponent
