var oldCategory;
var images = [];
var currentImage = 0;
var currentPageOfProjects = 0;
var countPagesOfProjects = 0;

$(document).ready(function () {
    loadProjects();

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
});

function togglePopUp(windowName) {
    $(windowName).parent().css({"display" : "flex"});
    $(windowName).parent().animate({"opacity" : 1}, 100, function () {
        $(windowName).animate({"top": 0}, 300);
    });
}

// FIXME: RemoveMe and change all popUp windows to AJAX requests
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

function loadProjects(page) {
    $.ajax({
        type: 'GET',
        url: 'js/templates/projects.html',
        success: function(html_file) {
            $.ajax({
                type: 'GET',
                url: 'js/api/projects.json',
                success: function (data) {
                    var newData = data.projects.slice(currentPageOfProjects*9, currentPageOfProjects*9+9);
                    countPagesOfProjects = Math.ceil(data.projects.length / 9);
                    $(".projects .col-1").hide(function () {
                      $(this).remove();
                    });
                    var tmpl = _.template(html_file);
                    $(".projects .col-2").after(tmpl({"data" : newData}));
                    $(".projects .col-1").hide().fadeIn(500);
                }
            });
        }
    });
}

function viewImages(array) {
    $.ajax({
        type: 'GET',
        url: 'js/templates/view-images-window.html',
        success: function (html_file) {
            var tmpl = _.template(html_file);
            images = JSON.parse(array);
            $("body").append(tmpl(JSON.parse(array)));
            currentImage = 0;
        }
    });
}

function nextImage() {
    if(currentImage < images.images.length - 1) currentImage++;
    else currentImage = 0;

    $(".view-images-window .img").empty().append("<img src=" + images.images[currentImage] + ">");
}

function prevImage() {
    if(currentImage > 0) currentImage--;
    else currentImage = images.images.length - 1;

    $(".view-images-window .img").empty().append("<img src=" + images.images[currentImage] + ">");
}

function closeWindow(window) {
    $(window).fadeOut(100);
}

function nextProjectPage() {
    if(currentPageOfProjects == countPagesOfProjects - 1 ) currentPageOfProjects = 0;
    else currentPageOfProjects++;

    loadProjects(currentPageOfProjects);
}

function prevProjectPage() {
    if(currentPageOfProjects == 0 ) currentPageOfProjects = countPagesOfProjects - 1;
    else currentPageOfProjects--;

    loadProjects(currentPageOfProjects);
}