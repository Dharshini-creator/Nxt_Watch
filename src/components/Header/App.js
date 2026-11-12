import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {FaMoon} from 'react-icons/fa'
import {IoSunnyOutline} from 'react-icons/io5'
import CreateContexvalue from '../../CreateContext/CreateContext'
import './App.css'

class Header extends Component {
  clicklogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <CreateContexvalue.Consumer>
        {value => {
          const {bg, changingbg} = value

          const clicklightdark = () => {
            changingbg()
          }

          return (
            <div className={bg ? 'header-container' : 'header-container1'}>
              <Link to="/" className="links">
                <img
                  src={
                    bg
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  }
                  alt="website logo"
                  className="header-logo"
                />
              </Link>
              <div className="Inner-header">
                <button
                  data-testid="theme"
                  type="button"
                  className="lightdark"
                  onClick={clicklightdark}
                >
                  {bg ? (
                    <FaMoon className="header-img" />
                  ) : (
                    <IoSunnyOutline
                      className={bg ? 'header-img' : 'header-img1'}
                    />
                  )}
                </button>

                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="header-img"
                />

                <Popup
                  modal
                  trigger={
                    <button
                      type="button"
                      className={bg ? 'header-btn' : 'header-btn1'}
                    >
                      Logout
                    </button>
                  }
                >
                  {close => (
                    <div className={bg ? 'popcontainer' : 'popcontainer1'}>
                      <p className={bg ? 'poppara' : 'poppara1'}>
                        Are you sure, you want to logout?
                      </p>
                      <div className="home-siderow">
                        <button
                          type="button"
                          className={bg ? 'popbtn1' : 'popbtndark'}
                          onClick={close}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="popbtn2"
                          onClick={() => {
                            close()
                            this.clicklogout()
                          }}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          )
        }}
      </CreateContexvalue.Consumer>
    )
  }
}
export default withRouter(Header)
