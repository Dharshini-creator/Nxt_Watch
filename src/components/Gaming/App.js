import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import CreateContexvalue from '../../CreateContext/CreateContext'
import SideColumn from '../SideColumn/App'
import Header from '../Header/App'

import './App.css'

class Gaming extends Component {
  state = {
    gamevideolist: [],
    gamelistloading: true,
    gamefailure: false,
  }

  componentDidMount() {
    this.gettinggamelist()
  }

  gettinggamelist = async () => {
    const y = Cookies.get('jwt_token')
    const option = {
      headers: {
        Authorization: `Bearer ${y}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/videos/gaming', option)
    const data = await response.json()
    if (response.ok === true) {
      const changegame = data.videos.map(each => ({
        id: each.id,
        titlegame: each.title,
        thumburlgame: each.thumbnail_url,
        countgame: each.view_count,
      }))

      this.setState({
        gamevideolist: changegame,
        gamefailure: false,
        gamelistloading: false,
      })
    } else {
      this.setState({gamefailure: true, gamelistloading: false})
    }
  }

  gamelistretry = () => {
    this.setState(
      {gamevideolist: [], gamelistloading: true, gamefailure: false},
      this.gettinggamelist,
    )
  }

  render() {
    const {gamefailure, gamevideolist, gamelistloading} = this.state
    const m = Cookies.get('jwt_token')
    if (m === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <CreateContexvalue.Consumer>
        {value => {
          const {bg} = value

          const gamelistdisplay = gamefailure ? (
            <div className="home-failure">
              <img
                src={
                  bg
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                }
                alt="failure-view"
                className="failure-img"
              />
              <h1 className={bg ? 'failure-heads' : 'failure-heads1'}>
                Oops! Something Went Wrong
              </h1>
              <p className="failure-paras">
                We are having some trouble to complete your request. please try
                again
              </p>
              <button
                type="button"
                className="failure-btn"
                onClick={this.gamelistretry}
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              <div className={bg ? 'trendinner' : 'trendinner1'} data-testid="gaming">
                <div className={bg ? 'background-icon' : 'background-icon1'}>
                  <HiFire className="individual" />
                </div>
                <h1 className={bg ? 'individual-heads' : 'individual-heads1'}>
                  Gaming
                </h1>
              </div>
              <div className="video-items">
                {gamevideolist.map(each => (
                  <Link
                    to={`/videos/${each.id}`}
                    key={each.id}
                    className="links"
                  >
                    <div className="game-each-items">
                      <img
                        src={each.thumburlgame}
                        alt="video thumbnail"
                        className="game-img"
                      />
                      <p className={bg ? 'trend-para' : 'trend-para1'}>
                        {each.titlegame}
                      </p>
                      <p className={bg ? 'small' : 'small1'}>
                        {each.countgame} Watching Worldwide
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )

          return (
            <div className="top">
              <Header />

              <div className="home-siderow">
                <SideColumn />
                <div className={bg ? 'gamecontainer' : 'gamecontainer1'}>
                  {gamelistloading ? (
                    <div className="loader-container" data-testid="loader">
                      <Loader
                        type="ThreeDots"
                        color="#ffffff"
                        height="50"
                        width="50"
                      />
                    </div>
                  ) : (
                    gamelistdisplay
                  )}
                </div>
              </div>
            </div>
          )
        }}
      </CreateContexvalue.Consumer>
    )
  }
}
export default Gaming
