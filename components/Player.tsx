"use client";

import useGetSongById from "@/hooks/useGetSongsById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
//Components
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const songUrl = useLoadSongUrl(song!);

  if (!player.activeId || !song || !songUrl) {
    return null;
  }

  return (
    <div
      className="
    fixed
    bottom-0
    bg-black
    py-2
    px-4
    w-full
    h-[80px]
  "
    >
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};

export default Player;
