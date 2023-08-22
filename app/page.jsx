import Layout from '@/components/layout'
import Quiz from './quiz'
import { headers } from 'next/headers'

export async function generateMetadata() {
  return fetch('https://herbana.id/quiz-api.php', { cache: 'force-cache' })
    .then((res) => res.json())
    .then(({ seoData }) => {
      const headersList = headers()
      const getPathname = (headersList.get('referer') || '').split('/')
      const pathname = getPathname[3]
      return {
        title: pathname === 'en' ? seoData.title.en : seoData.title.id,
        keywords:
          pathname === 'en'
            ? seoData.keyword.en.split(',')
            : seoData.keyword.id.split(','),
        openGraph: {
          type: 'website',
          url: 'https://quiz.herbana.id',
          title: pathname === 'en' ? seoData.title.en : seoData.title.id,
          description: pathname === 'en' ? seoData.title.en : seoData.title.id,
          siteName: pathname === 'en' ? seoData.title.en : seoData.title.id,
          images: [
            {
              url: seoData.image,
              width: 800,
              height: 600,
            },
          ],
        },
        twitter: {
          card: 'summary_large_image',
          title: pathname === 'en' ? seoData.title.en : seoData.title.id,
          description: pathname === 'en' ? seoData.title.en : seoData.title.id,
          images: [
            {
              url: seoData.image,
              width: 800,
              height: 600,
            },
          ],
        },
      }
    })
    .catch((error) => console.error(error))
}

const Questionnaire = () => {
  return (
    <Layout>
      <Quiz />
    </Layout>
  )
}

export default Questionnaire
