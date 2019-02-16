import AbstractView from '../view';

export default class ConfirmGame extends AbstractView {
    constructor() {
        super();

        this._onConfirmFormClickHandler = this._onConfirmFormClickHandler.bind(this);
        this._onCancelConfirmClickHandler = this._onCancelConfirmClickHandler.bind(this);
        this._onCloseBtnClickHandler = this._onCloseBtnClickHandler.bind(this);
    }

    get template() {
        return `\

    <form class="modal__inner">
      <button class="modal__close" type="button">
        <span class="visually-hidden">Закрыть</span>
      </button>
      <h2 class="modal__title">Подтверждение</h2>
      <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
      <div class="modal__button-wrapper">
        <button class="modal__btn confirm__button--ok">Ок</button>
        <button class="modal__btn confirm__button--cancel">Отмена</button>
      </div>
    </form>`;
    }


    _onConfirmFormClickHandler(evt){
        evt.preventDefault();
        this.onConfirm(evt.target.classList.contains(`confirm__button--ok`));
    }

    _onCancelConfirmClickHandler(evt) {
        evt.preventDefault();
        this.onCancel(evt.target.classList.contains(`confirm__button--cancel`));
    }

    _onCloseBtnClickHandler(evt){
       evt.preventDefault();
        this.onCancel(evt.target.classList.contains(`modal__close`));
    }

    remove() {
        this._confirmForm.removeEventListener(`click`, this._onConfirmFormClickHandler);
        this._confirmForm.removeEventListener(`click`, this._onCancelConfirmClickHandler);
        this._closeBtn.removeEventListener(`click`, this._onCloseBtnClickHandler);
        super.remove();
    }

    bind() {
        this._confirmForm = this.element.querySelector(`.modal__button-wrapper`);
        this._closeBtn = this.element.querySelector(`.modal__inner`);

        this._confirmForm.addEventListener(`click`, this._onConfirmFormClickHandler);
        this._confirmForm.addEventListener(`click`, this._onCancelConfirmClickHandler);
        this._closeBtn.addEventListener(`click`, this._onCloseBtnClickHandler);
    }

    onConfirm(result) {}

    onCancel(result){}

    onCloseBtnClick(result){}

}
