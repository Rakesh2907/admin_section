import React from 'react';

class SearchBar extends React.Component
{
	hideSearchBar(){
		 $('.search-bar').removeClass('open');
         $('.search-bar').find('input[type="text"]').val('');
	}
	
	render(){
		return (
			 <div className="search-bar">
		        <div className="search-icon">
		            <i className="material-icons">search</i>
		        </div>
        		<input type="text" placeholder="START TYPING..." />
		        <div className="close-search" onClick={this.hideSearchBar}>
		            <i className="material-icons">close</i>
		        </div>
    		</div>
		);
	}	
}

export default SearchBar;