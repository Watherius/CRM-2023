import React from 'react';
import '../../css/style.css';

const Li = (posts) => {
    return (
        <li className={posts.css_li}>
            <a className={`${posts.css_a} ${posts.page.active}`} href={posts.page.href}>
                {posts.page.icon}
                {posts.page.name}
            </a>
        </li>
    )
}

export default Li;