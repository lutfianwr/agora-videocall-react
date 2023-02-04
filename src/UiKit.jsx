import React, { useState } from "react";
import AgoraUIKit from "agora-react-uikit";

const UiKit = () => {
  const [videoCall, setVideoCall] = useState(true);
  const rtcProps = {
    appId: "975fe061fc2545ab9689211c11541c02",
    channel: "usd", // your agora channel
    token:
      "007eJxTYFgeLZlhzHfh6Lbdic4P/eVWyxWuOHU00+7Df/nn5/lUEm0UGCzNTdNSDcwM05KNTE1ME5MszSwsjQwNkw0NTU0Mkw2MinzWJjcEMjJY1jxlYIRCEJ+ZobQ4hYEBAPUuHgI=",
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };
  return videoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <h3 onClick={() => setVideoCall(true)}>Start Call</h3>
  );
};

export default UiKit;
