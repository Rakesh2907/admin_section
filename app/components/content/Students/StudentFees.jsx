import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import {black500, blue500} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

export default class StudentFees extends React.Component 
{
		constructor(props) 
        {
    		super(props);

    		this.state = {
    			tution_fee: '00.00',
    			admission_fee: '00.00',
    			annual_funds: '00.00',
    			practical_charges: '00.00',
    			test_session: '00.00',
          total_fees: '00.00',
    			fees_status: 'unpaid',
          active:props.active
    		}
    		this.handleChangeTutionFees = this.handleChangeTutionFees.bind(this);
    		this.handleChangeAdmissionFees = this.handleChangeAdmissionFees.bind(this);
    		this.handleChangeAnnualFunds = this.handleChangeAnnualFunds.bind(this);
    		this.handlePracticalCharge = this.handlePracticalCharge.bind(this);
    		this.handleExamFee = this.handleExamFee.bind(this);
    		this.handleFeesStatus = this.handleFeesStatus.bind(this);
    	}
    	handleSubmit(event)
      {
    		event.preventDefault();
        var status = this.state.fees_status;
        if(typeof this.props.Students!='undefined')
        { 
            var studentId = this.props.Students['student_id'];
            var childId = this.props.Students['child_id']; 
            var classId = this.props.Students['class_id'];
            var registration_no = this.props.Students['registration_number'];
        }else{
            var studentId = sessionStorage.getItem('sess_student_id');
            var childId = sessionStorage.getItem('sess_child_id'); 
            var classId =  sessionStorage.getItem('sess_class_id');
            var registration_no = 0;
        }

          $.ajax({
                        type: 'POST',
                        url: base_url+'students_con/save_fees',
                        data: $('#myform5').serialize()+'&fees_status='+status+'&student_id='+studentId+'&child_id='+childId+'&reg_no='+registration_no+'&class_id='+classId,
                        dataType: 'json',
                        success: function (resdata) {
                            sessionStorage.clear();
                            swal({
                                title: "Fees Added to Student...",
                                type: "success",
                                confirmButtonClass: 'btn-success',
                                confirmButtonText: 'Okay'
                            },function(){
                                  location.reload();
                            });
                        }.bind(this),
                          error: function(xhr, status, err) {
                            console.error(err.toString());
                        }.bind(this)
          });
    	}
    	handleChangeTutionFees(event){
    			this.setState({tution_fee:event.target.value});
    	}
    	handleChangeAdmissionFees(event){
    			this.setState({admission_fee:event.target.value});
    	}
    	handleChangeAnnualFunds(event){
    			this.setState({annual_funds:event.target.value});		
    	}
    	handlePracticalCharge(event){
    			this.setState({practical_charges:event.target.value});		
    	}
    	handleExamFee(event){
    			this.setState({test_session:event.target.value});				
    	}
    	handleFeesStatus(event,index,value){
    			this.setState({fees_status:value});		
    	}
      componentDidMount() 
      {   
            if(typeof this.props.Students!='undefined')
            {
                  var myData = {
                      student_id: this.props.Students['student_id'],
                      class_id: this.props.Students['class_id'],
                      admission_year: this.props.Students['year'],
                      type: 'edit'
                  }
            }else{
                var myData = {
                    admission_year: sessionStorage.getItem('sess_class_year'),
                    class_id: sessionStorage.getItem('sess_class_id'),
                    type: 'save'
                }
            }
            
         $.ajax({
              url: base_url+'students_con/get_fees',
              dataType: 'json',
              type: 'POST',
              data: myData,
              success: function(resdata) {
                if(resdata.length > 0)
                {
                    var fees_addition = (parseFloat(resdata[0]['tution_fees']) + parseFloat(resdata[0]['admission_fees']) + parseFloat(resdata[0]['annual_funds']) + parseFloat(resdata[0]['practical_charges']) + parseFloat(resdata[0]['exam_fees']));
                    
                    if(typeof this.props.Students!='undefined')
                    {
                        this.setState({
                             tution_fee: resdata[0]['tution_fees'], 
                             admission_fee: resdata[0]['admission_fees'],
                             annual_funds: resdata[0]['annual_funds'],
                             practical_charges: resdata[0]['practical_charges'],
                             test_session: resdata[0]['exam_fees'], 
                             total_fees: fees_addition,
                             fees_status: resdata[0]['fee_status'] 
                        });
                    }else{
                        this.setState({
                            tution_fee:resdata[0]['tution_fees'],
                            admission_fee:resdata[0]['admission_fees'],
                            annual_funds:resdata[0]['annual_funds'],
                            practical_charges:resdata[0]['practical_charges'],
                            test_session:resdata[0]['exam_fees'],
                            total_fees:fees_addition
                        });
                    }   
                }
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(err.toString());
              }.bind(this)
          });
      }
    	render(){
    		const styles = {
    			floatingLabelStyle: {
    				color: black500,
  				},
  				underlineStyle: {
    				borderColor: black500,
  				}
    		}
    		const {tution_fee,admission_fee,annual_funds,practical_charges,test_session,fees_status,total_fees} = this.state;
    		return(
    			<ValidatorForm id="myform5" ref="form" onSubmit={this.handleSubmit.bind(this)} onError={errors => console.log(errors)}>
    				<TextField
                      floatingLabelText="Tution Fee"
                      floatingLabelStyle={styles.floatingLabelStyle}
                      inputStyle={styles.floatingLabelStyle}
                      underlineStyle={styles.underlineStyle}
                      name="tution_fee"
                      value={tution_fee}
                      id="tution_fee"
                      fullWidth={true}
            	/><br />
            	<TextField
                      floatingLabelText="Admission Fee"
                      floatingLabelStyle={styles.floatingLabelStyle}
                      inputStyle={styles.floatingLabelStyle}
                      underlineStyle={styles.underlineStyle}
                      name="admission_fee"
                      value={admission_fee}
                      id="admission_fee"
                      fullWidth={true}
            	/><br />
            	<TextField
                      floatingLabelText="Annual Funds"
                      floatingLabelStyle={styles.floatingLabelStyle}
                      inputStyle={styles.floatingLabelStyle}
                      underlineStyle={styles.underlineStyle}
                      name="annual_funds"
                      value={annual_funds}
                      id="annual_funds"
                      fullWidth={true}
            	/><br />
            	<TextField
                      floatingLabelText="Practical Charges"
                      floatingLabelStyle={styles.floatingLabelStyle}
                      inputStyle={styles.floatingLabelStyle}
                      labelStyle={styles.floatingLabelStyle}
                      underlineStyle={styles.underlineStyle}
                      name="practical_charges"
                      value={practical_charges}
                      id="practical_charges"
                      fullWidth={true}
            	/><br />
            	<TextField
                      floatingLabelText="Exam Fee"
                      floatingLabelStyle={styles.floatingLabelStyle}
                      inputStyle={styles.floatingLabelStyle}
                      underlineStyle={styles.underlineStyle}
                      name="test_session"
                      type="number"
                      value={test_session}
                      id="test_session"
                      fullWidth={true}
            	/><br />
               <TextField
                  name="total_fees"
                  floatingLabelText="Total Fees"
                  floatingLabelStyle={styles.floatingLabelStyle}
                  inputStyle={styles.floatingLabelStyle}
                  labelStyle={styles.floatingLabelStyle}
                  underlineStyle={styles.underlineStyle}
                  id="total_fees"
                  value={total_fees}
                  fullWidth={true}
            /><br />
            	<SelectValidator 
	                  name="fees_status" 
	                  floatingLabelText="Fees Status"
	                  floatingLabelStyle={styles.floatingLabelStyle}
		              inputStyle={styles.floatingLabelStyle}
		              labelStyle={styles.floatingLabelStyle}
		              underlineStyle={styles.underlineStyle}
	                  value={fees_status}
	                  defaultValue={fees_status}
	                  onChange={this.handleFeesStatus}
	                  id="fees_status"
	                  validators={['required']}
	                  errorMessages={['this field is required']}
	                  fullWidth={true}
                >
                  <MenuItem value="unpaid" primaryText="Unpaid" />
                  <MenuItem value="paid" primaryText="Paid" />
             </SelectValidator> <br />
            	<RaisedButton 
                  style={{marginRight: 12}} 
                  primary={true}
                  type="submit"
                  label="Save & Finish" 
               />	
    			</ValidatorForm>
    		);
    	}	
}