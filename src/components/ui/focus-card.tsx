"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { TbZoomScan } from "react-icons/tb";
import { RiCloseLargeFill } from "react-icons/ri";
import { CertificateType } from "@/types/CertificateType";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    setActiveModal,
    setActiveImage,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
    setActiveImage: React.Dispatch<React.SetStateAction<string>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => {
        setActiveImage(card.image);
        setActiveModal(true);
      }}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-52 w-full transition-all duration-300 ease-out hover:cursor-pointer",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <Image
        src={card.image}
        alt={card.title}
        fill
        className="object-cover absolute inset-0"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-4 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="absolute inset-0 text-white flex justify-center items-center flex-col text-4xl">
          <TbZoomScan />
          <h1 className="text-lg font-semibold font-poppins shadow-2xl">
            View Certificate
          </h1>
        </div>
        {/* <div className="text-xl md:text-2xl line-clamp-1 font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200 font-poppins">
          {card.title}
        </div> */}
      </div>
    </div>
  )
);

Card.displayName = "Card";

export type Card = {
  title: string;
  src: string;
};

export function FocusCards({ cards }: { cards: CertificateType[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState<string>("");
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          setActiveModal={setActiveModal}
          setActiveImage={setActiveImage}
        />
      ))}
      <div
        onClick={() => {
          setActiveModal(false);
          setActiveImage("");
        }}
        className={`flex justify-center items-center backdrop-blur-sm fixed inset-0 duration-100 overflow-hidden ${
          activeModal ? "opacity-100 z-50" : "opacity-0 -z-10"
        }`}
      >
        <Image
          onClick={(event) => event.stopPropagation()}
          className={`${
            activeModal ? "scale-100" : "scale-0"
          } w-[90%] h-auto sm:w-auto sm:h-[80%] md:h-[90%] object-cover md:w-auto duration-300 ease-in-out border border-gray-950`}
          style={{ boxShadow: "0 0 10px 5px rgba(0,0,0,0.5)" }}
          src={activeImage}
          alt="zoom-image"
          width={500}
          height={500}
        />
        <div
          className="p-3 text-white absolute top-2 right-2 md:top-4 md:right-4 cursor-pointer text-2xl md:text-base"
          onClick={() => {
            setActiveModal(false);
            setActiveImage("");
          }}
        >
          <RiCloseLargeFill />
        </div>
      </div>
    </div>
  );
}
