//if click is successful
var onSuccess = function(data, status) {
  // $( "#result" ).html(data);
  // alert( "Data Loaded: " + data );
};

//if click fails
var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

//TODO- again, figure out how to tell what item is associated w clicked button, name "deletedOrder"
$("#complete").click(function() {
  deletedOrder.remove().exec();
}).done(onSuccess).error(onError);

