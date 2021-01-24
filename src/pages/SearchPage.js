import {Component} from 'react';
import PropTypes from 'prop-types';
import * as BooksApi from '../BooksAPI';
import _ from 'lodash';
import BookList from "../components/BookList";
import SearchBoxBar from "../components/SearchBoxBar";

class SearchPage extends Component {
  state = {
    books: []
  }
  searchTimeout = null
  changeBookShelf = async (book, newShelf) => {
    this.props.setLoading(true);
    await BooksApi.update(book, newShelf);
    this.props.setLoading(false);
    this.setState(currState => {
      const indexOfBook = _.findIndex(currState.books, (b) => b.id === book.id);
      return {
        books: [
          ...currState.books.slice(0, indexOfBook),
          {...book, shelf: newShelf},
          ...currState.books.slice(indexOfBook + 1)
        ]
      }
    })
  }
  searchFroBooks = async (query) => {
    if(this.searchTimeout) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(async () => {
      let books = [];
      if(query) {
        this.props.setLoading(true);
        books = await BooksApi.search(query);
        this.props.setLoading(false);
      }

      if(!_.isArray(books)) books = [];
      this.setState({books: books})

    }, 500)
  }
  render() {
    const {books} = this.state
    const {shelves} = this.props
    return (
      <>
        <SearchBoxBar onSearchFroBooks={this.searchFroBooks}/>
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
