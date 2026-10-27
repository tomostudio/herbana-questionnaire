import Container from '../container'
import { DefaultButton } from './buttons'
import { getPreviousScreen } from './quizNavigation'
import { ArrowLeft, ArrowLeftMobile } from './svg'

const BackComponent = ({
  backButtonTitle,
  currentSection,
  currentQuestion,
  setCurrentSection,
  setCurrentQuestion,
  setCheckStorage,
  sections,
  setStatus,
  setColor,
  type,
  setReset,
  top = true,
}) => {
  const handleBackClick = () => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))
    const previous = getPreviousScreen(
      sections,
      currentSection,
      currentQuestion,
      dataQuestionnaire.questionnaireRespond,
    )
    if (!previous) return setReset(true)

    const previousQuestion =
      sections[previous.section].questions[previous.question]

    localStorage.setItem(
      'questionnaire',
      JSON.stringify({
        ...dataQuestionnaire,
        currentSection: previous.section,
        currentQuestion: previous.question,
        // The question we go back to gets answered again, so drop its old answer
        questionnaireRespond: previousQuestion
          ? dataQuestionnaire.questionnaireRespond.filter(
              (respond) =>
                parseInt(respond.questionID) !== parseInt(previousQuestion.ID),
            )
          : dataQuestionnaire.questionnaireRespond,
      }),
    )

    setCurrentSection(previous.section)
    setCurrentQuestion(previous.question)
    setStatus('progress')
  }

  return (
    <Container
      className={`absolute ${
        top ? '-top-5 -translate-y-full' : 'bottom-5'
      } left-1/2 -translate-x-1/2`}
    >
      <DefaultButton
        className="w-fit flex items-center text-footer md:text-nav font-maisonMono uppercase"
        onClick={handleBackClick}
      >
        <ArrowLeft className="hidden md:block mr-3 md:mr-4 w-[23px] md:w-auto" />
        <ArrowLeftMobile className="md:hidden mr-2 w-[23px]" />
        <span className="leading-none pt-[2px]">{backButtonTitle}</span>
      </DefaultButton>
    </Container>
  )
}

export default BackComponent
