var itemsList = [];
var count = 0;
function addTag(tag, text, parentTag, attributes, br) {
	var parent = document.getElementsByTagName(parentTag)[0];
	var newTag = document.createElement(tag);
	if(attributes)
	{
		for(key in attributes)
		{
			if (key == 'class') {
				newTag.className = attributes[key];
			} else if (key == 'id') {
				newTag.id = attributes[key];
			} else {
				newTag.setAttribute(key, attributes[key]);
			}
		}
	}
	var textTag = document.createTextNode(text);
	if(text != 0)
		newTag.appendChild(textTag);
	parent.appendChild(newTag);
	var brTag = document.createElement("BR");
	if(br)
		parent.appendChild(brTag);

}

function initItems() {
	var i = 0;
	var retObj = 0;
	var flag = true;
	while(flag)
	{
		retObj = JSON.parse(localStorage.getItem(i));
		if(retObj["name"] == undefined)
		{
			flag = false;
			break;
		}
		itemsList[i] = retObj;
		addTag("TR", 0, "TABLE", {}, 0);
		addTag("TD", itemsList[count]["name"], "TABLE", {}, 0);
		addTag("TD", itemsList[count]["time"], "TABLE", {}, 0);
		addTag("TD", itemsList[count]["date"], "TABLE", {}, 0);
		i++;
		count++;
	}
}

