import '../sass/main.scss'
import FadingHeaderBackground from './modules/FadingHeaderBackground.js';
import RevealOnScroll from './modules/RevealOnScroll.js'

new FadingHeaderBackground();
new RevealOnScroll(document.querySelectorAll(".project"), 80);

if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
        module.hot.accept();
    }
}