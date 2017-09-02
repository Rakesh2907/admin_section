import React from 'react';

export default class ApplicantDocument extends React.Component
{
      constructor(props) {
          super(props);
      }
      componentWillReceiveProps(props) {
        this.setState({
           myapplicantData:props.myapplicantData
        });
      }
      render()
      {
          return(
            <div className="body table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Document Name</th>
                                        <th>Downloads</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Profile Picture</td>
                                        <td>Download</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Adhar Card</td>
                                        <td>Download</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Application</td>
                                        <td>Download</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
          );
      }
}