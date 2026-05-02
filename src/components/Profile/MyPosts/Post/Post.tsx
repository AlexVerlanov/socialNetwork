import React, { useState } from "react";
import s from './Post.module.css';

export type PostType = {
    message: string;
    initialLikeCount: number;
};

export const Post = (props: PostType) => {
    const [likeCount, setLikeCount] = useState(props.initialLikeCount);
    const handleLikeClick = () => {
        setLikeCount(likeCount + 1);
    };


    return (
        <div className={s.item}>
            <div>{props.message}</div>

            <div className={s.items}>
                <img
                    src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
                    alt="post"
                />
            </div>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLQiQ4mXoqVdq9qMndzNrryY_E0SAOi98OrQ&s"
                alt="like"
                className={s.likeIcon}
                onClick={handleLikeClick}
                style={{ cursor: 'pointer', width: '30px', height: '30px' }} // стили для клика
            /> {likeCount}
        </div>
    );
};
