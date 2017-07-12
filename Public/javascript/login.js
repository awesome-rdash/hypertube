$( document ).ready(function() {
  function changeText(cont1,cont2,speed){
  	var Otext = cont1.text();
  	var Ocontent = Otext.split("");
  	var i = 0;
    cont2.html(Ocontent[i++]);
  	function show(){
  		if(i<Ocontent.length)
  		{
  			cont2.append(Ocontent[i]);
  			i++;
  		};
  	};
  	var Otimer=setInterval(show,speed);
  };

  var step = 0;
  var mode = 0;
  var stepInput = [["", ""], ["", ""], ["", ""]];
  $("#i2 input").hide();
  $("#b1").hide();
  $("#b2").hide();
  function nextStep()
  {
    if (step == 0)
    {
      $("#b1").hide();
      $("#b3").show();
      $("#b2").hide();
      $(".progress-bar").animate({
        width: "25%"
      }, 250, function() {
        $(".progress-bar").html($(".progress-bar").html().split(" ")[0] + " " + (step + 1));
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
        width: "50%"
      }, 250, function() {
        $(".progress-bar").html($(".progress-bar").html().split(" ")[0] + " " + (step + 1));
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
    else if (step == 2)
    {
      $(".progress-bar").animate({
        width: "75%"
      }, 250, function() {
        $(".progress-bar").html($(".progress-bar").html().split(" ")[0] + " " + (step + 1));
        changeText($("#username"),$("#i1 span"),2);
        $("#i1 input").attr("placeholder", $("#username").html());
        $("#i1 input").attr("type", "text");
        $("#i2 span").html("");
        $("#i2 input").fadeOut("fast");
        $('.btn-styler').blur();
        $("#i1 input").val(stepInput[step][0]);
        $("#i2 input").val(stepInput[step][1]);
      });
    }
  }

  $("#b1").click(() => {
    stepInput[step][0] = $("#i1 input").val();
    stepInput[step][1] = $("#i2 input").val();
    step++;
    nextStep();
  });
  $("#b3").click(() => {
    stepInput[step][0] = $("#i1 input").val();
    stepInput[step][1] = $("#i2 input").val();
    step++;
    nextStep();
  });
  $("#b2").click(() => {
    stepInput[step][0] = $("#i1 input").val();
    stepInput[step][1] = $("#i2 input").val();
    if (step >= 1)
    {
      step--;
      nextStep();
    }
  });

  $("#swap").click(() => {
    if (mode == 0)
    {
      mode = 1;
      changeText($("#login"),$("h3"),2);
      $("#swap div").html($("#1login").html());
    }
    else {
      mode = 0;
      changeText($("#signup"),$("h3"),2);
      $("#swap div").html($("#1signup").html());
    }
  });
});
