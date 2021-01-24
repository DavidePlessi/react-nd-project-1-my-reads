import PropTypes from 'prop-types';
import shelvesTranslations from "../utils/shelvesTranslations";

function BookBox({book, shelves, onChangeShelf}) {
  return (
    <div className='book'>
      <div className='book-top'>
        <img
          src={(!!book.imageLinks && !!book.imageLinks.smallThumbnail && book.imageLinks.smallThumbnail)}
          alt='thumbnail'
          className='book-cover'
          height='100%'
          width='100%'
        />
        <div className='book-shelf-changer'>
          <select
            value={book.shelf || 'None'}
            onChange={(e) => onChangeShelf(book, e.target.value)}
          >
            {!!shelves && shelves.map(shelf => {
              return (
                <option
                  key={shelf}
                  value={shelf}
                  className={(book.shelf === shelf ? 'book-shelf-changer-selected-option' : '')}
                >
                  {shelvesTranslations(shelf)}
                </option>
              )
            })}
            <option
              value={'None'}
              className={(!book.shelf ? 'book-shelf-changer-selected-option' : '')}
            >
              None
            </option>
          </select>
        </div>
      </div>
      <p className='book-title'>{book.title}</p>
      <p className='book-authors'>{!!book.authors && book.authors.join(', ')}</p>
    </div>
  )
}

BookBox.propTypes = {
  book: PropTypes.object.isRequired,
  shelves: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default BookBox;
