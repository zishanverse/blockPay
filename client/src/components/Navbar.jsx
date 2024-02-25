import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { truncateStr } from "../utils/truncateStr";
import '../pages/styles/login.css';
const Navbar = ({ updateWallet, showConnectModal, wallet }) => {
  const [toggleValue, setToggle] = useState(false);
  const navRef = useRef(null);

  const handleToggle = () => {
    setToggle(!toggleValue);
  };

  const closeNavOnScroll = () => {
    if (toggleValue) {
      setToggle(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", closeNavOnScroll);
    return () => {
      window.removeEventListener("scroll", closeNavOnScroll);
    };
  }, [toggleValue]);

  return (
    <nav className="navbar nav">
      <div className="nav__header">
        <div
          onClick={handleToggle}
          className={
            (toggleValue && "nav__burger nav__burger--close") || "nav__burger"
          }
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="navbar__logo nav-text" href="/">
          Gov Fund Manager
        </div>
      </div>
      <ul
        ref={navRef}
        className={
          (toggleValue && "nav__links nav__links--expanded") || "nav__links"
        }
      >
        <Link to={"/home"}><p className="nav-text">Home</p></Link>
        <Link to={"/create-allocation"}><p className="nav-text">Create Allocation</p></Link>
        <Link to="/allocations" ><p className="nav-text">Allocations</p></Link>
        <button
          className="connect-btn wallet-btn"
          onClick={wallet ? () => updateWallet() : () => {
            showConnectModal(true)
            //Cookies.remove("wallet")
          }}
        >
          {wallet
            ? `Disconnect: ${wallet && truncateStr(wallet.getAddress(), 11)}`
            : "Connect"}
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
