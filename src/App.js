import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'list', // list or create
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
    // Later add notification popup with undo option
    ContactsAPI.remove(contact).then(contact => {
      console.log(`${contact.name} was deleted`);
    });
  } 

  render() {
    return (
      <div>
        {this.state.screen === 'list' && (
          <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts} />
        )}
        {this.state.screen === 'create' && (
          <CreateContact />
        )}
      </div>
    );
  }
}

export default App;
