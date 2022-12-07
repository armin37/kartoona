import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as Plyr from 'plyr';
import {DomSanitizer} from '@angular/platform-browser';
import Hls from 'hls.js';

declare var window: any;

@Component({
  selector: 'video-player-component',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {
  @Input() id;
  @Input() url;
  player;
  plyr;

  constructor(public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const video = document.getElementById('id');
    let addVideo = document.createElement('video');
    video.appendChild(addVideo);
    console.log(video);
    // For more options see: https://github.com/sampotts/plyr/#options
    const defaultOptions: any = {
      controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
      enabled: true,
      clickToPlay: true,
      ads: {
        enabled: true,
        tagUrl: 'https://vfetch.yektanet.com/api/v1/load/5c6d6424-d667-40e8-8442-41361168e45f'
      },
    };

    if (Hls.isSupported()) {
      // For more Hls.js options, see https://github.com/dailymotion/hls.js
      const hls = new Hls();
      hls.attachMedia(addVideo);

      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        // From the m3u8 playlist, hls parses the manifest and returns
        // all available video qualities. This is important, in this approach,
        // we will have one source on the Plyr player.
        console.log(this.url);
        hls.loadSource(this.url);
        hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
          console.log('MANIFEST_PARSED');
          window.hls = hls;
          // Transform available levels into an array of integers (height values).
          const availableQualities = hls.levels.map((l) => l.height);

          // Add new qualities to option
          defaultOptions.quality = {
            default: availableQualities[availableQualities.length - 1],
            options: availableQualities,
            // this ensures Plyr to use Hls to update quality level
            // Ref: https://github.com/sampotts/plyr/blob/master/src/js/html5.js#L77
            forced: true,
            onChange: (e) => this.updateQuality(e),
          };

          // Initialize new Plyr player with quality options
          this.plyr = new Plyr(addVideo, defaultOptions);
        });
      });
    } else {
      // default options with no quality update in case Hls is not supported
      this.plyr = new Plyr(video, defaultOptions);
    }
  }

  updateQuality(newQuality) {
    window.hls.levels.forEach((level, levelIndex) => {
      if (level.height === newQuality) {
        console.log('Found quality match with ' + newQuality);
        window.hls.currentLevel = levelIndex;
      }
    });
  }
}
