"use client";
import { Wheel } from "react-custom-roulette";
import React, { useState } from "react";
import { NoSsr } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";

type Props = {
  mustSpin: boolean;
  prizeNumber: number;
  onStop?: () => void;
};

function Well({ mustSpin, prizeNumber, onStop }: Props) {
  const sizeMultiplier = 0.55;
  const offsetX = -55;
  const shadow = 15;
  const data = [
    {
      option: "0",
      image: { uri: "/kit_50_0.png", landscape: true, sizeMultiplier, offsetX },
      style: { backgroundColor: "#0089ff", textColor: "black" },
    },
    {
      option: "1",
      image: {
        uri: "/colgate_toothpaste_1.png",
        landscape: true,
        sizeMultiplier:sizeMultiplier*1.7,
        offsetX,
      },
      style: { backgroundColor: "#41a7ff", textColor: "black" },
    },
    {
      option: "2",
      image: {
        uri: "/kit_100_2.png",
        landscape: true,
        sizeMultiplier,
        offsetX,
      },
      style: { backgroundColor: "#0089ff", textColor: "black" },
    },
    {
      option: "3", // text
      image: {
        uri: "/5_milion_3.png",
        landscape: true,
        sizeMultiplier,
        offsetX,
      },
      style: { backgroundColor: "#41a7ff", textColor: "black" },
    },
    {
      option: "4",
      image: {
        uri: "/kit_150_4.png",
        landscape: true,
        sizeMultiplier,
        offsetX,
      },
      style: { backgroundColor: "#0089ff", textColor: "black" },
    },
    {
      option: "5",
      image: {
        uri: "/teeth_whitening_strip_5.png",
        landscape: true,
        sizeMultiplier: sizeMultiplier * 1.5,
        offsetX,
      },
      style: { backgroundColor: "#41a7ff", textColor: "black" },
    },
    {
      option: "6",
      image: {
        uri: "/kit_200_6.png",
        landscape: true,
        sizeMultiplier,
        offsetX,
      },
      style: { backgroundColor: "#0089ff", textColor: "black" },
    },
    {
      option: "7",
      image: {
        uri: "/electric_toothbrush_7.png",
        landscape: true,
        sizeMultiplier: sizeMultiplier * 1.7,
        offsetX,
      },
      style: { backgroundColor: "#41a7ff", textColor: "black" },
    },
    {
      option: "8",
      image: {
        uri: "/kit_250_8.png",
        landscape: true,
        sizeMultiplier,
        offsetX,
      },
      style: { backgroundColor: "#0089ff", textColor: "black" },
    },
    {
      option: "9", //text
      image: {
        uri: "/1_milion_9.png",
        landscape: true,
        sizeMultiplier,
        offsetX,
      },
      style: { backgroundColor: "#41a7ff", textColor: "black" },
    },
  ];

  return (
    <>
      <Box position={"relative"} className={"ring"}>
        {/*border*/}
        <Box
          sx={{
            zIndex: 2,
            position: "absolute",
            border: "#152b9a 10px solid ",
            boxShadow: `inset 0 0 ${shadow}px black`,
            width: "100%",
            height: "100%",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1000000,
          }}
        >
          {Array.from({ length: 46 }).map((_, i, array) => {
            const len = (360 / array.length) * i;
            const x = i % 2 ? "1" : "2";
            return (
              <Box
                key={i}
                sx={{
                  width: "100%",
                  position: "absolute",
                  transform: `rotate(${len}deg)`,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    transform: `  translateX(-125%)`,
                    transformOrigin: "200% 110%",
                    // zIndex: 10
                  }}
                  className={`light${x}`}
                ></Box>
              </Box>
            );
          })}
        </Box>
        {/*end border*/}
        {/* pointer*/}
        <Box
          sx={{
            position: "absolute",
            zIndex: 3,
            // background: 'red',
            width: "12%",
            left: "11%",
            top: "11%",
            aspectRatio: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={"/Path.png"}
            style={{
              width: "100%",
              background: 'url("") no-repeat',
              transform: "rotate(-45deg)",
            }}
          />
        </Box>
        {/* end pointer*/}
        {/*logo*/}
        <Box
          sx={{
            position: "absolute",
            zIndex: 4,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              transition: "all .5s ease-in-out",
              boxShadow: ` 0 0 ${shadow}px black`,
              background: "white",
              width: mustSpin ? "20%" : "18%",
              height: mustSpin ? "20%" : "18%",
              borderRadius: 1000000,
              position: "relative",
            }}
          >
            <Image
              src={"/logo.png"}
              fill={true}
              style={{ objectFit: "contain", userSelect: "none" }}
              alt={"smile"}
            />
          </Box>
        </Box>
        {/*end logo*/}

        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          innerBorderWidth={1}
          radiusLineWidth={0}
          // radiusLineColor={'white'}
          outerBorderWidth={0}
          pointerProps={{
            src: "/Path.png",
            style: {
              display: "none",
              transform: "rotate(-45deg) translateX(-45px)",
            },
          }}
          data={data}
          onStopSpinning={() => {
            onStop && onStop();
          }}
        />
      </Box>
    </>
  );
}

export default React.memo(Well);
