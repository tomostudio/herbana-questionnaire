import { useRouter } from 'next/navigation'
import Container from '../container'
import { BorderButton } from '../utils/buttons'
import Heading from '../utils/heading'

const FundamentalComponent = ({
  title = '',
  subTitle = '',
  nextQuestion,
  nextSection,
  placeholder,
  currentSection,
  currentQuestion,
  setCurrentSection,
  setCurrentQuestion,
  setStatus,
  sectionId,
  questionId,
}) => {
  const router = useRouter()
  return (
    <Container className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={(e) => {
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
                questionnaireRespond: dataQuestionnaire.questionnaireRespond.find(
                  (f) => f.sectionid === sectionId,
                )
                  ? [
                      ...dataQuestionnaire.questionnaireRespond.filter(
                        (f) => f.sectionid !== sectionId,
                      ),
                      {
                        ...dataQuestionnaire.questionnaireRespond.find(
                          (f) => f.sectionid === sectionId,
                        ),
                        responds: [
                          ...dataQuestionnaire.questionnaireRespond.find(
                            (f) => f.sectionid === sectionId,
                          ).responds,
                          // RESPOND OBJECT
                          {
                            questionID: questionId,
                            answer: [e.target[0].value], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
                            type: 'text', // SELECT, MULTIPLE, STRING
                          },
                        ],
                      },
                    ]
                  : [
                      ...dataQuestionnaire.questionnaireRespond,
                      {
                        sectionid: sectionId,
                        responds: [
                          // RESPOND OBJECT
                          {
                            questionID: questionId,
                            answer: [e.target[0].value], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
                            type: 'text', // SELECT, MULTIPLE, STRING
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
                questionnaireRespond: dataQuestionnaire.questionnaireRespond.find(
                  (f) => f.sectionid === sectionId,
                )
                  ? [
                      ...dataQuestionnaire.questionnaireRespond.filter(
                        (f) => f.sectionid !== sectionId,
                      ),
                      {
                        ...dataQuestionnaire.questionnaireRespond.find(
                          (f) => f.sectionid === sectionId,
                        ),
                        responds: [
                          ...dataQuestionnaire.questionnaireRespond.find(
                            (f) => f.sectionid === sectionId,
                          ).responds,
                          // RESPOND OBJECT
                          {
                            questionID: questionId,
                            answer: [e.target[0].value], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
                            type: 'text', // SELECT, MULTIPLE, STRING
                          },
                        ],
                      },
                    ]
                  : [
                      ...dataQuestionnaire.questionnaireRespond,
                      {
                        sectionid: sectionId,
                        responds: [
                          // RESPOND OBJECT
                          {
                            questionID: questionId,
                            answer: [e.target[0].value], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
                            type: 'text', // SELECT, MULTIPLE, STRING
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
                questionnaireRespond: dataQuestionnaire.questionnaireRespond.find(
                  (f) => f.sectionid === sectionId,
                )
                  ? [
                      ...dataQuestionnaire.questionnaireRespond.filter(
                        (f) => f.sectionid !== sectionId,
                      ),
                      {
                        ...dataQuestionnaire.questionnaireRespond.find(
                          (f) => f.sectionid === sectionId,
                        ),
                        responds: [
                          ...dataQuestionnaire.questionnaireRespond.find(
                            (f) => f.sectionid === sectionId,
                          ).responds,
                          // RESPOND OBJECT
                          {
                            questionID: questionId,
                            answer: [e.target[0].value], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
                            type: 'text', // SELECT, MULTIPLE, STRING
                          },
                        ],
                      },
                    ]
                  : [
                      ...dataQuestionnaire.questionnaireRespond,
                      {
                        sectionid: sectionId,
                        responds: [
                          // RESPOND OBJECT
                          {
                            questionID: questionId,
                            answer: [e.target[0].value], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
                            type: 'text', // SELECT, MULTIPLE, STRING
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
                questionnaireRespond: dataQuestionnaire.questionnaireRespond.find(
                  (f) => f.sectionid === sectionId,
                )
                  ? [
                      ...dataQuestionnaire.questionnaireRespond.filter(
                        (f) => f.sectionid !== sectionId,
                      ),
                      {
                        ...dataQuestionnaire.questionnaireRespond.find(
                          (f) => f.sectionid === sectionId,
                        ),
                        responds: [
                          ...dataQuestionnaire.questionnaireRespond.find(
                            (f) => f.sectionid === sectionId,
                          ).responds,
                          // RESPOND OBJECT
                          {
                            questionID: questionId,
                            answer: [e.target[0].value], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
                            type: 'text', // SELECT, MULTIPLE, STRING
                          },
                        ],
                      },
                    ]
                  : [
                      ...dataQuestionnaire.questionnaireRespond,
                      {
                        sectionid: sectionId,
                        responds: [
                          // RESPOND OBJECT
                          {
                            questionID: questionId,
                            answer: [e.target[0].value], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
                            type: 'text', // SELECT, MULTIPLE, STRING
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
                questionnaireRespond: dataQuestionnaire.questionnaireRespond.find(
                  (f) => f.sectionid === sectionId,
                )
                  ? [
                      ...dataQuestionnaire.questionnaireRespond.filter(
                        (f) => f.sectionid !== sectionId,
                      ),
                      {
                        ...dataQuestionnaire.questionnaireRespond.find(
                          (f) => f.sectionid === sectionId,
                        ),
                        responds: [
                          ...dataQuestionnaire.questionnaireRespond.find(
                            (f) => f.sectionid === sectionId,
                          ).responds,
                          // RESPOND OBJECT
                          {
                            questionID: questionId,
                            answer: [e.target[0].value], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
                            type: 'text', // SELECT, MULTIPLE, STRING
                          },
                        ],
                      },
                    ]
                  : [
                      ...dataQuestionnaire.questionnaireRespond,
                      {
                        sectionid: sectionId,
                        responds: [
                          // RESPOND OBJECT
                          {
                            questionID: questionId,
                            answer: [e.target[0].value], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
                            type: 'text', // SELECT, MULTIPLE, STRING
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
        className="w-full md:max-w-lg lg:max-w-4xl flex flex-col items-center"
      >
        <Heading title={title} subTitle={subTitle} />
        <input
          type="text"
          placeholder={placeholder}
          className="w-fit md:w-full mb-12 px-8 uppercase text-mInput md:text-body outline-none placeholder:text-black tracking-wider placeholder:opacity-50 text-center border py-4 border-black rounded-xl"
          required
        />
        <BorderButton>CONTINUE</BorderButton>
      </form>
    </Container>
  )
}

export default FundamentalComponent
