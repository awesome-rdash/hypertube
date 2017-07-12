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
