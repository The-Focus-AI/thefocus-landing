"use client";

import { useEffect } from "react";

export type ElevenLabsProps = {
  publicUserId: string;
  textColorRgba?: string;
  backgroundColorRgba?: string;
  size?: "small" | "large";
  children?: React.ReactNode;
  projectId?: string;
};

export const ElevenLabsAudioNative = ({
  publicUserId,
  size,
  textColorRgba,
  backgroundColorRgba,
  children,
  projectId,
}: ElevenLabsProps) => {
  useEffect(() => {
    const loadPlayer = async () => {
      await import("https://elevenlabs.io/player/audioNativeHelper.js");
    };

    loadPlayer();
  }, []);

  projectId = "0Smw0jZv15JcwG0bKHP2";

  return <></>;
};
/*
    <div
      id="elevenlabs-audionative-widget"
      data-height={size === "small" ? "90" : "120"}
      data-width="100%"
      data-frameborder="no"
      data-scrolling="no"
      data-publicuserid={publicUserId}
      data-playerurl="https://elevenlabs.io/player/index.html"
      data-small={size === "small" ? "True" : "False"}
      data-textcolor={textColorRgba ?? "rgba(0, 0, 0, 1.0)"}
      data-backgroundcolor={backgroundColorRgba ?? "rgba(255, 255, 255, 1.0)"}
      data-projectid={projectId}
    >
      {children ? children : "Elevenlabs AudioNative Player"}
    </div>
  );
};*/

export default ElevenLabsAudioNative;
