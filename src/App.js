import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
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
    // Later add notification popup with undo option
    ContactsAPI.remove(contact).then(contact => {
      console.log(`${contact.name} was deleted`);
    });
  }

  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([ contact ])
      }));
    });
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
          />
        )}/>
        <Route path='/create' render={({ history }) => (
          <CreateContact
            onCreateContact={contact => {
              this.createContact(contact);
              history.pushState('/');
            }}
          />
        )}/>
      </div>
    );
  }
}

export default App;
