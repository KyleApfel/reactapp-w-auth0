const
  express = require('express'),
  app     = express(),
  jwt     = require('express-jwt'),
  cors    = require('cors'),
  nil     = null;

app.use(cors());

const authCheck = jwt({
  secret: new Buffer('OiUUyQyGDdbIY4mmZXfAvJzj20KHhOukFyMjIoBW38IVFgd5XqZ_3s_vvPbldhZN', 'base64'),
  audience: 'bzJYkJGKtPCeMA3aUTFwj62J46KhzRkT'
});

var contacts = [
  {
    id    : 1,
    name  : 'Kyle Apfel',
    email : 'ka@fakemail.com',
    image : '//avatars2.githubusercontent.com/u/7343948?v=3&s=460'
  },
  {
    id    : 2,
    name  : 'Adam Booth',
    email : 'ab@fakemail.com',
    image : '//avatars0.githubusercontent.com/u/640123?v=3&s=460'
  },
  {
    id    : 3,
    name  : 'Trevor Basinger',
    email : 'tb@fakemail.com',
    image : '//avatars0.githubusercontent.com/u/639117?v=3&s=460'
  },
  {
    id    : 4,
    name  : 'Travis Holt',
    email : 'th@fakemail.com',
    image : '//avatars2.githubusercontent.com/u/13945646?v=3&s=460'
  }
];

app.get('/api/contacts', (req, res) => {
  const allContacts = contacts.map(contact => {
    return { id: contact.id, name: contact.name}
  });
  res.json(allContacts);
});

app.get('/api/contacts/:id', authCheck, (req, res) => {
  res.json(contacts.filter(contact => contact.id === parseInt(req.params.id)));
});

app.listen(3001);
console.log('Listening on http://localhost:3001')
