import React from 'react';
import classes from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes.logotype}>
                <figure className={classes.figure}>
                    <a href="/"><img className={classes.image} src="../../img/logo.png" alt="logotype" /></a>
                </figure>
            </div>

            <p className='font-normal '>2024</p>
        </footer>
    );
};

export default Footer;