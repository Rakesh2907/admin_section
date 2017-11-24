import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import {black500, blue500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

export default class PayRoll extends React.Component
{
		constructor(props) {
           super(props);
           this.state = { 
              payroll_type: 'monthly',
              gross_pay: props.employeeInfo['gross_pay'],
              gross_display: false,
              total_show: false,
              basic_pay: 0,
              conveyance: 0,
              hra: 0,
              food_coupons: 0,
              medical: 0,
              lta: 0,
              fbt: 0,
              other_allowance: 0,
              vpf: 0,
              income_tax: 0,
              pt: 0,
              total_earning: 0,
              total_deduction: 0,
              net_pay: 0
           }   
    }
    componentWillReceiveProps(props){
        this.setState({gross_pay:props.employeeInfo['gross_pay']});
        this.payrollDetails(props.EmployeeID);
    }
    handleSubmit(event){
          event.preventDefault();
           $.ajax({
                      type: 'POST',
                      url: base_url+'employee_con/save_payroll/?employee_id='+this.props.EmployeeID,
                      data: $('#payrollform1').serialize(),
                      dataType: 'json',
                      success: function (resdata) {
                        swal({
                              title: "Save Successfully...",
                              type: "success",
                              confirmButtonClass: 'btn-success',
                              confirmButtonText: 'Okay'
                          },function(){
                              
                        });
                      }.bind(this),
                        error: function(xhr,status,err){
                          console.log(err.toString());
                      }.bind(this)
           });           
    }
    calculateBasicSalary(){
        $.ajax({
                      type: 'GET',
                      url: base_url+'employee_con/get_basic_salary/?gross_sal='+this.props.employeeInfo['gross_pay'],
                      dataType: 'json',
                      success: function (resdata) {
                          var t_earning = parseFloat(resdata.basic_sal) + parseFloat(resdata.hra);
                          this.setState({
                              basic_pay:Math.round(resdata.basic_sal),
                              hra:Math.round(resdata.hra),
                              total_earning:t_earning,
                              total_show: false
                          });
                      }.bind(this),
                        error: function(xhr, status, err) {
                          console.error(err.toString());
                      }.bind(this)
         });
    }
    handlePayrollType(event,index,value){
        	 this.setState({payroll_type:value});
    }
    handleChangeGrossPay(event){
          this.setState({gross_pay:event.target.value});
          this.props.employeeInfo['gross_pay'] = event.target.value;
    }
    handleChangeGross(showing){
          if(showing == 'mychange'){
              this.setState({gross_display:true});  
          }else{
              this.setState({gross_display:false});
             this.calculateBasicSalary();
          }
    }
    handleCancel(event){
        this.setState({gross_display:false}); 
    }
    handleBasicPay(event){
        this.setState({
            basic_pay:event.target.value,
            total_show:false
        });
    }
    handleConveyance(event){
        this.setState({
            conveyance:event.target.value,
            total_show:false
        });
    }
    handleHRA(event){
        this.setState({
          hra:event.target.value,
          total_show:false
        });
    }
    handleFBT(event){
        this.setState({
            fbt:event.target.value,
            total_show:false
        });
    }
    handleMedical(event){
        this.setState({
            medical:event.target.value,
            total_show:false
        });
    }
    handleFoodCoupons(event){
        this.setState({
            food_coupons:event.target.value,
            total_show:false
        });
    }
    handleLTA(event){
        this.setState({
          lta:event.target.value,
          total_show:false
        });
    }
    handleOthersAllowance(event){
        this.setState({
          other_allowance:event.target.value,
          total_show:false
        });
    }
    handleVPF(event){
        this.setState({
          total_show:false,
          vpf:event.target.value
        });
    }
    handleIncomeTax(event){
        this.setState({
          total_show:false,
          income_tax:event.target.value
        });
    }
    handleProfessionalTax(event){
        this.setState({
          total_show:false,
          pt:event.target.value
        });
    }
    getTotalEarning(){
        var mytotal_earn = 0;
        var mydeduction = 0;
        var mynetpay = 0;

        mytotal_earn = parseFloat(this.state.basic_pay) + parseFloat(this.state.conveyance) + parseFloat(this.state.hra) + parseFloat(this.state.fbt) + parseFloat(this.state.medical) + parseFloat(this.state.food_coupons) + parseFloat(this.state.lta) + parseFloat(this.state.other_allowance);

        mydeduction = parseFloat(this.state.vpf) + parseFloat(this.state.income_tax) + parseFloat(this.state.pt);

        mynetpay = parseFloat(mytotal_earn) - parseFloat(mydeduction);

        if(mytotal_earn > this.state.gross_pay){
              swal({
                              title: "Total earnings is less than gross pay.",
                              type: "warning",
                              confirmButtonClass: 'btn-danger',
                              confirmButtonText: 'Okay'
              },function(){
                  
             });
        }

        this.setState({
          total_show:true,
          total_earning:mytotal_earn,
          total_deduction: mydeduction,
          net_pay: mynetpay
        });
        console.log('Gross Pay ' + this.state.gross_pay + ' Earn '+mytotal_earn);
    } 
    componentDidMount(){
        this.payrollDetails(this.props.EmployeeID);
    }
    payrollDetails(employee_id){
          $.ajax({
                      type: 'GET',
                      url: base_url+'employee_con/get_payroll_details/?employee_id='+employee_id,
                      dataType: 'json',
                      success: function (resdata) {
                          sessionStorage.setItem('sess_employee_id', employee_id);
                          this.setState({
                              gross_pay: resdata[0]['gross_pay'],
                              basic_pay: resdata[0]['basic_pay'],
                              conveyance: resdata[0]['conveyance'],
                              hra: resdata[0]['hra'],
                              food_coupons: resdata[0]['food_coupons'],
                              medical: resdata[0]['medical'],
                              lta: resdata[0]['lta'],
                              fbt: resdata[0]['fbt'],
                              other_allowance: resdata[0]['other_allowance'],
                              vpf: resdata[0]['vpf'],
                              income_tax: resdata[0]['income_tax'],
                              pt: resdata[0]['pt'],
                              total_earning: resdata[0]['total_earning'],
                              total_deduction: resdata[0]['total_deduction'],
                              net_pay: resdata[0]['net_pay'],
                              total_show:true
                          });
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
            const {payroll_type,gross_pay,basic_pay,conveyance,hra,food_coupons,medical,lta,fbt,other_allowance,vpf,income_tax,pt,total_earning,total_deduction,net_pay} = this.state;
            let mygross_pay;
            let mytotal;
            if(this.state.gross_display){
                mygross_pay = (
                  <div>
                     <div className="col-sm-3"> 
                        <TextValidator
                            floatingLabelText="Gross Pay"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingLabelStyle}
                            underlineStyle={styles.underlineStyle}
                            onChange={this.handleChangeGrossPay.bind(this)}
                            name="gross_pay"
                            type="text"
                            value={gross_pay}
                            validators={['required','isNumber']}
                            errorMessages={['this field is required','enter only number']}
                            id="gross_pay"
                            fullWidth={true}
                        />
                     </div>
                     <div className="col-sm-3">
                          <RaisedButton 
                                style={{marginRight: 12}} 
                                primary={true}
                                type="Button"
                                label="Calculate" 
                                onClick={this.handleChangeGross.bind(this,'mycalculate')}
                          /> 
                          <FlatButton label="Cancel" primary={true} onClick={this.handleCancel.bind(this)}/>
                     </div>
                  </div>
                );
            }else{
                mygross_pay = (
                    <div>
                      <div className="col-sm-3">
                              <TextField
                                    floatingLabelText="Gross Pay"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    inputStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    name="gross_pay"
                                    value={this.props.employeeInfo['gross_pay']}
                                    id="gross_pay"
                                    fullWidth={true}
                                    disabled={true}
                              />
                        </div>
                        <div className="col-sm-3">
                            <RaisedButton 
                                style={{marginRight: 12}} 
                                primary={true}
                                type="Button"
                                label="Change" 
                                onClick={this.handleChangeGross.bind(this,'mychange')}
                            />
                       </div>
                    </div>   
                );
            }
            if(this.state.total_show)
            {
               mytotal = (
                          <div>
                            <div className="row clearfix">
                                 <div className="col-sm-6">
                                    <TextValidator
                                        floatingLabelText="Total Earnings"
                                        floatingLabelStyle={styles.floatingLabelStyle}
                                        inputStyle={styles.floatingLabelStyle}
                                        underlineStyle={styles.underlineStyle}
                                        name="total_earning"
                                        value={total_earning}
                                        id="total_earning"
                                        validators={['required','isNumber']}
                                        errorMessages={['this field is required','enter only number']}
                                        fullWidth={true}
                                     />
                                  </div>   
                                  <div className="col-sm-6">
                                        <TextValidator
                                              floatingLabelText="Total Deduction"
                                              floatingLabelStyle={styles.floatingLabelStyle}
                                              inputStyle={styles.floatingLabelStyle}
                                              underlineStyle={styles.underlineStyle}
                                              name="total_deduction"
                                              value={total_deduction}
                                              id="total_deduction"
                                              validators={['required','isNumber']}
                                              errorMessages={['this field is required','enter only number']}
                                              fullWidth={true}
                                         />
                                  </div>
                            </div> 
                            <div className="row clearfix">
                                  <div className="col-sm-6">
                                      <TextValidator
                                        floatingLabelText="Net Pay"
                                        floatingLabelStyle={styles.floatingLabelStyle}
                                        inputStyle={styles.floatingLabelStyle}
                                        underlineStyle={styles.underlineStyle}
                                        name="net_pay"
                                        value={net_pay}
                                        id="net_pay"
                                        validators={['required','isNumber']}
                                        errorMessages={['this field is required','enter only number']}
                                        fullWidth={true}
                                     />
                                  </div>
                            </div>
                            <div className="row clearfix">
                                 <div className="col-sm-6">
                                     <TextValidator
                                        floatingLabelText="Gross Pay"
                                        floatingLabelStyle={styles.floatingLabelStyle}
                                        inputStyle={styles.floatingLabelStyle}
                                        underlineStyle={styles.underlineStyle}
                                        name="gross_pay"
                                        value={gross_pay}
                                        id="gross_pay"
                                        validators={['required','isNumber']}
                                        errorMessages={['this field is required','enter only number']}
                                        fullWidth={true}
                                     />
                                </div>
                            </div>     
                            <div className="row clearfix">
                                 <div className="col-sm-6">
                                    <RaisedButton 
                                      style={{marginRight: 12}} 
                                      primary={true}
                                      type="submit"
                                      label="Save" 
                                    />
                                 </div>
                            </div>     
                          </div>        
              );                       
            }else{
               mytotal = (
                    <FlatButton label="Total" primary={true} onClick={this.getTotalEarning.bind(this)}/>
               );
            }
                             
        	return(
        		<ValidatorForm id="payrollform1" ref="form" onSubmit={this.handleSubmit.bind(this)} onError={errors => console.log(errors)}>
               <div className="row clearfix">
                        <div className="col-sm-6">
            			             <SelectValidator 
                                  name="payroll_type" 
                                  floatingLabelText="Payroll Type"
                                  floatingLabelStyle={styles.floatingLabelStyle}
                                  inputStyle={styles.floatingLabelStyle}
                                  labelStyle={styles.floatingLabelStyle}
                                  underlineStyle={styles.underlineStyle}
                                  value={payroll_type}
                                  defaultValue={payroll_type}
                                  onChange={this.handlePayrollType.bind(this)}
                                  id="payroll_type"
                                  fullWidth={true}
                                >
    	                            <MenuItem value="monthly" primaryText="Monthly"/>
                              </SelectValidator>
                        </div>
                        {mygross_pay}
                </div> 
                <div className="row clearfix">
                    <div className="col-sm-6">
                        <h2 className="card-inside-title">EARNING</h2>
                    </div>
                    <div className="col-sm-6">
                        <h2 className="card-inside-title">DEDUCTIONS</h2>
                    </div>
                </div>      
                <div className="row clearfix">
                    <div className="col-sm-6">
                        <TextValidator
                                    floatingLabelText="Basic Pay"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    inputStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    name="basic_pay"
                                    value={basic_pay}
                                    id="basic_pay"
                                    onChange={this.handleBasicPay.bind(this)}
                                    validators={['required','isNumber']}
                                    errorMessages={['this field is required','enter only number']}
                                    fullWidth={true}
                        />
                    </div>
                    <div className="col-sm-6">
                        <TextValidator
                                    floatingLabelText="VPF"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    inputStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    name="vpf"
                                    value={vpf}
                                    id="vpf"
                                    onChange={this.handleVPF.bind(this)}
                                    validators={['required','isNumber']}
                                    errorMessages={['this field is required','enter only number']}
                                    fullWidth={true}
                        />
                    </div>
                  </div>  
                    <div className="row clearfix">
                      <div className="col-sm-6">
                          <TextValidator
                                    floatingLabelText="HRA"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    inputStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    name="hra"
                                    value={hra}
                                    id="hra"
                                    onChange={this.handleHRA.bind(this)}
                                    validators={['required','isNumber']}
                                    errorMessages={['this field is required','enter only number']}
                                    fullWidth={true}
                         />
                      </div>
                      <div className="col-sm-6">
                          <TextValidator
                                    floatingLabelText="Income tax"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    inputStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    name="income_tax"
                                    value={income_tax}
                                    id="income_tax"
                                    onChange={this.handleIncomeTax.bind(this)}
                                    validators={['required','isNumber']}
                                    errorMessages={['this field is required','enter only number']}
                                    fullWidth={true}
                         />
                      </div>
                    </div> 
                    <div className="row clearfix">
                      <div className="col-sm-6">
                          <TextValidator
                                    floatingLabelText="Conveyance"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    inputStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    name="conveyance"
                                    value={conveyance}
                                    onChange={this.handleConveyance.bind(this)}
                                    id="conveyance"
                                    validators={['required','isNumber']}
                                    errorMessages={['this field is required','enter only number']}
                                    fullWidth={true}
                         />
                      </div>
                      <div className="col-sm-6">
                          <TextValidator
                                    floatingLabelText="Professional tax"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    inputStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    name="pt"
                                    value={pt}
                                    id="pt"
                                    onChange={this.handleProfessionalTax.bind(this)}
                                    validators={['required','isNumber']}
                                    errorMessages={['this field is required','enter only number']}
                                    fullWidth={true}
                          />
                      </div>
                    </div>
                    <div className="row clearfix">
                        <div className="col-sm-6">
                            <TextValidator
                                    floatingLabelText="FBT"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    inputStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    name="fbt"
                                    value={fbt}
                                    id="fbt"
                                    onChange={this.handleFBT.bind(this)}
                                    validators={['required','isNumber']}
                                    errorMessages={['this field is required','enter only number']}
                                    fullWidth={true}
                            />
                        </div>
                        <div className="col-sm-6">
                        </div>
                    </div>
                    <div className="row clearfix">
                        <div className="col-sm-6">
                          <TextValidator
                                    floatingLabelText="Medical"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    inputStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    name="medical"
                                    value={medical}
                                    id="medical"
                                    onChange={this.handleMedical.bind(this)}
                                    validators={['required','isNumber']}
                                    errorMessages={['this field is required','enter only number']}
                                    fullWidth={true}
                          />
                        </div>
                        <div className="col-sm-6">
                        </div>
                    </div>
                    <div className="row clearfix">
                        <div className="col-sm-6">
                          <TextValidator
                                    floatingLabelText="Food coupons"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    inputStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    name="food_coupons"
                                    value={food_coupons}
                                    id="food_coupons"
                                    onChange={this.handleFoodCoupons.bind(this)}
                                    validators={['required','isNumber']}
                                    errorMessages={['this field is required','enter only number']}
                                    fullWidth={true}
                          />
                        </div>
                        <div className="col-sm-6">
                        </div>
                    </div>
                    <div className="row clearfix">
                        <div className="col-sm-6">
                            <TextValidator
                                    floatingLabelText="LTA"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    inputStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    name="lta"
                                    value={lta}
                                    id="lta"
                                    onChange={this.handleLTA.bind(this)}
                                    validators={['required','isNumber']}
                                    errorMessages={['this field is required','enter only number']}
                                    fullWidth={true}
                            />
                        </div>
                        <div className="col-sm-6">
                        </div>
                    </div>
                    <div className="row clearfix">
                        <div className="col-sm-6">
                          <TextValidator
                                    floatingLabelText="Other Allowance"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    inputStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    name="other_allowance"
                                    value={other_allowance}
                                    id="other_allowance"
                                    onChange={this.handleOthersAllowance.bind(this)}
                                    validators={['required','isNumber']}
                                    errorMessages={['this field is required','enter only number']}
                                    fullWidth={true}
                          />
                        </div>
                        <div className="col-sm-6">
                        </div>
                    </div> 
                    {mytotal}    
        		</ValidatorForm>
        	);
        }  
}