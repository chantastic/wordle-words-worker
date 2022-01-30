import { answers, rest, all } from 'wordle-words'

const headers = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  // 'Access-Control-Max-Age': '86400',
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
async function handleRequest(request) {
  let url = new URL(request.url)
  let endpoint = url.pathname.split('/')[1]
  let dailyIndex = Math.floor(Date.now() / 8640000) - 189998

  if (!endpoint) {
    return new Response(JSON.stringify(answers[dailyIndex]), {
      headers,
    })
  }

  if (Number(endpoint) > 0 && Number(endpoint) < answers.length) {
    return new Response(JSON.stringify(answers[Number(endpoint)]), {
      headers,
    })
  }

  if (endpoint === 'answers') {
    return new Response(JSON.stringify(answers), {
      headers,
    })
  }

  if (endpoint === 'rest') {
    return new Response(JSON.stringify(rest), {
      headers,
    })
  }

  return new Response(JSON.stringify(all), {
    headers,
  })
}
