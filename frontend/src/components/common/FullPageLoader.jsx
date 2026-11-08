import './FullPageLoader.css'


function FullPageLoader() {
  return (
    <div className='page-loader' role='status' aria-label='Betöltés'>
      <span className='page-loader-spinner' />
    </div>
  )
}

export default FullPageLoader