import "wicg-inert";

class OpenDialogs {
    constructor(dialogs) {
        this.dialogs = dialogs;
        this.setDialogs();
    }

    setDialogs() {
        this.dialogs.forEach(dialog => new this.Dialog(dialog));
    }

    Dialog = class {
        constructor(dialog) {
            this.dialog = dialog;
            this.dialogId = this.dialog.id;
            this.dialogMask = document.querySelector('.modal-backdrop');
            this.dialogWindow = dialog.querySelector('.dialog__window');
            this.openButton = document.getElementById(`${this.dialogId}-open`);
            this.imageOpen = document.getElementById(`${this.dialogId}-image`);
            this.closeButton = dialog.querySelector('.dialog__close');
            this.scrollbarWidth = '';
            this.getScrollbarWidth();
            this.adjustBackground();
            this.events();
        }

        events() {
            this.openButton.addEventListener('click', () => this.openDialog());
            this.imageOpen.addEventListener('click', () => this.openDialog());
            document.addEventListener('keydown', event => this.checkCloseKey(event));
            this.dialogMask.addEventListener('click', () => this.closeDialog());
            this.closeButton.addEventListener('click', () => this.closeDialog());
        }

        getScrollbarWidth() {
            let scrollDiv = document.createElement("div");
            scrollDiv.className = "scrollbar-measure";
            document.body.appendChild(scrollDiv);
            this.scrollbarWidth = (window.innerWidth - document.body.clientWidth) + 'px';
            document.body.removeChild(scrollDiv);
        }

        adjustBackground() {
            document.querySelector('.bg').style = `background-size: clamp(1000px, calc(100vw + ${this.scrollbarWidth}), calc(100% + ${this.scrollbarWidth})) 100vh;`
        }

        openDialog() {
            this.makePageInert();
            this.getScrollbarWidth();
            document.body.style = `overflow-y:hidden; position: relative; padding-right: ${this.scrollbarWidth};`;
            document.querySelector('.bg').style = `background-size: clamp(1000px, 100vw, 100%) 100vh;`
            this.dialogMask.classList.add('active');
            this.dialog.classList.add('opened');
            this.closeButton.focus();
        }

        makePageInert() {
            Array.from(document.body.children).forEach(child => {
                if (child !== this.dialog && child !== this.dialogMask) {
                     child.inert = true;
                }
            });
        }

        removePageInert() {
            Array.from(document.body.children).forEach(child => {
                if (child !== this.dialog) {
                     child.inert = false;
                }
            });
        }

        checkCloseKey(event) {
            if (event.code === "Escape") {
                this.closeDialog();
            }
        }

        closeDialog() {
            if (this.dialog.classList.contains('opened')) {
                this.dialog.classList.remove('opened');
                this.dialogMask.classList.remove('active');
                this.removePageInert();
                document.body.style = "overflow-y:visible; position: static; padding-right: 0;";
                document.querySelector('.bg').style = `background-size: clamp(1000px, calc(100vw + ${this.scrollbarWidth}), calc(100% + ${this.scrollbarWidth})) 100vh;`
                this.openButton.focus();
            }
        }
    }

}

export default OpenDialogs