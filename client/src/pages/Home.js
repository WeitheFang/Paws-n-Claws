import React from "react";
import { Slide } from "react-slideshow-image";
import slideShow1 from "../assets/img/slideShow1.webp";
import slideShow2 from "../assets/img/slideShow2.webp";
import slideShow3 from "../assets/img/slideShow3.webp";
import slideShow4 from "../assets/img/slideShow4.webp";

import "react-slideshow-image/dist/styles.css";

const Home = () => {
  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "500px",
  };
  const slideImages = [
    {
      img: slideShow1,
    },
    {
      img: slideShow2,
    },
    {
      img: slideShow3,
    },
    {
      img: slideShow4,
    },
  ];

  return (
    <div>
      <div className="slide-container">
        <Slide>
          {slideImages.map((slideImage, index) => (
            <div key={index}>
              <div
                style={{
                  ...divStyle,
                  backgroundImage: `url(${slideImage.img})`,
                }}
              ></div>
            </div>
          ))}
        </Slide>
      </div>
      <div className="promo-section"></div>
    </div>
  );
};

export default Home;
