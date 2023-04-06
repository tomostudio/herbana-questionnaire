'use client';

import Container from '../container';
import { DefaultButton } from '../utils/buttons';
import { ArrowLeft } from '../utils/svg';

const ProgressIndicator = ({
  currentSection,
  currentQuestion,
  setCurrentQuestion,
  sections,
  totalQuestion,
}) => {
  const handleBackClick = () => {
    if (currentQuestion > 0) {
      if (sections[currentSection].questions[currentQuestion - 1]) {
        const checkSkip = sections[currentSection].questions[
          currentQuestion - 1
        ].display.condition.find((i) =>
          i.answer.find(
            (j) =>
              j ===
              dataQuestionnaire.questionnaireRespond
                .find((f) =>
                  f.responds.find((g) => g.questionID === i.questionID)
                )
                ?.responds.find((h) => h.questionID === i.questionID)
                .answer.find((k) => k === j)
          )
        );

        if (!checkSkip) {
          if (currentQuestion - 2 > 0) {
            const dataQuestionnaire = JSON.parse(
              localStorage.getItem('questionnaire')
            );
            dataQuestionnaire.questionnaireRespond
              .find((e) => e.sectionid === sections[currentSection].ID)
              .responds.pop();
            localStorage.setItem(
              'questionnaire',
              JSON.stringify({
                currentSection: currentSection,
                currentQuestion: currentQuestion - 2,
                questionnaireRespond: dataQuestionnaire.questionnaireRespond,
                status: 'progress',
                expired: dataQuestionnaire.expired,
              })
            );
            setCurrentQuestion(currentQuestion - 2);
          } else {
            const dataQuestionnaire = JSON.parse(
              localStorage.getItem('questionnaire')
            );
            localStorage.setItem(
              'questionnaire',
              JSON.stringify({
                currentSection: currentSection,
                currentQuestion: null,
                questionnaireRespond: dataQuestionnaire.questionnaireRespond,
                status: 'progress',
                expired: dataQuestionnaire.expired,
              })
            );
            setCurrentQuestion(null);
          }
        } else {
          const dataQuestionnaire = JSON.parse(
            localStorage.getItem('questionnaire')
          );
          dataQuestionnaire.questionnaireRespond
            .find((e) => e.sectionid === sections[currentSection].ID)
            .responds.pop();
          localStorage.setItem(
            'questionnaire',
            JSON.stringify({
              currentSection: currentSection,
              currentQuestion: currentQuestion - 1,
              questionnaireRespond: dataQuestionnaire.questionnaireRespond,
              status: 'progress',
              expired: dataQuestionnaire.expired,
            })
          );
          setCurrentQuestion(currentQuestion - 1);
        }
      } else {
        const dataQuestionnaire = JSON.parse(
          localStorage.getItem('questionnaire')
        );
        dataQuestionnaire.questionnaireRespond
          .find((e) => e.sectionid === sections[currentSection].ID)
          .responds.pop();
        localStorage.setItem(
          'questionnaire',
          JSON.stringify({
            currentSection: currentSection,
            currentQuestion: currentQuestion - 1,
            questionnaireRespond: dataQuestionnaire.questionnaireRespond,
            status: 'progress',
            expired: dataQuestionnaire.expired,
          })
        );
        setCurrentQuestion(currentQuestion - 1);
      }
    } else {
      const dataQuestionnaire = JSON.parse(
        localStorage.getItem('questionnaire')
      );
      localStorage.setItem(
        'questionnaire',
        JSON.stringify({
          currentSection: currentSection,
          currentQuestion: null,
          questionnaireRespond: dataQuestionnaire.questionnaireRespond,
          status: 'progress',
          expired: dataQuestionnaire.expired,
        })
      );
      setCurrentQuestion(null);
    }
  };

  return (
    <div className='relative flex flex-col w-full'>
      <Container className='absolute -top-5 left-1/2 -translate-x-1/2 -translate-y-full'>
        <DefaultButton
          className='w-fit flex items-center text-footer md:text-nav font-maisonMono uppercase'
          onClick={handleBackClick}
        >
          <ArrowLeft className='mr-3 md:mr-4 w-[23px] md:w-auto' />
          <span className='leading-none pt-[2px]'>Back</span>
        </DefaultButton>
      </Container>
      <div className=' relative w-full '>
        <div className='hidden relative md:grid md:grid-cols-3'>
          {sections.map(
            (data, id) =>
              data.type !== 'fundamental' && (
                <div
                  key={id}
                  className='relative md:border-l-0 md:border-r-default  z-10 border-default border-black text-center text-footer md:text-nav font-maisonMono py-3 last:border-r-0'
                >
                  <span className='relative uppercase'>{data.title.en}</span>
                </div>
              )
          )}
        </div>
        <div
          className={`absolute top-0 left-0 h-full bg-yellow transition-all duration-300`}
          style={{
            width: `${
              (sections[currentSection].questions[currentQuestion].current /
                totalQuestion) *
              100
            }%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
