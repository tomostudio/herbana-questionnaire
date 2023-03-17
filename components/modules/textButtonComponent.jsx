import { useAppContext } from 'context/state'
import Container from '../container'
import { RoundedButton } from '../utils/buttons'
import Heading from '../utils/heading'

const TextButtonComponent = ({
  title = '',
  subTitle = '',
  nextQuestion,
  nextSection,
  answers,
}) => {
  const appContext = useAppContext()
  return (
    <Container className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <Heading
          title={title}
          subTitle={subTitle}
          subTitleSizeMobile="text-mheading1"
          classNameSubTitle="max-w-xs md:max-w-none"
        />
        <div className="w-full max-w-3xl flex flex-wrap justify-center gap-6">
          {answers?.map((data, id) => (
            <RoundedButton
              key={id}
              onClick={() => {
                if (nextQuestion) {
                  appContext.setCurrentSection(appContext.currentSection)
                  appContext.setCurrentQuestion(appContext.currentQuestion + 1)
                  const dataQuestionnaire = JSON.parse(
                    localStorage.getItem('questionnaire'),
                  )
                  localStorage.setItem(
                    'questionnaire',
                    JSON.stringify({
                      id: dataQuestionnaire.id,
                      currentSection: appContext.currentSection,
                      currentQuestion: appContext.currentQuestion + 1,
                    }),
                  )
                } else if (nextSection?.type === 'quiz') {
                  appContext.setCurrentSection(appContext.currentSection + 1)
                  appContext.setCurrentQuestion(null)
                  const dataQuestionnaire = JSON.parse(
                    localStorage.getItem('questionnaire'),
                  )
                  localStorage.setItem(
                    'questionnaire',
                    JSON.stringify({
                      id: dataQuestionnaire.id,
                      currentSection: appContext.currentSection + 1,
                      currentQuestion: null,
                    }),
                  )
                } else {
                  appContext.setCurrentSection(appContext.currentSection + 1)
                  appContext.setCurrentQuestion(0)
                  const dataQuestionnaire = JSON.parse(
                    localStorage.getItem('questionnaire'),
                  )
                  localStorage.setItem(
                    'questionnaire',
                    JSON.stringify({
                      id: dataQuestionnaire.id,
                      currentSection: appContext.currentSection + 1,
                      currentQuestion: 0,
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
  )
}

export default TextButtonComponent
