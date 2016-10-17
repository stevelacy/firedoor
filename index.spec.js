

import Firedoor from 'firedoor'

// A client side schema model
// Validates with parse, and creates the schema
const DataSource = require('./the-data-source')
const firedoor = new Firedoor({ source: DataSource })

const Model = firedoor.Model({
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
Model({ id }).fetch() // better as it can query by a non id

// Getting a particular shape (only retrieve these values)
Model({ id }).fetch(['value'])  // option one
Model({ id }).fetch({ value: true}) // option two

// With child models
const User = firedoor.Model({
  id: 'string',
  name: 'string'
})

const Channel = firedoor.Model({
  id: 'string',
  name: 'string',
  users: [ User ]
})

Model({ id }).fetch()

const firstSet = User().fetch(10) // get the first 10 of a set
const secondSet = User().fetch(10, 20) // start at 10 and select to 20
