import { HERBANA_URL } from './data'

// herbana.id versions product images with the product's last update (WIB) as a unix timestamp
const toVersion = (ts) =>
  Math.floor(Date.parse(`${ts.replace(' ', 'T')}+07:00`) / 1000)

const getResult = async (s, lang) => {
  const res = await fetch(
    `${HERBANA_URL}${lang === 'en' ? '' : '/id'}/quiz-result/${encodeURIComponent(s)}?json`,
    { cache: 'no-store' },
  )

  // An invalid session falls back to the herbana.id homepage (HTML)
  if (!res.headers.get('content-type')?.includes('json')) return null
  const { result, products } = await res.json()

  return {
    name: result.name,
    notice: !!result.notice,
    products: products.map((product) => {
      const version = toVersion(product.ts)
      return {
        id: product.productID,
        name:
          lang === 'en'
            ? product.product_display_name
            : product.product_display_name_id,
        alt: product.product_name,
        image: `${HERBANA_URL}/files/product/${product.productID}/product.png?${version}`,
        series: product.series_name,
        seriesLogo: `${HERBANA_URL}/files/product-series/${product.seriesID}.svg?${version}`,
        category: product.suggest_category?.label?.[lang]
          ? {
              icon: product.suggest_category.icon,
              label: product.suggest_category.label[lang],
            }
          : null,
        whythis: product.whythis,
      }
    }),
  }
}

export default getResult
