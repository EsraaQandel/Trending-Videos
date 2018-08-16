import express from 'express';
import * as config from '../config.json';
import { YoutubeService } from '../services/youtube';

const router = express.Router();
const service = new YoutubeService();
/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/youtube');
});


router.post('/', async (req, res) => {
  let countryCode = req.body.title;	
  const trends = await service.getTrendingVideos(countryCode);
  res.render('youtube/index', {
    title: config.title,
    videos: trends,
    countries: config.countryList
  });
});

module.exports = router;
