"use client";

import React from "react";
import "../mural.css";

interface WoodBoardProps {
  title: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export default function WoodBoard({ title, children, fullWidth = false, className = "" }: WoodBoardProps) {
  return (
    <div 
      className={`wood-board ${className}`}
      style={fullWidth ? { gridColumn: "1 / -1" } : undefined}
    >
      <div className="wood-notch" aria-hidden="true" />
      <div className="bolt-right" aria-hidden="true" />
      <div className="bolt-bottom-left" aria-hidden="true" />
      <div className="bolt-bottom-right" aria-hidden="true" />
      <div className="wood-board-content">
        <h2 className="board-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}
