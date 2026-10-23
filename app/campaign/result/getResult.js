import { parse } from 'node-html-parser'

const HERBANA_URL = 'https://herbana.id'

// Pulls the result content out of herbana.id's quiz-result.php so /campaign can show it without leaving the quiz site
const getResult = async (s, lang) => {
  const res = await fetch(
    `${HERBANA_URL}${lang === 'en' ? '' : '/id'}/quiz-result.php?s=${encodeURIComponent(s)}`,
    { cache: 'no-store' },
  )
  const root = parse(await res.text())

  // An invalid session redirects to the herbana.id homepage, which has no #heading
  const heading = root.querySelector('#heading')
  if (!heading) return null

  root.querySelectorAll('script, button').forEach((el) => el.remove())
  root.querySelectorAll('img').forEach((img) => {
    img.setAttribute('src', new URL(img.getAttribute('src'), HERBANA_URL).href)
  })

  return {
    noDoctor: !!root.querySelector('.nodoctor'),
    heading: heading.outerHTML,
    // Keep the card content only, without the link to the product page
    products: root
      .querySelectorAll('.product')
      .map((product) => (product.querySelector('a') || product).innerHTML.trim()),
  }
}

export default getResult
