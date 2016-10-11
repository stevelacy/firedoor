

import Firedoor from 'firedoor'

// A client side schema model
// Validates with parse, and creates the schema


const Model = new Firedoor.Model({
  path: ['itemById', '<id>', 'items'],
  schema: {
    id: 'string',
    value: 'string',
    online: 'number'
  }
})


// In a mercury view:
// could potentially automagicly set the state

function load () {
  Model.fetch()
    .then(data => state.set(data))
    .catch(e => console.error(e))


  // subscription
  Model.subscribe()
    .then((data) => state.set(data))
}

// Choices for getting a particular item with a known ID
const id = 1
Model.fetch(id)
  .then(data => setState(data))

Model.get(id).fetch()
Model({ id }).fetch()