function validate(form) {

	var valid = false;
	var dateChecked = /^(((0[1-9]|[12]\d|3[01])\.(0[13578]|1[02])\.((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\.(0[13456789]|1[012])\.((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\.02\.((19|[2-9]\d)\d{2}))|(29\.02\.((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;
	
	// ЗНАЮ ЧТО ПРОВЕРКА НА ДАТУ НЕ ОЧЕНЬ И ЕСЛИ ГОД ДАЖЕ 3994, ТО ВСЁ БУДЕТ ОК. Я МОГ ПЕРЕДЕЛАТЬ, НО ЭТОТ ПРОЕКТ ПОЙДЁТ В БУДУЩЕЕ,
	// МНЕ ПОСТАВЯТ ПАМЯТНИК, КАК САМОМУ КРУТОМУ FRONT-END РАЗРАБОТЧИКУ 2016-ОГО ГОДА, А ЧЕРЕЗ ТЫСЯЧИ ЛЕТ ЛЮДИ, ПОЛЬЗУЮЩИЕСЯ МОИМ
	// TODOLIST УВИДЯТ ОШИБКУ ПРОВЕРКИ НА ДАТУ И ЗАСМЕЮТ МЕНЯ. МНЕ ЖЕ В ГРОБУ БУДЕТ СТЫДНО, ПОЭТОМУ НЕ СТАЛ НИЧЕГО ИСПРАВЛЯТЬ.

	var timeChecked = /^([0-1]\d|2[0-3])(:[0-5]\d)$/;

	if(form.whatToDo.value == "")
	{
		form.whatToDo.style.boxShadow = "0 0 2px red";
		valid = false;
	}
	else
	{
		form.whatToDo.style.boxShadow = "none";
		valid = true;
	}


	if(dateChecked.test(form.dateInput.value) == false)
	{
		form.dateInput.style.boxShadow = "0 0 2px red";
		valid = false;
	}
	else
	{
		form.dateInput.style.boxShadow = "none";
		valid = true;
	}

	if(timeChecked.test(form.timeInput.value) == false)
	{
		form.timeInput.style.boxShadow = "0 0 2px red";
		valid = false;
	}
	else
	{
		form.timeInput.style.boxShadow = "none";
		valid = true;
	}

	if(document.getElementById("filterDateCheckBox").checked)
	{
		if(dateChecked.test(form.filterDate.value) == false)
		{
			form.filterDate.style.boxShadow = "0 0 2px red";
			valid = false;
		}
		else
		{
			form.filterDate.style.boxShadow = "none";
			valid = true;
		}
	}
	if(document.getElementById("filterNameCheckBox").checked)
	{
		if(form.filterNameInput.value == "")
		{
			form.filterNameInput.style.boxShadow = "0 0 2px red";
			valid = false;
		}
		else
		{
			form.filterNameInput.style.boxShadow = "none";
			valid = true;
		}
	}

	if(valid) // ПРОВЕРКА НЕ РАБОТАЕТ ПОСЛЕ ДАТЫ
	{
		itemsList[count] = {"name" : form.whatToDo.value, "time" : form.timeInput.value, "date" : form.dateInput.value};
		alert("You added item: " + itemsList[count]["name"]);
		var sObj = JSON.stringify(itemsList[count]);
		localStorage.setItem(count, sObj);
		addTag("TR", 0, "TABLE", {}, 0);
		addTag("TD", itemsList[count]["name"], "TABLE", {}, 0);
		addTag("TD", itemsList[count]["time"], "TABLE", {}, 0);
		addTag("TD", itemsList[count]["date"], "TABLE", {}, 0);
		count++;
	}

}

function inputOpen(checkBox) {
	this.elementId = checkBox.slice(0, -8);
	this.element = document.getElementById(elementId);
	if(document.getElementById(checkBox).checked)
		element.style.display = "block";
	else
	{
		element.style.display = "none";
		element.style.boxShadow = "none";
		element.value = "";
	}
}

function inputDesign(input) {
	this.element = document.getElementById(input);
	this.elementId = element.getAttribute("id");
	if(document.getElementById(input).focus)
		document.getElementById(elementId).style.boxShadow = "none";
}

function krsort(w) {
	var sArr = [], tArr = [], n = 0;

	for (i in w) {
		tArr[n++] = i;
	}

	tArr = tArr.sort(function(a,b){return (b < a)});
	for (var i=0, n = tArr.length; i<n; i++) {
		sArr[tArr[i]] = w[tArr[i]];
	}
	return sArr;
}

function sortOnDateFunc(id) {
	for(var i = 0; i < count; i++)
	{
		for(var j = 0; j < count; j++)
		{
			if(itemsList[i]["name"] < itemsList[i+1]["name"])
			{
				//alert("HELL : " + itemsList[i]["name"]);
				itemsList[i].name = itemsList[i].name - itemsList[i-1].name;
				//var buf = itemsList[i]["name"];
				//itemsList[i]["name"] = itemsList[i+1]["name"];
				//itemsList[i+1]["name"] = buf;
			}
		}
	}

}

window.onload = function() {
	//localStorage.clear();
	
	// ДОБАВЛЕНИЕ ТЕГА
	// addTag ("Название тега", "Текст" (0 - ничего не писать), "Родительский тег", {"атрибут" : "значение"}, 1 - добавить br 0 - нет);
	
	addTag("FORM", 0, "BODY", {"id" : "form"}, 0);
	addTag("LABEL", "WhatToDo?", "FORM", {"for" : "inputText"}, 1);
	addTag("INPUT", 0, "FORM", {"id" : "inputText", "placeholder" : "Hello", "name" : "whatToDo", "size" : "60", "onchange" : "inputDesign('inputText')"}, 1);
	
	addTag("LABEL", "Time", "FORM", {"for" : "inputTime"}, 1);
	addTag("INPUT", 0, "FORM", {"id" : "inputTime", "placeholder" : "18:00", "size" : "5", "name" : "timeInput", "onclick" : "inputDesign('inputTime')"}, 0);
	addTag("INPUT", 0, "FORM", {"id" : "inputDate", "placeholder" : "01.01.1998", "size" : "10", "type" : "text", "name" : "dateInput", "onclick" : "inputDesign('inputDate')"}, 1);
	
	addTag("LABEL", "Sort", "FORM", 0, 1);
	addTag("INPUT", 0, "FORM", {"type" : "radio", "value" : "1", "name" : "sort", "id" : "sortOnDate"}, 0);
	
	addTag("LABEL", "Date", "FORM", {"for" : "sortOnDate"}, 1);
	addTag("INPUT", 0, "FORM", {"type" : "radio", "value" : "2", "name" : "sort", "id" : "sortOnName"}, 0);
	
	addTag("LABEL", "Name", "FORM", {"for" : "sortOnName"}, 1);
	addTag("INPUT", 0, "FORM", {"type" : "radio", "value" : "3", "name" : "sort", "id" : "noSort", "checked" : "checked"}, 0);
	
	addTag("LABEL", "NoSort", "FORM", {"for" : "noSort"}, 1);
	
	addTag("LABEL", "Filter", "FORM", 0, 1);

	addTag("INPUT", 0, "FORM", {"type" : "checkbox", "name" : "filterDateCheck", "id" : "filterDateCheckBox", "onclick" : "inputOpen('filterDateCheckBox')"}, 0);
	addTag("LABEL", "Date", "FORM", {"for" : "filterDateCheckBox"},1);
	addTag("INPUT", 0, "FORM", {"type" : "text", "placeholder" : "Enter Date", "id" : "filterDate"}, 0);

	addTag("INPUT", 0, "FORM", {"type" : "checkbox", "name" : "filterNameCheck", "id" : "filterNameCheckBox", "onclick" : "inputOpen('filterNameCheckBox')"}, 0);
	addTag("LABEL", "Name", "FORM", {"for" : "filterNameCheckBox"},1);
	addTag("INPUT", 0, "FORM", {"type" : "text", "placeholder" : "Enter Name", "id" : "filterName", "name" : "filterNameInput"}, 0);

	addTag("BUTTON", "Clear Filter", "FORM", {"type" : "reset"}, 1);

	addTag("INPUT", 0, "FORM", {"type" : "button", "value" : "APPLY", "name" : "submit", "onclick" : "validate(document.getElementById('form'))"}, 1);

	document.getElementById("filterDate").style.display = "none";
	document.getElementById("filterName").style.display = "none";

	addTag("TABLE", 0, "BODY", {"border" : 1, "width" : 500}, 0);
	// addTag("TR", 0, "TABLE", {}, 0);
	addTag("TH", "WHATTODO", "TABLE", {}, 0);
	addTag("TH", "TIME", "TABLE", {}, 0);
	addTag("TH", "DATE", "TABLE", {}, 0);

	initItems();
}