'use client'

import { useAppContext } from 'context/state'
import Container from '../container'
import { ImageButton } from '../utils/buttons'
import Heading from '../utils/heading'

const IconComponent = ({
  title = '',
  subTitle = '',
  nextQuestion,
  nextSection,
  answers,
}) => {
  const appContext = useAppContext();
  return (
    <Container className="w-full h-full flex justify-center items-center py-10">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <Heading
          title={title}
          subTitle={subTitle}
          subTitleSizeMobile="text-mheading1"
          classNameSubTitle="max-w-xs md:max-w-none"
        />
        <div className="w-full max-w-4xl flex flex-wrap justify-center gap-4">
          {answers?.map((data, id) => (
            <ImageButton
              key={id}
              src="/icons/informed1.png"
              fill={false}
              width={70}
              height={70}
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
            </ImageButton>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default IconComponent
