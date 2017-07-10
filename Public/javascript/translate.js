$( document ).ready(function() {
	var langs = ['en', 'fr'];
	var langCode = '';
	var langJS = null;

	Array.prototype.contains = function(obj) {
	    var i = this.length;
	    while (i--) {
	        if (this[i] == obj) {
	            return true;
	        }
	    }
	    return false;
	}

	var translate = function (jsdata)
	{
		$("[tkey]").each (function (index)
		{
			var strTr = jsdata [$(this).attr ('tkey')];
		    $(this).html (strTr);
		});
	}


	langCode = navigator.languages[0];
	console.log(langCode);
	console.log(langs);
	if (langs.contains(langCode))
		$.getJSON('locals/'+langCode+'.json', translate);
	else if (langs.contains(langCode[0] + "" + langCode[1]))
		$.getJSON('locals/'+ langCode[0] + "" + langCode[1] +'.json', translate);
	else
		$.getJSON('locals/en.json', translate);
});
