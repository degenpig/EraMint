import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { login, logout } from "../../utils";
import './button.scss';
import Spinner from 'react-bootstrap/Spinner';
const ButtonOne = () => {
      const [onLoading, setOnLoading] = useState(false);
      const WalletConnect = async function(){
            setOnLoading(true);
            console.log("setloading",onLoading);
            if(window.walletConnection.isSignedIn()){
                  await logout();
            }else{
                  await login();
            }
            setOnLoading(false);
      }
  return (
        <Link onClick={ WalletConnect} className="btn-action">
            {window.walletConnection.isSignedIn()
                  ? "CONNECTED: "+window.accountId
                  : "Connect Wallet"}
            {onLoading?<Spinner animation="border" variant="danger" />:""}
        </Link>
  );
}

export default ButtonOne;