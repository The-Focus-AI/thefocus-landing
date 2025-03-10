/*---
---
<div
    id="elevenlabs-audionative-widget"
    data-height="90"
    data-width="100%"
    data-frameborder="no"
    data-scrolling="no"
    data-publicUserId="35dce06c47f602962978963a788374c31ce9d25a7764e80220eae64f51bfc6f3"
    data-playerUrl="https://elevenlabs.io/player/index.html"
    data-projectId="0Smw0jZv15JcwG0bKHP2"
  >
    Loading the AudioNative Player...
</div>
<script src="https://elevenlabs.io/player/audioNativeHelper.js" type="text/javascript"></script>


// ElevenLabsAudioNative.tsx
*/
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
    const script = document.createElement("script");

    script.src = "https://elevenlabs.io/player/audioNativeHelper.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  projectId = "0Smw0jZv15JcwG0bKHP2";

  return (
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
};

export default ElevenLabsAudioNative;
