'use client';

import Image from 'next/image';
import Container from '../container';
import { RoundedFullButton } from '../utils/buttons';
import Heading from '../utils/heading';
import quizUpdate from '../utils/quizUpdate';
import { useAppContext } from 'context/state';

const TitleComponent = ({
  sections,
  currentSection,
  currentQuestion,
  setCurrentSection,
  setCurrentQuestion,
  setStatus,
}) => {
  const title = sections[currentSection].title.en;
  const subTitle = sections[currentSection].cover.title.en;
  const button = sections[currentSection].cover.button.en;
  const imageLeft = sections[currentSection].cover.image.left;
  const imageRight = sections[currentSection].cover.image.right;
  const appContext = useAppContext();

  return (
    <Container
      className='relative w-full h-full flex justify-center items-center'
      // maxWidth=""
    >
      <div className='relative max-w-xl z-10 w-fit flex flex-col items-center'>
        <Heading
          title={title}
          subTitle={subTitle}
          letterSpacing={true}
          subTitleSizeMobile='text-mheading'
        />
        <RoundedFullButton
          className='uppercase tracking-default'
          onClick={() => {
            appContext.setChangeQuestion(true);
            document.getElementById("containerQuestion").style.opacity = 0;
            setTimeout(() => {
              quizUpdate(
                null,
                null,
                sections,
                currentSection,
                currentQuestion,
                setCurrentSection,
                setCurrentQuestion,
                setStatus
              );
            }, 300);
          }}
        >
          {button}
        </RoundedFullButton>
      </div>
      <div className='px-6 max-w-screen-xl absolute mx-auto h-[50vh] min-h-[500px] max-h-[800px] md:h-auto w-full top-1/2 -translate-y-1/2 flex flex-row items-center justify-between'>
        <div className='absolute -right-5 md:right-auto top-0 md:top-auto md:translate-y-0 md:relative w-44 h-44 md:w-60 md:h-60 lg:w-72 lg:h-72 rotate-[45deg] md:rotate-0 '>
          <Image
            src={imageLeft}
            fill
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
        <div className='absolute -left-5 md:left-auto bottom-0 md:bottom-auto md:translate-y-0 md:relative w-44 h-44  md:w-60 md:h-60 lg:w-72 lg:h-72 rotate-[-135deg] md:rotate-0 '>
          <Image
            src={imageRight}
            fill
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default TitleComponent;
