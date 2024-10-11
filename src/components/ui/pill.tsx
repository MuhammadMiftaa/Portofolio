import React from "react";

export default function Pill(props: { tech: string; idx: number }) {
  return (
    <span
      key={props.idx}
      className="bg-[#272729] text-slate-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-600 "
    >
      {props.tech}
    </span>
  );
}
