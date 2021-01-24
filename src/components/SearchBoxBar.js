import {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class SearchBoxBar extends Component{
  state = {
    searchTerm: ''
  }
  updateSearchTerm = async (text) => {
    this.setState({searchTerm: text})
    await this.props.onSearchFroBooks(text);
  }
  render() {
    const {searchTerm} = this.state;
    return (
      <div className='search-books-bar'>
        <Link to='/' className='close-search'/>
        <input
          type='text'
          placeholder='Search for books'
          value={searchTerm}
          onChange={(e) => this.updateSearchTerm(e.target.value)}
        />
      </div>
    )
  }
}

SearchBoxBar.propTypes = {
  onSearchFroBooks: PropTypes.func.isRequired
}

export default SearchBoxBar;
