import React, { Component } from 'react';

export default class OfferSavePassword extends Component {
  render () {
    const {data} = this.props;
    return <div className="save-password">
      <h2 className="title">{`Would you like to save this credentials for?`}</h2>
      <p>Username : {data.username}</p>
      <p>Password : {data.password.split('').map((item, i) => <span key={i} className="dot" />)}</p>
      <button id="savePassword" type="button">Yes</button>
      <span className="close" id="notSavePassword" />
    </div>
  }
}