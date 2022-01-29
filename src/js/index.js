import '../sass/main.scss'
import FadingHeaderBackground from './modules/FadingHeaderBackground.js';
import RevealOnScroll from './modules/RevealOnScroll.js'
import OpenDialogs from './modules/Dialogs.js'

new FadingHeaderBackground();
new RevealOnScroll(document.querySelectorAll(".project"), 80);
new OpenDialogs(document.querySelectorAll(".info"));

if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
        module.hot.accept();
    }
}