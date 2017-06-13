var oldCategory;

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
    $(".pop-up-form .close, .pop-up-bg").click(function () {
        $(".pop-up-form").animate({"top": "-100vh"}, 300, function() { // .pop-up-form
            $(".pop-up-bg").animate({"opacity" : 0}, 100, function() { // .pop-up-bg
                $(".pop-up-bg").css({"display" : "none"}); // .pop-up-bg
                $(".pop-up-form").css({"top" : "100vh"}); // .pop-up-form
            });
        })
    });
    $(".projects .add").click(function () {
        $()
    });
})

function togglePopUp(windowName) {
    $(windowName).parent().css({"display" : "flex"});
    $(windowName).parent().animate({"opacity" : 1}, 100, function () {
        $(windowName).animate({"top": 0}, 300);
    });
}

function loadData(category) {
    if(oldCategory != category) {
        oldCategory = category;
        var content = $(".advantages .wrap .content");

        content.slideUp(200, function () {
            $.ajax({
                type: 'GET',
                url: 'js/templates/' + category + '.html',
                success: function (html_file) {
                    $.ajax({
                        type: 'GET',
                        url: 'js/api/' + category + '.json',
                        dataType: 'json',
                        timeout: 10000,
                        beforeSend: function () {
                            content.empty().append("ЗАГРУЗКА....");
                        },
                        success: function (data) {
                            var tmpl = _.template(html_file);
                            content.empty().append( tmpl(data) ).slideDown(200);
                        },
                        error: function () {
                            var tmpl = _.template(html_file);
                            content.empty().append( tmpl ).slideDown(200);
                        }
                    });
                }
            });
        });
    }
}

function viewArticle(articleId) {
    // FIXME Change OldCategory
    var content = $(".advantages .wrap .content");

    content.slideUp(200, function () {
        $.ajax({
            type: 'GET',
            url: 'js/api/articles.json',
            success: function (data) {
                $.ajax({
                    type: 'GET',
                    url: 'js/templates/article.html',
                    success: function (html_file) {
                        // alert(JSON.stringify(data[articleId].title));
                        var tmpl = _.template(html_file);
                        content.empty().append(tmpl(data[articleId])).slideDown(200);
                    }
                });
            }
        });
    });
}