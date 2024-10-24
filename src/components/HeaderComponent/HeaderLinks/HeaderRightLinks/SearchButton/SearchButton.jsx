import React from 'react';
import classes from './SearchButton.module.css'

const SearchButton = (props) => {
    return (
        <button {...props} className={classes.button}>
            <img className={classes.image} src="../../../img/searchIcon.png" alt="searchIcon"/>
        </button>
    );
};

export default SearchButton;