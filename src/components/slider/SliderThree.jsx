import React, { useState, useEffect } from "react";
import { Link,useSearchParams} from "react-router-dom";
import axios from "axios";
import { login, logout } from "../../utils"; 
import Spinner from "../spinner/Spinner";
import orders from '../../assets/fake-data/orders';
import 'reactjs-popup/dist/index.css';
import Modal from 'react-bootstrap/Modal';

const SliderThree = () => {
  const [isLoading, setIsLoading] = useState(false);
  const params = new URLSearchParams(window.location.search);

  const [show, setShow] = useState(0);

  const handleClose = () => setShow(0);
  const handleShow = () => setShow(1);

  const BN = require("bn.js");
  const [datatext] = useState({
    subtitle: "We are QSTN NFT",
    title: "Minting is now LIVE!",
    desc: "0 of 1000 QSTNs are minted now.",
  });
  const images = [
    "879",
    "213",
    "469",
    "300",
    "869",
    "709",
    "12",
    "955",
    "600",
    "900",
  ];
  const [currentImage, setCurrentImage] = useState(
    "https://bafybeidjdmfup4i22iwnt7uenvwtr4gtxvgrbyh6bmjptm2tsc2ivd7bhi.ipfs.nftstorage.link/QSTN%2312.png"
  );
  const [json, setJson] = useState({
    description: "A character for QSTN Collection",
    image: "[IMAGE_PATH]",
    name: "QSTN#781",
    attributes: [
      {
        trait_type: "Character",
        value: "Question",
      },
      {
        trait_type: "Body",
        value: "Striped Purple",
      },
      {
        trait_type: "Eyewear",
        value: "Snowboard",
      },
      {
        trait_type: "Hat",
        value: "Pink Bucket",
      },
      {
        trait_type: "Hands",
        value: "Cyan",
      },
      {
        trait_type: "Coin",
        value: "Golden",
      },
      {
        trait_type: "Background",
        value: "Cream",
      },
    ],
  });

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(async () => {
    if(params.get("transactionHashes")!=null){
      setShow(1);
    }else if(params.get("errorCode")!=null){
      setShow(2);
    }
    setIsLoading(true);
    const intervalId = setInterval(async () => {
      const imgNum = getRandomInt(1, 10);
      //  const url = `img/about/${images[imgNum - 1]}.png`;
      const url = require(`../../assets/images/about/${
        images[imgNum - 1]
      }.png`);
      const jsonurl = `https://bafybeifw4cfijrslq4vw7u47ihzry5jelrs2jqbwmcgpk3txl6t4guztja.ipfs.nftstorage.link/QSTN%23${
        images[imgNum - 1]
      }.json`;
      const data = await axios.get(jsonurl);
      setCurrentImage(url);
      setJson({ ...data.data });
    }, 1000);
    const resp = await window.contract.nft_tokens({from_index:"0",limit:parseInt(1000)});
    datatext.desc = `${resp.length - 1} of 1000 QSTNs are minted now.`;
    setIsLoading(false);

    return () => clearInterval(intervalId);
  }, []);

  const mintNFT = async () => {
    // const resp = await window.contract.nft_tokens_for_owner({account_id:"serhiip0317.testnet",frin_index:"0",limit:parseInt(1000)});
    // console.log(resp);
    // return ;
    setIsLoading(true);
    var i = 1;
    for (i = 1; i < 1001; i++) {
      if (
        (await window.contract.check_token({
          id: `QSTN${orders[i]}`,
        })) == false
      )
      break;
    }
    await window.contract.nft_mint(
      {
        token_id: `QSTN${orders[i]}`,
        metadata: {
          title: `QSTN${orders[i]}`,
          description: "QSTN token",
          media: `https://bafybeidjdmfup4i22iwnt7uenvwtr4gtxvgrbyh6bmjptm2tsc2ivd7bhi.ipfs.nftstorage.link/QSTN%23${orders[i]}.png`,
        },
        receiver_id: window.accountId,
      },
      300000000000000, // attached GAS (optional)
      new BN("1000000000000000000000000")
    );
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="tf-section hero-slider">
        <Modal show={show} onHide={handleClose}>  
            {
              show==1?
              <Modal.Body className="modal-style">Mint was successeded!</Modal.Body>
              :<Modal.Body className="modal-style-failed">Mint was failed!</Modal.Body>
            }      
        </Modal>
          <div className="container">
            <div className="row">
              <div className="col-xl-5 col-md-12 col-12">
                <div className="block-text pt-24">
                  <h6 className="sub-title mb-6" data-aos="fade-up">
                    {datatext.subtitle}
                  </h6>
                  <h2 className="title mb-26" data-aos="fade-up">
                    {datatext.title}{" "}
                  </h2>
                  <p className="desc mb-43" data-aos="fade-up">
                    {datatext.desc}{" "}
                  </p>
                  <Link
                    to="/about"
                    className="btn-action style-2"
                    data-aos="fade-up"
                    data-aos-duration="1200"
                    onClick={
                      window.walletConnection.isSignedIn() ? mintNFT : login
                    }
                  >
                    {" "}
                    {window.walletConnection.isSignedIn()
                      ? "Mint"
                      : "Connect Wallet"}
                  </Link>
                </div>
              </div>
              <div className="col-xl-7 mt-5">
                <div className="nft__item m-0  flex-row">
                  <div className="w-50">
                    <span>
                      <img
                        //src={process.env.PUBLIC_URL + currentImage}
                        src={currentImage}
                        className="Mint_preview_image"
                        alt=""
                      />
                    </span>
                  </div>
                  <div className="nft__item_info  p-5">
                    <span>
                      <h4>{json.name}</h4>
                    </span>
                    {json.attributes.map((val, index) => (
                      <div key={index}>
                        <p className="m-0 text-black">
                          {val.trait_type}: {val.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SliderThree;
