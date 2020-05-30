$(function () {
    let templateIndex = []
    let scrollPosition = null
    $('.table-body').html(
        store.getReviews().map((reviews, index) => {
            templateIndex.push(index)
            return component.reviewBlockInit(reviews, index)
        })
    )

    templateIndex.map(index => {
        $(`#collapse-button--${index}, #arrow--${index}`).click((e) => {
            $(`#review__text--${index}`).toggleClass('review__text--full')
            $(`#arrow--${index}`).toggleClass('arrow--active')
        })

        $(`#collapse-button--${index}m, #arrow--${index}m`).click((e) => {
            $(`#review__text--${index}m`).toggleClass('review__text--full')
            $(`#arrow--${index}m`).toggleClass('arrow--active')
        })
    })

    $(`.review__img-wrap`).click((e) => {
        $('.modal__photo').attr({ "src": `${e.currentTarget.dataset.src}` })
        $('.modal').toggleClass('modal--show')
        $('body').css({ "overflow": "hidden" })
        scrollPosition = $(window).scrollTop();
    })

    $('.close-button').click((e) => {
        $('.modal').removeClass('modal--show')
        $('body').css({ "overflow": "visible" })
        $(window).scrollTop(scrollPosition)
    })

})






