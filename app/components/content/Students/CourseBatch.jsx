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
        class_year: currentYear+'-'+nextYear,
        class_name: '',
        section_name: '',
        section_dropdown: false,
        button_disabled: false
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
    	this.getSelectedSection(value);
    }
    handleSubmit(event)
    {
      event.preventDefault();
      var studentId = sessionStorage.getItem('sess_student_id');
      var childId = sessionStorage.getItem('sess_child_id');
      var myclass = this.state.classes;
      var mysection = this.state.sections;
      var myYear = this.state.class_year;
      if(typeof this.props.Students!='undefined')
      {
          var myUrl = base_url+'students_con/edit_batch';
          studentId = this.props.Students['student_id'];
          childId = this.props.Students['child_id'];
      }else{
          var myUrl = base_url+'students_con/save_batch';
      }
      $.ajax({
                      type: 'POST',
                      url: myUrl,
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
                          if(typeof this.props.Students!='undefined'){
                              this.props.Students['section_id'] = resdata.section_id;
                          }
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
       if(typeof this.props.Students!='undefined')
       {
          this.setState({
              classes: this.props.Students['class_id'],
              sections: this.props.Students['section_id']
          },function(){
            this.handleChangeClasses.bind(this)}
          );
       }   
    }
    getSelectedSection(value)
    {
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
    getSectionList(class_id){
        this.getSelectedSection(class_id);
        this.setState({section_dropdown:true});
        $("#sections").trigger( "click" );
    }
    componentWillMount()
    {
      if(typeof this.props.Students!='undefined')
      {

          if(this.props.Students['year'] != this.props.Students['current_year']){
                this.setState({button_disabled:true});
          }

          $.ajax({
                type: 'POST',
                url: base_url+'students_con/get_batch',
                dataType:'json',
                data:{
                   class_id: this.props.Students['class_id'],
                   section_id: this.props.Students['section_id'] 
                },
                success: function (resdata) {
                  if(resdata.length > 0){
                      this.setState({
                          class_name:resdata[0]['class_name'],
                          section_name:resdata[0]['section_name'],
                          sections:resdata[0]['section_id'],
                          classes:resdata[0]['class_id']
                      });
                  }
                }.bind(this),
                        error: function(xhr, status, err) {
                          console.error(err.toString());
                }.bind(this)
          })
      }else{ 
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
  		const {classes,sections,class_year,class_name,section_name,section_dropdown,button_disabled} = this.state;



      let course_batch_view;
       if(typeof this.props.Students!='undefined')
       {
          let mysection;
          if(section_dropdown){
             mysection = (
                <SelectValidator 
                    name="sections" 
                    floatingLabelText="Section"
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
             )
          }else{
             mysection = (
                <TextField
                            floatingLabelText="Section"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            name="section_name"
                            value={section_name}
                            id="section_name"
                            onClick={this.getSectionList.bind(this,classes)}
                            fullWidth={true}
                />
             ); 
          }
          course_batch_view = (
           <div>
            <div className="row clearfix">
              <div className="col-sm-6">
                  <TextField
                            floatingLabelText="Tution Fee"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            name="class_year"
                            value={class_year}
                            id="class_year"
                            fullWidth={true}
                    />
              </div>
            </div>
            <div className="row clearfix">
                <div className="col-sm-6">
                      <TextField
                            floatingLabelText="Standred"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            name="class_name"
                            value={class_name}
                            id="class_name"
                            fullWidth={true}
                      />
                </div>
            </div>
            <div className="row clearfix">
                <div className="col-sm-6">
                    {mysection}
                </div>
             </div>   
              <input type="hidden" name="classes" value={classes} /> 
           </div>
          );
       }else{
          course_batch_view = (
            <div className="row clearfix">
              <div className="col-sm-4">
                  <TextField
                            floatingLabelText="Tution Fee"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            name="class_year"
                            value={class_year}
                            id="class_year"
                            fullWidth={true}
                    />
              </div>
              <div className="col-sm-4">  
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
                    </SelectValidator>
              </div> 
              <div className="col-sm-4">    
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
                </div>
             </div>
           );
       } 
    	return(
    		    <ValidatorForm id="myform2" ref="form" onSubmit={this.handleSubmit.bind(this)} onError={errors => console.log(errors)}>
             {course_batch_view}
             <div className="row clearfix"> 
                <div className="col-sm-4"> 
                    <RaisedButton 
                      style={{marginRight: 12}} 
                      primary={true}
                      type="submit"
                      label="Save" 
                      disabled={button_disabled}
                  />
              </div>  
             </div> 
    		    </ValidatorForm> 
    	)
    }
}      	