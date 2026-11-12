import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import {IoCloseSharp, IoSearchSharp} from 'react-icons/io5'

import CreateContexvalue from '../../CreateContext/CreateContext'

import SideColumn from '../SideColumn/App'
import Header from '../Header/App'

import './App.css'

class Home extends Component {
  state = {
    closeclick: false,
    isvideoload: true,
    isvideofailure: false,
    videolist: [],
    search: '',
  }

  componentDidMount() {
    this.gettingvideolist()
  }

  changesearch = event => {
    this.setState({search: event.target.value})
  }

  clicksearch = () => {
    this.setState(
      {
        isvideoload: true,
        isvideofailure: false,
      },
      this.gettingvideolist,
    )
  }

  gettingvideolist = async () => {
    const e = Cookies.get('jwt_token')
    const {search} = this.state
    const option = {
      headers: {
        Authorization: `Bearer ${e}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      `https://apis.ccbp.in/videos/all?search=${search}`,
      option,
    )
    const data = await response.json()
    if (response.ok === true) {
      const r = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumburl: each.thumbnail_url,
        channel: {
          name: each.channel.name,
          profileurl: each.channel.profile_image_url,
        },
        count: each.view_count,
        publish: each.published_at,
      }))
      this.setState({
        isvideoload: false,
        videolist: r,
        isvideofailure: false,
      })
    } else {
      this.setState({
        isvideofailure: true,
        isvideoload: false,
      })
    }
  }

  clickingfailurebtn = () => {
    this.setState(
      {
        search: '',
        isvideoload: true,
        isvideofailure: false,
        videolist: [],
      },
      this.gettingvideolist,
    )
  }

  clickclosebtn = () => {
    this.setState(prevState => ({closeclick: !prevState.closeclick}))
  }

  changedate = date => formatDistanceToNow(new Date(date), {addSuffix: true})

  render() {
    const {closeclick, isvideoload, isvideofailure, videolist, search} =
      this.state
    const f = Cookies.get('jwt_token')
    if (f === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <CreateContexvalue.Consumer>
        {value => {
          const {bg} = value

          const checksearch =
            videolist.length !== 0 ? (
              <div className="video-items">
                {videolist.map(each => (
                  <Link
                    to={`/videos/${each.id}`}
                    key={each.id}
                    className="links"
                  >
                    <div className="video">
                      <img
                        src={each.thumburl}
                        alt="video thumbnail"
                        className="video-img"
                      />
                      <div className="home-siderow">
                        <img
                          src={each.channel.profileurl}
                          alt="channel logo"
                          className="profile"
                        />
                        <div className="items-column">
                          <p className={bg ? 'profile-para' : 'profile-para1'}>
                            {each.title}
                          </p>
                          <p className="short-form">{each.channel.name}</p>
                          <div className="home-siderow">
                            <p className="short-form">{each.count}</p>
                            <ul className="unordered-videoitems">
                              <li className="short-form">
                                <p className="specify">
                                  {' '}
                                  {this.changedate(each.publish)}{' '}
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="home-failure">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                  alt="no videos"
                  className="failure-img"
                />
                <h1 className={bg ? 'failure-heads' : 'failure-heads1'}>
                  No search results found
                </h1>
                <p className="failure-paras">
                  Try different key words or remove search filter
                </p>
                <button
                  type="button"
                  className="failure-btn"
                  onClick={this.clickingfailurebtn}
                >
                  Retry
                </button>
              </div>
            )

          const checksuccessorfailure = isvideofailure ? (
            <div className="home-failure">
              <img
                src={
                  bg
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                }
                alt="failure view"
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
                onClick={this.clickingfailurebtn}
              >
                Retry
              </button>
            </div>
          ) : (
            checksearch
          )

          return (
            <div className="top">
              <Header />

              <div className="home-siderow">
                <SideColumn />
                <div className="items-column">
                  {closeclick ? (
                    ''
                  ) : (
                    <div className="background" data-testid="banner">
                      <div className="home-siderow">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                          className="header-logo"
                        />
                        <button
                          type="button"
                          data-testid="close"
                          className="close-btn"
                          onClick={this.clickclosebtn}
                        >
                          <IoCloseSharp className="close" />
                        </button>
                      </div>
                      <p className="getpara">
                        Buy Nxt Watch Premium prepaid plans with UPI
                      </p>
                      <button type="button" className="getbutton">
                        GET IT NOW
                      </button>
                    </div>
                  )}

                  <div
                    className={bg ? 'home-items' : 'home-items1'}
                    data-testid="home"
                  >
                    <div className="home-siderow">
                      <input
                        type="search"
                        className={bg ? 'input-search' : 'input-search1'}
                        placeholder="search"
                        value={search}
                        onChange={this.changesearch}
                      />
                      <button
                        data-testid="searchButton"
                        className={bg ? 'search-button' : 'search-button1'}
                        type="button"
                        onClick={this.clicksearch}
                      >
                        <IoSearchSharp className="search-icon" />
                      </button>
                    </div>

                    {isvideoload ? (
                      <div className="loader-container" data-testid="loader">
                        <Loader
                          type="ThreeDots"
                          color="#ffffff"
                          height="50"
                          width="50"
                        />
                      </div>
                    ) : (
                      checksuccessorfailure
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </CreateContexvalue.Consumer>
    )
  }
}
export default Home
