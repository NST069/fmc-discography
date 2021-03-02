import React, { useState, useEffect } from "react";

import fullmoon from "./fullmoon.png";
import snh_logo from "./snh_logo.png";
import snhouter_logo from "./snhouter_logo.png";
import snhart_logo from "./snhart_logo.png";

import SmallReleaseCard from "./SmallReleaseCard";

const Homepage = ({ getLatestFromLabel }) => {
  const [snhLatest, setSnhLatest] = useState([]);
  const [snhLoading, setSnhLoading] = useState(false);
  const [snhOuterLatest, setSnhOuterLatest] = useState([]);
  const [snhOuterLoading, setSnhOuterLoading] = useState(false);

  useEffect(() => {
    getLatestFromLabel("Saturn Ashes", setSnhLatest, setSnhLoading);
    getLatestFromLabel("Outer Ring", setSnhOuterLatest, setSnhOuterLoading);
  }, []);
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
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="pr-12">
                <h1 className="text-white font-semibold text-4xl">
                  Ｆ Ｕ Ｌ Ｌ Ｍ Ｏ Ｏ Ｎ Ｃ Ｒ Ｅ Ｗ
                </h1>
                <p className="mt-4 text-lg text-gray-300">
                  Saturn Ashes, Outer Ring, Snh.Art
                </p>
              </div>
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

      <section className="pt-20 pb-48">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-24 h-auto">
            <div className="w-full lg:w-1/2 px-2">
              <div className=" bg-gray-900 p-5 rounded-md tracking-wide">
                <div className="flex justify-around">
                  <img
                    alt="snh"
                    className="w-45 rounded-md border-2 border-gray-800"
                    src={snh_logo}
                    width="200"
                  />
                  <div className="flex flex-col ml-5 text-left">
                    <h1 className="text-white font-semibold text-4xl mb-2">
                      Saturn Ashes
                    </h1>
                    <p className="text-gray-300 mt-2">
                      NST069, Kosmo Kryukov, hr3postnoi, lr, STVR FISSVRE.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {snhLoading ? (
            <h1>Loading...</h1>
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

      <section className="pt-20 pb-48">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-24 h-auto">
            <div className="w-full lg:w-1/2 px-2">
              <div className=" bg-gray-900 p-5 rounded-md tracking-wide">
                <div className="flex justify-around">
                  <img
                    alt="snh.outer"
                    className="w-45 rounded-md border-2 border-gray-800"
                    src={snhouter_logo}
                    width="200"
                  />
                  <div className="flex flex-col ml-5 text-left">
                    <h1 className="text-white font-semibold text-4xl mb-2">
                      Outer Ring
                    </h1>
                    <p className="text-gray-300 mt-2">
                      P457, Kosmo Kryukov, Digital Scar, 夜間視力NIGHT
                      VISION.Corp, セーラーBN, ＥＵ４ＩＯ, ｅｒ０ｄｅ．,
                      恒星ｂｏｉ.ｊｐｇ.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {snhOuterLoading ? (
            <h1>Loading...</h1>
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

      <section className="pt-20 pb-20 block bg-gray-900">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style={{ height: "80px", transform: "translateZ(0)" }}
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
              className="text-gray-900 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-24 h-auto">
            <div className="w-full lg:w-1/2 px-2">
              <div className=" bg-gray-900 p-5 rounded-md tracking-wide">
                <div className="flex justify-around">
                  <img
                    alt="mountain"
                    className="w-45 rounded-md border-2 border-gray-800"
                    src={snhart_logo}
                    width="200"
                  />
                  <div className="flex flex-col ml-5 text-left">
                    <h1 className="text-white font-semibold text-4xl mb-2">
                      Snh.Outer
                    </h1>
                    <p className="text-gray-300 mt-2">NST069</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap text-center justify-center">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold text-white">
                coming soon...
              </h2>
              <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                artstation:{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-light no-underline text-gray-400"
                  href="https://nst069.artstation.com"
                >
                  NST069
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;
