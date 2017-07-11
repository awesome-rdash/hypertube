$( document ).ready(function() {
  function changeText(cont1,cont2,speed){
  	var Otext = cont1.text();
  	var Ocontent = Otext.split("");
  	var i = 0;
    cont2.html("");
  	function show(){
  		if(i<Ocontent.length)
  		{
  			cont2.append(Ocontent[i]);
  			i++;
  		};
  	};
  	var Otimer=setInterval(show,speed);
  };

  var step = 1;
  $("#step2").fadeOut('fast');
  $("#step3").fadeOut('fast');
  $("#step4").fadeOut('fast');
  function nextStep()
  {
    if (step == 1)
    {
      $(".progress-bar").animate({
        width: "50%"
      }, 1000, function() {
        $(".progress-bar").html("50%");
        changeText($("#password"),$("#i1"),50);
        $("#i1").attr("placeholder", $("#i1").html());
      });
    }
    else if (step == 2)
    {

    }
  }

  $(".btn-styler").click(() => {
    nextStep();
    step++;
  });

  $('button').submit(function () {
//   sendContactForm();
   return false;
  });
});
