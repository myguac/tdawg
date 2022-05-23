// .github/apps/hubble/public/app.js
// Set up and render the App
const container = document.getElementById("app")
const root = ReactDOM.createRoot(container)
root.render(<App />)

// Render the app
function App() {
  const [guesses, setGuesses] = React.useState([])
  const [gameState, setGameState] = React.useState('inProgress')
  const remainingGuesses = 6 - guesses.length

  const handleSubmit = async (evt) => {
    const newGuess = evt.target.elements.guess.value
    evt.preventDefault()
    evt.target.reset()

    const guessResult = await makeGuess(newGuess)
    setGuesses((guesses) => [...guesses, guessResult])
    if (guessResult.isCorrect) setGameState('won')
    if (remainingGuesses === 0) setGameState('lost')
  }

  return (
    <div className="canvas">
      {(() => {
        switch (gameState) {
          case 'won':
            return <img class="game-result" src="https://octodex.github.com/images/nyantocat.gif" />
          case 'lost':
            return <img class="game-result" src="https://octodex.github.com/images/deckfailcat.png" />
          case 'inProgress':
            return (
              <div>
                <Grid guesses={guesses} remainingGuesses={remainingGuesses} />
                <form onSubmit={handleSubmit}>
                  <input className="input" maxLength="5" minLength="5" name="guess" placeholder="Your guess..." required type="text" />
                  <input className="submit" type="submit" value="Submit" />
                </form>
              </div>
            )
        }
      })()}
    </div>
  )
}

// Make a `POST` request to the Hubble API
async function makeGuess(guess) {
  const res = await fetch(
    "api/guess",
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ guess })
    }
  )

  if (!res.ok) throw new Error("Error submitting guess")
  return res.json()
}

// Display guesses in a grid
function Grid({ guesses, remainingGuesses }) {
  return <div className="grid">
    {guesses.map(({ guess, matches }) =>
      matches.map((match, i) => (
        <div className={`grid-item ${match && `grid-item--${match}`}`} key={i} >
          {guess[i]}
        </div>
      ))
    )}

    {Array(remainingGuesses)
      .fill()
      .map(() => Array(5).fill().map((_, i) => <div className="grid-item" key={i} />))}
  </div>
}
