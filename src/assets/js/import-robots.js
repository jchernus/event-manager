// const EVENTID = 580;

// const BOTS15 = 142;
// const BOTS30 = 123;
// const BOTSHW = 7;

// Images can be at botpics/thumbs/13516.jpg
// or at botpics/13516.jpg

function importRobots(){
  console.log("Got here");
  const rp = require('request-promise');
  const $ = require('cheerio');
  const path = 'http://www.buildersdb.com/view_bots.asp?eventid=' + 580 + '&sort=&classid=' + 7;

  rp(path)
    .then(function(html){
      //success!
      var numBots = $('td > font > b', html).length;
      var botInfo = [];
      var botName;
      var botImgURL;
      $('table > tbody > tr > td > font > b', html).each(function(i, elem){
          botName=$(this).text();
          botImgURL=$(this).parent().prev().prev().attr('src');
          botInfo[botName] = [botImgURL];
      });
      console.log(botInfo);
    })
    .catch(function(err){
      //handle error
    });
}