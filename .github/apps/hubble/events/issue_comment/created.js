// .github/apps/hubble/events/issue_comment/created.js
export default function ({ event }) {
  const newWords = event.comment.body.match(/\b\w{5}\b/g)
  console.log(`Five-letter words:\n${newWords.join('\n')}`)
}
