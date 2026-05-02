import React, { ChangeEvent } from "react";
import { useSelector, useDispatch, connect } from "react-redux"; // Импортируем useSelector и useDispatch
import { addPostAC, updatePostTextAC } from "../../../redux/Profile-reducer"; // Импортируем экшены
import { AppDispatch, RootState } from "../../../redux/redux-store"; // Импортируем RootState
import { Post } from "./Post/Post";
import { MyPosts } from "./MyPosts";

const mapStateToProps = (state: RootState) => {
  return {
    postText: state.profilePage.profilePage.postText, // Передаем text из состояния
    posts: state.profilePage.profilePage.posts, // При необходимости передаем список постов
  };
};

// Тип для mapDispatchToProps
type mapDispatchToPropsType = {
  handleTextChange: (newText: string) => void;
  handleAddPost: (postText: string) => void; // Мы теперь ожидаем, что эта функция получит postText
};

// mapDispatchToProps для отправки экшенов
const mapDispatchToProps = (dispatch: AppDispatch): mapDispatchToPropsType => {
  return {
    handleTextChange: (text: string) => dispatch(updatePostTextAC(text)), // Обновляем текст
    handleAddPost: (postText: string) => {
      if (postText.trim() !== "") {
        dispatch(addPostAC(postText)); // Диспатчим экшен для добавления поста с настоящим текстом
        dispatch(updatePostTextAC("")); // Очищаем текст после добавления
      }
    },
  };
};

// Подключаем компонент MyPosts с переданными пропсами из Redux
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
