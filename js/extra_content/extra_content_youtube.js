import { ExtraContent } from "./extra_content.js";

export class ExtraContentYoutube extends ExtraContent {
  constructor({
    videoId = null,
    controls = false,
    muted = true,
    loop = true,
    hidden = false,
    playlistId = null,
  }) {
    super({
      id: "youtube",
      hidden: hidden,
      content: `<div id="youtube" class="columns is-centered${
        hidden ? " is-hidden" : ""
      }">
        <div class="column is-three-fifths">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title"></p>
              <button id="youtube-close" class="delete is-large" aria-label="close"></button>
            </header>
            <div class="card-image">
              <figure class="image is-16by9">
                <iframe class="has-ratio" src="https://www.youtube.com/embed/${videoId}?autoplay=1&controls=${
        controls ? 1 : 0
      }&disablekb=1&loop=${loop ? 1 : 0}&modestbranding=1&mute=${
        muted ? 1 : 0
      }&playlist=${
        playlistId != null ? playlistId : videoId
      }" title="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </figure>
            </div>
          </div>
        </div>
      </div>`,
    });
    this.videoId = videoId;
    this.initialVideoId = videoId;
    this.playlistId = playlistId != null ? playlistId : videoId;
    this.initialPlaylistId = playlistId;
    this.controls = controls;
    this.muted = muted;
    this.loop = loop;
    this.hidden = hidden;
  }

  videoId;
  initialVideoId;
  controls = false;
  muted = true;
  loop = true;
  playlistId = null;
  initialPlaylistId = null;

  init() {
    super.init();
    if (this.document == null) {
      return;
    }
    const youtube = this.document.getElementById(this.id);
    if (youtube == null) {
      return;
    }
    if (this.initialVideoId != null && this.initialVideoId.trim() != "") {
      this.updateVideo({
        videoId: this.initialVideoId,
        playlistId: this.initialPlaylistId,
      });
    } else {
      youtube.querySelector("iframe").src = "";
    }
  }

  updateVideo({ videoId, playlistId = null }) {
    this.videoId = videoId;
    this.playlistId = playlistId != null ? playlistId : videoId;
    if (this.document == null) {
      return;
    }
    const youtube = this.document.getElementById("youtube");
    if (youtube == null) {
      return;
    }
    youtube.querySelector(
      "iframe"
    ).src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=${
      this.controls ? 1 : 0
    }&disablekb=1&loop=${this.loop ? 1 : 0}&modestbranding=1&mute=${
      this.muted ? 1 : 0
    }&playlist=${playlistId}`;
  }

  addEvent({ document }) {
    const youtubeClose = document.getElementById("youtube-close");
    youtubeClose.onclick = function () {
      // Stop the video.
      document.getElementById("youtube").classList.add("is-hidden");
      document.getElementById("youtube").querySelector("iframe").src = "";
    };
  }
}
