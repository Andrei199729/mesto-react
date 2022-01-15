import React from "react";
import { useState } from "react";
import Card from "./Card";
import api from "../utils/api";

function Main(props) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    Promise.all([api.getAboutUser(), api.getInitialCards()])
        .then(([user, card]) => {
            setUserName(user.name);
            setUserDescription(user.about);
            setUserAvatar(user.avatar);
            const filterCards = card.map(item => {
                return {
                    _id: item._id,
                    link: item.link,
                    name: item.name,
                    likes: item.likes
                }
            });
            setCards(filterCards)
        })
        .catch(err => console.log(err))

    return (
        <>
            <main className="content">
                {/* <!-- Profile --> */}
                <section className="profile">
                    <div className="profile__edit-avatar" onClick={props.onEditAvatar}>
                        <img className="profile__avatar" src={userAvatar} alt="Аватар пользователя" />
                        <span className="profile__edit-pencile"></span>
                    </div>
                    <div className="profile__columns">
                        <div className="profile__info">
                            <h1 className="profile__title">{userName}</h1>
                            <p className="profile__subtitle">{userDescription}</p>
                        </div>
                        <button className="profile__edit-btn" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <button className="profile__add-card-btn" type="button" onClick={props.onAddPlace}></button>
                </section>
                {/* <!-- /Profile -->*/}

                {/* <!-- Elements -->  */}
                <section className="elements">
                    {cards.map((card) => <Card key={card._id} {...card} onCard={props.onCardClick} />)}
                </section>
                {/* <!-- /Elements --> */}

            </main>
        </>
    );
}
export default Main;