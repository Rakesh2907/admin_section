import React from 'react';
import Error from './Error';
export default class Input extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEmpty: true,
      value: null,
      valid: false,
      errorMessage: "Input is invalid",
      errorVisible: false,
      coditionFocus: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.validation = this.validation.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleChange(event)
  {
        this.validation(event.target.value);
        if(this.props.onChange) {
          this.props.onChange(event);
        }
        console.info('onchange...!');
  }

  validation(value, valid)
  {
        if (typeof valid === 'undefined') {
          valid = true;
        }

        var message = "";
        var errorVisible = false;
    
        if (!valid) {
            message = this.props.errorMessage;
            valid = false;
            errorVisible = true;
        }else if(value.length < this.props.minCharacters){
            message = this.props.errorMessage;
            valid = false;
            errorVisible = true;
        }

        this.setState({
            value: value,
            isEmpty: jQuery.isEmptyObject(value),
            valid: valid,
            errorMessage: message,
            errorVisible: errorVisible
        });
  }

  handleBlur()
  {
      //var valid = this.props.validate(event.target.value);
      //this.validation(event.target.value, valid);
      this.setState( { coditionFocus : false});
  }

  handleFocus()
  {
      console.info('focus');
      this.setState( { coditionFocus : !this.state.coditionFocus} );
  } 

   render(){
      return (
      <div>
        <div className={this.state.coditionFocus ? "form-line focused" : "form-line"}>
            <input
              name={this.props.textname}
              placeholder={this.props.labelname}
              type={this.props.texttype}
              className="form-control"
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              onChange={this.handleChange}
              pattern={this.props.mypattern}
              title={this.props.labelname}
              value={this.props.value}
              required
              step="any"
            />
        </div>
        <Error 
          visible={this.state.errorVisible} 
          errorMessage={this.state.errorMessage} />
       </div>   
      );
    }  
}