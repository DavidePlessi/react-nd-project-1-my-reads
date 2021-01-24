import PropTypes from 'prop-types'
import BookList from "./BookList";
import shelvesTranslations from "../utils/shelvesTranslations";

function BookShelf ({books, shelves, onChangeShelf, currentShelf}){

  return (
    <div className='bookshelf'>
      <h1 className='bookshelf-title'>
        {shelvesTranslations(currentShelf)}
      </h1>
      <div className='bookshelf-books'>
        <BookList shelves={shelves} onChangeShelf={onChangeShelf} books={books}/>
      </div>
    </div>
  )

}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
  currentShelf: PropTypes.string.isRequired
}

export default BookShelf;