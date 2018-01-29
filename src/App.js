import React, { Component } from 'react';
import ListContacts from './ListContacts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [
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
      ]
    }
    this.removeContact = this.removeContact.bind(this);
  }
  
  removeContact(contact) {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(c => c.id !== contact.id)
    }));
  } 

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Test</h1>
        </header>
        <div>
          <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts} />
        </div>
      </div>
    );
  }
}

export default App;
