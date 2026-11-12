import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import ReactPlayer from 'react-player'
import styled from 'styled-components'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import Header from '../Header/App'
import CreateContexvalue from '../../CreateContext/CreateContext'
import SideColumn from '../SideColumn/App'

import './App.css'

const ActionButton = styled.button`
  color: ${props => (props.active ? '#2563eb' : '#64748b')};
`

class VideoItemDetails extends Component {
  state = {
    like: false,
    dislike: false,
    eachvideoloading: true,

    eachvideo: {channeleach: {nameeach: '', profileeach: '', subscriber: ''}},
    eachvideofailure: false,
  }

  componentDidMount() {
    this.gettingeachvideoitem()
  }

  gettingeachvideoitem = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const g = Cookies.get('jwt_token')

    const option = {
      headers: {
        Authorization: `Bearer ${g}`,
      },
      method: 'GET',
    }

    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, option)

    const data = await response.json()

    if (response.ok) {
      const changeeachvideo = {
        ideach: data.video_details.id,
        titleeach: data.video_details.title,
        videoeach: data.video_details.video_url,
        thumbeach: data.video_details.thumbnail_url,
        channeleach: {
          nameeach: data.video_details.channel.name,
          profileeach: data.video_details.channel.profile_image_url,
          subscriber: data.video_details.channel.subscriber_count,
        },
        counteach: data.video_details.view_count,
        publisheach: data.video_details.published_at,
        descriptioneach: data.video_details.description,
      }

      this.setState({
        eachvideo: changeeachvideo,
        eachvideoloading: false,
        eachvideofailure: false,
      })
    } else {
      this.setState({
        eachvideofailure: true,
        eachvideoloading: false,
      })
    }
  }

  clicklike = () => {
    this.setState(prevState => ({like: !prevState.like, dislike: false}))
  }

  clickdislike = () => {
    this.setState(prevState => ({like: false, dislike: !prevState.dislike}))
  }

  eachvideoretry = () => {
    this.setState(
      {
        eachvideo: {channeleach: {}},
        eachvideofailure: false,
        eachvideoloading: true,
      },
      this.gettingeachvideoitem,
    )
  }

  changedate = date => formatDistanceToNow(new Date(date), {addSuffix: true})

  render() {
    const u = Cookies.get('jwt_token')
    if (u === undefined) {
      return <Redirect to='/login' />
    }
    const {eachvideofailure, like, dislike, eachvideoloading, eachvideo} =
      this.state

    return (
      <CreateContexvalue.Consumer>
        {value => {
          const {bg, saveditemList, changingsaveditemList} = value

          const issaved = saveditemList.some(
            each => each.ideach === eachvideo.ideach,
          )
          const eachvideodisplay = eachvideofailure ? (
            <div className='home-failure'>
              <img
                src={
                  bg
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                }
                alt='failure view'
                className='failure-img'
              />
              <h1 className={bg ? 'failure-heads' : 'failure-heads1'}>
                Oops! Something Went Wrong
              </h1>
              <p className='failure-paras'>
                We are having some trouble to complete your request. please try
                again
              </p>
              <button
                type='button'
                className='failure-btn'
                onClick={this.eachvideoretry}
              >
                Retry
              </button>
            </div>
          ) : (
            <div className='each-video' data-testid='videoItemDetails'>
              <ReactPlayer
                className='react-player'
                url={eachvideo.videoeach}
                controls
              />
              <p className={bg ? 'eachvideoparas' : 'eachvideoparas1'}>
                {eachvideo.titleeach}
              </p>
              <div className='side-side'>
                <div className='home-siderow'>
                  <p className={bg ? 'small' : 'small1'}>
                    {eachvideo.counteach} views
                  </p>
                  <ul className='unordered-videoitems'>
                    <li className={bg ? 'small' : 'small1'}>
                      <p>
                        {' '}
                        {eachvideo.publisheach
                          ? this.changedate(eachvideo.publisheach)
                          : ''}
                      </p>
                    </li>
                  </ul>
                </div>
                <div className='Inner-header'>
                  <ActionButton
                    type='button'
                    active={like}
                    onClick={this.clicklike}
                  >
                    <BiLike />
                    Like
                  </ActionButton>
                  <ActionButton
                    type='button'
                    active={dislike}
                    onClick={this.clickdislike}
                  >
                    <BiDislike />
                    Dislike
                  </ActionButton>

                  <ActionButton
                    type='button'
                    active={issaved}
                    onClick={() => changingsaveditemList(eachvideo)}
                  >
                    <MdPlaylistAdd />
                    {issaved ? 'Saved' : 'Save'}
                  </ActionButton>
                </div>
              </div>
              <hr className='separator' />
              <div className='home-siderow'>
                <img
                  src={eachvideo.channeleach.profileeach}
                  alt='channel logo'
                  className='profile'
                />
                <div className='items-column'>
                  <p className={bg ? 'titlename' : 'titlename1'}>
                    {eachvideo.channeleach.nameeach}
                  </p>
                  <p className={bg ? 'names' : 'names1'}>
                    {eachvideo.channeleach.subscriber} subscribers
                  </p>
                  <p className={bg ? 'end' : 'end1'}>
                    {eachvideo.descriptioneach}
                  </p>
                </div>
              </div>
            </div>
          )

          return (
            <div className='top'>
              <Header />

              <div className='home-siderow'>
                <SideColumn />

                <div
                  className={bg ? 'eachvideocontainer' : 'eachvideocontainer1'}
                >
                  {eachvideoloading ? (
                    <div className='loader-container' data-testid='loader'>
                      <Loader
                        type='ThreeDots'
                        color='#ffffff'
                        height='50'
                        width='50'
                      />
                    </div>
                  ) : (
                    eachvideodisplay
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
export default VideoItemDetails
