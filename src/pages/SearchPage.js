import {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import * as BooksApi from '../BooksAPI';
import _ from 'lodash';
import BookList from "../components/BookList";

class SearchPage extends Component {
  state = {
    books: [],
    searchTerm: ''
  }
  changeBookShelf = async (book, newShelf) => {
    this.props.setLoading(true);
    await BooksApi.update(book, newShelf);
    this.props.setLoading(false);
    this.setState(currState => {
      const indexOfBook = _.findIndex(currState.books, (b) => b.id === book.id);
      return {
        books: [
          ...currState.books.slice(0, indexOfBook),
          ...currState.books.slice(indexOfBook + 1)
        ]
      }
    })
  }
  searchFroBooks = async (query) => {
    let books = [];

    if(query)
      books = await BooksApi.search(query);

    if(!_.isArray(books)) books = [];
    this.setState({books: books})
  }
  updateSearchTerm = async (text) => {
    text = text.trim();
    this.setState({searchTerm: text})
    await this.searchFroBooks(text);
  }
  render() {
    const {searchTerm, books} = this.state
    const {shelves} = this.props
    return (
      <>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'/>
          <input
            type='text'
            placeholder='Search for books'
            value={searchTerm}
            onChange={(e) => this.updateSearchTerm(e.target.value)}
          />
        </div>
        <div className='search-books-results'>
          <BookList shelves={shelves} onChangeShelf={this.changeBookShelf} books={books}/>
        </div>
      </>
    )
  }
}

SearchPage.propTypes = {
  setLoading: PropTypes.func.isRequired,
  shelves: PropTypes.array.isRequired
}

export default SearchPage;
