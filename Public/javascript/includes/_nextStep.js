function nextStep()
{
  stopError();
  /* Etape Email */
  if (step == 1)
  {
    $(".progress-bar").animate({
      width: "33%"
    }, 250, function() {
      if (validateEmail($("#i1 input").val()))
      {
        $("#b1").show();
        $("#b3").hide();
        $("#b2").show();
        $.get("/login/hasAccount", { email: $("#i1 input").val() }, (data) => {
          console.log(data);
          if (data != false) {
            window.location.replace("/login/" + data);
          }
          else {
            $(".progress-bar").animate({
              width: "50%"
            }, 250, function() {
              $("#b1, #b3, #b2").prop('disabled', false);
              step++;
              $(".progress-bar").html($("#password").html());
              changeText($("#password"),$("#i1 label"),2);
              $("#i1 input").attr("placeholder", "********");
              $("#i1 input").attr("type", "password");
              changeText($("#repassword"),$("#i2 label"),2);
              $("#i2 input").attr("type", "password");
              $("#i2 input").fadeIn("fast");
              $('.btn-styler').blur();
              $("#i1 input").val(stepInput[step][0]);
              $("#i2 input").val(stepInput[step][1]);
            });
          }
        });
      }
      else {
        $(".progress-bar").animate({
          width: "25%"
        }, 250, function() {
          $("#b1, #b3, #b2").prop('disabled', false);
          throwError("wMail");
        });
      }
    });
  }

  /* Etape mot de passe */
  if (step == 2)
  {
    $(".progress-bar").animate({
      width: "60%"
    }, 250, function() {
      if ($("#i1 input").val().length >= 6) {
        if ($("#i1 input").val() == $("#i2 input").val()) {
          $(".progress-bar").animate({
            width: "75%"
          }, 250, function() {
            $("#b1, #b3, #b2").prop('disabled', false);
            step++;
            $(".progress-bar").html($("#userLastname").html() + " / " + $("#userFirstname").html());
            changeText($("#userLastname"),$("#i1 label"),2);
            changeText($("#userFirstname"),$("#i2 label"),2);
            $("#i1 input").attr("placeholder", $("#userLastname").html());
            $("#i2 input").attr("placeholder", $("#userFirstname").html());
            $("#i1 input").attr("type", "text");
            $("#i2 input").attr("type", "text");
            $('.btn-styler').blur();
            $("#i1 input").val(stepInput[step][0]);
            $("#i2 input").val(stepInput[step][1]);
          });
        }
        else {
          $(".progress-bar").animate({
            width: "50%"
          }, 250, function() {
            $("#b1, #b3, #b2").prop('disabled', false);
            throwError("noMatch");
          });
        }
      }
      else
      {
        $(".progress-bar").animate({
          width: "50%"
        }, 250, function() {
          $("#b1, #b3, #b2").prop('disabled', false);
          throwError("wPwdLen");
        });
      }
    });
  }

  /* Etape nom et prenom */
  if (step == 3)
  {
    $(".progress-bar").animate({
      width: "86%"
    }, 250, function() {

      $.post("/register/local", {
        email: stepInput[1][0],
        password: stepInput[2][0],
        password-confirm: stepInput[2][1],
        firstName: stepInput[3][0],
        lastName: stepInput[3][1]
      }, (data) => {
          console.log(data);

          $(".progress-bar").animate({
            width: "100%"
          }, 250, function() {
          });
      });
    });
  }
}
