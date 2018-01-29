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
    this.updateQuery = this.updateQuery.bind(this);
  }

  updateQuery(query) {
    this.setState({
      query: query.trim()
    });
  }

  render() {
    let contactsToShow;
    if (this.state.query) {
      const regExp = new RegExp(escapeRegExp(this.state.query), 'i');
      contactsToShow = this.props.contacts.filter(contact => regExp.test(contact.name));
    } else {
      contactsToShow = this.props.contacts;
    }
    contactsToShow.sort(sortBy('name', 'email'));

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
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
              <button onClick={() => this.props.onDeleteContact(contact)} className='contact-remove'>Remove</button>
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
