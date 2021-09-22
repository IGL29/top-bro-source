export default function setVideoControls({
  wrapVideoElements,
  hideIconClass,
  videoElementClass,
  iconPlayClass
}) {
  videoElementClass = `.${videoElementClass}`;
  iconPlayClass = `.${iconPlayClass}`;

  for (const wrapElement of wrapVideoElements) {

    wrapElement.addEventListener('click', () => {
      const videoElement = wrapElement.querySelector(videoElementClass);
      const iconPlayElement = wrapElement.querySelector(iconPlayClass);

      if (videoElement.paused) {
        iconPlayElement.classList.add(hideIconClass);
        videoElement.controls = true;
        return;
      }
      iconPlayElement.classList.remove(hideIconClass);
      videoElement.controls = false;
      videoElement.pause();
    });
  }
}
