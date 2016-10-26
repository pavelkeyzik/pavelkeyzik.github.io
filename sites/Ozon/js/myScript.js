function openAndCloseBox(id) {
	display = document.getElementById(id).style.display;
	document.getElementById(id).style.display = (display == "flex") ? "none" : "flex";
}
function openAndCloseSelect(id) {
	display = document.getElementById(id).style.display;
	document.getElementById(id).style.display = (display == "block") ? "none" : "block";
}

// Хотел сделать табы вверху, но не успел. Код снизу фигня, но я JS ещё даже не изучал

// function openTab(id) {
// 	display = document.getElementById(id).style.display;
// 	if(display == "none")
// 	{
// 		document.getElementById(id).style.display = "block";
// 		if(id == "formForTabRight")
// 		{
// 			document.getElementById("formForTabLeft").style.display = "none"; 
// 		}
// 		else
// 		{
// 			document.getElementById("formForTabRight").style.display = "none"; 
// 		}
// 	}
// }