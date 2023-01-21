import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import Spinner from "./spinner/Spinner";

const Responsive = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [nfts, setNfts] = useState([]);
  const [sortchange, setSortchange] = useState();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(12);
  const [height, setHeight] = useState(0);
  //  Get dummyData
  let dummyData = [];
  let data = [];
  const convert_number = function (input_value){
    return Number(input_value.substring(0,input_value.length-1));
  }
  useEffect(async () => {
    setIsLoading(true);

    const rarityData = await axios.get(
      "https://bafybeifw4cfijrslq4vw7u47ihzry5jelrs2jqbwmcgpk3txl6t4guztja.ipfs.nftstorage.link/RARITIES.json"
    );

    if (props.filter === "") {
      data = [];
      dummyData = [];

      if (sortchange !== props.sort) {
        setStart(0);
        setEnd(12);
      }
      for (let i = start; i < end; i++) {
        let index = "";
        switch (props.sort) {
          case "sortA":
            index = i + 1;
            break;
          case "sortD":
            index = 1000 - i;

            break;
          default:
            break;
        }
        if (props.sort !== "rarity") {
          let jsonData = await axios.get(
            `https://bafybeifw4cfijrslq4vw7u47ihzry5jelrs2jqbwmcgpk3txl6t4guztja.ipfs.nftstorage.link/QSTN%23${index}.json`
          );
          let rarity = 0;
          jsonData.data.attributes.map((val, ind) => {
            rarity +=
              rarityData.data[val.trait_type][val.value].rarity.split("%")[0] *
              1;
            val.rarity = (100-convert_number(rarityData.data[val.trait_type][val.value].rarity)).toFixed(2)+"%";
          });
          let nftData = {
            previewImg: `https://bafybeidjdmfup4i22iwnt7uenvwtr4gtxvgrbyh6bmjptm2tsc2ivd7bhi.ipfs.nftstorage.link/QSTN%23${index}.png`,
            data: jsonData.data,
            id: index,
            rarity,
          };
          data.push(nftData);
          dummyData.push(nftData);
        }
      }
      let nftState = nfts;
      let dummy = [];

      if (start === 0) {
        dummy = data;
      } else {
        dummy = nftState.concat(data);
      }
      setNfts(dummy);
      setSortchange(props.sort);
    }
    //setIsLoading(false);
  }, [start, props.filter, props.sort]);

  useEffect(async () => {
    setIsLoading(true);

    const rarityData = await axios.get(
      "https://bafybeifw4cfijrslq4vw7u47ihzry5jelrs2jqbwmcgpk3txl6t4guztja.ipfs.nftstorage.link/RARITIES.json"
    );
    if (props.sort === "rarity") {
      for (let i = 0; i < 100; i++) {
        let jsonData = await axios.get(
          `https://bafybeifw4cfijrslq4vw7u47ihzry5jelrs2jqbwmcgpk3txl6t4guztja.ipfs.nftstorage.link/QSTN%23${
            i + 1
          }.json`
        );
        let rarity = 0;
        await jsonData.data.attributes.map((val, ind) => {
          rarity +=
            rarityData.data[val.trait_type][val.value].rarity.split("%")[0] * 1;
          val.rarity = (100-convert_number(rarityData.data[val.trait_type][val.value].rarity)).toFixed(2)+"%";
        });
        let nftData = {
          previewImg: `https://bafybeidjdmfup4i22iwnt7uenvwtr4gtxvgrbyh6bmjptm2tsc2ivd7bhi.ipfs.nftstorage.link/QSTN%23${
            i + 1
          }.png`,
          data: jsonData.data,
          id: i + 1,
          rarity,
        };
        data.push(nftData);
        dummyData.push(nftData);
      }
      let nftSates = nfts;
      data.sort((a, b) => a.rarity - b.rarity);
      if (start === 0) {
        setNfts(data.slice(start, end));
      } else {
        let newData = nftSates.concat(data.slice(start, end));
        setNfts(newData);
      }
    }
    setIsLoading(false);
  }, [props.sort, start]);

  useEffect(async () => {
    setIsLoading(true);

    if (props.filter !== "") {
      const rarityData = await axios.get(
        "https://bafybeifw4cfijrslq4vw7u47ihzry5jelrs2jqbwmcgpk3txl6t4guztja.ipfs.nftstorage.link/RARITIES.json"
      );
      dummyData = [];
      let jsonData = await axios.get(
        `https://bafybeifw4cfijrslq4vw7u47ihzry5jelrs2jqbwmcgpk3txl6t4guztja.ipfs.nftstorage.link/QSTN%23${props.filter}.json`
      );

      jsonData.data.attributes.map((val, ind) => {
        val.rarity = (100-convert_number(rarityData.data[val.trait_type][val.value].rarity)).toFixed(2)+"%";
      });
      let nftData = {
        previewImg: `https://bafybeidjdmfup4i22iwnt7uenvwtr4gtxvgrbyh6bmjptm2tsc2ivd7bhi.ipfs.nftstorage.link/QSTN%23${props.filter}.png`,
        data: jsonData.data,
        id: props.filter,
      };

      let nftState = [];
      let dummy = nftState.concat(nftData);
      setNfts(dummy);
      dummyData = dummy;
    }
    setIsLoading(false);
  }, [props.filter]);

  const loadMore = () => {
    setStart(nfts.length);
    setEnd(nfts.length + 4);
  };

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="row justify-content-center">
          {nfts.map((nft, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
            >
              <div className="nft__item m-0" style={{ minHeight: "100%" }}>
                <div className="nft__item_wrap">
                  <span>
                    <img
                      onLoad={onImgLoad}
                      src={nft.previewImg}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </span>
                </div>
                <div className="nft__item_info p-1">
                  <span>
                    <h4>{nft.data.name}</h4>
                  </span>
                  <div className="row">
                    {nft.data.attributes.map((val, index) => (
                      <div className="col-md-6 m-0 p-1 character">
                        <p
                          className="m-0 text-black  fs-16 border  p-1"
                          style={{ minHeight: "100%" }}
                        >
                          <span className="title">{val.trait_type} </span>
                          <p className="m-0 value">{val.value.toLowerCase()}</p>
                          <p className="m-0  rarity">{val.rarity}</p>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {nfts.length !== dummyData.length && (
            <div className="col-lg-12">
              <div className="spacer-single"></div>
              <span onClick={() => loadMore()} className="btn-main lead m-auto">
                Load More
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Responsive;
