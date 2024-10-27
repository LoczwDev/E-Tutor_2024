import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { useRef, useEffect, useState } from "react";
import { toast } from "sonner";

const Testvideo = () => {
  const player = useRef(null);
  
  const [lastAllowedTime, setLastAllowedTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0); // Track played seconds
  const [hasReached90Percent, setHasReached90Percent] = useState(false);

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleSeeked = () => {
    const currentTime = player.current?.currentTime;

    // Check if the user skipped more than 10 seconds
    if (currentTime - lastAllowedTime > 1000) {
      toast.warning("Bạn không được tua quá 10 giây!", {
        position: "top-center",
        autoClose: 3000,
      });

      player.current?.pause();
      player.current.currentTime = lastAllowedTime; // Return to the last allowed time
    } else {
      setLastAllowedTime(currentTime);
    }
  };

  useEffect(() => {
    const playerElement = player.current;

    if (!playerElement) return;

      const currentTime = playerElement.currentTime;
      setPlayedSeconds(currentTime);
      console.log("Current Time:", currentTime); 

      if (duration && currentTime >= duration * 0.9 && !hasReached90Percent) {
        toast.info("Bạn đã xem được 90% video!", {
          position: "top-center",
          autoClose: 3000,
        });
        setHasReached90Percent(true); // Set 90% reached flag
      }

  }, [duration, hasReached90Percent, player.current?.currentTime]); // Dependencies: duration and hasReached90Percent
  console.log(hasReached90Percent);

  return (
    <div className="w-[1000px] h-[50vh]">
      <MediaPlayer
        ref={player}
        onDurationChange={handleDuration}
        onSeeked={handleSeeked}
        title="Sprite Fight"
        src="https://res.cloudinary.com/dkpfegzir/video/upload/v1729176133/videos/ox4mtf32hdhx4rfrwuyp.mp4"
      >
        <MediaProvider />
        <DefaultVideoLayout
          thumbnails="https://cdn.mobilecity.vn/mobilecity-vn/images/2023/08/hinh-nen-genshin-impact-4k.jpg.webp"
          icons={defaultLayoutIcons}
        />
      </MediaPlayer>
    </div>
  );
};

export default Testvideo;
