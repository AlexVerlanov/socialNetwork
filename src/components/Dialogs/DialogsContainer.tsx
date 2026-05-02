import React, { ChangeEvent, useReducer, useState } from "react";
import styled from "styled-components";
import {
  DialogsItem,
  Message,
  FriendsPhotoGrid,
} from "./DialogItem/DialogsItem";
import { useSelector, useDispatch } from "react-redux"; // Импортируем useSelector и useDispatch
/*import { StateType } from "../../redux/state"; // Тип состояния*/
import {
  addDialogMessageAC,
  addNameAC,
  DialogsReducer,
  DialogsReducerType,
} from "../../redux/Dialogs-reducer";
import { RootState } from "../../redux/redux-store";
import { Dialogs } from "./Dialogs";
import { Navigate } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/WitchAutchRedirect"; // Экшены и редюсер

export const DialogsContainer = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setName(e.currentTarget.value);
  };
  const auth = useSelector((store: RootState) => store.auth.isAuth);

  const dialogsState = useSelector(
    (store: RootState) => store.dialogPage.dialogPage,
  );

  const { dialogItems, messages, friends } = dialogsState;

  const handleAddName = () => {
    if (name.trim() !== "") {
      dispatch(addNameAC(name));
      setName("");
    }
  };

  const handleAddMessage = () => {
    if (message.trim() !== "") {
      dispatch(addDialogMessageAC(message));
      setMessage("");
    }
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value);
  };

  return (
    <Dialogs
      handleMessageChange={handleMessageChange}
      message={message}
      handleAddMessage={handleAddMessage}
      handleAddName={handleAddName}
      name={name}
      handleTextChange={handleTextChange}
      dialogsState={dialogsState}
      isAuth={auth}
    />
  );
};
export default withAuthRedirect(DialogsContainer);
