'use client'

import { useState } from 'react'
import Container from '../container'
import { BorderButton, ImageButton } from '../utils/buttons'
import Heading from '../utils/heading'

const PickupComponent = ({
  section,
  subTitle = '',
  nextQuestion,
  nextSection,
  answers,
  currentSection,
  currentQuestion,
  setCurrentSection,
  setCurrentQuestion,
  questionId,
  setStatus
}) => {
  const title = section.title.en
  const sectionId = section.ID

  const [getAnswer, setAnswer] = useState([])

  const updateQuestionnaire = () => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))
    const sectionExists = dataQuestionnaire.questionnaireRespond.find(
      (f) => f.sectionid === sectionId,
    )
    const sectionFilter = dataQuestionnaire.questionnaireRespond.filter(
      (f) => f.sectionid !== sectionId,
    )

    const newRespond = {
      questionID: questionId,
      answer: getAnswer,
      type: 'multiple', // SELECT, MULTIPLE, STRING
    }

    const newSection = {
      sectionid: sectionId,
      responds: [newRespond],
    }

    const updatedResponds = sectionExists
      ? [
          ...sectionFilter,
          {
            sectionid: sectionExists.sectionid,
            responds: [
              ...sectionExists.responds,
              // RESPOND OBJECT
              newRespond,
            ],
          },
        ]
      : [...dataQuestionnaire.questionnaireRespond, newSection]

    localStorage.setItem(
      'questionnaire',
      JSON.stringify({
        currentSection: nextQuestion
          ? currentSection
          : nextSection
          ? currentSection + 1
          : null,
        currentQuestion: nextQuestion
          ? currentQuestion + 1
          : nextSection?.type === 'fundamental'
          ? 0
          : null,
        questionnaireRespond: updatedResponds,
        status: nextQuestion !== undefined || nextSection !== undefined ? 'progress' : 'finish',
        expired: dataQuestionnaire.expired,
      }),
    )
  }

  const skipQuestion = () => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))

    const sectionExists = dataQuestionnaire.questionnaireRespond.find(
      (f) => f.sectionid === sectionId,
    )
    const sectionFilter = dataQuestionnaire.questionnaireRespond.filter(
      (f) => f.sectionid !== sectionId,
    )

    const newRespond = {
      questionID: questionId,
      answer: getAnswer,
      type: 'multiple', // SELECT, MULTIPLE, STRING
    }

    const newSection = {
      sectionid: sectionId,
      responds: [newRespond],
    }

    const updatedResponds = sectionExists
      ? [
          ...sectionFilter,
          {
            sectionid: sectionExists.sectionid,
            responds: [
              ...sectionExists.responds,
              // RESPOND OBJECT
              newRespond,
            ],
          },
        ]
      : [...dataQuestionnaire.questionnaireRespond, newSection]

    const skip = section.questions[currentQuestion + 2]
    if (skip) {
      localStorage.setItem(
        'questionnaire',
        JSON.stringify({
          currentSection: currentSection,
          currentQuestion: currentQuestion + 2,
          questionnaireRespond: updatedResponds,
          status: nextQuestion !== undefined || nextSection !== undefined ? 'progress' : 'finish',
          expired: dataQuestionnaire.expired,
        }),
      )

      setCurrentSection(currentSection)
      setCurrentQuestion(currentQuestion + 2)
      setStatus(nextQuestion !== undefined || nextSection !== undefined ? 'progress' : 'finish')
    } else {
      localStorage.setItem(
        'questionnaire',
        JSON.stringify({
          currentSection: currentSection + 1,
          currentQuestion: nextSection?.type === 'fundamental' ? 0 : null,
          questionnaireRespond: updatedResponds,
          status: nextQuestion !== undefined || nextSection !== undefined ? 'progress' : 'finish',
          expired: dataQuestionnaire.expired,
        }),
      )

      setCurrentSection(
        nextQuestion ? currentSection : nextSection ? currentSection + 1 : null,
      )
      setCurrentQuestion(
        nextQuestion
          ? currentQuestion + 1
          : nextSection?.type === 'fundamental'
          ? 0
          : null,
      )
      setStatus(nextQuestion !== undefined || nextSection !== undefined ? 'progress' : 'finish')
    }
  }

  const handleOnClick = () => {
    if (nextQuestion?.display.state === 0) {
      const dataQuestionnaire = JSON.parse(
        localStorage.getItem('questionnaire'),
      )
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

      if (checkSkip) {
        skipQuestion()
      } else {
        updateQuestionnaire()
        setCurrentSection(
          nextQuestion
            ? currentSection
            : nextSection
            ? currentSection + 1
            : null,
        )
        setCurrentQuestion(
          nextQuestion
            ? currentQuestion + 1
            : nextSection?.type === 'fundamental'
            ? 0
            : null,
        )
        setStatus(nextQuestion !== undefined || nextSection !== undefined ? 'progress' : 'finish')
      }
    } else {
      updateQuestionnaire()
      setCurrentSection(
        nextQuestion ? currentSection : nextSection ? currentSection + 1 : null,
      )
      setCurrentQuestion(
        nextQuestion
          ? currentQuestion + 1
          : nextSection?.type === 'fundamental'
          ? 0
          : null,
      )
      setStatus(nextQuestion !== undefined || nextSection !== undefined ? 'progress' : 'finish')
    }
  }

  return (
    <Container className="w-full h-full flex justify-center items-center py-10">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <Heading
          title={title}
          subTitle={subTitle}
          subTitleSizeMobile="text-mheading1"
          classNameSubTitle="max-w-xs md:max-w-none"
          marginSubtitle={false}
        />
        <span className="mb-6 md:mb-7 text-greyPickup md:text-mqHeadingb font-bold">
          (PICK UP TO 3)
        </span>
        <div className="w-full max-w-4xl flex flex-wrap justify-center gap-4">
          {answers?.map((data, id) => (
            <ImageButton
              key={id}
              src="/icons/energy_black.png"
              src2="/icons/energy_white.png"
              fill={false}
              width={70}
              height={70}
              data-target={id}
              pickup={true}
              onClick={(e) => {
                const pickupButton = document.querySelector(
                  `[data-target="${id}"]`,
                )
                if (pickupButton.classList.contains('pickupActive')) {
                  let filterAnswer = getAnswer.filter(
                    (e) => e !== data.label.en,
                  )
                  setAnswer(filterAnswer)
                  pickupButton.classList.remove('pickupActive')
                } else {
                  setAnswer([...getAnswer, data.label.en])
                  pickupButton.classList.add('pickupActive')
                }
              }}
            >
              {data.label.en}
            </ImageButton>
          ))}
        </div>
        <BorderButton
          className="mt-6 md:mt-7"
          onClick={() => {
            if (getAnswer.length > 0) {
              handleOnClick()
            }
          }}
        >
          CONTINUE
        </BorderButton>
      </div>
    </Container>
  )
}

export default PickupComponent
