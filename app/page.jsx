import Layout from '@/components/layout'
import QuestionnairePage from '@/components/modules/questionnairePage'
import quiz from './sample-data.json'

export const metadata = {
  title: quiz.data.seoData.title.en,
  keywords: quiz.data.seoData.keyword.en.split(","),
  openGraph: {
    images: quiz.data.seoData.image,
  },
}

export default function Home() {
  return (
    <Layout>
      <QuestionnairePage />
    </Layout>
  )
}
