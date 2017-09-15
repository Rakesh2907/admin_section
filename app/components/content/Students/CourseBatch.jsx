import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import {black500, blue500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';

var menuItems2 = [];
var menuItems3 = [];

export default class CourseBatch extends React.Component 
{
	constructor(props) 
    {
     	super(props);
      const todayDate = new Date();
      const currentYear  = todayDate.getFullYear();
      const nextYear = todayDate.getFullYear() + 1;
     	this.state = {
     		classes:'',
     		sections: '',
        class_year: currentYear+'-'+nextYear
     	}
     	this.handleChangeClasses = this.handleChangeClasses.bind(this);
     	this.handleChangeSections = this.handleChangeSections.bind(this);
      this.handleChangeYear = this.handleChangeYear.bind(this);
    }
    handleChangeSections(event,index,value){
    	   this.setState({sections:value})
    }
    handleChangeYear(event,index,value){
         this.setState({class_year:value})
    }
    handleChangeClasses(event,index,value){
      	
    	this.setState({classes:value})
    	menuItems3 = [];
    	$.ajax({
                type: 'POST',
                url: base_url+'students_con/get_section',
                dataType:'json',
                data: {
                      class_id: value 
                },
                 success: function (resdata) {
                  if(resdata.length > 0)
                  {
                      for(var i = 0;i < resdata.length;i++)
                      {
                          menuItems3.push(<MenuItem value={resdata[i]['section_id']} primaryText={resdata[i]['section_name']} />)
                      }
                  }
                 }.bind(this),
                    error: function(xhr, status, err) {
                      console.error(err.toString());
                }.bind(this)
           });
    }
    handleSubmit(event)
    {
      event.preventDefault();
      var studentId = sessionStorage.getItem('sess_student_id');
      var childId = sessionStorage.getItem('sess_child_id');
      var myclass = this.state.classes;
      var mysection = this.state.sections;
      var myYear = this.state.class_year;
      $.ajax({
                      type: 'POST',
                      url: base_url+'students_con/save_batch',
                      data: {
                          'student_id': studentId,
                          'child_id': childId,
                          'class_id': myclass,
                          'section_id' : mysection,
                          'year' : myYear
                      },
                      dataType: 'json',
                      success: function (resdata) {
                          sessionStorage.setItem('sess_student_id', resdata.student_id);
                          sessionStorage.setItem('sess_child_id', resdata.child_id);
                          sessionStorage.setItem('sess_class_id', resdata.class_id);
                          sessionStorage.setItem('sess_class_year', resdata.year);
                          swal({
                              title: "Save Batch Successfully...",
                              type: "success",
                              confirmButtonClass: 'btn-success',
                              confirmButtonText: 'Okay'
                          },function(){
                                document.getElementById("next_button_1").click();
                          });
                      }.bind(this),
                        error: function(xhr, status, err) {
                          console.error(err.toString());
                      }.bind(this)
        });
    }
    componentDidMount()
    {
    	menuItems2 = [];
    	$.ajax({
                type: 'POST',
                url: base_url+'students_con/get_class',
                dataType:'json',
                 success: function (resdata) {
                  if(resdata.length > 0)
                  {
                      for(var i = 0;i < resdata.length;i++)
                      {
                          menuItems2.push(<MenuItem value={resdata[i]['id']} primaryText={resdata[i]['name']} />)
                      }
                  }
                 }.bind(this),
                    error: function(xhr, status, err) {
                      console.error(err.toString());
                }.bind(this)
           });
    }
    render() 
    {	
    	const styles = {
    		floatingLabelStyle: {
    			color: black500,
  			},
  			underlineStyle: {
    			borderColor: black500,
  			}
  		}	
  		const {classes,sections,class_year} = this.state;
    	return(
    		<ValidatorForm id="myform2" ref="form" onSubmit={this.handleSubmit.bind(this)} onError={errors => console.log(errors)}>
            <TextField
                      floatingLabelText="Tution Fee"
                      floatingLabelStyle={styles.floatingLabelStyle}
                      inputStyle={styles.floatingLabelStyle}
                      underlineStyle={styles.underlineStyle}
                      name="class_year"
                      value={class_year}
                      id="class_year"
                      fullWidth={true}
              /><br />
    			  <SelectValidator 
                  name="classes" 
                  floatingLabelText="Select Class"
                  floatingLabelStyle={styles.floatingLabelStyle}
	                inputStyle={styles.floatingLabelStyle}
	                labelStyle={styles.floatingLabelStyle}
	                underlineStyle={styles.underlineStyle}
                  value={classes}
                  defaultValue={classes}
                  onChange={this.handleChangeClasses}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  id="classes"
                  fullWidth={true}
                >
                  {menuItems2}
                </SelectValidator><br/>
                <SelectValidator 
                  name="sections" 
                  floatingLabelText="Select Section"
                  floatingLabelStyle={styles.floatingLabelStyle}
	              inputStyle={styles.floatingLabelStyle}
	              labelStyle={styles.floatingLabelStyle}
	              underlineStyle={styles.underlineStyle}
                  value={sections}
                  defaultValue={sections}
                  onChange={this.handleChangeSections}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  id="sections"
                  fullWidth={true}
                >
                  {menuItems3}
                </SelectValidator>
                <RaisedButton 
                  style={{marginRight: 12}} 
                  primary={true}
                  type="submit"
                  label="Save" 
              />
    		</ValidatorForm>
    	)
    }
}      	