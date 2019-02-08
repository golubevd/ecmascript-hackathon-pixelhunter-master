import Application from '../application';
import ConfirmView from './modal-view';


class ModalPresenter {
    constructor() {
        this._modalPresenter = new ConfirmView();
        this._modalPresenter.onCancel = this.onCancel;
        this._modalPresenter.onConfirm = this.onConfirm;
    }

    get element() {
        return this._modalPresenter.element;
    }

    show() {
        document.body.appendChild(this.element);
    }



    onCancel(reslut) {
        this.element.remove();
    }

    onConfirm(result) {
        Application.showGreeting();
    }
}

export default ModalPresenter;
