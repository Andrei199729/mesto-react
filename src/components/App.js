import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from '../context/CurrentUserContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isViewOpen, setViewOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getAboutUser(), api.getInitialCards()])
      .then(([user, card]) => {
        setCurrentUser(user);
        setCards(card);
      })
      .catch(err => console.log(err))
  }, []);

  function handleCardLike(card) {

    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => setCards(cards.filter((c) => c._id !== card._id)))
      .catch(err => console.log(err))
  }

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

  function handleUpdateUser(user) {
    api.editProfile(user)
      .then(user => setCurrentUser(user), closeAllPopups())
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar)
      .then(item => setCurrentUser(item), closeAllPopups())
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard)
      .then(card => setCards([card, ...cards]), closeAllPopups())
      .catch(err => console.log(err))
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={() => setEditProfilePopupOpen(true)}
        onAddPlace={() => setAddPlacePopupOpen(true)}
        onEditAvatar={() => setEditAvatarPopupOpen(true)}
          onCardClick={(item) => handleCardClick(item)}
          cards={cards}
          onCardLike={(card) => handleCardLike(card)}
          onCardDelete={(card) => handleCardDelete(card)}
      />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={(user) => handleUpdateUser(user)} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={(avatar) => handleUpdateAvatar(avatar)} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={(newCard) => handleAddPlaceSubmit(newCard)} />
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
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
