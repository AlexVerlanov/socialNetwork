import styled from "styled-components";

// Стили для изображения
export const UserImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

// Стили для контейнера
export const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr;
`;

// Стили для элемента диалога
export const DialogsItems = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  padding: 2px;
  color: #8a4141;
`;

// Стили для выбранной страницы
export const SelectedPage = styled.span`
  font-weight: bold;
  vertical-align: middle;
  background-color: #8cc568;
  border: 1px solid #6fa9c9;
`;

// Стили для кнопок
export const Button = styled.button`
  display: inline-block;
  padding: 10px 15px;
  background-color: #497c29;
  border: 1px solid #1da1f2;
  border-radius: 5px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:hover {
    text-decoration: none;
  }
`;

// Стили для контейнера с ошибками
export const FormSummaryError = styled.div`
  border: none;
  color: #f83030;
  padding: 2px;
  text-align: center;
  display: inline-block;
  margin: 4px 2px;
`;

// Стили для контейнера с чекбоксами
export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

// Стили для локации
export const Location = styled.div`
  margin-bottom: 5px;
  padding: 2px;
  font-style: italic;
  color: #555;
  margin-top: 5px;
`;

// Стили для контейнера кнопок
export const ButtonContainer = styled.div`
  margin-left: auto;
`;
