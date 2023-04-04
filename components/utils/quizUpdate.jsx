const quizUpdate = (
  answer,
  type,
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
  const sectionId = section.ID
  const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))

  const updateQuestionnaire = (updateSection, updateQuestion) => {
    if (answer) {
      const sectionExists = dataQuestionnaire.questionnaireRespond.find(
        (f) => f.sectionid === sectionId,
      )
      const sectionFilter = dataQuestionnaire.questionnaireRespond.filter(
        (f) => f.sectionid !== sectionId,
      )

      const newRespond = {
        questionID: questionId,
        answer: answer,
        type: type, // SELECT, MULTIPLE, STRING
      }

      const newSection = {
        sectionid: sectionId,
        responds: [newRespond],
      }

      const updatedResponds = sectionExists
        ? [
            ...sectionFilter,
            {
              sectionid: sectionExists.sectionid,
              responds: [
                ...sectionExists.responds,
                // RESPOND OBJECT
                newRespond,
              ],
            },
          ]
        : [...dataQuestionnaire.questionnaireRespond, newSection]

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

    setStatus(
      nextQuestion !== undefined || nextSection !== undefined
        ? 'progress'
        : 'finish',
    )
  }

  const skipQuestion = () => {
    const skip = section.questions[currentQuestion + 2]
    if (skip) {
      updateQuestionnaire(currentSection, currentQuestion + 2)

      setCurrentSection(currentSection)
      setCurrentQuestion(currentQuestion + 2)
    } else {
      updateQuestionnaire(
        currentSection + 1,
        nextSection?.type === 'fundamental' ? 0 : null,
      )

      setCurrentSection(currentSection + 1)
      setCurrentQuestion(nextSection?.type === 'fundamental' ? 0 : null)
    }
  }

  if (nextQuestion?.display.state === 0) {
    const checkSkip = nextQuestion.display.condition.find((i) =>
      i.answer.find(
        (j) =>
          j ===
          dataQuestionnaire.questionnaireRespond
            .find((f) => f.responds.find((g) => g.questionID === i.questionID))
            ?.responds.find((h) => h.questionID === i.questionID)
            .answer.find((k) => k === j),
      ),
    )

    if (!checkSkip) {
      skipQuestion()
    } else {
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
  } else {
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
}

export default quizUpdate
