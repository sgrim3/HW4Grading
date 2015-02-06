var $form = $("#ingredients-form");

//if form submit works
var onSuccess = function(data, status) {

  //TODO- fix bug that replaces ingredients list with 2 empty objects
  $( "#result" ).html(data);
};

//if form submit fails
var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

//TODO-Figure out how to indicate which edit button/which ingredient was clicked
$("#edit").click(function() {
  alert ("Edit button clicked");
}

//submitting the form
$form.submit(function(event) {
  event.preventDefault();

  //getting values of ingredientName and ingredientPrice from form data
  var ingredientName = $form.find("[name='ingredientName1']").val();
  var ingredientPrice = $form.find("[name='ingredientPrice1']").val();

  //sending post request
  $.post("ingredients/add", {
    ingredientName: ingredientName,
    ingredientPrice: ingredientPrice
  })
    .done(onSuccess)
    .error(onError);
});