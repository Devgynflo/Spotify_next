"use client";

import { Song } from "@/types";
import { useEffect, useState } from "react";
import { useSound } from "use-sound";
//Hooks
import usePlayer from "@/hooks/usePlayer";
//Components
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";
//Icons

import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent = ({ song, songUrl }: PlayerContentProps) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPLaying, setIsPlaying] = useState(false);

  const Icon = isPLaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onpause: () => setIsPlaying(false),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPLaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];
    //Si aucune prochaine musique , retour sur la première musique de la playlist

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }
    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }
    player.setId(previousSong);
  };

  return (
    <div
      className="
            grid
            grid-cols-2
            md:grid-cols-3
            h-full
    "
    >
      <div className="flex w-full justify-start">
        <div
          className="
            flex
            items-center
            gap-x-4
        "
        >
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      {/* Mobile */}
      <div
        className="
        flex
        md:hidden
        col-auto
        w-full
        justify-end
        items-center
      "
      >
        <div
          onClick={handlePlay}
          className="
          h-10
          w-10
          flex
          items-center
          justify-center
          rounded-full
          bg-white
          p-1
          cursor-pointer

        "
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div
        className="
        hidden 
        md:flex 
        h-full 
        w-full 
        justify-center 
        items-center 
        max-w-[722px] 
        gap-x-6"
      >
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="
                text-neutral-400
                cursor-pointer
                hover:text-white
                transition
            "
        />
        <div
          onClick={handlePlay}
          className="
          h-10
          w-10
          flex
          items-center
          justify-center
          rounded-full
          bg-white
          p-1
          cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="
                text-neutral-400
                cursor-pointer
                hover:text-white
                transition
            "
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
