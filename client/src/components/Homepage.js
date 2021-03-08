import React, { useState, useEffect } from "react";

import fullmoon from "./assets/img/fullmoon.png";
import snh_logo from "./assets/img/snh_logo.png";
import snhouter_logo from "./assets/img/snhouter_logo.png";
import snhart_logo from "./assets/img/snhart_logo.png";

import SmallReleaseCard from "./SmallReleaseCard";
import SmallImageCard from "./SmallImageCard";
import Loading from "./Loading";

const Homepage = ({ getLatestFromLabel, getLatestArts }) => {
  const [snhLatest, setSnhLatest] = useState([]);
  const [snhLoading, setSnhLoading] = useState(false);
  const [snhOuterLatest, setSnhOuterLatest] = useState([]);
  const [snhOuterLoading, setSnhOuterLoading] = useState(false);
  const [snhArtLatest, setSnhArtLatest] = useState([]);
  const [snhArtLoading, setSnhArtLoading] = useState(false);

  const snhResidents = [
    "NST069",
    "Kosmo Kryukov",
    "hr3postnoi",
    "lr",
    "STVR FISSVRE",
  ];
  const snhOuterResidents = [
    "P457",
    "Digital Scar",
    "夜間視力NIGHT VISION.Corp",
    "セーラーBN",
    "ＥＵ４ＩＯ",
    "ｅｒ０ｄｅ．",
    "恒星ｂｏｉ.ｊｐｇ",
    "Kosmo Kryukov",
  ];

  useEffect(() => {
    getLatestFromLabel("Saturn Ashes", setSnhLatest, setSnhLoading);
    getLatestFromLabel("Outer Ring", setSnhOuterLatest, setSnhOuterLoading);
    getLatestArts(setSnhArtLatest, setSnhArtLoading);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div
        className="relative pt-16 pb-32 flex content-center items-center justify-center"
        style={{
          minHeight: "75vh",
        }}
      >
        <div
          className="absolute top-0 w-full h-full bg-center bg-fixed"
          style={{
            backgroundImage: `url(${fullmoon})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-75 bg-black"
          ></span>
        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full px-4 ml-auto mr-auto text-center">
              <h1 className="text-white font-semibold text-md sm:text-2xl md:text-4xl lg:text-5xl">
                Ｆ Ｕ Ｌ Ｌ Ｍ Ｏ Ｏ Ｎ Ｃ Ｒ Ｅ Ｗ
              </h1>
              <p className="mt-4 text-lg text-gray-300">
                <a href="#snh">Saturn Ashes</a>,{" "}
                <a href="#snhouter">Outer Ring</a>,{" "}
                <a href="#snhart">Snh.Art</a>
              </p>
            </div>
          </div>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style={{ height: "70px", transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-black fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>

      <section id="snh" className="pt-20 pb-48">
        <div className="container mx-auto px-4">
          <div className="flex sm:hidden flex-col ml-5 text-left">
            <h1 className="text-white font-bold text-center text-4xl mb-5">
              Saturn Ashes
            </h1>
          </div>
          <div className="hidden sm:flex flex-wrap justify-center text-center mb-24 h-auto ">
            <div className="w-full lg:w-2/3 xl:w-1/2 px-2">
              <div className=" bg-gray-900 p-5 rounded-md tracking-wide">
                <div className="flex justify-around">
                  <div className="w-45 flex-none  object-contain">
                    <img
                      alt="snh"
                      className="rounded-md"
                      src={snh_logo}
                      width="200"
                    />
                  </div>
                  <div className="flex flex-grow flex-col ml-5 text-left">
                    <h1 className="text-white font-semibold text-4xl mb-2">
                      Saturn Ashes
                    </h1>
                    <div className="text-gray-300 mt-2 font-light">
                      {snhResidents.map((resident) => (
                        <p key={resident} className="p-1">
                          {resident}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {snhLoading ? (
            <Loading />
          ) : (
            <div className="flex items-center overflow-x-auto">
              {snhLatest.map((album) => (
                <div key={album.id} className="inline-block px-3">
                  <SmallReleaseCard album={album} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="snhouter" className="pt-20 pb-48">
        <div className="container mx-auto px-4">
          <div className="flex sm:hidden flex-col ml-5 text-left">
            <h1 className="text-white font-bold text-center text-4xl mb-5">
              Outer Ring
            </h1>
          </div>
          <div className="hidden sm:flex flex-wrap justify-center text-center mb-24 h-auto ">
            <div className="w-full lg:w-2/3 xl:w-1/2 px-2">
              <div className=" bg-gray-900 p-5 rounded-md tracking-wide">
                <div className="flex justify-around">
                  <div className="w-45 flex-none  object-contain">
                    <img
                      alt="snh.outer"
                      className="rounded-md"
                      src={snhouter_logo}
                      width="200"
                    />
                  </div>
                  <div className="flex flex-grow flex-col ml-5 text-left">
                    <h1 className="text-white font-semibold text-4xl mb-2">
                      Outer Ring
                    </h1>
                    <div className="text-gray-300 mt-2 font-light">
                      {snhOuterResidents.map((resident) => (
                        <p key={resident} className="p-1">
                          {resident}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {snhOuterLoading ? (
            <Loading />
          ) : (
            <div className="flex items-center overflow-x-auto">
              {snhOuterLatest.map((album) => (
                <div key={album.id} className="inline-block px-3">
                  <SmallReleaseCard album={album} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="snhart" className="pt-20 pb-20 block bg-gray-900">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style={{ height: "80px", transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 250 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-900 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex sm:hidden flex-col ml-5 text-left">
            <h1 className="text-white font-bold text-center text-4xl mb-5">
              snh.Art
            </h1>
          </div>
          <div className="hidden sm:flex flex-wrap justify-center text-center mb-24 h-auto ">
            <div className="w-full lg:w-2/3 xl:w-1/2 px-2">
              <div className=" bg-gray-900 p-5 rounded-md tracking-wide">
                <div className="flex justify-around">
                  <div className="w-45 flex-none  object-contain">
                    <img
                      alt="snh.art"
                      className="rounded-md"
                      src={snhart_logo}
                      width="200"
                    />
                  </div>
                  <div className="flex flex-grow flex-col ml-5 text-left">
                    <h1 className="text-white font-semibold text-4xl mb-2">
                      snh.Art
                    </h1>
                    <p className="text-gray-300 mt-2 font-light">NST069</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {snhArtLoading ? (
            <Loading />
          ) : (
            <div className="flex items-center overflow-x-auto">
              {snhArtLatest.map((art) => (
                <div key={art.deviationId} className="inline-block px-3">
                  <SmallImageCard art={art} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Homepage;
