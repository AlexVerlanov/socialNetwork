import React, { ChangeEvent, useReducer, useState } from "react";
import styled from "styled-components";
import {
  DialogsItem,
  Message,
  FriendsPhotoGrid,
  DialogsState,
} from "./DialogItem/DialogsItem";
import { DialogPageType } from "../../redux/Dialogs-reducer";
import { Navigate } from "react-router-dom";

export type DialogsProps = {
  handleMessageChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  message: string;
  name: string;
  handleAddMessage: (message: string) => void; // Ожидаем, что функция принимает аргумент message
  handleAddName: (name: string) => void; // Ожидаем, что функция принимает аргумент name
  handleTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  dialogsState: DialogPageType;
  isAuth: boolean;
};

export const Dialogs: React.FC<DialogsProps> = ({
  handleMessageChange,
  message,
  handleAddMessage,
  handleAddName,
  name,
  handleTextChange,
  dialogsState,
  isAuth,
}) => {
  const { dialogItems, messages, friends } = dialogsState;

  const dialogItemsList = <DialogsItem dialogItems={dialogItems} />;
  const messagesList = <Message Messages={messages} />;
  const friendsList = <FriendsPhotoGrid friends={friends} />;

  const RightSection = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 50%;

    @media (max-width: 1024px) {
      width: 100%;
      flex-direction: column;
      align-items: center;
    }
  `;
  if (isAuth === false) {
    return <Navigate to="/login" />;
  }
  return (
    <DialogsContainer>
      <DialogsWrapper>
        <DialogsItems>{dialogItemsList}</DialogsItems>
        <MessagesContainer>{messagesList}</MessagesContainer>
        <TextAreaContainer>
          <StyledTextArea
            value={name}
            onChange={handleTextChange} // Локальное обновление состояния для имени
            placeholder="Enter your name..."
          />
          <StyledTextArea
            value={message}
            onChange={handleMessageChange} // Локальное обновление состояния для сообщения
            placeholder="Enter a message..."
          />
          <ButtonContainer>
            <StyledButton onClick={handleAddName.bind(null, name)}>
              Add Name
            </StyledButton>
            <StyledButton onClick={handleAddMessage.bind(null, message)}>
              Add Post
            </StyledButton>
          </ButtonContainer>
        </TextAreaContainer>
      </DialogsWrapper>

      <RightSection>
        <FriendsSection>
          <MyPhotos>
            <h3>My Photos</h3>
            <PhotoGrid>
              <Photo
                src="https://html.crumina.net/html-olympus/img/last-photo10-large.webp"
                alt="My Photo 1"
              />
              <Photo
                src="https://html.crumina.net/html-olympus/img/last-phot11-large.webp"
                alt="My Photo 2"
              />
              <Photo
                src="https://html.crumina.net/html-olympus/img/last-phot12-large.webp"
                alt="My Photo 3"
              />
              <Photo
                src="https://html.crumina.net/html-olympus/img/last-phot13-large.webp"
                alt="My Photo 4"
              />
              <Photo
                src="https://html.crumina.net/html-olympus/img/last-phot14-large.webp"
                alt="My Photo 5"
              />
              <Photo
                src="https://html.crumina.net/html-olympus/img/last-phot16-large.webp"
                alt="My Photo 6"
              />
            </PhotoGrid>
          </MyPhotos>

          <FriendsInfo>
            <h3>Friends (86)</h3>
            {friendsList}
          </FriendsInfo>
        </FriendsSection>
      </RightSection>
    </DialogsContainer>
  );
};

// Styled components for the layout
const DialogsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

const DialogsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  gap: 30px;
`;

const DialogsItems = styled.div`
  width: 48%;
  padding: 15px;
`;

const MessagesContainer = styled.div`
  width: 48%;
  padding: 15px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  gap: 10px;
  margin-right: 320px;
  width: 40%;
`;

const StyledTextArea = styled.textarea`
  padding: 12px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  resize: none;
  background-color: #f9f9f9;
  color: #333;

  &:focus {
    outline: none;
    border-color: #4e9bff;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-start;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: #4e9bff;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3a7db2;
  }

  &:active {
    background-color: #2e5f8f;
  }
`;

const FriendsSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
`;

const MyPhotos = styled.div`
  width: 80%;
  padding: 0 15px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FriendsInfo = styled.div`
  width: 48%;
  padding: 0 15px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 15px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
`;
