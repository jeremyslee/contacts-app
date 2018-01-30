import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    }
    this.removeContact = this.removeContact.bind(this);
  }
  
  componentDidMount() {
    ContactsAPI.getAll().then(contacts => {
      this.setState({ contacts })
    });
  }

  removeContact(contact) {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(c => c.id !== contact.id)
    }));
  } 

  render() {
    return (
      <div>
        <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts} />
      </div>
    );
  }
}

export default App;
