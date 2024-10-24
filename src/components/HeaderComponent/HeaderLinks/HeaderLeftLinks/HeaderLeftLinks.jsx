import React from 'react';

import Link from './LinkComponent/Link';

import classes from './HeaderLeftLinks.module.css'

const HeaderLeftLinks = () => {
    return (
        <div className={classes.headerLinks}>
            <nav>
                <ul>
                    <li><Link href="/">Лента</Link></li>
                    <li><Link href="/">Гайды</Link></li>
                    <li><Link href="/">Обучение</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default HeaderLeftLinks;