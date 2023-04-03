export default function Container({
  children,
  className,
  maxWidth = 'max-w-screen-xl',
}) {
  return (
    <div className={`px-6 ${maxWidth} mx-auto w-full md:px-8 ${className}`}>
      {children}
    </div>
  )
}
