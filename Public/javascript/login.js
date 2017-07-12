$( document ).ready(function() {
  var step = 0;
  var mode = 0;
  var stepInput = [["", ""], ["", ""], ["", ""]];
  $("#i2 input").hide();
  $("#b1").hide();
  $("#b2").hide();
  $.getScript('/javascript/includes/_nextStep.js', function()
  {
    $("#b1").click(() => {
      stepInput[step][0] = $("#i1 input").val();
      stepInput[step][1] = $("#i2 input").val();
      step++;
      step = nextStep(step);
    });
    $("#b3").click(() => {
      stepInput[step][0] = $("#i1 input").val();
      stepInput[step][1] = $("#i2 input").val();
      step++;
      step = nextStep(step);
    });
  });
  // $.getScript('/javascript/includes/_stepBefore.js', function()
  // {
  //   $("#b2").click(() => {
  //     stepInput[step][0] = $("#i1 input").val();
  //     stepInput[step][1] = $("#i2 input").val();
  //     if (step >= 1)
  //     {
  //       step--;
  //       step = stepBefore(step);
  //     }
  //   });
  // });
});
