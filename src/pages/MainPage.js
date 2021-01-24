import {Component} from 'react';
import * as BooksApi from '../BooksAPI';
import _ from 'lodash';
import BookShelf from "../components/BookShelf";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class MainPage extends Component {
  state = {
    booksGroupedByShelf: []
  }
  async componentDidMount() {
    this.props.setLoading(true);
    const res = await BooksApi.getAll()
    this.props.setLoading(false);
    const booksGroupedByShelfFromApi = _.groupBy(res, 'shelf');
    const booksGroupedByShelf = {};
    this.props.shelves.forEach(shelf => {
      booksGroupedByShelf[shelf] = booksGroupedByShelfFromApi[shelf] || []
    })
    this.setState({booksGroupedByShelf})
  }
  changeBookShelf = async (book, newShelf) => {
    this.props.setLoading(true);
    await BooksApi.update(book, newShelf);
    this.props.setLoading(false);
    this.setState(currState => {
      const newValue = {
        ...currState.booksGroupedByShelf,
        [book.shelf]: currState.booksGroupedByShelf[book.shelf].filter(b => b.id !== book.id)
      };
      if(newShelf && newShelf !== 'None')
        newValue[newShelf]= currState.booksGroupedByShelf[newShelf].concat([{...book, shelf: newShelf}])
      return {
        booksGroupedByShelf: newValue
      }
    });
  }
  render() {
    const {booksGroupedByShelf} = this.state;
    const {shelves} = this.props;
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
