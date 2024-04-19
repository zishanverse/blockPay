import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { truncateStr } from "../utils/truncateStr";
import { TiThMenuOutline } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
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
    <nav className={toggleValue ? 'navbar nav' : 'navbar nav nav-container'}>
      <div className="nav__header flex">
        <div
          onClick={handleToggle}>
          {toggleValue ? <IoClose className="closeAndMenu"/> : <TiThMenuOutline className="closeAndMenu"/>}
        </div>
        <div className="navbar__logo nav-text" href="/">
          <Link to="/" ><img className="logo" src="https://res.cloudinary.com/deepcnbrz/image/upload/v1709459198/WhatsApp_Image_2024-03-03_at_13.57.47_ismhga.jpg" alt="logo" /></Link>
        </div>
      </div>
      <ul
        ref={navRef}
        className={
          (toggleValue && "nav__links nav__links--expanded nav-container nav-links") || "nav__links"
        }
      >
        <Link to="/"><p className="nav-text">Home</p></Link>
        <Link to="/add-allocation"><p className="nav-text">Add Allocation</p></Link>
        <Link to="/allocations" ><p className="nav-text">Allocations</p></Link>
        <button
          className="connect-btn wallet-btn"
          onClick={wallet ? () => updateWallet() : () => {
            showConnectModal(true);
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
