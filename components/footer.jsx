import Container from '@/components/container'
import Image from 'next/image'
import { DefaultButton } from './utils/buttons'
import { ArrowLeft } from './utils/svg'

export default function Footer({ footer }) {
  return (
    <footer className={`bg-grey w-full`}>
      <Container>
        <div className="flex flex-row-reverse items-center md:flex-row justify-between py-4">
          <div className="flex items-center text-footer font-maisonMono text-right md:max-w-none">
            <span className='hidden md:block'>© HERBANA {new Date().getFullYear()}. All rights reserved.</span>
            <span className='md:hidden'>
              © HERBANA {new Date().getFullYear()}.
              <br />
              All rights reserved.
            </span>
          </div>
          <div className="flex space-x-8">
            <div className="flex items-center">
              <DefaultButton
                destination="/en"
                className="text-footer font-maisonMono pr-2 border-r border-black"
              >
                EN
              </DefaultButton>
              <DefaultButton
                destination="/"
                className="text-footer font-maisonMono ml-2"
              >
                ID
              </DefaultButton>
            </div>
            <DefaultButton
              destination={`https://wa.me/${footer.whatsappNumber.split(" ").join("")}`}
              target="_blank"
              className="hidden md:flex items-center text-footer font-bold font-maisonMono ml-2"
            >
              <div className="relative w-[14px] h-[14px] mr-2">
                <Image
                  src="/whatsapp.png"
                  fill
                  style={{
                    objectFit: 'contain',
                  }}
                  loading='eager'
                  priority={true}
                />
              </div>
              {footer.whatsappNumber}
            </DefaultButton>
          </div>
        </div>
      </Container>
    </footer>
  )
}
