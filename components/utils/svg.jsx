const ArrowRight = ({ color = '#fff', stroke = 2, ...options }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="14"
    fill="none"
    viewBox="0 0 28 14"
    {...options}
  >
    <path
      fill={
        color === 'text-black'
          ? 'black'
          : color === 'text-white'
          ? 'white'
          : 'black'
      }
      d="M27.285 7.605a.855.855 0 000-1.21L21.843.955a.855.855 0 00-1.209 1.208L25.471 7l-4.837 4.837a.855.855 0 001.21 1.209l5.44-5.441zM0 7.855h26.68v-1.71H0v1.71z"
    ></path>
  </svg>
)

const ArrowLeft = ({ color = '#fff', stroke = 2, ...options }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="14"
      fill="none"
      viewBox="0 0 28 14"
      style={{
        transform: 'rotate(180deg)'
      }}
      {...options}
    >
      <path
        fill={
          color === 'text-black'
            ? 'black'
            : color === 'text-white'
            ? 'white'
            : 'black'
        }
        d="M27.285 7.605a.855.855 0 000-1.21L21.843.955a.855.855 0 00-1.209 1.208L25.471 7l-4.837 4.837a.855.855 0 001.21 1.209l5.44-5.441zM0 7.855h26.68v-1.71H0v1.71z"
      ></path>
    </svg>
  )

const Plus = ({ color = '#fff', stroke = 2, ...options }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    fill="none"
    viewBox="0 0 22 22"
    {...options}
  >
    <path stroke={color} strokeWidth="4" d="M0 10.691L22 10.691"></path>
    <path stroke={color} strokeWidth="4" d="M11.308 0L11.308 22"></path>
  </svg>
)

export { ArrowRight, ArrowLeft, Plus }
