import React, { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import VideoPlayer from "./VideoPlayer";

const APP_ID = "975fe061fc2545ab9689211c11541c02";
const TOKEN =
  "007eJxTYFgeLZlhzHfh6Lbdic4P/eVWyxWuOHU00+7Df/nn5/lUEm0UGCzNTdNSDcwM05KNTE1ME5MszSwsjQwNkw0NTU0Mkw2MinzWJjcEMjJY1jxlYIRCEJ+ZobQ4hYEBAPUuHgI=";
const CHANNEL = "usd";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const VideoRoom = ({ setJoined }) => {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  };

  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };

  const leaveRoom = () => {
    setJoined(false);
    for (let localTrack of localTracks) {
      localTrack.stop();
      localTrack.close();
    }
    client.off("user-published", handleUserJoined);
    client.off("user-left", handleUserLeft);
    client.unpublish(localTracks).then(() => client.leave());
  };

  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);

    client
      .join(APP_ID, CHANNEL, TOKEN, null)
      .then((uid) =>
        Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
      )
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        client.publish(tracks);
      });

    return () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.off("user-published", handleUserJoined);
      client.off("user-left", handleUserLeft);
      client.unpublish(localTracks).then(() => client.leave());
    };
  }, []);

  return (
    <div>
      VideoRoom
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 200px)",
          gap: "20px",
        }}
      >
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} />
        ))}
      </div>
      <button style={{ margin: "15px" }} onClick={() => leaveRoom()}>
        Leave Room
      </button>
    </div>
  );
};

export default VideoRoom;
