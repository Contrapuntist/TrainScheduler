
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
    event.preventdefault(); 

    trSched.trainName = $('#train-name').val().trim();
    trSched.destinaton = $('#train-destination').val().trim();
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

    })
 
  });

  // database.ref().on("child_added", function(childSnapshot) { 
  //     var name = childSnapshot.val().employeeName;    
  //     var role = childSnapshot.val().employeeRole;
  //     var stdate = childSnapshot.val().startDate;
  //     var rate = childSnapshot.val().monthlyRate;
      
      
      
  //     var newRow = $("<tr>");
       
  //     newRow.html("<td>" + name + "</td><td>" + role + "</td><td>" + stdate + "</td><td>" + rate + "</td>");
      
  //     $('#trains').append(newRow);     
  // });


});



  




