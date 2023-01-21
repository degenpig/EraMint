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

  useEffect(async () => {
    setIsLoading(true);
    let res = await window.contract.nft_tokens_for_owner({account_id:window.accountId,frin_index:"0",limit:parseInt(1000)});
    setNfts(res);
    setIsLoading(false);
  }, [start]);

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
                      src={nft.metadata.media}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </span>
                </div>
                <div className="nft__item_info p-1">
                  <span>
                    <h4>{nft.metadata.title}</h4>
                  </span>
                  <div className="row">
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
