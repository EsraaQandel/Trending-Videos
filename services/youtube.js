import Axios from 'axios';
import * as config from '../config.json';
import moment from "moment";

const axios = Axios.create({
  baseURL: config.youtubeApi.endpoint
});

export class YoutubeService {
  getTrendingVideos() {
    var params = {
      part: 'snippet',
      chart: 'mostPopular',
      regionCode: 'US', // should be replaced with country code from countryList
      maxResults: '24',
      key: config.youtubeApi.key
    };

    var result = [];

    return axios.get('/', {params}).then(function(res){
      result = res.data.items;
      result.map(res =>{
        let video ={
          id:res.id,
          title:res.snippet.title,
          thumbnail: res.snippet.thumbnails.high.url,
          publishedAt: moment(res.snippet.publishedAt).fromNow()
        }
        let videoDetails = YoutubeService.getVideoDetails(video);
        result.push(videoDetails);
      });
      console.log(result);
      return result;
    });

  }

  static getVideoDetails(video) {
    var params = {
      part: 'statistics',
      id: video.id,
      key: config.youtubeApi.key
    };

    return axios.get('/', {params}).then(function(res) {
      var result = res.data;
      video.viewCount = result['items'][0].statistics.viewCount;
      video.likeCount = result['items'][0].statistics.likeCount;
      console.log(video);
      return video;
    });
  }
}
