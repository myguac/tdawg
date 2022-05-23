// .github/apps/hubble/workers/midnight.js
import { kv } from '@extendohub/storage'

export default async function () {
  const words = await kv.get('words')
  if (!words) throw new Error('No word list for hubble')
  const index = Math.floor(Math.random() * words.length)
  const word = words[index]
  await kv.set('word', word)
  console.log(`Picked new word of the day: ${word}`)
}
