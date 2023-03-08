export default function Container({ children, className }) {
  return (
    <div
      className={`px-10 max-w-screen-xl mx-auto w-full md:px-8 ${className}`}
    >
      {children}
    </div>
  )
}
