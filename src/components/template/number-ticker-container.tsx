import React from "react";
import NumberTicker from "../ui/number-ticker";

export default function NumberTickerContainer(props: {
  title: string;
  value: number;
  idx: number;
}) {
  return (
    <div
      key={props.idx}
      data-aos="zoom-in"
      data-aos-duration="800"
      data-aos-delay="200"
      className="aspect-square md:h-40 w-full border border-gray-500 bg-gradient-to-t from-[rgba(255,255,255,0.1)] via-transparent to-transparent rounded-xl flex items-center justify-center relative"
    >
      <p className="text-gray-400 font-urbanist text-xs sm:text-base md:text-lg absolute top-2 left-2">
        {props.title}
      </p>
      <NumberTicker
        className="text-white font-poppins text-3xl sm:text-4xl md:text-6xl pt-3 tracking-tight"
        value={props.value}
      />
      {props.title === "Average" && (
        <span className="text-gray-400 text-sm sm:text-base md:text-xl font-urbanist pt-8">
          /day
        </span>
      )}
    </div>
  );
}
