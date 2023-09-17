import Container from '../container'
import { DefaultButton } from './buttons'
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
  const updateQuestionnaire = (updateSection, updateQuestion) => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))
    if (sections[updateSection].questions[updateQuestion]) {
      dataQuestionnaire.questionnaireRespond.pop()
    }
    localStorage.setItem(
      'questionnaire',
      JSON.stringify({
        ...dataQuestionnaire,
        currentSection: updateSection,
        currentQuestion: updateQuestion,
      }),
    )

    setCurrentSection(updateSection)
    setCurrentQuestion(updateQuestion)
    setStatus('progress')
  }

  let newSection = currentSection
  let newQuestion = currentQuestion
  let lastQuestion = false

  const skipQuestion = () => {
    const skipQuiz = sections[currentSection].questions[newQuestion - 1]
    if (skipQuiz) {
      newQuestion = newQuestion - 1
      updateQuestionnaire(currentSection, newQuestion)
    } else {
      newQuestion = null
      updateQuestionnaire(currentSection, null)
    }
  }

  const loopSkip = () => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))
    if (sections[currentSection].questions[newQuestion - 1]) {
      const showQuiz = sections[currentSection].questions[
        newQuestion - 1
      ].display.condition?.find((i) =>
        i.answer.find(
          (j) =>
            j.toLowerCase() ===
            dataQuestionnaire.questionnaireRespond
              .find((h) => parseInt(h.questionID) === parseInt(i.questionID))
              ?.answer.find((k) => k.toLowerCase() === j.toLowerCase())
              ?.toLowerCase(),
        ),
      )

      if (
        parseInt(
          sections[currentSection].questions[newQuestion - 1].display.state,
        ) === 0
      ) {
        if (!showQuiz) {
          newQuestion = newQuestion - 1
          return true
        } else {
          updateQuestionnaire(currentSection, newQuestion - 1)
          return false
        }
      } else {
        if (showQuiz) {
          newQuestion = newQuestion - 1
          return true
        } else {
          updateQuestionnaire(currentSection, newQuestion - 1)
          return false
        }
      }
    } else {
      updateQuestionnaire(currentSection, null)
      return false
    }
  }

  const loopSkipFundamental = () => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))

    if (lastQuestion) {
      lastQuestion = false
      newSection = newSection - 1
      newQuestion = sections[newSection].questions.length - 1
      const showQuiz = sections[newSection].questions[
        newQuestion
      ].display.condition?.find((i) =>
        i.answer.find(
          (j) =>
            j.toLowerCase() ===
            dataQuestionnaire.questionnaireRespond
              .find((h) => parseInt(h.questionID) === parseInt(i.questionID))
              ?.answer.find((k) => k.toLowerCase() === j.toLowerCase())
              ?.toLowerCase(),
        ),
      )

      if (
        parseInt(sections[newSection].questions[newQuestion].display.state) ===
        0
      ) {
        if (!showQuiz) {
          const skipQuiz = sections[newSection].questions[newQuestion - 1]
          if (skipQuiz) {
            newQuestion = newQuestion - 1
            return true
          } else {
            if (sections[newSection - 1]) {
              newSection = newSection - 1
              newQuestion = sections[newSection].questions.length - 1
              if (
                parseInt(
                  sections[newSection].questions[newQuestion].display.state,
                ) === 0
              ) {
                lastQuestion = true
                loopSkipFundamental()
                return true
              } else {
                updateQuestionnaire(newSection, newQuestion)
                return false
              }
            } else {
              setReset(true)

              return false
            }
          }
        } else {
          updateQuestionnaire(newSection, newQuestion)
          return false
        }
      } else {
        if (showQuiz) {
          const skipQuiz = sections[newSection].questions[newQuestion - 1]
          if (skipQuiz) {
            newQuestion = newQuestion - 1
            return true
          } else {
            if (sections[newSection - 1]) {
              newSection = newSection - 1
              newQuestion = sections[newSection].questions.length - 1
              if (
                parseInt(
                  sections[newSection].questions[newQuestion].display.state,
                ) === 0
              ) {
                lastQuestion = true
                loopSkipFundamental()
                return true
              } else {
                updateQuestionnaire(newSection, newQuestion)
                return false
              }
            } else {
              setReset(true)

              return false
            }
          }
        } else {
          updateQuestionnaire(newSection, newQuestion)
          return false
        }
      }
    } else {
      if (sections[newSection].questions[newQuestion - 1]) {
        newQuestion = newQuestion - 1
        updateQuestionnaire(newSection, newQuestion)
        return false
      } else {
        if (sections[newSection].type === 'quiz') {
          updateQuestionnaire(newSection, null)
          return false
        } else {
          if (sections[newSection - 1]) {
            newSection = newSection - 1
            newQuestion = sections[newSection].questions.length - 1
            if (
              parseInt(
                sections[newSection].questions[newQuestion].display.state,
              ) === 0
            ) {
              lastQuestion = true
              loopSkipFundamental()
              return true
            } else {
              updateQuestionnaire(newSection, newQuestion)
              return false
            }
          } else {
            setReset(true)

            return false
          }
        }
      }
    }
  }

  const handleBackClick = () => {
    if (currentQuestion > 0) {
      if (
        parseInt(
          sections[currentSection].questions[currentQuestion - 1].display.state,
        ) === 0
      ) {
        while (true) {
          if (loopSkip() === false) {
            break
          }
        }
      } else {
        updateQuestionnaire(currentSection, currentQuestion - 1)
      }
    } else {
      if (type === 'quiz' && currentQuestion === 0) {
        updateQuestionnaire(currentSection, null)
      } else {
        if (sections[currentSection - 1]) {
          if (
            parseInt(
              sections[currentSection - 1].questions[
                sections[currentSection - 1].questions.length - 1
              ].display.state,
            ) === 0
          ) {
            lastQuestion = true
            while (true) {
              if (loopSkipFundamental() === false) {
                break
              }
            }
          } else {
            updateQuestionnaire(
              currentSection - 1,
              sections[currentSection - 1].questions.length - 1,
            )
          }
        } else {
          setReset(true)
        }
      }
    }
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
