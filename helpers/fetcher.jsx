const fetcher = () =>
  fetch('https://herbana.id/quiz-api.php').then((res) => res.json())
export default fetcher
