import { useAppContext } from 'context/state'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Container from '../container'
import { RoundedButton } from '../utils/buttons'
import Heading from '../utils/heading'

const TextImageComponent = ({
  title = '',
  subTitle = '',
  answers,
  nextSection,
  nextQuestion,
  image,
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
    <div className="w-full flex flex-col-reverse lg:flex-row self-stretch">
      <Container className="w-full h-full flex flex-col lg:flex-row items-end lg:items-center">
        <div className="lg:hidden w-full h-[345px] md:h-[400px]" />
        <div className="w-full lg:w-1/2 min-h-[50vh] lg:h-full flex flex-col justify-center pt-10 pb-28 lg:pt-0 lg:pb-0 lg:pr-8">
          <Heading
            title={title}
            subTitle={subTitle}
            position="text-center lg:text-left"
            subTitleSizeMobile="text-mheading1"
          />
          <div className="w-full flex justify-center lg:justify-start space-x-6">
            {answers?.map((data, id) => (
              <RoundedButton
                key={id}
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
              </RoundedButton>
            ))}
          </div>
        </div>
      </Container>
      <div className="hidden lg:block absolute top-0 right-0 w-full lg:w-1/2 h-[50vh] lg:h-full">
        <Image
          src={image}
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="lg:hidden absolute top-0 right-0 w-full h-[345px] md:h-[400px]">
        <Image
          src={image}
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  )
}

export default TextImageComponent
