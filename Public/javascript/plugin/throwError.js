function throwError(type)
{
  if (type == "wMail")
  {
    $(".form-group").addClass("has-warning");
    $("#i1 small").html($("#mailError").html());
  }
  else if (type == "noMatch")
  {
    $(".form-group").addClass("has-warning");
    $("#i1 small").html($("#pwdNoMatch").html());
  }
  else if (type == "wPwdLen")
  {
    $(".form-group").addClass("has-warning");
    $("#i1 small").html($("#wPwdLen").html());
  }
}
function stopError()
{
  $(".form-group").removeClass("has-warning");
  $("#i1 small").html("");
  $("#i2 small").html("");
}
