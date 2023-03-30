import { useAppContext } from 'context/state'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
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
  const appContext = useAppContext()
  const router = useRouter()
  return (
    <Container className="w-full h-full flex justify-center items-center">
      <div className="relative w-fit flex flex-col items-center">
        <Heading title={title} subTitle={subTitle} />
        <RoundedFullButton
          className="uppercase"
          onClick={() => {
            if (nextQuestion || nextQuestion === 0) {
              setCurrentSection(currentSection)
              setCurrentQuestion(0)
              const dataQuestionnaire = JSON.parse(
                localStorage.getItem('questionnaire'),
              )
              localStorage.setItem(
                'questionnaire',
                JSON.stringify({
                  currentSection: currentSection,
                  currentQuestion: 0,
                  questionnaireRespond: dataQuestionnaire.questionnaireRespond,
                  status: 'progress',
                  expired: dataQuestionnaire.expired
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
                  questionnaireRespond: dataQuestionnaire.questionnaireRespond,
                  status: 'progress',
                  expired: dataQuestionnaire.expired
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
                  questionnaireRespond: dataQuestionnaire.questionnaireRespond,
                  status: 'progress',
                  expired: dataQuestionnaire.expired
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
                  questionnaireRespond: dataQuestionnaire.questionnaireRespond,
                  status: 'progress',
                  expired: dataQuestionnaire.expired
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
                  questionnaireRespond: dataQuestionnaire.questionnaireRespond,
                  status: 'finish',
                  expired: dataQuestionnaire.expired
                }),
              )
            }
          }}
        >
          {button}
        </RoundedFullButton>
        <div className="absolute -left-[18%] md:left-auto md:right-full top-32 md:top-1/2 md:-translate-y-1/2">
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
        <div className="absolute -right-[18%] md:right-auto md:left-full -top-32 md:top-1/2 md:-translate-y-1/2">
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
