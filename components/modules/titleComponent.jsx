'use client'

import Image from 'next/image'
import Container from '../container'
import { RoundedFullButton } from '../utils/buttons'
import Heading from '../utils/heading'

const TitleComponent = ({
  title = '',
  subTitle = '',
  button = '',
  nextQuestion,
  nextSection,
  imageLeft,
  imageRight,
  currentSection,
  currentQuestion,
  setCurrentSection,
  setCurrentQuestion,
  setStatus,
}) => {
  const skipQuestion = () => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))

    const skip = section.questions[currentQuestion + 2]
    if (skip) {
      localStorage.setItem(
        'questionnaire',
        JSON.stringify({
          currentSection: currentSection,
          currentQuestion: currentQuestion + 2,
          questionnaireRespond: dataQuestionnaire.questionnaireRespond,
          status:
            nextQuestion !== undefined || nextSection !== undefined
              ? 'progress'
              : 'finish',
          expired: dataQuestionnaire.expired,
        }),
      )

      setCurrentSection(currentSection)
      setCurrentQuestion(currentQuestion + 2)
      setStatus(
        nextQuestion !== undefined || nextSection !== undefined
          ? 'progress'
          : 'finish',
      )
    } else {
      localStorage.setItem(
        'questionnaire',
        JSON.stringify({
          currentSection: currentSection + 1,
          currentQuestion: nextSection?.type === 'fundamental' ? 0 : null,
          questionnaireRespond: dataQuestionnaire.questionnaireRespond,
          status:
            nextQuestion !== undefined || nextSection !== undefined
              ? 'progress'
              : 'finish',
          expired: dataQuestionnaire.expired,
        }),
      )

      setCurrentSection(currentSection + 1)
      setCurrentQuestion(nextSection?.type === 'fundamental' ? 0 : null)
      setStatus(
        nextQuestion !== undefined || nextSection !== undefined
          ? 'progress'
          : 'finish',
      )
    }
  }

  const handleOnClick = () => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))
    if (nextQuestion?.display.state === 0) {
      const checkSkip = nextQuestion.display.condition.find((i) =>
        i.answer.find(
          (j) =>
            j ===
            dataQuestionnaire.questionnaireRespond
              .find((f) =>
                f.responds.find((g) => g.questionID === i.questionID),
              )
              ?.responds.find((h) => h.questionID === i.questionID)
              .answer.find((k) => k === j),
        ),
      )

      if (!checkSkip) {
        skipQuestion()
      } else {
        localStorage.setItem(
          'questionnaire',
          JSON.stringify({
            currentSection: nextQuestion
              ? currentSection
              : nextSection
              ? currentSection + 1
              : null,
            currentQuestion: nextQuestion
              ? currentQuestion === null
                ? 0
                : currentQuestion + 1
              : nextSection?.type === 'fundamental'
              ? 0
              : null,
            questionnaireRespond: dataQuestionnaire.questionnaireRespond,
            status:
              nextQuestion !== undefined || nextSection !== undefined
                ? 'progress'
                : 'finish',
            expired: dataQuestionnaire.expired,
          }),
        )

        setCurrentSection(
          nextQuestion
            ? currentSection
            : nextSection
            ? currentSection + 1
            : null,
        )
        setCurrentQuestion(
          nextQuestion
            ? currentQuestion === null
              ? 0
              : currentQuestion + 1
            : nextSection?.type === 'fundamental'
            ? 0
            : null,
        )
        setStatus(
          nextQuestion !== undefined || nextSection !== undefined
            ? 'progress'
            : 'finish',
        )
      }
    } else {
      localStorage.setItem(
        'questionnaire',
        JSON.stringify({
          currentSection: nextQuestion
            ? currentSection
            : nextSection
            ? currentSection + 1
            : null,
          currentQuestion: nextQuestion
            ? currentQuestion === null
              ? 0
              : currentQuestion + 1
            : nextSection?.type === 'fundamental'
            ? 0
            : null,
          questionnaireRespond: dataQuestionnaire.questionnaireRespond,
          status:
            nextQuestion !== undefined || nextSection !== undefined
              ? 'progress'
              : 'finish',
          expired: dataQuestionnaire.expired,
        }),
      )

      setCurrentSection(
        nextQuestion ? currentSection : nextSection ? currentSection + 1 : null,
      )
      setCurrentQuestion(
        nextQuestion
          ? currentQuestion === null
            ? 0
            : currentQuestion + 1
          : nextSection?.type === 'fundamental'
          ? 0
          : null,
      )
      setStatus(
        nextQuestion !== undefined || nextSection !== undefined
          ? 'progress'
          : 'finish',
      )
    }
  }

  return (
    <Container
      className="w-full h-full flex justify-center items-center"
      maxWidth="max-w-2xl"
    >
      <div className="relative w-fit flex flex-col items-center">
        <Heading
          title={title}
          subTitle={subTitle}
          letterSpacing={true}
          subTitleSizeMobile="text-mheading"
        />
        <RoundedFullButton
          className="uppercase tracking-default"
          onClick={handleOnClick}
        >
          {button}
        </RoundedFullButton>
        <div className="absolute left-1/2 -translate-x-[138%] rotate-[-60deg] md:translate-x-0 md:rotate-0 md:left-auto md:right-full top-full -translate-y-[25%] md:top-1/2 md:-translate-y-1/2">
          <div className="relative w-44 h-44 md:w-72 md:h-72">
            <Image
              src={imageLeft}
              fill
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
        <div className="absolute left-1/2 translate-x-[24%] rotate-[120deg] md:rotate-0 md:translate-x-0 md:right-auto md:left-full bottom-full md:bottom-auto translate-y-[12%] md:top-1/2 md:-translate-y-1/2">
          <div className="relative w-44 h-44 md:w-72 md:h-72">
            <Image
              src={imageRight}
              fill
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default TitleComponent
