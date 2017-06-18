
$(document).ready(function() {
  

  // Initialize Firebase 
  // Firebase intitialized in separate js file.
  firebase.initializeApp(config);
  var database = firebase.database(); 

  // SECTION FOR TESTING MOMENT.JS 
  function testmoment () { 
    var timetest = moment();
    console.log (timetest) 
  } 

  testmoment();  


  // App object 

  var trSched = {

    trainName: null,
    destinaton: null,
    firstTrain: null,  
    frequency: null, 
  
  }

  $('#submit').on('click', function() {
 
    event.preventDefault(); 

    console.log('submit clicked');

    trSched.trainName = $('#train-name').val().trim();
    trSched.destination = $('#train-destination').val().trim();
    trSched.firstTrain = $('#train-time').val().trim(); 
    trSched.frequency = $('#train-frequency').val().trim();

    console.log(trSched.trainName);
    console.log(trSched.destination);
    console.log(trSched.firstTrain);
    console.log(trSched.frequency); 

    database.ref().push({
      trainName: trSched.trainName, 
      destination: trSched.destination,
      firstTrainTime: trSched.firstTrain,
      trainFrequency: trSched.frequency,
    });
 
  }); 

  database.ref().on("child_added", function(childSnapshot) { 
      var trName = childSnapshot.val().trainName;    
      var trDestin = childSnapshot.val().destination;
      var trTime = childSnapshot.val().firstTrainTime;
      var trFreq = childSnapshot.val().trainFrequency;
      
      var nxtTr = "35 min."
      
      var newRow = $("<tr>");
       
      newRow.html("<td>" + trName + "</td><td>" + trDestin + "</td><td>" + trFreq + "</td><td>" + trTime + "</td><td>" + nxtTr + "</td>");
      
      $('#trains').append(newRow);     
  });


});



  




