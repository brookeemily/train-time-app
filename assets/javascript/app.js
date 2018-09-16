
    // Initialize Firebase
 var config = {
    authDomain: "train-times-18d9a.firebaseapp.com",
    databaseURL: "https://train-times-18d9a.firebaseio.com",
    projectId: "train-times-18d9a",
    storageBucket: "train-times-18d9a.appspot.com",
    messagingSenderId: "609787869325"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();


  // Initial Values
//   var trainName = "";
//   var destination = "";
//   var firstTime = 0;
//   var frequency = "";

  // Capture Button Click
  $("#submit").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    var trainName = $("#trainName-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = $("#firstTime-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

// console.log(trainName);
    // Code for handling the push
     // Creates local "temporary" object for holding employee data
  var newTrain = {
      trainName: trainName,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency,
    };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.firstTime);
  console.log(newTrain.frequency);
});

  // Firebase watcher .on("child_added"
  database.ref().on("child_added", function(childSnapshot) {
    // storing the snapshot.val() in a variable for convenience
    // var sv = childSnapshot.val();

    // Console.loging the last user's data
    // console.log(sv.trainName);
    // console.log(sv.destination);
    // console.log(sv.firstTime);
    // console.log(sv.frequency);

// Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().firstTime;
  var frequency = childSnapshot.val().frequency;

 // Train Info
 console.log(trainName);
  console.log(destination);
  console.log(firstTime);
  console.log(frequency);

// Find Next Train & Minutes til Train

 // First Time (pushed back 1 year to make sure it comes before current time)
 var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var remainder = diffTime % frequency;

    // Minute Until Train
    var minAway = frequency - remainder;

    // Next Train
    var nextArrival = moment().add(minAway, "minutes");
    var nextTrain = nextArrival.format("hh:mm");
// 
    // Change the HTML to reflect
    var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minAway)
);

  // Append the new row to the table
  $("#schedule > tbody").prepend(newRow);
    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });


