import React from 'react';
import classNames from 'classnames';

export default class Error extends React.Component 
{
  constructor(props) 
  {
      super(props);
      this.state = {
        message: 'Input is invalid'
      }
  }     


  render() {

      var errorClass = classNames(this.props.className, {
        'error_container':   true,
        'visible':           this.props.visible,
        'invisible':         !this.props.visible
      });

      return (
          <label id="name-error" className={errorClass} htmlFor="name">This field is required.</label>
      );
  }

}