// .github/apps/hubble/events/issue_comment/created.js
import { kv } from '@extendohub/storage'

export default async ({event}) => {
  const newWords = event.comment.body.match(/\b\w{5}\b/g)
  if (!newWords || !newWords.length) return
  const currentWords = await kv.get('words')
  const words = new Set(currentWords)
  newWords.forEach(word => words.add(word.toLowerCase()))
  await kv.set('words', Array.from(words))
}
