import { useAppContext } from 'context/state'
import Image from 'next/image'
import Container from '../container'
import { RoundedButton } from '../utils/buttons'
import Heading from '../utils/heading'

const TextImageComponent = ({
  title = '',
  subTitle = '',
  answers,
  nextSection,
  nextQuestion,
  image,
}) => {
  const appContext = useAppContext()
  return (
    <div className="w-full flex flex-col-reverse lg:flex-row self-stretch">
      <Container className="w-full h-full flex flex-col lg:flex-row items-end lg:items-center">
        <div className="lg:hidden w-full h-[345px] md:h-[400px]" />
        <div className="w-full lg:w-1/2 min-h-[50vh] lg:h-full flex flex-col justify-center pt-10 pb-28 lg:pt-0 lg:pb-0 lg:pr-8">
          <Heading
            title={title}
            subTitle={subTitle}
            position="text-center lg:text-left"
            subTitleSizeMobile="text-mheading1"
          />
          <div className="w-full flex justify-center lg:justify-start space-x-6">
            {answers?.map((data, id) => (
              <RoundedButton
                key={id}
                onClick={() => {
                  if (nextQuestion) {
                    appContext.setCurrentSection(appContext.currentSection)
                    appContext.setCurrentQuestion(
                      appContext.currentQuestion + 1,
                    )
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
      <div className="hidden lg:block absolute top-0 right-0 w-full lg:w-1/2 h-[50vh] lg:h-full">
        <Image
          src={image}
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="lg:hidden absolute top-0 right-0 w-full h-[345px] md:h-[400px]">
        <Image
          src={image}
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  )
}

export default TextImageComponent
