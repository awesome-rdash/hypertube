function throwError(type, mode)
{
  if (mode == 1)
  {
    $(".form-group").addClass("has-warning");
    $("#i1 small").html($(type).html());
  }
  else if (mode == 2) {
    $(".form-group").addClass("has-warning");
    if (!$("#i1 small").val())
      $("#i1 small").html($(type).html());
    if (!$("#i2 small").val())
      $("#i2 small").html($(type).html());
  }
  $("#b1, #b3, #b2").prop('disabled', false);
}
function stopError() {
  $(".form-group").removeClass("has-warning");
  $(".form-group").removeClass("has-success");
  $("#i1 small").html("");
  $("#i2 small").html("");
}
