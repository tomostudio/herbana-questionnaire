const quizUpdate = (
  answer,
  questionId,
  sections,
  currentSection,
  currentQuestion,
  setCurrentSection,
  setCurrentQuestion,
  setStatus,
) => {
  const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))

  const updateQuestionnaire = (updateSection, updateQuestion, status) => {
    if (answer) {
      const newRespond = {
        sectionID: sections[currentSection].ID,
        questionID: questionId,
        answer: answer,
      }

      const updatedResponds = [
        ...dataQuestionnaire.questionnaireRespond,
        // RESPOND OBJECT
        newRespond,
      ]

      localStorage.setItem(
        'questionnaire',
        JSON.stringify({
          currentSection: updateSection,
          currentQuestion: updateQuestion,
          questionnaireRespond: updatedResponds,
          status: status,
          expired: dataQuestionnaire.expired,
        }),
      )
    } else {
      localStorage.setItem(
        'questionnaire',
        JSON.stringify({
          currentSection: updateSection,
          currentQuestion: updateQuestion,
          questionnaireRespond: dataQuestionnaire.questionnaireRespond,
          status: status,
          expired: dataQuestionnaire.expired,
        }),
      )
    }

    setCurrentSection(updateSection)
    setCurrentQuestion(updateQuestion)
    setStatus(status)
  }

  let newSection = currentSection
  let newQuestion = currentQuestion

  const skipQuestion = () => {
    const skipQuiz = sections[newSection].questions[newQuestion + 2]
    if (skipQuiz) {
      newQuestion = newQuestion + 2
      updateQuestionnaire(
        newSection,
        newQuestion,
        newSection !== undefined || newQuestion !== undefined
          ? 'progress'
          : 'finish',
      )
    } else {
      newSection = newSection + 1
      newQuestion = sections[newSection]?.type === 'fundamental' ? 0 : null
      updateQuestionnaire(
        newSection,
        newQuestion,
        newSection || newQuestion !== undefined ? 'progress' : 'finish',
      )
    }
  }

  const loopSkip = () => {
    if (newQuestion !== null) {
      if (sections[newSection].questions[newQuestion + 1]) {
        let showQuiz
        if (answer) {
          const newRespond = {
            sectionID: sections[currentSection].ID,
            questionID: questionId,
            answer: answer,
          }

          const updatedResponds = [
            ...dataQuestionnaire.questionnaireRespond,
            // RESPOND OBJECT
            newRespond,
          ]

          showQuiz = sections[newSection].questions[
            newQuestion + 1
          ].display.condition.find((i) =>
            i.answer.find(
              (j) =>
                j ===
                updatedResponds
                  .find((h) => h.questionID === i.questionID)
                  ?.answer.find((k) => k === j),
            ),
          )
        } else {
          showQuiz = sections[newSection].questions[
            newQuestion + 1
          ].display.condition.find((i) =>
            i.answer.find(
              (j) =>
                j ===
                updatedResponds
                  .find((h) => h.questionID === i.questionID)
                  ?.answer.find((k) => k === j),
            ),
          )
        }

        if (!showQuiz) {
          skipQuestion()
          return true
        } else {
          updateQuestionnaire(
            sections[newSection].questions[newQuestion + 1]
              ? newSection
              : sections[newSection + 1]
              ? newSection + 1
              : null,
            sections[newSection].questions[newQuestion + 1]
              ? newQuestion === null
                ? 0
                : newQuestion + 1
              : sections[newSection + 1]?.type === 'fundamental'
              ? 0
              : null,
            sections[newSection + 1] ||
              sections[newSection].questions[newQuestion + 1] !== undefined
              ? 'progress'
              : 'finish',
          )

          return false
        }
      } else {
        updateQuestionnaire(
          sections[newSection].questions[newQuestion + 1]
            ? newSection
            : sections[newSection + 1]
            ? newSection + 1
            : null,
          sections[newSection].questions[newQuestion + 1]
            ? newQuestion === null
              ? 0
              : newQuestion + 1
            : sections[newSection + 1]?.type === 'fundamental'
            ? 0
            : null,
          sections[newSection + 1] ||
            sections[newSection].questions[newQuestion + 1] !== undefined
            ? 'progress'
            : 'finish',
        )

        return false
      }
    } else {
      updateQuestionnaire(
        newSection,
        null,
        newSection || newQuestion !== undefined ? 'progress' : 'finish',
      )

      return false
    }
  }

  if (
    sections[currentSection].questions[
      currentQuestion === null ? 0 : currentQuestion + 1
    ]?.display.state === 0
  ) {
    while (true) {
      if (loopSkip() === false) {
        break
      }
    }
  } else {
    updateQuestionnaire(
      sections[currentSection].questions[currentQuestion + 1]
        ? currentSection
        : sections[currentSection + 1]
        ? currentSection + 1
        : null,
      sections[currentSection].questions[currentQuestion + 1]
        ? currentQuestion === null
          ? 0
          : currentQuestion + 1
        : sections[currentSection + 1]?.type === 'fundamental'
        ? 0
        : null,
      sections[currentSection + 1] ||
        sections[currentSection].questions[currentQuestion + 1] !== undefined
        ? 'progress'
        : 'finish',
    )
  }
}

export default quizUpdate
