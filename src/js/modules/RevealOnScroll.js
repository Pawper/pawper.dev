import throttle from 'lodash/throttle.js'
import debounce from 'lodash/debounce.js'

class RevealOnScroll {
    constructor(els, thresholdPercent) {
        this.thresholdPercent = thresholdPercent;
        this.itemsToReveal = els;
        this.browserHeight = window.innerHeight;
        this.initialize();
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
        this.events();
    }

    events() {
        window.addEventListener("scroll", this.scrollThrottle);
        window.addEventListener("resize", debounce(() => {
            this.browserHeight = window.innerHeight;
        }, 333));
    }

    calcCaller() {
        this.itemsToReveal.forEach(el => {
            if (el.isRevealed == false) {
                this.calculateIfScrolledTo(el);
            }
        });
    }

    calculateIfScrolledTo(el) {
        if (window.pageYOffset + this.browserHeight > el.offsetTop) {
            let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100;
            if (scrollPercent < this.thresholdPercent) {
                el.classList.add("reveal-item--is-visible");
                el.isRevealed = true;
                if (el.isLastItem) {
                    window.removeEventListener("scroll", this.scrollThrottle);
                }
            }
        }
    }

    initialize() {
        this.itemsToReveal.forEach(el => {
            if (window.pageYOffset + this.browserHeight < el.offsetTop) {
                el.classList.add("reveal-item");
                el.isRevealed = false;
            }
        });
        if (this.itemsToReveal.length) {
            this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
        }
    }
}

export default RevealOnScroll