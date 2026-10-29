'use client'

import Footer from '@/components/footer'
import Header from '@/components/header'
import HeaderGap from '@/components/headerGap'
import { RoundedFullButton } from '@/components/utils/buttons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'
import { HEADING_IMAGE, INFO_ICON, RESULT_TEXT } from './data'

const SLIDE_GAP = 24

const CampaignResult = ({ result, quiz }) => {
  const router = useRouter()
  const isEn = usePathname().endsWith('/en')
  const text = RESULT_TEXT[isEn ? 'en' : 'id']
  const retake = () => {
    localStorage.removeItem('questionnaire')
    router.push(isEn ? '/campaign/en' : '/campaign')
  }
  const s = useSearchParams().get('s')
  const sliderRef = useRef(null)
  const dragRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const slideStep = () =>
    sliderRef.current.querySelector('.product').offsetWidth + SLIDE_GAP

  const currentSlide = () => {
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
    return scrollLeft >= scrollWidth - clientWidth - 1
      ? result.products.length - 1
      : Math.round(scrollLeft / slideStep())
  }

  const handleScroll = () => setActiveSlide(currentSlide())

  const goToSlide = (index) =>
    sliderRef.current.scrollTo({
      left: Math.min(Math.max(index, 0), result.products.length - 1) * slideStep(),
      behavior: 'smooth',
    })

  // Mouse drag like slick on herbana.id; touch keeps native scrolling
  const handlePointerDown = (e) => {
    const slider = sliderRef.current
    if (e.pointerType !== 'mouse' || slider.scrollWidth <= slider.clientWidth)
      return
    e.preventDefault()
    slider.setPointerCapture(e.pointerId)
    slider.classList.add('dragging')
    dragRef.current = {
      x: e.clientX,
      scrollLeft: slider.scrollLeft,
      index: currentSlide(),
    }
  }

  const handlePointerMove = (e) => {
    if (!dragRef.current) return
    sliderRef.current.scrollLeft =
      dragRef.current.scrollLeft - (e.clientX - dragRef.current.x)
  }

  const handlePointerUp = (e) => {
    if (!dragRef.current) return
    const { x, index } = dragRef.current
    const delta = e.type === 'pointercancel' ? 0 : x - e.clientX
    dragRef.current = null
    sliderRef.current.classList.remove('dragging')
    // Same threshold as slick's default (touchThreshold: 5)
    goToSlide(
      Math.abs(delta) > sliderRef.current.clientWidth / 5
        ? index + Math.sign(delta)
        : index,
    )
  }

  return (
    <main className="w-full flex flex-col justify-between bg-white">
      <div className="relative min-h-screen w-full flex flex-col">
        <Header
          header={quiz.headerData}
          setReset={retake}
        />
        <HeaderGap />
        <div className={`campaign-result ${result.notice ? '' : 'nodoctor'}`}>
          <section id="heading">
            <div className="opening">
              <div>
                <h1>
                  {text.title} <span>{result.name}</span>.
                </h1>
                <p>{text.description}</p>
              </div>
            </div>
            {result.notice && (
              <div className="doctor">
                <div>
                  <div>
                    <img src={INFO_ICON} alt="" />
                  </div>
                  <div className="content">
                    <p>{text.notice}</p>
                  </div>
                  <div>
                    <img src={INFO_ICON} alt="" />
                  </div>
                </div>
              </div>
            )}
            <img className="bg-img" src={HEADING_IMAGE} alt="" />
          </section>
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onDragStart={(e) => e.preventDefault()}
            className="product_container"
          >
            <section className="products">
              <div id="slider">
                {result.products.map((product) => (
                  <div key={product.id} className="product">
                    <div className="icon">
                      {product.category ? (
                        <>
                          {product.category.icon && (
                            <img src={product.category.icon} alt="" />
                          )}
                          <span>
                            {text.categoryPrefix}
                            <span>{product.category.label}</span>
                            {text.categorySuffix}
                          </span>
                        </>
                      ) : (
                        <span>{text.recommendation}</span>
                      )}
                    </div>
                    <div className="productimage">
                      <img src={product.image} alt={product.alt} />
                    </div>
                    <div className="producttitle">
                      <img src={product.seriesLogo} alt={product.series} />
                      <span>{product.name}</span>
                    </div>
                    <div className="whythis">
                      <span className="label">{text.whyThis}</span>
                      {product.whythis.map((reason, index) => (
                        <p key={index}>{reason}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          {result.products.length > 1 && (
            <div className="slider-dots">
              {result.products.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Slide ${index + 1}`}
                  className={activeSlide === index ? 'active' : ''}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          )}
          <div className="flex justify-center pb-16 md:pb-20">
            <RoundedFullButton
              color="text-white"
              bg="bg-orange hover:bg-white"
              borderColor="border-orange"
              hoverTextIcon="hover-orange"
              className="!text-[1.05rem] md:!text-[1.2rem]"
              onClick={retake}
            >
              Retake Test
            </RoundedFullButton>
          </div>
        </div>
      </div>
      <Footer footer={quiz.footerData} search={`?s=${s}`} />
    </main>
  )
}

export default CampaignResult
