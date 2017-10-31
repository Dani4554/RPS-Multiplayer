//************************************************************************************** 
// RPS Multiplayer.js                      Author:Daniel Cherrez
//
// Demonstrates the use of Firebase and real time data.
//*************************************************************************************** 



// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCe_AzazJgY4c-KRMfGSFimAN0XCluhjvs",
    authDomain: "rps-multiplayer-398cc.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-398cc.firebaseio.com",
    projectId: "rps-multiplayer-398cc",
    storageBucket: "rps-multiplayer-398cc.appspot.com",
    messagingSenderId: "494816902494"
  };

firebase.initializeApp(config);

var database = firebase.database();



var compare = (play1, play2) => {

  if(play1 == "Rock" && play2 == "Paper"){
    $("#winner").html("Player 2 wins");
  }

  if(play1 == "Paper" && play2 == "Scissors"){
    $("#winner").html("Player 2 wins");
  }

  if(play1 == "Scissors" && play2 == "Rock"){
    $("#winner").html("Player 2 wins");
  }

  if(play1 == "Paper" && play2 == "Rock"){
    $("#winner").html("Player 1 wins");
  }

  if(play1 == "Scissors" && play2 == "Paper"){
    $("#winner").html("Player 1 wins");
  }

  if(play1 == "Paper" && play2 == "Rock"){
    $("#winner").html("Player 1 wins");
  }

  if(play1 == "Paper" && play2 == "Paper"){
    $("#winner").html("Its a tie");
  }

  if(play1 == "Scissors" && play2 == "Scissors"){
    $("#winner").html("Its a tie");
  }

  if(play1 == "Rock" && play2 == "Rock"){
    $("#winner").html("Its a tie");
  }

};



var assignPlayer = function(key) {
  
    if(key == "player2"){
      $("#display").html("<h1>You are player 2</h1>");
      
      let player = 2;
  
      listen(player);
  
    }
  
    if(key == "player1"){
      $("#display").html("<h1>You are player 1</h1>");
  
      let player = 1;
  
      listen(player);
    }
  
  }; 
  
  
  var listen = (player) => {
  
    $("#submit-name").on("click", function(){
      event.preventDefault();
  
      name = $("#player-name").val().trim();
  
      $("#name").html(`Player Name: ${name}`);
  
      if(player == 1){
        database.ref().child("player-1").set({name: name});
      }
  
      if(player == 2){
        database.ref().child("player-2").set({name: name});
      }
  
    });
  
  
    $("#Rock").on("click", function(){
      choice = "Rock";
  
      $("#choice").html(`Your choice is: ${choice}`); 
  
  
      if(player == 1){
        database.ref().child("player-1").update({choice: choice});
      }
  
      if(player == 2){
        database.ref().child("player-2").update({choice: choice});
      }
  
    });
  
    $("#Paper").on("click", function(){
        choice = "Paper"; 
  
        $("#choice").html(`Your choice is: ${choice}`);
  
        if(player == 1){
          database.ref().child("player-1").update({choice: choice});
        }
    
        if(player == 2){
          database.ref().child("player-2").update({choice: choice});
        }
    
    });
  
    
    $("#Scissors").on("click", function(){
      choice = "Scissors";  
  
      $("#choice").html(`Your choice is: ${choice}`);
  
      if(player == 1){
        database.ref().child("player-1").update({choice: choice});
      }
  
      if(player == 2){
        database.ref().child("player-2").update({choice: choice});
      }
  
    });
  
  };
  
  var choiceFunc = () => {
    
   database.ref("/player-1/choice").on("value", (snap1) => {
   
       database.ref("/player-2/choice").on("value", (snap2) =>{
   
         console.log(snap1.val());
         console.log(snap2.val());
   
         compare(snap1.val(), snap2.val());
   
       });
   
   });
   
   };


 //Initial Values
var connections = database.ref("/connections");
var players = database.ref("/players");
var connectedRef = database.ref(".info/connected");
var name;
var key;
var key2;
var choice;
var choices =[2];


connectedRef.on("value", function(snap){
  
    if(snap.val()){
  
      var con = connections.push(true);
  
       connections.once("value").then(function(snap, key){

        if(snap.numChildren() == 2){
          key = "player2";
        }else if(snap.numChildren() == 1) {
          key = "player1";
        }
          
        assignPlayer(key);

      });

      choiceFunc();

      con.onDisconnect().remove( (err) => {

        if(err) {
          console.log(err);
        }else{
          database.ref("/player-1").remove();
          database.ref("/player-2").remove();
        }
      });

    } 
});


