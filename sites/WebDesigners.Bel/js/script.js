$(document).ready(function () {
    $("footer menu li").click(function () {
        var element = $(this);
        $(this).children(".description").toggle("fast", function () {
            // TODO: Add rotate arrow
            if(element.attr("class") == "opened") {
                element.attr({"class" : "closed"});
            }
            else {
                element.siblings("[class]").attr( { "class": "closed" }).children(".description").hide("fast");
                element.attr({"class" : "opened"});
            }
        });
    });
})