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
      transform: 'rotate(180deg)',
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

const Herbana = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="335"
    height="67.75"
    x="0"
    y="0"
    version="1.1"
    viewBox="0 0 335 67.75"
    xmlSpace="preserve"
    className="w-full h-full"
  >
    <g fill="#030303">
      <path d="M30.83 10.764c-14.386 0-26.09 11.703-26.09 26.089 0 14.388 11.704 26.094 26.09 26.094 14.387 0 26.091-11.706 26.091-26.094 0-14.386-11.704-26.089-26.091-26.089m1.951 9.99v-6.002c2.346.203 4.618.772 6.763 1.696l-6.763 4.306zM53.02 36.853c0 11.661-8.682 21.117-20.239 22.106V45.762l19.917-12.68c.213 1.248.322 2.515.322 3.771m-20.239 4.286v-15.76l10.649-6.781a22.473 22.473 0 018.203 10.536L32.781 41.139zm-3.901-5.356v23.176C17.323 57.97 8.642 48.514 8.642 36.853c0-3.871 1.013-7.674 2.933-11.017l17.305 9.947zm0-21.031v16.534l-15.063-8.661c3.821-4.575 9.15-7.361 15.063-7.873M100.108 58.254h-6.256V33.453c0-5.139-2.309-7.671-6.48-7.671-5.511 0-11.321 6.182-11.321 16.534v15.938h-6.256V5.524h6.256v22.194c2.384-4.543 7.225-7.596 13.034-7.596 6.852 0 11.023 4.096 11.023 12.065v26.067zM142.781 40.826h-27.556c.372 6.927 3.798 12.362 10.576 12.362 5.511 0 8.341-2.53 10.426-7.149l5.512 2.384c-3.501 7.299-8.193 10.427-15.938 10.427-11.396 0-16.981-9.31-16.981-19.363 0-10.056 5.585-19.364 16.981-19.364 11.096 0 16.98 8.49 16.98 17.8v2.903zm-27.184-5.66h20.63c-1.117-5.362-4.394-9.384-10.426-9.384-5.81 0-9.087 3.947-10.204 9.384M172.72 26.825a9.786 9.786 0 00-4.394-1.043c-5.139 0-10.501 6.033-10.501 18.248v14.225h-6.257V20.717h6.257v6.405c2.234-4.17 6.851-7 11.022-7 2.085 0 4.022.521 5.14 1.117l-1.267 5.586zM198.934 58.85c-4.544 0-9.161-2.458-10.949-5.213v4.617h-6.256V5.524h6.256v19.662c1.266-2.16 6.182-5.064 10.949-5.064 11.021 0 16.683 8.117 16.683 19.364-.001 11.245-5.662 19.364-16.683 19.364m-.596-33.068c-6.853 0-10.873 5.66-10.873 13.705 0 8.044 4.021 13.702 10.873 13.702 6.628 0 10.872-5.658 10.872-13.702 0-8.045-4.244-13.705-10.872-13.705M252.627 58.254h-4.915l-1.042-5.288c-2.383 3.427-6.182 5.884-11.768 5.884-6.256 0-11.619-3.352-11.619-11.396 0-8.043 6.704-12.288 16.982-12.288h6.105v-1.639c0-5.809-3.648-7.745-8.191-7.745-3.873 0-7 2.16-7.819 5.883l-5.512-1.266c1.042-6.33 6.256-10.278 13.331-10.278 8.268 0 14.447 4.171 14.447 14.151v23.982h.001zm-16.756-5.064c4.841 0 10.5-2.98 10.5-11.469v-.895h-6.702c-6.404 0-9.979 2.383-9.979 6.628-.001 3.576 2.233 5.736 6.181 5.736M292.546 58.254h-6.256V33.453c0-5.139-2.31-7.671-6.48-7.671-5.586 0-10.725 6.33-10.725 16.757v15.715h-6.256V20.717h6.256v6.927c2.754-4.841 7.224-7.522 12.438-7.522 6.851 0 11.023 4.245 11.023 11.693v26.439zM330.899 58.254h-4.915l-1.042-5.288c-2.383 3.427-6.182 5.884-11.769 5.884-6.256 0-11.618-3.352-11.618-11.396 0-8.043 6.704-12.288 16.981-12.288h6.107v-1.639c0-5.809-3.65-7.745-8.192-7.745-3.873 0-7 2.16-7.818 5.883l-5.513-1.266c1.042-6.33 6.256-10.278 13.331-10.278 8.269 0 14.448 4.171 14.448 14.151v23.982zm-16.755-5.064c4.841 0 10.5-2.98 10.5-11.469v-.895h-6.702c-6.405 0-9.98 2.383-9.98 6.628-.001 3.576 2.233 5.736 6.182 5.736"></path>
    </g>
  </svg>
)

export { ArrowRight, ArrowLeft, Plus, Herbana }
