import Link from 'next/link'
import { forwardRef } from 'react'

const DefaultButton = forwardRef(
  (
    {
      destination,
      a11yText,
      className = '',
      children,
      hover = true,
      blank = false,
      onClick = () => {},
      ...others
    },
    ref,
  ) => {
    return !destination ? (
      <button
        aria-label={a11yText}
        className={`cursor-pointer ${className} pointer-events-auto ${
          hover ? 'hover:opacity-50 transition-opacity' : ''
        }`}
        onClick={onClick}
        ref={ref}
        {...others}
      >
        {children}
      </button>
    ) : !blank ? (
      <Link
        href={destination}
        scroll={false}
        aria-label={a11yText}
        className={`${className} pointer-events-auto ${
          hover ? 'hover:opacity-50 transition-opacity' : ''
        }`}
        ref={ref}
        {...others}
      >
        {children}
      </Link>
    ) : (
      <a
        aria-label={a11yText}
        className={`${
          destination ? 'pointer-events-auto' : 'pointer-events-none'
        } ${hover ? 'hover:opacity-50 transition-opacity' : ''} ${className}`}
        target="_blank"
        href={destination}
        ref={ref}
        {...others}
      >
        {children}
      </a>
    )
  },
)

export default DefaultButton
