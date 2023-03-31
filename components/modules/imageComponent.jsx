import { useAppContext } from 'context/state'
import { useRouter } from 'next/navigation'
import Container from '../container'
import { ImageButton } from '../utils/buttons'
import Heading from '../utils/heading'

const ImageComponent = ({
  title = '',
  subTitle = '',
  nextQuestion,
  nextSection,
  answers,
  display,
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
    <Container className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <Heading
          title={title}
          subTitle={subTitle}
          subTitleSizeMobile="text-mheading1"
          classNameSubTitle="max-w-xs md:max-w-none"
        />
        <div className="w-full flex flex-wrap justify-center gap-6">
          {answers?.map((data, id) => (
            <ImageButton
              key={id}
              src={data.image}
              icon={false}
              fill={true}
              style={{
                objectFit: 'cover',
              }}
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
                                  answer: [data.label.en], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
                                  type: 'option', // SELECT, MULTIPLE, STRING
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
                                  answer: [data.label.en], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
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
                                  answer: [data.label.en], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
                                  type: 'option', // SELECT, MULTIPLE, STRING
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
                                  answer: [data.label.en], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
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
                                  answer: [data.label.en], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
                                  type: 'option', // SELECT, MULTIPLE, STRING
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
                                  answer: [data.label.en], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
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
                                  answer: [data.label.en], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
                                  type: 'option', // SELECT, MULTIPLE, STRING
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
                                  answer: [data.label.en], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
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
                                  answer: [data.label.en], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
                                  type: 'option', // SELECT, MULTIPLE, STRING
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
                                  answer: [data.label.en], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
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

export default ImageComponent
