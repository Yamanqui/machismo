import React from 'react';
import { DataState, Data } from '../utils/types';


function useKeybordControl(
  dataState: DataState,
  data: Data,
  setFrame: React.Dispatch<React.SetStateAction<number>>,
  speed: number,
  repeat: boolean,
) {
  const timer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    function handleKeyPressed(event: KeyboardEvent) {
      if (event.key === ' ') {
        playPause();
      } else if (event.key === 'ArrowUp') {
        stop();
        back();
      } else if (event.key === 'ArrowDown') {
        stop();
        advance(true);
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        stop();
      }
    }

    function advance(forced = false) {
      if (dataState === DataState.Ready) {
        setFrame((currFrame) => {
          let nextFrame = currFrame + 1;
          if (nextFrame >= data.times.length) {
            if (forced || repeat) {
              nextFrame = 0;
            } else {
              stop();
              nextFrame = currFrame;
            }
          }
          return nextFrame;
        });
      }
    }

    function back() {
      if (dataState === DataState.Ready) {
        setFrame((currFrame) => {
          let prevFrame = currFrame - 1;
          if (prevFrame < 0) {
            prevFrame = data.times.length - 1;
          }
          return prevFrame;
        });
      }
    }

    function play() {
      if (dataState === DataState.Ready) {
        window.clearInterval(timer.current);
        timer.current = window.setInterval(() => advance(), 1000 / speed);
      }
    }

    function stop() {
      window.clearInterval(timer.current);
      timer.current = undefined;
    }

    function playPause() {
      if (timer.current === undefined) {
        play();
      } else {
        stop();
      }
    }

    document.addEventListener('keydown', handleKeyPressed);

    return () => {
      document.removeEventListener('keydown', handleKeyPressed);
    };
  }, [data, dataState, setFrame, speed, repeat]);


}

export default useKeybordControl;