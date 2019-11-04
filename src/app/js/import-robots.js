const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    
  });

const rp = require('request-promise');
const $ = require('cheerio');

var db = firebase.firestore();

function importBotsFromBuildersDB(eventId, weightId){
  const weight = 250; // 250, 30, 15
  const weightId = 7; // 7, 123, 142
  const eventId = 580;

  const path = 'http://www.buildersdb.com/view_bots.asp?eventid=' + eventId + '&sort=&classid=' + weightId;

  rp(path)
      .then(function(html){
          //success!
          var botInfo = [];
          var botName;
          var botImgURL;
          var botImgId;
          $('table > tbody > tr > td > font > b', html).each(function(i, elem){
              botName=$(this).text();
              botImgURL=$(this).parent().prev().prev().attr('src');
              botImgId = botImgURL.substring(15);                        //botpics/thumbs/
              botInfo[botName] = [botImgId];

              // Add a new document with a generated id.
              var newRobotRef = db.collection("robots").doc();

              newRobotRef.set({
                  name: botName,
                  weightClass: weight,
                  imgID: botImgId,
                  alive: true,  // Still participating (or intending to) in the competition
                  inAttendance : false, // Arrived & checked in
                  passedSafety : false, // Passed safety
                  state : "N/A", // Repairing, Ready, Scheduled, Dead
                  fightCount : 0, 
                  winCount : 0,
                  lossCount : 0, 
                  koCount : 0, // Number of fights won by KO (winCount - koCount = jdCount)
                  timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                  lastFought: 0,
                  matches : {} // History of matches for the robot
              })
              .then(function() {
                  console.log("Document successfully written!");
              })
              .catch(function(error) {
                  console.error("Error writing document: ", error);
              });
          });
          console.log(botInfo);
      })
      .catch(function(err){
          console.log("Error occured: " + err);
      });
};

export default importBotsFromBuildersDB;