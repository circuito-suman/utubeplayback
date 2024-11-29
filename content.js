let knob = document.createElement("div");
knob.style.cssText =
  "width:60px;height:60px;border-radius:50%;background-color:#007BFF;position:fixed;right:20px;bottom:20px;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px";
knob.innerText = "1.0";
document.body.appendChild(knob);

let playbackRate = 1;
let totalRotation = 0;

const setPlaybackRate = (rate) => {
  const video = document.querySelector("video");
  if (video) {
    playbackRate = Math.max(0.25, Math.min(10, rate));
    video.playbackRate = playbackRate;
    knob.innerText = playbackRate.toFixed(1);
    knob.style.transform = `rotate(${(playbackRate - 1) * 36}deg)`;
    knob.style.backgroundColor = `rgba(0,123,255,${playbackRate / 10})`;
  }
};

setPlaybackRate(playbackRate);

knob.addEventListener("wheel", (event) => {
  event.preventDefault();
  const increment = event.deltaY < 0 ? 0.1 : -0.1; //
  const newPlaybackRate = playbackRate + increment;
  setPlaybackRate(newPlaybackRate);
  totalRotation += increment * 360;
});

// MutationObserver to watch for video element changes
const observer = new MutationObserver(() => {
  const video = document.querySelector("video");
  if (video) {
    setPlaybackRate(playbackRate);
    observer.disconnect();
  }
});

// Start observing changes in the body
observer.observe(document.body, { childList: true, subtree: true });
