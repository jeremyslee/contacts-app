import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
    this.resetQuery = this.resetQuery.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }

  resetQuery() {
    this.setState({ query: '' });
  }

  updateQuery(query) {
    this.setState({
      query: query.trim()
    });
  }

  render() {
    const { contacts, onDeleteContact, onNavigate } = this.props;
    const { query } = this.state;

    let contactsToShow;
    
    if (query) {
      const regExp = new RegExp(escapeRegExp(query), 'i');
      contactsToShow = contacts.filter(contact => regExp.test(contact.name));
    } else {
      contactsToShow = contacts;
    }
    
    contactsToShow.sort(sortBy('name', 'email'));

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <a 
            className='add-contact'
            href='#'
            onClick={() => onNavigate()}>
            Add Contact
          </a>
        </div>

        {contacts.length !== contactsToShow.length && (
          <div className='showing-contacts'>
            <span>Showing {contactsToShow.length} of {contacts.length} total</span>
            <button onClick={this.resetQuery}>(show all)</button>
          </div>
        )}

        <ol className='contact-list'>
          {contactsToShow.map(contact => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
              }} />
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button onClick={() => onDeleteContact(contact)} className='contact-remove'>Remove</button>
            </li>
            ))}
        </ol>
      </div>
    );
  }
}

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired
};

export default ListContacts
