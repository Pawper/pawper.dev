import throttle from 'lodash/throttle.js'

class FadingHeaderBackground {
    constructor() {
        this.siteHeaderBackground = document.querySelector(".header__background");
        this.scrollThrottle = throttle(this.flipOpacity, 200).bind(this);
        this.events();
    }

    events() {
        window.addEventListener("scroll", this.scrollThrottle);
    }

    flipOpacity() {
        if (window.scrollY === 0) {
            this.siteHeaderBackground.style.opacity = 0;
        } else {
            this.siteHeaderBackground.style.opacity = 1;
        }
    }
}

export default FadingHeaderBackground;