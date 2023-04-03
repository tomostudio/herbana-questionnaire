import Layout from '@/components/layout'
import QuestionnairePage from '@/components/modules/questionnairePage'

export const metadata = {
  title: 'Questionnaire',
}

export default function Home() {
  return (
    <Layout>
      <QuestionnairePage />
    </Layout>
  )
}
