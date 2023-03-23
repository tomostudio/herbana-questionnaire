'use client'

import { useAppContext } from 'context/state'
import { useState } from 'react'
import Container from '../container'
import { BorderButton, ImageButton } from '../utils/buttons'
import Heading from '../utils/heading'

const PickupComponent = ({
  title = '',
  subTitle = '',
  nextQuestion,
  nextSection,
  answers,
}) => {
  const appContext = useAppContext();
  const [test, setTest]= useState([]);
  return (
    <Container className="w-full h-full flex justify-center items-center py-10">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <Heading
          title={title}
          subTitle={subTitle}
          subTitleSizeMobile="text-mheading1"
          classNameSubTitle="max-w-xs md:max-w-none"
          marginSubtitle={false}
        />
        <span className='mb-6 md:mb-7 text-greyPickup md:text-mqHeadingb font-bold'>(PICK UP TO 3)</span>
        <div className="w-full max-w-4xl flex flex-wrap justify-center gap-4">
          {answers?.map((data, id) => (
            <ImageButton
              key={id}
              src="/icons/informed1.png"
              fill={false}
              width={70}
              height={70}
              data-target={id}
              onClick={(e) => {
                setTest([...test, id])
                const pickupButton = document.querySelector(`[data-target="${id}"]`)
                if(pickupButton.classList.contains("bg-orange")) {
                    pickupButton.classList.add("bg-white");
                    pickupButton.classList.remove("bg-orange");
                    pickupButton.classList.remove("text-white");
                }else {
                    pickupButton.classList.remove("bg-white");
                    pickupButton.classList.add("bg-orange");
                    pickupButton.classList.add("text-white");
                }
              }}
            >
              {data.label.en}
            </ImageButton>
          ))}
        </div>
        <BorderButton className="mt-6 md:mt-7">CONTINUE</BorderButton>
      </div>
    </Container>
  )
}

export default PickupComponent
