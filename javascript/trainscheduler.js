
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
    nextTrain: null,
    minAway: null, 

    trainTimeCalc: function( startTime , frequency) {
      
      var tFrequency = frequency;

      // Time is 3:30 AM
      var firstTime = startTime;

      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
      // console.log(firstTimeConverted);

      // Current Time
      var currentTime = moment();
      // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      // console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % tFrequency;
      // console.log(tRemainder);

      // Minute Until Train
      var tMinutesTillTrain = tFrequency - tRemainder;
      // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
      this.nextTrain = moment().add(tMinutesTillTrain, "minutes");
      // console.log("ARRIVAL TIME: " + moment(this.nextTrain).format("HH:mm"));

      this.nextTrain = moment(this.nextTrain).format("HH:mm"); 
      // console.log(this.nextTrain); 

      this.minAway = tMinutesTillTrain;
      // console.log(this.minAway);

    }, 
  
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
      
      // locale variable to pull date from firebase 
      var trName = childSnapshot.val().trainName;    
      var trDestin = childSnapshot.val().destination;
      var trTime = childSnapshot.val().firstTrainTime;
      var trFreq = childSnapshot.val().trainFrequency;
      
      // placeholder field for now

      
      console.log(trTime);
      console.log(trFreq);

      // // Generatates new row
      // var newRow = $("<tr>"); 
      // newRow.html("<td>" + trName + "</td><td>" + trDestin + "</td><td>" + trFreq + "</td><td>" + trTime + "</td><td>" + nxtTr + "</td>");
      
      // // adds row to table
      // $('#trains').append(newRow);     
    

    // function trainTimeCalc () {
      
    // var tFrequency = trFreq;

    // // Time is 3:30 AM
    // var firstTime = trTime;

    // // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // // Difference between the times
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // // Minute Until Train
    // var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    // nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    // nextTrain = moment(nextTrain).format("HH:mm"); 
    // console.log(nextTrain); 

    // minAway = tMinutesTillTrain;
    // console.log(minAway);

    // } 
    
    trSched.trainTimeCalc(trTime, trFreq); 

    var newRow = $("<tr>"); 
    newRow.html("<td>" + trName + "</td><td>" + trDestin + "</td><td>" 
      + trFreq + "</td><td>" + trSched.nextTrain + "</td><td>" + trSched.minAway + 
      "</td><td><button class='clearbox'>X</button></td>");
    
    // adds row to table
    $('#trains').append(newRow);  



  });


  $("#trains").on('click', '.clearbbox', function () {
    $(this).closest('tr').remove();
    console.log('delete button clicked');
});


});



  




