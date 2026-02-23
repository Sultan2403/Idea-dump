# Edit idea page architecture

Parent component:

- Fetches idea

- Handles fetch loading / fetch error

- Passes idea as a prop

Child EditIdea component:

- Receives idea

- Tracks local form state

- Computes isEdited

- Calls update endpoint

- Shows saving / success / error UI

# Main goal.
No component guesses intent


N.B: This feels so easy to implement now. 
Note to future self: `Decide on architecture first so you don't frustrate yourself later`

See ya! :)