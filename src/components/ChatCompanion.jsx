import { useEffect } from "react";

const ChatCompanion = () => {
  useEffect(() => {
    // Inject Botpress Webchat Script
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://files.bpcontent.cloud/2025/03/25/18/20250325181220-N0RT2D4T.js";
    script2.async = true;
    document.body.appendChild(script2);

    console.log("ChatCompanion Loaded & Scripts Injected");

    return () => {
      if (document.body.contains(script1)) document.body.removeChild(script1);
      if (document.body.contains(script2)) document.body.removeChild(script2);
    };
  }, []);

  return null; // No need to return a visible component
};

export default ChatCompanion;
