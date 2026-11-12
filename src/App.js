import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import CreateContexvalue from './CreateContext/CreateContext'
import Home from './components/Home/App'
import Gaming from './components/Gaming/App'
import Trending from './components/Trending/App'
import VideoItemDetails from './components/VideoItemDetails/App'
import SavedVideos from './components/SavedVideos/App'
import Login from './components/Login/App'
import NotFound from './components/NotFound/App'
import './App.css'

class App extends Component {
  state = {
    bg: true,
    saveditemList: [],
  }

  changingsaveditemList = videolist => {
    this.setState(prevState => {
      const isAlreadySaved = prevState.saveditemList.some(
        each => each.ideach === videolist.ideach,
      )

      if (isAlreadySaved) {
        return {
          saveditemList: prevState.saveditemList.filter(
            each => each.ideach !== videolist.ideach,
          ),
        }
      }

      return {
        saveditemList: [...prevState.saveditemList, videolist],
      }
    })
  }

  changingbg = () => {
    this.setState(prevState => ({bg: !prevState.bg}))
  }

  render() {
    const {bg, saveditemList} = this.state
    return (
      <CreateContexvalue.Provider
        value={{
          bg,
          changingbg: this.changingbg,
          saveditemList,
          changingsaveditemList: this.changingsaveditemList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/gaming" component={Gaming} />
          <Route exact path="/trending" component={Trending} />
          <Route exact path="/videos/:id" component={VideoItemDetails} />
          <Route exact path="/saved-videos" component={SavedVideos} />
          <Route component={NotFound} />
        </Switch>
      </CreateContexvalue.Provider>
    )
  }
}
export default App
