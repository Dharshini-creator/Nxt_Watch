import SideColumn from '../SideColumn/App'
import Header from '../Header/App'
import CreateContexvalue from '../../CreateContext/CreateContext'
import './App.css'

const NotFound = () => (
  <CreateContexvalue.Consumer>
    {value => {
      const {bg} = value
      return (
        <div className='top'>
          <Header />

          <div className='home-siderow'>
            <SideColumn />

            <div className={bg ? 'notfoundcontainer' : 'notfoundcontainer1'}>
              <div className='home-failure'>
                <img
                  src={
                    bg
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                  }
                  alt='not found'
                  className='failure-img'
                />
                <h1 className={bg ? 'failure-heads' : 'failure-heads1'}>
                  Page Not Found
                </h1>
                <p className='failure-paras'>
                  we are sorry, the page you requested could not be found.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }}
  </CreateContexvalue.Consumer>
)

export default NotFound
