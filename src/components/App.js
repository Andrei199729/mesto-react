import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";

import { useState } from 'react';
import ImagePopup from "./ImagePopup";
// При загрузке плавное открытие и закрытие

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isViewOpen, setViewOpen] = useState(null);
  const [selectedCard, setSelectedCard] = useState({});

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setViewOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setViewOpen(true);
  }

  return (
    <>
      <Header />
      <Main
        onEditProfile={() => setEditProfilePopupOpen(true)}
        onAddPlace={() => setAddPlacePopupOpen(true)}
        onEditAvatar={() => setEditAvatarPopupOpen(true)}
        onCardClick={(item) => handleCardClick(item)}
      />
      <Footer />
      {/* <!-- Modal edit--> */}
      <PopupWithForm
        title='Редактировать профиль'
        name='edit'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        btnText='Сохранить'
      >
        <div className="form__column">
          <input className="form__input form__input_type_name" id="name" type="text" name="nametype" placeholder="Введите ваше имя" minLength="2" maxLength="40" required />
          <span className="error" id="name-error"></span>
          <input className=" form__input form__input_type_job" type="text" id="job" name="job" placeholder="Введите вашу профессию" minLength="2" maxLength="200" required />
          <span className="error error_below" id="job-error"></span>
        </div>
      </PopupWithForm>
      {/* <!-- /Modal edit-->*/}

      {/* <!-- Modal add -->  */}
      <PopupWithForm
        title='Новое место'
        name='add'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        btnText='Создать'
      >
        <div className="form__column">
          <input className="form__input form__input_card_name" type="text" id="card" name="card" placeholder="Название" minLength="2" maxLength="30" required />
          <span className="error" id="card-error"></span>
          <input className="form__input form__input_link_picture" type="url" id="link" name="link" placeholder="Ссылка на картинку" required />
          <span className="error error_below" id="link-error"></span>
        </div>
      </PopupWithForm>
      {/* <!-- /Modal add -->*/}

      {/* <!-- Modal avatar --> */}
      <PopupWithForm
        title='Обновить аватар'
        name='avatar'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        btnText='Сохранить'>
        <div className="form__column">
          <input className="form__input form__input_link_avatar" type="url" id="avatar" name="avatar" placeholder="Ссылка на аватар" required />
          <span className="error error_below-avatar" id="avatar-error"></span>
        </div>
      </PopupWithForm>
      {/* <!-- /Modal avatar --> */}

      {/*<!-- Modal delete --> */}
      <PopupWithForm
        title='Вы уверены?'
        name='delete'
        btnText='Да' />
      {/* <!-- /Modal delete --> */}

      <ImagePopup
        card={selectedCard}
        view={isViewOpen}
        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;
