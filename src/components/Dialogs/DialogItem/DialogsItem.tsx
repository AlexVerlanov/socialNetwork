import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

export type DialogsState = {
    dialogItems: DialogItemType[]; // Тип данных для списка диалогов
    messages: MessageType[];       // Тип данных для списка сообщений
    friends: Friend[];             // Тип данных для списка друзей
};

type DialogItemType = {
    id: number;
    name: string;
};
// Типы данных для диалогов
type DialogsItemProps = {
    dialogItems: DialogItemType[];
};

const DialogItem = styled.div`
  width: 30%;
  padding: 10px;

  @media (max-width: 768px) {
    width: 45%; /* На мобильных устройствах увеличиваем ширину */
  }

  @media (max-width: 480px) {
    width: 100%; /* На самых маленьких экранах диалоги занимают всю ширину */
  }
`;



export const FriendsPhotoGrid = ({ friends }: FriendsPhotoGridProps) => {
    return (
        <FriendPhotoGrid>
            {friends.map((friend, index) => (
                <FriendPhoto key={index} src={friend.src} alt={friend.alt} />
            ))}
        </FriendPhotoGrid>
    );
};
export const DialogsItem = (props: DialogsItemProps) => {

    return (
        <div>
            {props.dialogItems.map((el) => {
                const path = "/dialog/" + el.id;
                return (
                    <DialogItem key={el.id}>
                        <DialogsItemContainer>
                            <DialogName>
                                <ActiveLink to={path}
                                            className={({ isActive }) =>
                                                (isActive ? "active" : "")}>
                                    {el.name}
                                </ActiveLink>
                            </DialogName>

                        </DialogsItemContainer>
                    </DialogItem>
                );
            })}
        </div>
    );
};
type MessageType = {
    id: number;
    message: string;
};
export type MessagesPropsType = {
    Messages: MessageType[];
};

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MessagesContainer = styled.div`
  width: 50%;
  padding: 15px;

  @media (max-width: 768px) {
    width: 100%; /* Сообщения будут занимать всю ширину на мобильных */
  }
`;

export const Message = (props: MessagesPropsType) => {
    return (
        <MessagesContainer>
            <MessageContainer>
                {props.Messages.map((el, index) => (
                    <div key={index} className="message">
                        {el.message}
                    </div>
                ))}
            </MessageContainer>
        </MessagesContainer>
    );
};

const DialogName = styled.div`
    color: whitesmoke;
    margin-left: 40px;
    text-decoration: none;
    flex: 1;
`;
const ActiveLink = styled(NavLink)`
  color: whitesmoke;
  margin-left: 40px;
  text-decoration: none;

  &.active {
    color: gold;
  }
`;
type Friend = {
    src: string;
    alt: string;
};

type FriendsPhotoGridProps = {
    friends: Friend[];
};

const FriendPhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* Два столбца на планшетах */
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* Один столбец на мобильных устройствах */
  }
`;

const FriendPhoto = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;
const DialogsItemContainer = styled.div`
    display: flex;
    align-items: center; /* Выравнивание по вертикали */
    justify-content: space-between; /* Расстояние между именем и сообщением */
    margin-bottom: 10px; /* Отступ между диалогами */
`;
