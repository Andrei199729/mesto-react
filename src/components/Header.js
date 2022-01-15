import React from "react";

import mestoLogo from '../images/mestologo.svg';

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={mestoLogo} alt="Место" />
        </header>
    );
}
export default Header;