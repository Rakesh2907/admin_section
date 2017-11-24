import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';


export default class EmployeeDocuments extends React.Component 
{
	    constructor(props) {
          super(props);
          this.state = { 
            image: '',
            imageFile: 'default.png'
          }
        }
        handlePhotoUpload(e){
            e.preventDefault();
            let reader = new FileReader();
            let cimgfile = e.target.files[0];
            reader.onloadend = () => {
              this.setState({
                  image: cimgfile
              });
            }
            reader.readAsDataURL(cimgfile)
        }
        uploadEmployeeImg()
        {
            var that = this;
            var cfile = this.state.image
            var cfd = new FormData();
            cfd.append("employee_img",cfile);

            if(typeof this.props.employeeInfo!='undefined'){
                var empId = this.props.employeeInfo['employee_id'];
            }else{
               var empId = sessionStorage.getItem('sess_employee_id');
            }

            $.ajax({
                  url: base_url+'employee_con/save_employee_img?employee_id='+empId,
                  dataType: 'json',
                  type: 'POST',
                  data: cfd,
                  contentType: false,
                  processData: false,
                  success: function(resdata) {
                    if(resdata.length > 0)
                    {
                         swal({
                                title: "Upload Employee Photo Successfully...",
                                type: "success",
                                confirmButtonClass: 'btn-success',
                                confirmButtonText: 'Okay'
                          },function(){
                                that.setState({
                                    imageFile: resdata[0]['file_name']
                                });
                               document.getElementById("next_button_3").click();    
                         });
                      
                    }else{
                        
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                  console.error(err.toString());
                }.bind(this)  
            });
        }
        
        loadEmployeeDocument(employeeInfo){
            this.setState({
                imageFile: employeeInfo['image'],
            });
        }
        componentDidMount(){
               if(typeof this.props.EmployeeID!='undefined')
               {
                  $.ajax({
                    url: base_url+'employee_con/get_employee?id='+this.props.EmployeeID,
                    dataType: 'json',
                    method: 'GET',
                    success: function(resdata){
                      if(resdata.length > 0){
                          if(resdata[0]['image'] === null){
                              resdata[0]['image'] = 'default.png';
                          }
                          this.loadEmployeeDocument(resdata[0]);
                      }
                    }.bind(this),
                    error: function(xhr, status, err) {
                      console.error(err.toString());
                    }.bind(this)
                  });
            }else{

            }
        }
        componentWillReceiveProps(props){
          if(typeof props.employeeInfo!='undefined'){
                this.loadEmployeeDocument(props.employeeInfo);
          }
        }
        skip(){
            document.getElementById("next_button_3").click();    
        }
        render(){
          const styles = {
              button: {
                margin: 12,
              },
              exampleImageInput: {
                cursor: 'pointer',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                width: '100%',
                opacity: 0,
              }
          };

          let employee_img = base_url+"uploads/teacher/"+this.state.imageFile;
        	return(
             <div>
        		  <div className="row clearfix">
                  <div className="col-md-6">
                      <RaisedButton
                          label="Upload Employee Photo"
                          labelPosition="before"
                          style={styles.button}
                          containerElement="label"
                      >
                      <input id="image" name="image" type="file" onChange={this.handlePhotoUpload.bind(this)} style={styles.exampleImageInput} />
                      </RaisedButton>
                      <RaisedButton 
                                style={{marginRight: 12}} 
                                primary={true}
                                type="button"
                                label="Upload" 
                                onClick={this.uploadEmployeeImg.bind(this)}
                       /> 
                  </div>
                  <div className="col-md-6">
                      <img src={employee_img} id="employee_avatar" name="employee_avatar" width="150" height="150"/>
                  </div>
              </div> 
              <div className="row clearfix">
                  <div className="col-md-6">
                       <RaisedButton 
                                style={{marginRight: 12}} 
                                primary={true}
                                type="button"
                                label="Skip" 
                                onClick={this.skip.bind(this)}
                       /> 
                  </div>
              </div>
             </div>        
        	);
        }	
}