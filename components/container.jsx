export default function Container({ children, className }) {
  return (
    <div
      className={`px-6 max-w-screen-xl mx-auto w-full md:px-8 ${className}`}
    >
      {children}
    </div>
  )
}
