function stepBefore(step)
{
  if (step == 0)
  {
    $("#b1").hide();
    $("#b3").show();
    $("#b2").hide();
    $(".progress-bar").animate({
      width: "25%"
    }, 250, function() {
      $(".progress-bar").html($("#mail").html());
      changeText($("#mail"),$("#i1 span"),2);
      $("#i1 input").attr("placeholder", "Email");
      $("#i1 input").attr("type", "text");
      $("#i2 span").html("");
      $("#i2 input").fadeOut("fast");
      $('.btn-styler').blur();
      $("#i1 input").val(stepInput[step][0]);
      $("#i2 input").val(stepInput[step][1]);
    });
  }
  else if (step == 1)
  {
    $("#b1").show();
    $("#b3").hide();
    $("#b2").show();
    $(".progress-bar").animate({
      width: "33%"
    }, 250, function() {
      $.get("/login/hasAccount", { email: $("#i1 input").val() }, (data) => {
        if (data == true) {
          $(".progress-bar").animate({
            width: "50%"
          }, 250, function() {
            $(".progress-bar").html($("#password").html());
            changeText($("#password"),$("#i1 span"),2);
            $("#i1 input").attr("placeholder", "********");
            $("#i1 input").attr("type", "password");
            changeText($("#repassword"),$("#i2 span"),2);
            $("#i2 input").fadeIn("fast");
            $('.btn-styler').blur();
            $("#i1 input").val(stepInput[step][0]);
            $("#i2 input").val(stepInput[step][1]);
          });
        }
        else {
          $(".progress-bar").animate({
            width: "25%"
          }, 250, function() {
            step--;
          });
        }
      });

    });
  }
  return (step);
}
