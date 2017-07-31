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
var maxCountOfNewsOnPage = 3;

var currentPageOfMaterials = 0;
var countPagesOfMaterials = 0;
var maxCountOfMaterialsOnPage = 15;
// TODO: If count of pages in pagination too more then I will have horizontal scrollbar

var viewStyleImageOpened = false;

$(document).ready(function () {
    loadProjects();
    loadBestWorks();
    loadAdvantages();
    loadStylesMenu();
    loadStylesImages();
    loadCities();

    $(".spinner").hide();
    $("app").fadeIn(200);

    $(".pop-up-form .close").click(function () {
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
                            else if(category == 'materials') {
                                if(page == undefined) currentPageOfMaterials = 0;
                                else {
                                    currentPageOfMaterials = Number(page);
                                }
                                oldCategory = '';
                                if(data.materials.length > maxCountOfMaterialsOnPage) paginationShow = true;
                                countPagesOfMaterials = Math.ceil(data.materials.length / maxCountOfMaterialsOnPage);
                                newData = { "materials" : data.materials.splice(currentPageOfMaterials * maxCountOfMaterialsOnPage, maxCountOfMaterialsOnPage)};
                            }
                            else
                                newData = data;

                            var tmpl = _.template(html_file);
                            content.empty().append("<div class='close' onclick='closeContent()'>CLOSE</div>").append( tmpl(newData) ).slideDown(200);

                            if(paginationShow)
                                showPagination(category, currentPageOfNews);
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

function toExpand() {
    $(".full-article").animate({ height: "100%" }, 200);
    $(".full-article .buttons").css({ background: "none"});
}

function showPagination(category, page) {
    $.ajax({
        url: 'js/templates/pagination.html',
        type: 'GET',
        success: function (html_file) {
            if(!page) currentPageOfNews = 0;
                else currentPageOfNews = page;
            var tmpl = _.template(html_file);
            if(category == 'news')
            {
                var data = {
                    "currentPage" : currentPageOfNews,
                    "countOfPages" : countPagesOfNews,
                    "category": category
                };
            }
            else if(category == 'materials')
            {
                var data = {
                    "currentPage" : currentPageOfMaterials,
                    "countOfPages" : countPagesOfMaterials,
                    "category": category
                };
            }
            var element = "." + category + " .pagination";
            console.log(category);
            $(element).empty().append(tmpl({"data" : data }));
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
            $(".view-images-window .pagination div").click(function() {
                var element = $(this);
                if(element.attr("class") == undefined || element.attr("class") == "") {
                    element.attr({"class" : "current"});
                    element.siblings("[class]").attr( { "class": "" });
                }
            });
        }
    });
}

function viewStyle(array) {
    if(viewStyleImageOpened) {
        $(".styles .images a").animate({"width": "230px", "opacity" : "1", "display" : "flex"}, 300, function() {
            $(".styles .images a img").css({"filter" : "brightness(0.7)"});
        });
        viewStyleImageOpened = false;
    }
    else {
        var element = $(event.currentTarget);  
        $(".styles .images a").animate({"margin" : "0px"}, 100, function() {
            $(this).not(element).animate({"width": "0", "opacity" : "0"}, 300, function() {
                $(".styles .images a img").css({"filter" : "brightness(1)"});
            });
        });
        element.animate({"width" : "100%"}, 500);
        viewStyleImageOpened = true;
    }
}

function nextImage() {
    if(currentImage < images.images.length - 1) currentImage++;
    else currentImage = 0;

    $(".view-images-window .img").empty().append("<img src=" + images.images[currentImage] + ">");
    $(".view-images-window .pagination div").siblings("[class]").attr( { "class": "" });
    var el = ".view-images-window .pagination div:eq(" + currentImage + ")";
    $(el).attr({"class": "current"});
}

function prevImage() {
    if(currentImage > 0) currentImage--;
    else currentImage = images.images.length - 1;

    $(".view-images-window .img").empty().append("<img src=" + images.images[currentImage] + ">");
    $(".view-images-window .pagination div").siblings("[class]").attr( { "class": "" });
    var el = ".view-images-window .pagination div:eq(" + currentImage + ")";
    $(el).attr({"class": "current"});
}

function viewImage(page) {
    $(".view-images-window .img").empty().append("<img src=" + images.images[page] + ">");
    currentImage = page;
}

function closeWindow(window) {
    $(window).fadeOut(100);
    $(window).empty();
    currentImage = 0;
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
    viewStyleImageOpened = false;
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
                                element.children("img").replaceWith("<img src='img/icons/sub-closed.png' alt='▶'>");
                            }
                            else {
                                element.siblings("[class]").attr( { "class": "closed" }).children(".description").hide("fast");
                                element.siblings("[class]").attr( { "class": "closed" }).children("img").replaceWith("<img src='img/icons/sub-closed.png' alt='▶'>")
                                element.attr({"class" : "opened"});
                                element.children("img").replaceWith("<img src='img/icons/sub-opened.png' alt='▼'>");
                            }
                        });
                    });
                }
            })
        }
    });
}

function toggleMenu() {
    var state = $(".mobile ul").css("display");
    if($(".mobile ul").css("display") == "none") {
        $(".mobile ul").css({"display" : "flex"});
        $(".mobile ul").animate({"right" : "0"}, 200);
    }
    else {
        $(".mobile ul").animate({"right" : "-100%"}, 200, function() {
            $(".mobile ul").css({"display" : "none"});
        });
    }
}

function toOrder() {
    $.ajax({
        type: 'GET',
        url: 'js/templates/order-window.html',
        success: function (data) {
            $("body").append(data);
            $("#file-input").on('change', function() {
                var label = $("#file-input-label span");
                var countOfFiles = $(this).prop('files').length;
                label.empty();
                label.append('Кол-во: ' + countOfFiles);
            });
            $("#submitOrder").on('click', function() {
                validateForm();
            });
        }
    });
}

function validateForm() {
    var numberReg =  /^[0-9]+$/;
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    var email = $("#order-mail");
    var phone = $("#order-phone");
    var city = $("#order-city");
    var name = $("#order-name");
    var task = $("#order-task");

    var error = false;

    $("#errors").empty();

    if(task.val().length === 0) {
        $("#errors").append("<li>Поле с задачей не заполнено</li>");
        error = true;
    }

    if(name.val().length === 0) {
        $("#errors").append("<li>Поле ваше Имя не заполнено</li>");
        error = true;
    }

    if(phone.val().length === 0) {
        $("#errors").append("<li>Заполните поле телефон</li>");
        error = true;
    }
    else if(!numberReg.test( phone.val() ) )
    {
        $("#errors").append("<li>Поле телефон заполнено неверно</li>");
        error = true;
    }

    if(email.val().length === 0) {
        $("#errors").append("<li>Поле электронная почта не заполнено</li>");
        error = true;
    }
    else if(!emailReg.test( email.val() ) )
    {
        $("#errors").append("<li>Поле электронная почта заполнено неверно</li>");
        error = true;
    }

    if(city.val().length === 0) {
        $("#errors").append("<li>Поле ваш город не заполнено</li>");
        error = true;
    }

    if(error) {
        $("#errors").animate({opacity: 1});
    }
}