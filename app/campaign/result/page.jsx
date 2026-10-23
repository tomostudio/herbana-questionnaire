import Layout from '@/components/layout'
import { redirect } from 'next/navigation'
import CampaignResult from './campaignResult'
import getResult from './getResult'

export { generateMetadata } from '../../page'

const Result = async ({ searchParams }) => {
  const lang = searchParams.lang === 'en' ? 'en' : 'id'
  const [result, quiz] = await Promise.all([
    searchParams.s ? getResult(searchParams.s, lang) : null,
    fetch('https://herbana.id/quiz-api.php', { cache: 'force-cache' }).then(
      (res) => res.json(),
    ),
  ])

  if (!result) redirect(lang === 'en' ? '/campaign/en' : '/campaign')

  return (
    <Layout>
      <CampaignResult result={result} quiz={quiz} />
    </Layout>
  )
}

export default Result
