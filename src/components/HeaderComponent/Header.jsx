import React from 'react';

import HeaderLeftLinks from './HeaderLinks/HeaderLeftLinks/HeaderLeftLinks';
import SearchButton from './HeaderLinks/HeaderRightLinks/SearchButton/SearchButton';

import classes from './Header.module.css'
import HeaderRightLinks from './HeaderLinks/HeaderRightLinks/HeaderRightLinks';

const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.headerLeftPart}>
                <figure>
                    <a href="/"><img className={classes.image} src="../../img/logo.png" alt="logotype" /></a>
                </figure>
                <HeaderLeftLinks/>
            </div>

            <div className={classes.headerRightPart}>
                <SearchButton/>
                <HeaderRightLinks/>
            </div>
        </header>
    );
};

export default Header;