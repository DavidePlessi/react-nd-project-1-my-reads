import PropTypes from 'prop-types';
import BookBox from "./BookBox";

function BookList ({books, shelves, onChangeShelf}){
  return (
    <ul className='books-grid'>
      {!!books && books.map(book => (
        <BookBox shelves={shelves} book={book} onChangeShelf={onChangeShelf} key={book.id}/>
      ))}
    </ul>
  )
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default BookList;