import Container from '@/components/container'
import Image from 'next/image'
import { DefaultButton } from './utils/buttons'
import { ArrowLeft } from './utils/svg'

export default function Footer({footer}) {
  return (
    <footer className={`bg-grey w-full`}>
      <Container>
        <div className="flex flex-row-reverse md:flex-row justify-between py-4">
          <div className="flex items-center text-footer font-bold font-maisonMono">
            {footer.creditText.en}
          </div>
          <div className="flex space-x-8">
            <div className="flex items-center">
              <DefaultButton
                destination="/en"
                className="text-footer font-bold font-maisonMono pr-2 border-r border-black"
              >
                EN
              </DefaultButton>
              <DefaultButton
                destination="/id"
                className="text-footer font-bold font-maisonMono ml-2"
              >
                ID
              </DefaultButton>
            </div>
            <DefaultButton
              destination="/id"
              className="hidden md:flex items-center text-footer font-bold font-maisonMono ml-2"
            >
              <div className="relative w-[14px] h-[14px] mr-2">
                <Image
                  src="/whatsapp.png"
                  fill
                  style={{
                    objectFit: 'contain',
                  }}
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
