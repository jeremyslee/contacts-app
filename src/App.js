import React, { Component } from 'react';
import ListContacts from './ListContacts';

// temporary contact files
// will be replaced when the server is built
const contacts = [
  {
    id: 'brutus',
    name: 'Brutus Burrito',
    email: 'brutus@brutusburrito.com',
    avatarURL: '/brutus.jpg'
  },
  {
    id: 'smudge',
    name: 'Purrfect Smudge',
    email: 'smudge@purrfectsmudge.com',
    avatarURL: '/smudge.jpg'
  }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Test</h1>
        </header>
        <div>
          <ListContacts contacts={contacts} />
        </div>
      </div>
    );
  }
}

export default App;
