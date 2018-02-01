import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImageInput from './ImageInput';

class CreateContact extends Component {
  render() {
    return (
      <div>
        <Link className='close-create-contact' to='/'>Close</Link>
        <form className='create-contact-form'>
          <ImageInput
            className='create-contact-avatar-input'
            name='avatarURL'
            maxHeight={64}
          />
        </form>
      </div>
    );
  }
}

export default CreateContact;
