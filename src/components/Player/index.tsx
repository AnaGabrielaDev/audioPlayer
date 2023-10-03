"use client"
import Image from "next/image"
import PlayerButton from "./PlayerButton"
import { MdSkipPrevious, MdSkipNext, MdPause, MdPlayArrow } from "react-icons/md"
import { useEffect, useRef, useState } from "react"

export interface PlayerProps {
  musicName: string
  musicPicture: string
  musicUrl: string
}

export function Player({musicUrl, musicName, musicPicture}: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(new Audio(musicUrl));
  const audio = audioRef.current;

  useEffect(() => {
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    return () => {
      audio.removeEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
      });
    };
  }, [audio])

  function play() {
    const audio = audioRef.current;

    if(isPlaying) {
      audio.pause()
      setIsPlaying(false)
    }else {
      audio.play()
      setIsPlaying(true)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  const handleTimeSliderChange = (e: any) => {
    const audio = audioRef.current;
    audio.currentTime = e.target.value;
    setCurrentTime(audio.currentTime);
  }

  return (
    <div className="w-screen h-screen bottom-0 absolute">
      <div className="bg-zinc-900 w-full absolute bottom-0 flex flex-col">
        <input className="range accent-green-500" type="range" min="0" max={audio.duration} value={currentTime} onChange={handleTimeSliderChange} />
        <div className="items-center grid grid-cols-3">
          <div className="mx-12 flex items-center gap-4">
            <Image src={musicPicture} width={50} height={50} quality={80} style={{objectFit: "contain"}} alt="image of player" />
            <p className="text-lg">{musicName}</p>
          </div>
          <div className="flex justify-center">
            <PlayerButton> <MdSkipPrevious className="text-white hover:text-emerald-500" size={32} /> </PlayerButton>
            <PlayerButton onClick={play}> 
              <>
                {isPlaying && <MdPause className="text-white hover:text-emerald-500" size={32} />}
                {!isPlaying && <MdPlayArrow className="text-white hover:text-emerald-500" size={32} />}
              </>
            </PlayerButton>
            <PlayerButton> <MdSkipNext className="text-white hover:text-emerald-500" size={32}/> </PlayerButton>
          </div>
          <div>
            <p>{formatTime(currentTime)} / {(audio.duration ? formatTime(audio.duration): "0:00")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}