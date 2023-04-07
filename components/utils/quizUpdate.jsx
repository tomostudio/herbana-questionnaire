const quizUpdate = (
  answer,
  questionId,
  section,
  nextSection,
  nextQuestion,
  currentSection,
  currentQuestion,
  setCurrentSection,
  setCurrentQuestion,
  setStatus,
) => {
  const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))

  const updateQuestionnaire = (updateSection, updateQuestion) => {
    if (answer) {
      const newRespond = {
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
          status:
            nextQuestion !== undefined || nextSection !== undefined
              ? 'progress'
              : 'finish',
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
          status:
            nextQuestion !== undefined || nextSection !== undefined
              ? 'progress'
              : 'finish',
          expired: dataQuestionnaire.expired,
        }),
      )
    }

    setStatus('loading')
  }

  updateQuestionnaire(
    nextQuestion ? currentSection : nextSection ? currentSection + 1 : null,
    nextQuestion
      ? currentQuestion === null
        ? 0
        : currentQuestion + 1
      : nextSection?.type === 'fundamental'
      ? 0
      : null,
  )
  setCurrentSection(
    nextQuestion ? currentSection : nextSection ? currentSection + 1 : null,
  )
  setCurrentQuestion(
    nextQuestion
      ? currentQuestion === null
        ? 0
        : currentQuestion + 1
      : nextSection?.type === 'fundamental'
      ? 0
      : null,
  )
}

export default quizUpdate
