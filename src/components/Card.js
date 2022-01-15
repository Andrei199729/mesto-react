import React from "react";

function Card(props) {

    function handleClick() {
        props.onCard(props);
    }

    return (
        <article className="element">
            <img className="element__image" src={props.link} alt={props.name} onClick={handleClick} />
            <button className="element__delete"></button>
            <div className="element__text">
                <h2 className="element__title">{props.name}</h2>
                <div>
                    <button className="element__btn" type="button"></button>
                    <p className="element__check">{props.likes.length}</p>
                </div>
            </div>
        </article>
    );
}

export default Card;