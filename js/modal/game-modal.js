import AbstractView from '../view';

export default class ConfirmGame extends AbstractView {
    constructor() {
        super();

        this._onconfirmFormClickHandler = this._onconfirmFormClickHandler.bind(this);
    }

    get template() {
        return `\
    <div class="modal modal--hidden">
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
    </form>
  </div>`;
    }


    _onconfirmFormClickHandler(evt){
        evt.preventDefault();
        this.onConfirm(evt.target.classList.contains(`confirm__button--ok`));
    }

    remove() {
        this._confirmForm.removeEventListener(`click`, this._onconfirmFormClickHandler);
        super.remoe();
    }

    bind() {
        this._confirmForm = this.element.querySelector(`.modal__inner`);

        this._confirmForm.addEventListener(`click`, this._onconfirmFormClickHandler);
    }

    onConfirm(result) {

    }
}
