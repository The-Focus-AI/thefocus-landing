import React from "react";
import type { RenderFunctionInput } from "astro-opengraph-images";
export async function ogimage({
  title,
  description,
}: RenderFunctionInput): Promise<React.ReactNode> {
  return Promise.resolve(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#000",
        padding: "55px 70px",
        color: "#fff",
        fontFamily: "DM Sans",
        fontSize: 72,
      }}
    >
      <div
        style={{
          marginTop: 96,
          fontWeight: 700,
          marginBottom: 16,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 40,
        }}
      >
        {description ?? ""}
      </div>
    </div>
  );
}
