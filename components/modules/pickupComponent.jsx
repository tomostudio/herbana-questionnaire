'use client'

import { useAppContext } from 'context/state'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Container from '../container'
import { BorderButton, ImageButton } from '../utils/buttons'
import Heading from '../utils/heading'

const PickupComponent = ({
  title = '',
  subTitle = '',
  nextQuestion,
  nextSection,
  answers,
  currentSection,
  currentQuestion,
  setCurrentSection,
  setCurrentQuestion,
  setStatus,
  sectionId,
  questionId,
}) => {
  const appContext = useAppContext()
  const router = useRouter()
  const [getAnswer, setAnswer] = useState([])
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
                  let filterAnswer = getAnswer.filter((e) => e !== data.ID)
                  setAnswer(filterAnswer)
                  pickupButton.classList.remove('pickupActive')
                } else {
                  setAnswer([...getAnswer, data.ID])
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
            if (nextQuestion) {
              setCurrentSection(currentSection)
              setCurrentQuestion(currentQuestion + 1)
              const dataQuestionnaire = JSON.parse(
                localStorage.getItem('questionnaire'),
              )
              localStorage.setItem(
                'questionnaire',
                JSON.stringify({
                  currentSection: currentSection,
                  currentQuestion: currentQuestion + 1,
                  questionnaireRespond: [
                    ...dataQuestionnaire.questionnaireRespond,
                    {
                      sectionid: sectionId,
                      responds: [
                        // RESPOND OBJECT
                        {
                          questionID: questionId,
                          answerID: getAnswer,
                          answer: null, // FOR FUNDAMENTAL
                          type: 'multiple', // SELECT, MULTIPLE, STRING
                        },
                      ],
                    },
                  ],
                  status: 'progress',
                  expired: dataQuestionnaire.expired,
                }),
              )
            } else if (nextSection?.type === 'quiz') {
              setCurrentSection(currentSection + 1)
              setCurrentQuestion(null)
              const dataQuestionnaire = JSON.parse(
                localStorage.getItem('questionnaire'),
              )
              localStorage.setItem(
                'questionnaire',
                JSON.stringify({
                  currentSection: currentSection + 1,
                  currentQuestion: null,
                  questionnaireRespond: [
                    ...dataQuestionnaire.questionnaireRespond,
                    {
                      sectionid: sectionId,
                      responds: [
                        // RESPOND OBJECT
                        {
                          questionID: questionId,
                          answerID: getAnswer,
                          answer: null, // FOR FUNDAMENTAL
                          type: 'multiple', // SELECT, MULTIPLE, STRING
                        },
                      ],
                    },
                  ],
                  status: 'progress',
                  expired: dataQuestionnaire.expired,
                }),
              )
            } else if (nextSection?.type === 'fundamental') {
              setCurrentSection(currentSection + 1)
              setCurrentQuestion(0)
              const dataQuestionnaire = JSON.parse(
                localStorage.getItem('questionnaire'),
              )
              localStorage.setItem(
                'questionnaire',
                JSON.stringify({
                  currentSection: currentSection + 1,
                  currentQuestion: 0,
                  questionnaireRespond: [
                    ...dataQuestionnaire.questionnaireRespond,
                    {
                      sectionid: sectionId,
                      responds: [
                        // RESPOND OBJECT
                        {
                          questionID: questionId,
                          answerID: getAnswer,
                          answer: null, // FOR FUNDAMENTAL
                          type: 'multiple', // SELECT, MULTIPLE, STRING
                        },
                      ],
                    },
                  ],
                  status: 'progress',
                  expired: dataQuestionnaire.expired,
                }),
              )
            } else if (!nextSection && nextQuestion) {
              setCurrentSection(currentSection + 1)
              setCurrentQuestion(0)
              const dataQuestionnaire = JSON.parse(
                localStorage.getItem('questionnaire'),
              )
              localStorage.setItem(
                'questionnaire',
                JSON.stringify({
                  currentSection: currentSection + 1,
                  currentQuestion: 0,
                  questionnaireRespond: [
                    ...dataQuestionnaire.questionnaireRespond,
                    {
                      sectionid: sectionId,
                      responds: [
                        // RESPOND OBJECT
                        {
                          questionID: questionId,
                          answerID: getAnswer,
                          answer: null, // FOR FUNDAMENTAL
                          type: 'multiple', // SELECT, MULTIPLE, STRING
                        },
                      ],
                    },
                  ],
                  status: 'progress',
                  expired: dataQuestionnaire.expired,
                }),
              )
            } else {
              setCurrentSection(currentSection + 1)
              setCurrentQuestion(0)
              setStatus('finish')
              const dataQuestionnaire = JSON.parse(
                localStorage.getItem('questionnaire'),
              )
              localStorage.setItem(
                'questionnaire',
                JSON.stringify({
                  currentSection: null,
                  currentQuestion: null,
                  questionnaireRespond: [
                    ...dataQuestionnaire.questionnaireRespond,
                    {
                      sectionid: sectionId,
                      responds: [
                        // RESPOND OBJECT
                        {
                          questionID: questionId,
                          answerID: getAnswer,
                          answer: null, // FOR FUNDAMENTAL
                          type: 'multiple', // SELECT, MULTIPLE, STRING
                        },
                      ],
                    },
                  ],
                  status: 'finish',
                  expired: dataQuestionnaire.expired,
                }),
              )
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
