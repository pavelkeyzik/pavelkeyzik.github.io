function openAndCloseBox(id) {
	display = document.getElementById(id).style.display;
	document.getElementById(id).style.display = (display == "flex") ? "none" : "flex";
}
function openAndCloseSelect(id) {
	display = document.getElementById(id).style.display;
	document.getElementById(id).style.display = (display == "block") ? "none" : "block";
}

function clickOnTab(tabName) {
	var tab = document.getElementById(tabName);
	if(tab.getAttribute("class") == "none")
	{
		tab.setAttribute("class", "display");
	}
	if(tabName == "formForTabRight")
	{
		var x = document.getElementById("formForTabLeft");
		x.setAttribute("class", "none");
		var tabLeft = document.getElementById("tabLeft");
		tabLeft.setAttribute("class", "tabNotActive");
		var tabRight = document.getElementById("tabRight");
		tabRight.setAttribute("class", "tabActive");
	}
	else
	{
		var x = document.getElementById("formForTabRight");
		x.setAttribute("class", "none");
		var tabLeft = document.getElementById("tabLeft");
		tabLeft.setAttribute("class", "tabActive");
		var tabRight = document.getElementById("tabRight");
		tabRight.setAttribute("class", "tabNotActive");
	}
}