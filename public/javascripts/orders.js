var $form = $("#order-form");

//if the submit works
var onSuccess = function(data, status) {
  // $( ".result" ).html( data );
  alert("Your order is on its way!");
};

//if the submit fails
var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

//submitting the form
$form.submit(function(event) {
  event.preventDefault();

  //getting the value of orderName from form
  var orderName = $form.find("[name='orderName']").val();
  var ingredientList = $form.find("[name='ingredientList']").val();
  var checkedIngredients = [];

  //adding the checked ingredients to list (theoretically)
  $('input:checked').each(function() {
      checkedIngredients.push(this.ingredientList);
  });

  //sending post request to add order to database
  $.post("order/add",{
    orderName: orderName,
    ingredientList: ingredientList
  })
    .done(onSuccess)
    .error(onError)
});
