const component = {
    state: {
        productName: '',
        productPhot: '',
        reviewText: '',
        date: '',
        postStatus: '',
        photos: '',
        impression: '',
        conformity: '',
        reliability: '',
        templateIndex: '',
        modifiedStatus: '',
        modifiedDate: '',
        modifiedText: '',
        modifiedPhotos: '',
        modifiedPostStatus: '',
        modifiedTemplateIndex: null
    },

    setState(reviews, index) {
        let {
            productName,
            productPhoto,
            reviewText,
            date,
            postStatus,
            photos,
            impression,
            conformity,
            reliability,
            modifiedStatus,
            modifiedDate,
            modifiedText,
            modifiedPhotos,
            modifiedPostStatus,
        } = reviews
        this.state.productName = productName
        this.state.productPhoto = productPhoto
        this.state.reviewText = reviewText
        this.state.date = date
        this.state.postStatus = postStatus
        this.state.photos = photos
        this.state.templateIndex = index
        this.state.impression = impression
        this.state.conformity = conformity
        this.state.reliability = reliability
        this.state.modifiedStatus = modifiedStatus
        this.state.modifiedDate = modifiedDate
        this.state.modifiedText = modifiedText
        this.state.modifiedPhotos = modifiedPhotos
        this.state.modifiedPostStatus = modifiedPostStatus
        this.state.modifiedTemplateIndex = index + 'm'
    },

    reviewBlockInit(reviews, templateIndex) {
        this.setState(reviews, templateIndex)
        if (this.state.modifiedStatus) {
            modifiedTableWrapClass = 'table-item__wrap--modified'
            modifiedBlock = 'modifiedBlock'
        }

        return `    <div class="table-item">
                    <div class="table-item__wrap ${modifiedTableWrapClass}">
                        <img class="product-photo" src="${this.state.productPhoto}"alt="фото товара">
                        <span class="product-name">${this.state.productName}</span>
                        <div class="review__wrap">
                            ${this.scoreBlockInit(this.state.postStatus, this.state.impression, this.state.conformity, this.state.reliability)}
                            <div class="review__body ${this.reviewBodyClassInit(this.state.postStatus)} ">
                                <h3 class="review__title ${this.textTitleClassInit(this.state.postStatus)}">${this.textTitleValueInit(this.state.postStatus)}</h3>
                                ${this.textBlockInit(this.state.reviewText, this.state.templateIndex)}
                                <div class="review__imgs">
                                    ${this.photosInit(this.state.photos)}
                                </div>
                            </div>
                        </div>
                        <div class="review-state">
                            <span class="review-state__status ${this.statusClassInit(this.state.postStatus)}">${this.statusValueInit(this.state.postStatus)}</span>
                            <span class="review-state__date">${this.state.date}</span>
                        </div>
                        ${this.actionBlockInit(this.state.postStatus)}
                        ${this.modifiedBlockInit(this.state.modifiedStatus, this.state.postStatus)}
                    </div>
                </div>`
    },

    modifiedBlockInit(modifiedStatus, postStatus) {
        if (modifiedStatus === true && postStatus !== 'notposted') {
            return `    <div class="review__wrap--modified">
                            <h3 class="review__title review__title--mobile-width${this.textTitleClassInit(this.state.modifiedPostStatus)}">${this.textTitleValueInit(this.state.modifiedPostStatus, modifiedStatus)}</h3>
                            <div class="review__body review__body--modified ${this.reviewBodyClassInit(this.state.modifiedPostStatus)}">
                                <h3 class="review__title review__title--modified ${this.textTitleClassInit(this.state.modifiedPostStatus)}">${this.textTitleValueInit(this.state.modifiedPostStatus, modifiedStatus)}</h3>
                                ${this.textBlockInit(this.state.modifiedText, this.state.modifiedTemplateIndex, true)}
                                <div class="review__imgs">
                                ${this.photosInit(this.state.modifiedPhotos)}
                                </div>
                            </div>
                            <div class="review-state review-state--modified">
                                <span class="review-state__status ${this.statusClassInit(this.state.modifiedPostStatus)}">${this.statusValueInit(this.state.modifiedPostStatus)}</span>
                                <span class="review-state__date">${this.state.modifiedDate}</span>
                            </div>
                        </div>`
        }
        return ''

    },
    photosInit(photoArray) {
        let photos = ''
        photoArray.map(photo => {
            photos += `<a href="#" data-src="${photo}" class="review__img-wrap">
                            <img class="review__img" src="${photo}" alt="img">
                        </a>`
        })
        return photos
    },
    statusClassInit(postStatus) {
        switch (postStatus) {
            case 'moderating': return 'review-state__status--moderating'
            case 'posted': return 'review-state__status--posted'
            case 'notposted': return 'review-state__status--notposted'
            default: return ''
        }
    },
    statusValueInit(postStatus) {
        switch (postStatus) {
            case 'moderating': return 'на модерации'
            case 'posted': return 'опубликован'
            case 'notposted': return 'не опубликован'
            default: return ''
        }
    },
    actionBlockInit(postStatus) {
        if (postStatus === 'notposted') {
            return ''
        }
        if (postStatus === 'posted' || 'moderating') {
            return `<div class="review-action">
                        <span class="review-action__button">Дополнить отзыв</span>
                    </div>`
        }

    },
    textTitleClassInit(postStatus) {
        if (postStatus === 'notposted') {
            return `review__title--notposted`
        }
        return ''
    },
    textTitleValueInit(postStatus, modifiedStatus) {
        if (postStatus === 'notposted') {
            return 'К сожалению, ваш отзыв не прошёл модерацию.'
        }
        if (postStatus === 'posted' || 'moderating') {
            if (modifiedStatus) {
                return 'Дополненный отзыв'
            }
            return 'Отзыв'
        }

    },
    reviewBodyClassInit(postStatus) {
        if (postStatus === 'notposted') {
            return 'review__body--notposted'
        }
        return ''
    },
    scoreBlockInit(postStatus, impression, conformity, reliability) {
        let score = +((impression + conformity + reliability) / 3).toFixed(1)
        let scoreValue = +((impression + conformity + reliability) / 3).toFixed(1)

        if ((score ^ 0) === score) {
            score = score + '.0'
        } else { score = +score.toFixed(1) }

        let starsFillInit = (score) => {
            let intPart = Math.floor(score),
                floatPart = Math.round((score - intPart) * 10),
                starsBlock = ''
            for (let i = 0; i < 5; i++) {
                if (intPart > i) {
                    starsBlock += `<img src="./img/common/rating_star100.svg" alt="star">`
                }
                if (intPart === i) {
                    if (floatPart === 0) starsBlock += `<img src="./img/common/rating_star0.svg" alt="star">`
                    if (0 < floatPart && floatPart <= 3) starsBlock += `<img src="./img/common/rating_star025.svg" alt="star">`
                    if (4 <= floatPart && floatPart <= 6) starsBlock += `<img src="./img/common/rating_star050.svg" alt="star">`
                    if (7 <= floatPart && floatPart <= 9) starsBlock += `<img src="./img/common/rating_star075.svg" alt="star">`
                }
                if (intPart < i) {
                    for (let j = i + 1; j <= 5; j++) {
                        starsBlock += `<img src="./img/common/rating_star0.svg" alt="star">`
                    }
                    break
                }
            }
            return starsBlock
        }
        if (postStatus !== 'notposted') {
            return `<div class="review__score">
                        <div class="review__rating">
                            ${starsFillInit(scoreValue)}
                            <span>${score}</span>
                        </div>
                        <span class="review__impression">Впечатление: ${impression}</span>
                            <span class="review__conformity">Соответствие: ${conformity}</span>
                        <span class="review__reliability">Надежность: ${reliability}</span>
                    </div>`
        }
        return ''
    },

    textBlockInit(text, templateIndex) {
        let collapsedText = text.slice(0, 195).trim()
        if (text.length > 195) {
            return `
                    <div class="review__text" id="review__text--${templateIndex}"><p>${collapsedText}...</p><p>${text}</p></div>
                    <div class="review__collapse-button" >
                        <span id="collapse-button--${templateIndex}">подробнее</span>
                        <img class="arrow" id="arrow--${templateIndex}" src="./img/common/arrow.svg" alt="arrow">
                    </div>`
        }
        return `<div class="review__text" id="review__text--${templateIndex}"><p>${text}</p></div>`
    },
}
