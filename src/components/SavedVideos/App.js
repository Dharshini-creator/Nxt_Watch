import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import {HiFire} from 'react-icons/hi'

import SideColumn from '../SideColumn/App'
import Header from '../Header/App'
import CreateContexvalue from '../../CreateContext/CreateContext'

import './App.css'

class SavedVideos extends Component {
  clicklightdark = () => {
    this.setState(prevState => ({bg: !prevState.bg}))
  }

  clicklogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  changedate = date => formatDistanceToNow(new Date(date), {addSuffix: true})

  render() {
    const k = Cookies.get('jwt_token')
    if (k === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <CreateContexvalue.Consumer>
        {value => {
          const {bg, saveditemList} = value
          return (
            <div className="top">
              <Header />

              <div className="home-siderow">
                <SideColumn />

                <div
                  className={bg ? 'trendingcontainer' : 'trendingcontainer1'}
                  data-testid="savedVideos"
                >
                  {saveditemList.length === 0 ? (
                    <div className="home-failure">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                        alt="no saved videos"
                        className="failure-img"
                      />
                      <h1 className={bg ? 'failure-heads' : 'failure-heads1'}>
                        No saved videos found
                      </h1>
                      <p className="failure-paras">
                        You can save your videos while watching them
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className={bg ? 'trendinner' : 'trendinner1'}>
                        <div
                          className={
                            bg ? 'background-icon' : 'background-icon1'
                          }
                        >
                          <HiFire className="individual" />
                        </div>
                        <h1
                          className={
                            bg ? 'individual-heads' : 'individual-heads1'
                          }
                        >
                          Saved Videos
                        </h1>
                      </div>
                      <ul className="trend-items">
                        {saveditemList.map(each => (
                          <li className="spl" key={each
                          .ideach}>
                            <Link
                              to={`/videos/${each.ideach}`}
                              key={each.ideach}
                              className="links"
                            >
                              <div className="trend-each-items">
                                <div className="trend-thumb">
                                  <img
                                    src={each.thumbeach}
                                    alt="video thumbnail"
                                    className="trend-img"
                                  />
                                </div>
                                <div className="items-column">
                                  <p
                                    className={
                                      bg ? 'trend-para' : 'trend-para1'
                                    }
                                  >
                                    {each.titleeach}
                                  </p>
                                  <p className={bg ? 'small' : 'small1'}>
                                    {each.channeleach.nameeach}
                                  </p>
                                  <div className="home-siderow">
                                    <p className={bg ? 'small' : 'small1'}>
                                      {each.counteach}
                                    </p>
                                    <ul className="unordered-videoitems">
                                      <li className={bg ? 'small' : 'small1'}>
                                        <p className="specify">
                                          {this.changedate(each.publisheach)}
                                        </p>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
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
export default SavedVideos
