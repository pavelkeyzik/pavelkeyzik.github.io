document.createElement("HTML"); // Добавить тег html
document.createElement("HEAD"); // Добавить тег head
var body = document.createElement("BODY"); // Добавить тег body
var title = document.createElement("TITLE"); // Добавить тег title
var meta = document.createElement("META"); // Добавить тег meta
title.textContent = "Hello world!"; // В title запихнуть текст "Hello world!"
meta.setAttribute("charset", "UTF-8"); // Добавить тегу meta атрибут charset со значением UTF-8
document.head.appendChild(title); // Тег title запихнуть в head
document.head.appendChild(meta); // Тег meta запихнуть в head

// body.innerHTML = "HELLO WOROLD";
document.body.appendChild("P");

// var body = document.createElement("BODY");
// var p = document.createElement("P");
// p.textContent = "Hello world";
// document.body.style.backgroundColor = "red";
// document.body.appendChild(p);