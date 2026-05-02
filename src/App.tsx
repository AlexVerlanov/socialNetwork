import React, { useEffect } from "react";
import "./App.css";
import { NavBar } from "./components/NavBar/NavBar";
import { HashRouter, Route, Routes } from "react-router-dom";
import { DialogsContainer } from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import { UsersContainer } from "./components/Users/UsersContainer";
import { updateArray } from "./utils";
import Login from "./components/Login/Login";

function App() {
  useEffect(() => {
    console.log("App component mounted");
  }, []);

  return (
    <HashRouter>
      <div className="app-wrapper">
        <HeaderContainer />
        <NavBar />

        <div className="profileWrapperContent">
          <Routes>
            <Route path="/profile/:userId?" element={<ProfileContainer />} />
            <Route path="/dialog" element={<DialogsContainer />} />
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
