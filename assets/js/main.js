// Load Header và Footer
$(document).ready(function () {
    $("#menu__header").load("/pages/header.html");
    $("#footer").load("/pages/footer.html");
});

// Xử lý Right Sidebar PC and Menu Tablet & Mobile
$(document).on('click', '.js-header__icon-bars', function (e) {
    e.preventDefault();
    let widthScreen = window.innerWidth;
    if (widthScreen < 1024) {
        $('.menu__tablet-mobile').addClass('show');
    } else {
        $('.right__sidebar').addClass('show');
    }
})

$(document).on('click', '.js-tablet-mobile__icon-close', function () {
    $('.menu__tablet-mobile').removeClass('show');
})

$(document).on('click', '.js-right-sidebar__icon-close', function () {
    $('.right__sidebar').removeClass('show');
})

// Xử lý input[type = range] ở trang search.html
$(document).on('change', '.js-search-form__price-range', function () {
    let valRange = $('input[type=range]').val();
    $('.js-search-form__price-current').html(valRange);
})

// Xử lý hiển thị danh sách dạng list hay grid ở trang search.html
$(document).on('click', '.js-filters__display', function () {
    let widthScreen = window.innerWidth;
    switch ($(this).data("display")) {
        case "list":
            if (widthScreen > 1024) {
                let elementSiblings = $(this).siblings('.filters-display__icon--active');
                elementSiblings.removeClass('filters-display__icon--active');
                $(this).addClass('filters-display__icon--active');
                $(".search-display__grid").removeClass("search__list--show");
                $(".travel__list--display-list").addClass("search__list--show");
            }
            break;
        case "grid":
            let elementSiblings = $(this).siblings('.filters-display__icon--active');
            elementSiblings.removeClass('filters-display__icon--active');
            $(this).addClass('filters-display__icon--active');
            $(".travel__list--display-list").removeClass("search__list--show");
            $(".search-display__grid").addClass("search__list--show");
            break;
    }

})

// Xử lý Collapse trang travel-detail.html
$(document).on('click', '.js-travel-detail__program-collapse', function () {
    let parent = $(this).parent();
    let travelDetailItem = parent.parent();
    let collapse = parent.children('.js-travel-detail__program-collapse');
    let travelDetailAside = travelDetailItem.children('.travel-detail__program-aside');
    if (travelDetailAside.length > 0 && collapse.hasClass('travel-detail__program-collapse--hide')) {
        travelDetailAside.toggle('slow');
        collapse.removeClass('travel-detail__program-collapse--hide');
        collapse.addClass('travel-detail__program-collapse--show');
    }
    else {
        travelDetailAside.toggle('slow');
        collapse.removeClass('travel-detail__program-collapse--show');
        collapse.addClass('travel-detail__program-collapse--hide');
    }
})

//Xử lý Form submit ở trang travel-detail.html
$(document).on('click', '.js-travel-detail__form-btn', function () {
    $('#travelDetailForm').validate({
        rules: {
            'surname': {
                required: true,
            },
            'name': {
                required: true,
            },
            'phone': {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 10,
            },
            'email': {
                email: true,
            }
        },
        messages: {
            'surname': {
                required: 'Vui lòng nhập Họ của bạn'
            },
            'name': {
                required: 'Vui lòng nhập Tên của bạn'
            },
            'phone': {
                required: 'Vui lòng nhập số điện thoại',
                digits: "Vui lòng chỉ nhập số",
                minlength: 'Số điện thoại không hợp lệ',
                maxlength: 'Số điện thoại không hợp lệ',
            },
            'email': {
                email: 'Vui lòng nhập địa chỉ email hợp lệ',
            }
        }
    })
})

//Hàm CountDown ở trang index.html
function countDown(times) {
    let currentDate = new Date().getTime();
    let secondsLeft = (times - currentDate) / 1000;
    let days, hours, minutes, seconds;

    days = checkCountDown(Math.floor(secondsLeft / (24 * 60 * 60)));
    secondsLeft = secondsLeft % (24 * 60 * 60);

    hours = checkCountDown(Math.floor(secondsLeft / (60 * 60)));
    secondsLeft = secondsLeft % (60 * 60);

    minutes = checkCountDown(Math.floor(secondsLeft / 60));
    seconds = checkCountDown(Math.floor(secondsLeft % 60));

    // console.log(days, hours, minutes, seconds);
    $('.js-days__count-down').text(days);
    $('.js-hours__count-down').text(hours);
    $('.js-minutes__count-down').text(minutes);
    $('.js-seconds__count-down').text(seconds);

}

function checkCountDown(val) {
    return (val < 10 ? '0' : '') + val;
}

var targetDate = new Date().getTime() + (48 * 60 * 60 * 1000);  // 1s = 1000ms
setInterval(function () {
    countDown(targetDate)
}, 1000);
