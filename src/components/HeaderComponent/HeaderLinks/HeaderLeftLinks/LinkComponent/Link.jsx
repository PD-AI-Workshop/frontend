import React from 'react';
import classes from './Link.module.css'

const Link = (props) => {
    return (
        <div className={classes.linkBlock}>
            <div className={classes.icon}></div>
            <a {...props}>{props.children}</a>
        </div>
    );
};

export default Link;