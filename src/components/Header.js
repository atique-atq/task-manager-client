import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

import classes from "./Header.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
  // const history = useHistory();
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <Link to="/" className={classes.header__content__logo}>
          <span className="flex justify-center items-center">
            <img
              src="https://homearcbd.com/wp-content/uploads/2022/11/HOME-ARC-BD-LOGO.svg"
              className="mr-3 h-16"
              alt="HomeArc Logo"
            />
            <span> TaskTracer</span>
          </span>
        </Link>
        <nav
          className={`${classes.header__content__nav} ${
            menuOpen && size.width < 768 ? classes.isMenu : ""
          }`}
        >
          <ul>
            <li>
              <Link to="/addtask" onClick={menuToggleHandler}>
                Add Task
              </Link>
            </li>
            <li>
              <Link to="/mytasks" onClick={menuToggleHandler}>
                My Tasks
              </Link>
            </li>
            <li>
              <Link to="/page-three" onClick={menuToggleHandler}>
                Completed Tasks
              </Link>
            </li>
            {user?.uid ? (
              <>
                <li>
                  <button onClick={handleLogOut}>Sign out</button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
        <div className={classes.header__content__toggle}>
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
