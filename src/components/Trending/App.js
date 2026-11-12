import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import {HiFire} from 'react-icons/hi'

import SideColumn from '../SideColumn/App'
import Header from '../Header/App'

import CreateContexvalue from '../../CreateContext/CreateContext'

import './App.css'

class Trending extends Component {
  state = {
    trendvideolist: [],
    trendfailure: false,
    trendlistloading: true,
  }

  componentDidMount() {
    this.gettingvideotrend()
  }

  gettingvideotrend = async () => {
    const y = Cookies.get('jwt_token')
    const option = {
      headers: {
        Authorization: `Bearer ${y}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/videos/trending', option)
    const data = await response.json()
    if (response.ok === true) {
      const changetrend = data.videos.map(each => ({
        id: each.id,
        titletrend: each.title,
        thumburltrend: each.thumbnail_url,
        channeltrend: {
          nametrend: each.channel.name,
          profiletrend: each.channel.profile_image_url,
        },
        counttrend: each.view_count,
        publishtrend: each.published_at,
      }))

      this.setState({
        trendvideolist: changetrend,
        trendfailure: false,
        trendlistloading: false,
      })
    } else {
      this.setState({trendfailure: true, trendlistloading: false})
    }
  }

  trendlistretry = () => {
    this.setState(
      {trendvideolist: [], trendfailure: false, trendlistloading: true},
      this.gettingvideotrend,
    )
  }

  changedate = date => formatDistanceToNow(new Date(date), {addSuffix: true})

  render() {
    const h = Cookies.get('jwt_token')
    if (h === undefined) {
      return <Redirect to="/login" />
    }
    const {trendvideolist, trendfailure, trendlistloading} = this.state

    return (
      <CreateContexvalue.Consumer>
        {value => {
          const {bg} = value
          const trendlistdisplay = trendfailure ? (
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
                onClick={this.trendlistretry}
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              <div className={bg ? 'trendinner' : 'trendinner1'} data-testid="trending">
                <div className={bg ? 'background-icon' : 'background-icon1'}>
                  <HiFire className="individual" />
                </div>
                <h1 className={bg ? 'individual-heads' : 'individual-heads1'}>
                  Trending
                </h1>
              </div>
              <div className="trend-items">
                {trendvideolist.map(each => (
                  <Link
                    to={`/videos/${each.id}`}
                    key={each.id}
                    className="links"
                  >
                    <div className="trend-each-items">
                      <div className="trend-thumb">
                        <img
                          src={each.thumburltrend}
                          alt="video thumbnail"
                          className="trend-img"
                        />
                      </div>
                      <div className="items-column">
                        <p className={bg ? 'trend-para' : 'trend-para1'}>
                          {each.titletrend}
                        </p>
                        <p className={bg ? 'small' : 'small1'}>
                          {each.channeltrend.nametrend}
                        </p>
                        <div className="home-siderow">
                          <p className={bg ? 'small' : 'small1'}>
                            {each.counttrend}
                          </p>
                          <ul className="unordered-videoitems">
                            <li className={bg ? 'small' : 'small1'}>
                              <p className="specify">
                                {this.changedate(each.publishtrend)}
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
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

                <div
                  className={bg ? 'trendingcontainer' : 'trendingcontainer1'}
                >
                  {trendlistloading ? (
                    <div className="loader-container" data-testid="loader">
                      <Loader
                        type="ThreeDots"
                        color="#ffffff"
                        height="50"
                        width="50"
                      />
                    </div>
                  ) : (
                    trendlistdisplay
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
export default Trending
