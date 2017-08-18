import React from 'react';

class DashboardCalender extends React.Component
{
		render(){
        	return (	
        			<div className="calendar-container transition">
        				<div className="view-year">
							<div className="title transition">
								<span>2017</span>
							</div>
							<div className="grid">
								<div id="gen" className="month-item transition"><span className="centred">JAN</span></div>
								<div id="feb" className="month-item transition"><span className="centred">FEB</span></div>
								<div id="mar" className="month-item transition"><span className="centred current">MAR</span></div>
								<div id="apr" className="month-item transition"><span className="centred">APR</span></div>
								<div id="may" className="month-item transition"><span className="centred">MAY</span></div>
								<div id="jun" className="month-item transition"><span className="centred">JUN</span></div>
								<div id="jul" className="month-item transition"><span className="centred">JUL</span></div>
								<div id="aug" className="month-item transition"><span className="centred">AUG</span></div>
								<div id="sep" className="month-item transition"><span className="centred">SEP</span></div>
								<div id="oct" className="month-item transition"><span className="centred">OCT</span></div>
								<div id="nov" className="month-item transition"><span className="centred">NOV</span></div>
								<div id="dec" className="month-item transition"><span className="centred">DEC</span></div>
							</div>
						</div>
						<div id="gen-month" className="view-month">
			<div className="title active transition">
				<div className="go-back-month transition"><span></span></div>
				<span className="month-name">Jenuary</span>
				<span className="date-year">2015</span>
			</div>
			<div className="grid">
				<div className="row week">
					<div className="cell"><span>M</span></div>
					<div className="cell"><span>T</span></div>
					<div className="cell"><span>W</span></div>
					<div className="cell"><span>T</span></div>
					<div className="cell"><span>F</span></div>
					<div className="cell"><span>S</span></div>
					<div className="cell"><span>S</span></div>
				</div>
				<div className="row">
					<div className="cell past"><span>29</span></div>
					<div className="cell past"><span>30</span></div>
					<div className="cell past"><span>31</span></div>
					<div className="cell clickable"><span>1</span></div>
					<div className="cell clickable"><span>2</span></div>
					<div className="cell clickable"><span>3</span></div>
					<div className="cell clickable"><span>4</span></div>
				</div>
				<div className="row">
					<div className="cell clickable"><span>5</span></div>
					<div className="cell clickable"><span>6</span></div>
					<div className="cell clickable"><span>7</span></div>
					<div className="cell clickable"><span>8</span></div>
					<div className="cell clickable"><span>9</span></div>
					<div className="cell clickable"><span>10</span></div>
					<div className="cell clickable"><span>11</span></div>
				</div>
				<div className="row">
					<div className="cell clickable"><span>12</span></div>
					<div className="cell clickable"><span>12</span></div>
					<div className="cell clickable"><span>14</span></div>
					<div className="cell clickable"><span>15</span></div>
					<div className="cell clickable"><span>16</span></div>
					<div className="cell clickable"><span>17</span></div>
					<div className="cell clickable"><span>18</span></div>
				</div>
				<div className="row">
					<div className="cell clickable"><span>19</span></div>
					<div className="cell clickable"><span>20</span></div>
					<div className="cell clickable"><span>21</span></div>
					<div className="cell clickable"><span>22</span></div>
					<div className="cell clickable"><span>23</span></div>
					<div className="cell clickable"><span>24</span></div>
					<div className="cell clickable"><span>25</span></div>
				</div>
				<div className="row">
					<div className="cell clickable"><span>26</span></div>
					<div className="cell clickable"><span>27</span></div>
					<div className="cell clickable"><span>28</span></div>
					<div className="cell clickable"><span>29</span></div>
					<div className="cell clickable"><span>30</span></div>
					<div className="cell clickable"><span>31</span></div>
					<div className="cell past"><span>1</span></div>
				</div>
				<div className="row">
					<div className="cell past"><span>2</span></div>
					<div className="cell past"><span>3</span></div>
					<div className="cell past"><span>4</span></div>
					<div className="cell past"><span>5</span></div>
					<div className="cell past"><span>6</span></div>
					<div className="cell past"><span>7</span></div>
					<div className="cell past"><span>8</span></div>
				</div>
			</div>
		</div>
			       </div>
        	);
        }	
}

export default DashboardCalender;