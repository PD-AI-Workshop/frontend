import React from 'react';
import classes from './HeaderRightLinks.module.css'

const HeaderRightLinks = () => {
    return (
        <div className={classes.rightLinks}>
            <div className={classes.writeLink}>
                <figure className={classes.figure}>
                    <img src="../../../img/writeButtonIcon.png" alt="WriteButtonIcon" />
                </figure>
                <a href="/">Написать</a>
            </div>

            <div className={classes.loginLink}>
                <a href="/">Войти</a>
            </div>
        </div>
    );
};

export default HeaderRightLinks;