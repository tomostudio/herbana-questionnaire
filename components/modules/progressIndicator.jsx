'use client'

import BackComponent from '../utils/backComponent'

const ProgressIndicator = ({
  currentSection,
  currentQuestion,
  setCurrentSection,
  setCurrentQuestion,
  setCheckStorage,
  sections,
  setStatus,
  setColor,
}) => {
  return (
    <div
      className="relative flex flex-col w-full"
    >
      <BackComponent
        currentSection={currentSection}
        currentQuestion={currentQuestion}
        setCurrentSection={setCurrentSection}
        setCurrentQuestion={setCurrentQuestion}
        setCheckStorage={setCheckStorage}
        sections={sections}
        setStatus={setStatus}
        setColor={setColor}
        type="quiz"
      />
      <div className=" relative w-full ">
        <div
          className={`hidden relative md:grid`}
          style={{
            gridTemplateColumns: `repeat(${
              sections.filter((data) => data.type !== 'fundamental').length > 5
                ? 5
                : sections.filter((data) => data.type !== 'fundamental').length
            }, minmax(0, 1fr))`,
          }}
        >
          {sections.map(
            (data, id) =>
              data.type !== 'fundamental' && (
                <div
                  key={id}
                  className="relative md:border-l-0 md:border-r-default  z-10 border-y-default border-black text-center text-footer md:text-nav font-maisonMono py-3 last:border-r-0"
                >
                  <div
                    className={`absolute top-0 left-0 h-full bg-yellow transition-all duration-300`}
                    style={{
                      width: `${
                        currentSection === id
                          ? currentQuestion !== null
                            ? ((sections[currentSection].questions[
                                currentQuestion
                              ].current -
                                1) /
                                sections[currentSection].questions.length) *
                              100
                            : 0
                          : currentSection > id
                          ? 100
                          : 0
                      }%`,
                    }}
                  />
                  <span className="relative uppercase">{data.title.en}</span>
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  )
}

export default ProgressIndicator
