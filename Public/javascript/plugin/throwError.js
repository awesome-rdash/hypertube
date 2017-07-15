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
  else if (type == "wUserName")
  {
    $(".form-group").addClass("has-warning");
    if (!$("#i1 small").val())
      $("#i1 small").html($("#needToBeFilled").html());
    if (!$("#i2 small").val())
      $("#i2 small").html($("#needToBeFilled").html());
  }
  else if (type == "wPassWd")
  {
    $(".form-group").addClass("has-warning");
    $("#i1 small").html($("#wPassWd").html());
  }
}
function stopError()
{
  $(".form-group").removeClass("has-warning");
  $("#i1 small").html("");
  $("#i2 small").html("");
}
