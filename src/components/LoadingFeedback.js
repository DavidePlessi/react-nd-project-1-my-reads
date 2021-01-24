import PropTypes from 'prop-types';

function LoadingFeedback({isLoading}) {
  return (
    <div
      className='loading-container'
      style={{display: (isLoading ? '':'none')}}
    >
      <h1>Loading...</h1>
    </div>
  )
}

LoadingFeedback.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}

export default LoadingFeedback;