// .github/apps/hubble/routes/api/guess.js
import { kv } from '@extendohub/storage'

export default async function (request, response) {
  if (request.method !== 'post') return response.status(404)
  if (!request.body || !request.body.guess) return response.status(400)
  const wordOfTheDay = await kv.get('word')
  const result = evaluateGuess(request.body.guess, wordOfTheDay)
  response.json(result)
}

function evaluateGuess(guess, word) {
  const matches = []
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === word[i]) matches.push('green')
    else if (word.includes(guess[i])) matches.push('yellow')
    else matches.push('gray')
  }
  const isCorrect = matches.reduce(
    (result, state) => result && state === 'green',
    true
  )
  return {guess, matches, isCorrect}
}
