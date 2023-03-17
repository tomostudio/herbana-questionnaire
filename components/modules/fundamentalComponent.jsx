import { useAppContext } from 'context/state'
import Container from '../container'
import { BorderButton } from '../utils/buttons'
import Heading from '../utils/heading'

const FundamentalComponent = ({
  title = '',
  subTitle = '',
  nextQuestion,
  nextSection,
  placeholder,
}) => {
  const appContext = useAppContext()
  return (
    <Container className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={() => {
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
          } else if(nextSection?.type === "quiz") {
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
        className="w-full md:max-w-lg lg:max-w-4xl flex flex-col items-center"
      >
        <Heading title={title} subTitle={subTitle} />
        <input
          type="text"
          placeholder={placeholder}
          className="w-fit md:w-full mb-12 px-8 uppercase text-mInput md:text-body placeholder:text-black tracking-wider placeholder:opacity-50 text-center border py-4 border-black rounded-xl"
          required
        />
        <BorderButton>CONTINUE</BorderButton>
      </form>
    </Container>
  )
}

export default FundamentalComponent
