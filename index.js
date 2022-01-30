import { answers, rest, all } from 'wordle-words'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  let url = new URL(request.url)
  let endpoint = url.pathname.split('/')[1]
  let dailyIndex = Math.floor(Date.now() / 8640000) - 189998

  if (!endpoint) {
    return new Response(JSON.stringify(answers[dailyIndex]), {
      headers: { 'content-type': 'application/json' },
    })
  }

  if (Number(endpoint) > 0 && Number(endpoint) < answers.length) {
    return new Response(JSON.stringify(answers[Number(endpoint)]), {
      headers: { 'content-type': 'application/json' },
    })
  }

  if (endpoint === 'answers') {
    return new Response(JSON.stringify(answers), {
      headers: { 'content-type': 'application/json' },
    })
  }

  if (endpoint === 'rest') {
    return new Response(JSON.stringify(rest), {
      headers: { 'content-type': 'application/json' },
    })
  }

  return new Response(JSON.stringify(all), {
    headers: { 'content-type': 'application/json' },
  })
}
