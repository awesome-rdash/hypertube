var step = 1;
var stepInput = [["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]];
include('javascript/includes/_nextStep.js');
include('javascript/includes/_stepBefore.js');
$( document ).ready(function() {
  $("#i2 input").hide();
  $("#b1").hide();
  $("#b2").hide();
  $("#b1, #b3").click(() => {
    stepInput[step][0] = $("#i1 input").val();
    stepInput[step][1] = $("#i2 input").val();
    $("#b1, #b3").prop('disabled', true);
    nextStep();
  });
  $("#b2").click(() => {
    stepInput[step][0] = $("#i1 input").val();
    stepInput[step][1] = $("#i2 input").val();
    $("#b2").prop('disabled', true);
    if (step >= 1)
      stepBefore(step);
  });
});

$(document).on('keypress', function(e) {
  if (e.keyCode == 13)
  {
    stepInput[step][0] = $("#i1 input").val();
    stepInput[step][1] = $("#i2 input").val();
    $("#b1, #b3").prop('disabled', true);
    nextStep();
  }
});
