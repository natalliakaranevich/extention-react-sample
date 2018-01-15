import React, { Component } from 'react';

export default class ExtensionPopup extends Component {
  render () {
    const {data} = this.props;
    debugger
    return <div className="popup-content">
      {
        data.map((item, index) => {
          return <div key={index}>{item.firstName}</div>
        })
      }
    </div>
  }
}