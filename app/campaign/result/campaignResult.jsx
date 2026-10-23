'use client'

import Footer from '@/components/footer'
import Header from '@/components/header'
import HeaderGap from '@/components/headerGap'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'

const SLIDE_GAP = 24

const CampaignResult = ({ result, quiz }) => {
  const router = useRouter()
  const isEn = usePathname().endsWith('/en')
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
          setReset={() => router.push(isEn ? '/campaign/en' : '/campaign')}
        />
        <HeaderGap />
        <div
          className={`campaign-result ${result.noDoctor ? 'nodoctor' : ''}`}
        >
          <div dangerouslySetInnerHTML={{ __html: result.heading }} />
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
                {result.products.map((product, index) => (
                  <div
                    key={index}
                    className="product"
                    dangerouslySetInnerHTML={{ __html: product }}
                  />
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
        </div>
      </div>
      <Footer footer={quiz.footerData} search={`?s=${s}`} />
    </main>
  )
}

export default CampaignResult
