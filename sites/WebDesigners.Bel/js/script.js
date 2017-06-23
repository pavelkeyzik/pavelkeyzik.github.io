var oldCategory;
var images = [];
var currentImage = 0;

var currentPageOfProjects = 0;
var countPagesOfProjects = 0;

var currentPageOfWorks = 0;
var countPagesOfWorks = 0;

var currentPageOfAdvantages = 0;
var countPagesOfAdvantages = 0;

var currentPageOfNews = 0;
var countPagesOfNews = 0;
var maxCountOfNewsOnPage = 2;

$(document).ready(function () {
    loadProjects();
    loadBestWorks();
    loadAdvantages();
    loadStylesMenu();
    loadStylesImages();
    loadCities();

    $(".spinner").hide();
    $("app").fadeIn(200);

    $(".pop-up-form .close, .pop-up-bg").click(function () {
        $(".pop-up-form").animate({"top": "-100vh"}, 300, function() {
            $(".pop-up-bg").animate({"opacity" : 0}, 100, function() {
                $(".pop-up-bg").css({"display" : "none"});
                $(".pop-up-form").css({"top" : "100vh"});
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
function loadData(category, page) {
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
                        success: function (data) {

                            var newData, paginationShow;

                            if(category == 'news') {
                                if(page == undefined) currentPageOfNews = 0;
                                else {
                                    currentPageOfNews = Number(page);
                                }
                                oldCategory = '';

                                if(data.news.length > maxCountOfNewsOnPage) paginationShow = true;
                                countPagesOfNews = Math.ceil(data.news.length / maxCountOfNewsOnPage);
                                newData = { "articles" : data.news.splice(currentPageOfNews * maxCountOfNewsOnPage, maxCountOfNewsOnPage)};
                            }
                            else
                                newData = data;

                            var tmpl = _.template(html_file);
                            content.empty().append("<div class='close' onclick='closeContent()'>CLOSE</div>").append( tmpl(newData) ).slideDown(200);

                            if(paginationShow)
                                showPagination(currentPageOfNews);
                        }
                    });
                }
            });
        });
    }
}

function viewArticle(articleId) {
    // FIXME Change OldCategory
    oldCategory = '';
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
                        var tmpl = _.template(html_file);
                        var newObject = data[articleId];

                        newObject['currentPageOfNews'] = currentPageOfNews;

                        content.empty().append(tmpl(newObject)).slideDown(200);
                    }
                });
            }
        });
    });
}

function showPagination(page) {
    $.ajax({
        url: 'js/templates/pagination.html',
        type: 'GET',
        success: function (html_file) {
            if(!page) currentPageOfNews = 0;
                else currentPageOfNews = page;
            var tmpl = _.template(html_file);
            var data = {
                "currentPage" : currentPageOfNews,
                "countOfPages" : countPagesOfNews
            };
            $(".news .pagination").empty().append(tmpl({"data" : data }));
        }
    });
}

function loadProjects() {
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

function closeContent() {
    $(".advantages .content").slideUp(function () {
      $(this).empty();
    });
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

// FIXME: Refactor code with repeated functions
function loadBestWorks() {
    $.ajax({
        type: 'GET',
        url: 'js/templates/best-works.html',
        success: function(html_file) {
            $.ajax({
                type: 'GET',
                url: 'js/api/best-works.json',
                success: function (data) {
                    var newData = data.bestWorks.slice(currentPageOfWorks, currentPageOfWorks + 1);
                    countPagesOfWorks = data.bestWorks.length;
                    var tmpl = _.template(html_file);
                    $(".best-works .wrap").empty().append(tmpl({"data" : newData[0] })).hide().fadeIn();
                }
            });
        }
    });
}

function nextWorkPage() {
    if(currentPageOfWorks == countPagesOfWorks - 1 ) currentPageOfWorks = 0;
    else currentPageOfWorks++;

    loadBestWorks();
}

function prevWorkPage() {
    if(currentPageOfWorks == 0 ) currentPageOfWorks = countPagesOfWorks - 1;
    else currentPageOfWorks--;

    loadBestWorks(currentPageOfWorks);
}

function freeConsult() {
    $.ajax({
        type: 'GET',
        url: 'js/templates/free-consultation.html',
        success: function (data) {
            $("body").append(data);
        }
    });
}

function loadStylesMenu() {
    $.ajax({
        type: 'GET',
        url: 'js/templates/styles-menu.html',
        success: function (html_file) {
            $.ajax({
                type: 'GET',
                url: 'js/api/styles.json',
                success: function (data) {
                    var tmpl = _.template(html_file);
                    $(".styles .left-side menu").empty().append(tmpl({"stylesItems" : data })).hide().fadeIn();
                    $(".styles .left-side menu li:first-child").addClass("current");
                    $(".styles .left-side menu li").click(function () {
                        $(this).siblings("[class]").removeClass("current");
                        $(this).addClass("current");
                    });
                }
            });
        }
    });
}

function loadStylesImages(section) {
    $.ajax({
        type: 'GET',
        url: 'js/templates/styles-images.html',
        success: function (html_file) {
            $.ajax({
                type: 'GET',
                url: 'js/api/styles.json',
                success: function (data) {
                    var tmpl = _.template(html_file);
                    if(!section) section = Object.keys(data)[0];

                    $(".styles .right-side").empty().append(tmpl({"images" : data[section] })).hide().fadeIn();
                }
            });
        }
    })
}

function loadAdvantages() {
    $.ajax({
        type: 'GET',
        url: 'js/api/advantages.json',
        success: function (data) {
            $.ajax({
                type: 'GET',
                url: 'js/templates/advantages.html',
                success: function (html_file) {
                    var tmpl = _.template(html_file);
                    var newData = data.advantages.slice(currentPageOfAdvantages * 7, currentPageOfAdvantages * 7 + 7);
                    countPagesOfAdvantages = Math.ceil(data.advantages.length / 7);
                    $(".advantages .grid").remove();
                    $(".advantages .line").after(tmpl({ "advantages" : newData}));
                }
            });
        }
    });
}

function nextAdvantagePage() {
    if(currentPageOfAdvantages == countPagesOfAdvantages - 1 ) currentPageOfAdvantages = 0;
    else currentPageOfAdvantages++;

    loadAdvantages();
}

function prevAdvantagePage() {
    if(currentPageOfAdvantages == 0 ) currentPageOfAdvantages = countPagesOfAdvantages - 1;
    else currentPageOfAdvantages--;

    loadAdvantages();
}

function loadCities() {
    $.ajax({
        type: 'GET',
        url: 'js/api/cities.json',
        success: function (data) {
            $.ajax({
                type: 'GET',
                url: 'js/templates/cities.html',
                success: function (html_file) {
                    var tmpl = _.template(html_file);
                    $("footer .right-side").prepend(tmpl(data));

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
                }
            })
        }
    });
}