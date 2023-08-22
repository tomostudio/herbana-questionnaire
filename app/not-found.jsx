import Layout from '@/components/layout'
import NotFoundPage from './notFoundPage'

export async function generateMetadata() {
  return fetch('https://herbana.id/quiz-api.php', { cache: 'force-cache' })
    .then((res) => res.json())
    .then(({ seoData }) => {
      return {
        title: '404 Not Found',
        keywords: seoData.keyword.id.split(','),
        openGraph: {
          type: 'website',
          url: 'https://quiz.herbana.id',
          title: seoData.title.id,
          description: seoData.title.id,
          siteName: seoData.title.id,
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
          title: seoData.title.id,
          description: seoData.title.id,
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

const NotFound = () => {
  return (
    <Layout>
      <NotFoundPage />
    </Layout>
  )
}

export default NotFound
