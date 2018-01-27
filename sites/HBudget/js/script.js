function showPopUp(id){
    display = document.getElementById(id).style.display;

	if(display=='block'){
		document.getElementById(id).style.display='none';
	}
	else{
		document.getElementById(id).style.display='block';
	}
}

var enLang = document.getElementById('en-lang');
var ruLang = document.getElementById('ru-lang');

enLang.addEventListener('click', setLanguage.bind(null, 'EN'));
ruLang.addEventListener('click', setLanguage.bind(null, 'RU'));

function setLanguage(lang) {
	var curLang = document.getElementById('cur-lang');
	curLang.innerText = lang;
}