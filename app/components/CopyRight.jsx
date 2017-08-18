import React from 'react';
import Clock from 'Clock';

class CopyRight extends React.Component
{
		render(){
			return (
				<div className="legal">
	                <div className="copyright">
	                    &copy; 2017 <a href="javascript:void(0);">AdminSchool</a>.
	                </div>
	                <div className="version">
	                    <b>Version: </b> 1.0.0
	                </div>
	                <div className="clock">
	                	<Clock />
	                </div>
	            </div>
			);
		}
}

export default CopyRight;