'use client'

import { useAppContext } from 'context/state'
import { useRouter } from 'next/navigation'
import Container from '../container'
import { ImageButton } from '../utils/buttons'
import Heading from '../utils/heading'

const IconComponent = ({
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
  return (
    <Container className="w-full h-full flex justify-center items-center py-10">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <Heading
          title={title}
          subTitle={subTitle}
          subTitleSizeMobile="text-mheading1"
          classNameSubTitle="max-w-xs md:max-w-none"
        />
        <div className="w-full max-w-4xl flex flex-wrap justify-center gap-4">
          {answers?.map((data, id) => (
            <ImageButton
              key={id}
              src="/icons/informed1.png"
              fill={false}
              width={70}
              height={70}
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
                              answerID: [data.ID],
                              answer: null, // FOR FUNDAMENTAL
                              type: 'option', // SELECT, MULTIPLE, STRING
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
                              answerID: [data.ID],
                              answer: null, // FOR FUNDAMENTAL
                              type: 'option', // SELECT, MULTIPLE, STRING
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
                              answerID: [data.ID],
                              answer: null, // FOR FUNDAMENTAL
                              type: 'option', // SELECT, MULTIPLE, STRING
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
                              answerID: [data.ID],
                              answer: null, // FOR FUNDAMENTAL
                              type: 'option', // SELECT, MULTIPLE, STRING
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
                              answerID: [data.ID],
                              answer: null, // FOR FUNDAMENTAL
                              type: 'option', // SELECT, MULTIPLE, STRING
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
              {data.label.en}
            </ImageButton>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default IconComponent
