import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';
const API_KEY = 'AIzaSyCSzF3CUl5tzBCpNd_D4gg-CpTr_Wik6F4';


class App extends Component {
  constructor(props){
    super(props);

    this.state ={
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('tiny bikini');
  }

  videoSearch(term){
    YTSearch({key: API_KEY,term: term}, (videos) => this.setState({
      videos: videos,
      selectedVideo: videos[0]
    }));
  }

  render(){

    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 1000);

    return (
      <div className='row'>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo=> this.setState({selectedVideo})}
          videos={this.state.videos}
        />
      </div>);
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
//
//
// class App extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       videos: [],
//       selectedVideo: null
//     };
//
//     this.videoSearch('surfboards');
//   }
//
//   videoSearch(term) {
//     YTSearch({ key: API_KEY, term: term }, videos => {
//       this.setState({
//         videos: videos,
//         selectedVideo: videos[0]
//       });
//     });
//   }
//
//   render() {
//     const videoSearch = _.debounce(term => {
//       this.videoSearch(term);
//     }, 1000);
//
//     return (
//       <div>
//         <SearchBar onSearchTermChange={videoSearch} />
//         <VideoDetail video={this.state.selectedVideo} />
//         <VideoList
//           onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
//           videos={this.state.videos}
//         />
//       </div>
//     );
//   }
// }
//
// ReactDOM.render(<App />, document.querySelector('.container'));
