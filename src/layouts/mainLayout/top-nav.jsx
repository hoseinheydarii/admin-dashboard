import React from "react";
import { useAppContext } from "../../context/app/app-context";
import ChangeTheme from "../../components/change-theme";
import ChangeLanguage from "../../components/change-language";
import avatar from "@assets/images/avatar.jpg";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const { language, toggleSidebar } = useAppContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
      <a className="sidebar-toggle" onClick={toggleSidebar}>
        <i className="hamburger align-self-center"></i>
      </a>
      <div className="d-flex align-items-center gap-3">
        <ChangeLanguage />
        <ChangeTheme />
      </div>
      <div className={`${language === "fa" ? "me-auto" : "ms-auto"}`}>
        <button className="btn btn-outline-danger fw-bolder" onClick={logout}>
          خارج شوید
        </button>
      </div>
      {/* <img
        src={avatar}
        className={`avatar img-fluid rounded-circle ${
          language === "fa" ? "me-auto" : "ms-auto"
        }`}
      /> */}
    </nav>
  );
};

export default TopNav;
