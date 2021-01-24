import {Component} from 'react';
import * as BooksApi from '../BooksAPI';
import _ from 'lodash';
import BookShelf from "../components/BookShelf";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class MainPage extends Component {
  state = {
    booksGroupedByShelf: [],
    shelves: ["currentlyReading", "wantToRead", "read"],
    loading: false
  }
  async componentDidMount() {
    this.props.setLoading(true);
    const res = await BooksApi.getAll()
    this.props.setLoading(false);
    const booksGroupedByShelfFromApi = _.groupBy(res, 'shelf');
    const booksGroupedByShelf = {};
    this.state.shelves.forEach(shelf => {
      booksGroupedByShelf[shelf] = booksGroupedByShelfFromApi[shelf] || []
    })
    this.setState({booksGroupedByShelf})
  }
  changeBookShelf = async (book, newShelf) => {
    this.props.setLoading(true);
    await BooksApi.update(book, newShelf);
    this.props.setLoading(false);
    this.setState(currState => ({
      booksGroupedByShelf: {
        ...currState.booksGroupedByShelf,
        [book.shelf]: currState.booksGroupedByShelf[book.shelf].filter(b => b.id !== book.id),
        [newShelf]: currState.booksGroupedByShelf[newShelf].concat([{...book, shelf: newShelf}])
      }
    }));
  }
  render() {
    const {shelves, booksGroupedByShelf} = this.state;
    return (
      <>
        <div className='list-books-title'>
          <h1>My Reads</h1>
        </div>
        <div className='list-books-content'>
          {!!shelves && shelves.map(shelf => (
            !!booksGroupedByShelf[shelf] &&
            booksGroupedByShelf[shelf].length > 0 &&
            <BookShelf
              key={shelf}
              shelves={shelves}
              currentShelf={shelf}
              onChangeShelf={this.changeBookShelf}
              books={booksGroupedByShelf[shelf]}
            />
          ))}
        </div>
        <div className='open-search'>
          <Link to='/search' />
        </div>
      </>
    )
  }
}

MainPage.propTypes = {
  setLoading: PropTypes.func.isRequired
}

export default MainPage;
