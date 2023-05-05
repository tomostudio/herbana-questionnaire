import Container from '../container'
import { DefaultButton } from './buttons'
import { ArrowLeft } from './svg'

const BackComponent = ({
  currentSection,
  currentQuestion,
  setCurrentSection,
  setCurrentQuestion,
  sections,
  setStatus,
  setColor,
  type,
}) => {
  const updateQuestionnaire = (updateSection, updateQuestion) => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))
    if (sections[currentSection].questions[updateQuestion]) {
      dataQuestionnaire.questionnaireRespond.pop()
    }
    localStorage.setItem(
      'questionnaire',
      JSON.stringify({
        currentSection: currentSection,
        currentQuestion: updateQuestion,
        questionnaireRespond: dataQuestionnaire.questionnaireRespond,
        status: 'progress',
        expired: dataQuestionnaire.expired,
      }),
    )

    setCurrentSection(updateSection)
    setCurrentQuestion(updateQuestion)
    setStatus('progress')
  }

  let newQuestion = currentQuestion
  let newQuestion2 = sections[currentSection - 1]?.questions.length
  let newSection = currentSection

  const skipQuestion2 = () => {
    const skipQuiz = sections[newSection - 1].questions[newQuestion - 2]
    // if(sections[])
    if (skipQuiz) {
      newQuestion2 = newQuestion - 2
      newSection = newSection - 1
      updateQuestionnaire(currentSection - 1, newQuestion)
    } else {
      if (sections[newSection - 2]) {
        newSection = newSection - 2
        newQuestion2 = sections[newSection].questions.length
        if (
          parseInt(
            sections[newSection].questions[newQuestion2 - 1].display.state,
          ) === 0
        ) {
          const dataQuestionnaire = JSON.parse(
            localStorage.getItem('questionnaire'),
          )
          const showQuiz = sections[newSection].questions[
            newQuestion2 - 1
          ].display.condition.find((i) =>
            i.answer.find(
              (j) =>
                j.toLowerCase() ===
                dataQuestionnaire.questionnaireRespond
                  .find(
                    (h) => parseInt(h.questionID) === parseInt(i.questionID),
                  )
                  ?.answer.find((k) => k.toLowerCase() === j.toLowerCase())
                  .toLowerCase(),
            ),
          )

          if (!showQuiz) {
            const skipQuiz2 = sections[newSection].questions[newQuestion2 - 2]
            if (skipQuiz2) {
              newQuestion2 = newQuestion - 2
              newSection = newSection - 1
              updateQuestionnaire(currentSection - 1, newQuestion)
            } else {
              updateQuestionnaire(currentSection - 1, newQuestion)
            }
          }
        } else {
          updateQuestionnaire(newSection, newQuestion2 - 1)
        }
      }
      newQuestion = null
      updateQuestionnaire(currentSection - 1, null)
    }
  }

  const skipQuestion = () => {
    if (type === 'fundamental') {
      // skipQuestion2()
      if (currentQuestion === 0) {
      } else {
        const skipQuiz = sections[currentSection].questions[newQuestion - 2]
      }
    }
    const skipQuiz = sections[currentSection].questions[newQuestion - 2]
    if (skipQuiz) {
      newQuestion = newQuestion - 2
      updateQuestionnaire(currentSection, newQuestion)
    } else {
      newQuestion = null
      updateQuestionnaire(currentSection, null)
    }
  }

  const loopSkip = () => {
    if (type === 'fundamental') {
      const showQuiz = sections[newSection].questions[
        newQuestion2 - 1
      ].display.condition.find((i) =>
        i.answer.find(
          (j) =>
            j.toLowerCase() ===
            dataQuestionnaire.questionnaireRespond
              .find((h) => parseInt(h.questionID) === parseInt(i.questionID))
              ?.answer.find((k) => k.toLowerCase() === j.toLowerCase())
              .toLowerCase(),
        ),
      )

      if (!showQuiz) {
        skipQuestion()
        return true
      } else {
        updateQuestionnaire(currentSection, newQuestion - 1)
        return false
      }
    }

    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))
    if (type === 'fundamental' || currentQuestion === null) {
      if (sections[newSection - 1].questions[newQuestion2 - 1]) {
        const showQuiz = sections[newSection - 1].questions[
          newQuestion2 - 1
        ].display.condition.find((i) =>
          i.answer.find(
            (j) =>
              j.toLowerCase() ===
              dataQuestionnaire.questionnaireRespond
                .find((h) => parseInt(h.questionID) === parseInt(i.questionID))
                ?.answer.find((k) => k.toLowerCase() === j.toLowerCase())
                .toLowerCase(),
          ),
        )

        if (!showQuiz) {
          skipQuestion()
          return true
        } else {
          updateQuestionnaire(newSection - 1, newQuestion2 - 1)
          return false
        }
      }
    }

    if (sections[currentSection].questions[newQuestion - 1]) {
      const showQuiz = sections[currentSection].questions[
        newQuestion - 1
      ].display.condition.find((i) =>
        i.answer.find(
          (j) =>
            j.toLowerCase() ===
            dataQuestionnaire.questionnaireRespond
              .find((h) => parseInt(h.questionID) === parseInt(i.questionID))
              ?.answer.find((k) => k.toLowerCase() === j.toLowerCase())
              .toLowerCase(),
        ),
      )

      if (!showQuiz) {
        skipQuestion()
        return true
      } else {
        updateQuestionnaire(currentSection, newQuestion - 1)
        return false
      }
    } else {
      updateQuestionnaire(currentSection, null)
      return false
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
      if (type === 'fundamental') {
        if (currentQuestion === 0) {
          if (sections[currentSection - 1]) {
            if (
              parseInt(
                sections[currentSection - 1].questions[
                  sections[currentSection - 1].questions.length - 1
                ].display.state,
              ) === 0
            ) {
              while (true) {
                if (loopSkip() === false) {
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
            localStorage.removeItem('questionnaire')
            setCurrentSection(0)
            setCurrentQuestion(0)
            setCheckStorage(false)
            setColor({
              header: '#FFF7E9',
              bg: '#DFF2F7',
            })
            // onClick={() => {
            //   if (currentSection === 0) {
            //     localStorage.removeItem('questionnaire')
            //     setCurrentSection(0)
            //     setCurrentQuestion(0)
            //     setCheckStorage(false)
            //     setColor({
            //       header: '#FFF7E9',
            //       bg: '#DFF2F7',
            //     })
            //   } else {
            //     const dataQuestionnaire = JSON.parse(
            //       localStorage.getItem('questionnaire'),
            //     )
            //     dataQuestionnaire.questionnaireRespond.pop()
            //     localStorage.setItem(
            //       'questionnaire',
            //       JSON.stringify({
            //         currentSection: currentSection - 1,
            //         currentQuestion:
            //           quiz.sections[currentSection - 1].questions
            //             .length - 1,
            //         questionnaireRespond:
            //           dataQuestionnaire.questionnaireRespond,
            //         status: 'progress',
            //         expired: dataQuestionnaire.expired,
            //       }),
            //     )
            //     setCurrentSection(currentSection - 1)
            //     setCurrentQuestion(
            //       quiz.sections[currentSection - 1].questions.length -
            //         1,
            //     )
            //     setColor({
            //       header: quiz.sections[currentSection].bgColor,
            //       bg: quiz.sections[currentSection].bgColor,
            //     })
            //   }
            // }}
          }
        } else {
          updateQuestionnaire(currentSection, currentQuestion - 1)
        }
      } else {
      }
      if (type === 'fundamental' || currentQuestion == null) {
        if (sections[currentSection - 1]) {
          if (
            parseInt(
              sections[currentSection - 1].questions[
                sections[currentSection - 1].questions.length - 1
              ].display.state,
            ) === 0
          ) {
            while (true) {
              if (loopSkip() === false) {
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
          localStorage.removeItem('questionnaire')
          setCurrentSection(0)
          setCurrentQuestion(0)
          setCheckStorage(false)
          setColor({
            header: '#FFF7E9',
            bg: '#DFF2F7',
          })
        }
        updateQuestionnaire(currentSection, null)
      } else {
        updateQuestionnaire(currentSection, null)
      }
    }
  }

  return (
    <Container className="absolute -top-5 left-1/2 -translate-x-1/2 -translate-y-full">
      <DefaultButton
        className="w-fit flex items-center text-footer md:text-nav font-maisonMono uppercase"
        onClick={handleBackClick}
      >
        <ArrowLeft className="mr-3 md:mr-4 w-[23px] md:w-auto" />
        <span className="leading-none pt-[2px]">Back</span>
      </DefaultButton>
    </Container>
  )
}

export default BackComponent
