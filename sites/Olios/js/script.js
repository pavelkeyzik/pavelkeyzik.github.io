$(document).ready(function() {
    $(".hamburger").on('click', function() {
        // TODO: скрытие блок по клику вне меню
        var menu = $(".right-menu ul");
        if(menu.css("right") == "-374px")
        {
            menu.animate({"right" : 0}, 200);
            $(".hamburger img").attr("src", "img/icons/circle.png");
        }
        else
        {
            $(".hamburger img").attr("src", "img/icons/1.png");
            menu.animate({"right" : "-374px"}, 200);
        }
    });
});
