import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiFire} from 'react-icons/hi'
import {MdHome, MdPlaylistAdd} from 'react-icons/md'
import {SiYoutubegaming} from 'react-icons/si'

import CreateContexvalue from '../../CreateContext/CreateContext'

import './App.css'

class App extends Component {
  state = {
    active: 'home',
  }

  clickactive = tabvalue => {
    this.setState({active: tabvalue})
  }

  render() {
    const {active} = this.state

    return (
      <CreateContexvalue.Consumer>
        {value => {
          const {bg} = value

          const activestheme = bg ? 'side-heading' : 'side-heading1'
          const two = bg ? 'activeside-heading' : 'activeside-heading1'
          const activehome = active === 'home' && two
          const activetrend = active === 'trend' && two
          const activegame = active === 'game' && two
          const activesaved = active === 'saved' && two

          const one = bg ? 'activehomelinkslight' : 'activehomelinksdark'
          const activehomebg = active === 'home' && one
          const activetrendbg = active === 'trend' && one
          const activegamebg = active === 'game' && one
          const activesavedbg = active === 'saved' && one

          let change
          if (active === 'game') {
            if (bg === true) {
              change = 'home-sidecolumngame'
            } else {
              change = 'home-sidecolumngame1'
            }
          } else if (active === 'trend') {
            if (bg === true) {
              change = 'home-sidecolumntrend'
            } else {
              change = 'home-sidecolumntrend1'
            }
          } else if (active === 'home') {
            if (bg === true) {
              change = 'home-sidecolumnhome'
            } else {
              change = 'home-sidecolumnhome1'
            }
          } else if (active === 'saved') {
            if (bg === true) {
              change = 'home-sidecolumnsaved'
            } else {
              change = 'home-sidecolumnsaved1'
            }
          } else {
            change = 'nothing'
            this.setState({active: ''})
          }
          const y = bg ? 'home-sidecolumn' : 'home-sidecolumn1'

          return (
            <div className={change === 'nothing' ? y : change}>
              <ul className="unordered">
                <li className={`home-links ${activehomebg}`}>
                  <Link
                    to="/"
                    className="home-links"
                    onClick={() => this.clickactive('home')}
                  >
                    <MdHome
                      className={
                        active === 'home' ? 'activeside-icons' : 'side-icons'
                      }
                    />
                    <p className={`${activestheme} ${activehome}`}>Home</p>
                  </Link>
                </li>
                <li className={`home-links ${activetrendbg}`}>
                  <Link
                    to="/trending"
                    className="home-links"
                    onClick={() => this.clickactive('trend')}
                  >
                    <HiFire
                      className={
                        active === 'trend' ? 'activeside-icons' : 'side-icons'
                      }
                    />
                    <p className={`${activestheme} ${activetrend}`}>
                      Trending
                    </p>
                  </Link>
                </li>
                <li className={`home-links ${activegamebg}`}>
                  <Link
                    to="/gaming"
                    className="home-links"
                    onClick={() => this.clickactive('game')}
                  >
                    <SiYoutubegaming
                      className={
                        active === 'game' ? 'activeside-icons' : 'side-icons'
                      }
                    />
                    <p className={`${activestheme} ${activegame}`}>Gaming</p>
                  </Link>
                </li>
                <li className={`home-links ${activesavedbg}`}>
                  <Link
                    to="/saved-videos"
                    className="home-links"
                    onClick={() => this.clickactive('saved')}
                  >
                    <MdPlaylistAdd
                      className={
                        active === 'saved' ? 'activeside-icons' : 'side-icons'
                      }
                    />
                    <p className={`${activestheme} ${activesaved}`}>
                      Saved Videos
                    </p>
                  </Link>
                </li>
              </ul>
              <div className="last-sidebar">
                <p className={bg ? 'contact' : 'contact1'}>CONTACT US</p>
                <div className="home-links">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="header-img"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="header-img"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="header-img"
                  />
                </div>
                <p className={bg ? 'contact' : 'contact1'}>
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </div>
            </div>
          )
        }}
      </CreateContexvalue.Consumer>
    )
  }
}

export default App
