//if click is successful
var onSuccess = function(data, status) {
   $( "#result" ).html(data);
  // alert( "Data Loaded: " + data );
};

//if click fails
var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

//TODO- 
$("#complete").click(function() {
	nameID = $(this).attr("name");
    deletedOrder.remove().exec();

 //sending post request
  $.post("kitchen/delete", {
    nameID: nameID
  })
.done(onSuccess)
.error(onError);
})
