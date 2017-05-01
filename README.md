# YouTube Auto HD

Chrome Extension that lets you specify the preferred video compression of the player (e.g.: 360p, 720p).

The goal is to support the latest YouTube player and to enable more user preferences.

**Chrome Webstore** link for plugin:

<https://chrome.google.com/webstore/detail/auto-hd-for-youtube-opens/ieabagkfbldpcgdnnlckchlnkmneamml>

## Develop

- Create project directory for development, `cd` there
- Run `git clone https://github.com/peter-lang/autohd.git`
- In Chrome, open: `chrome://extensions/`
- Check `Developer mode` checkbox
- Press `Load unpacked extension...` and navigate to the `AutoHD` directory in your project directory

### Project files

- `mainfest.json`: manifest file for extension
- `contentscript.js`:
  - injects `script.js` and storage data to HTML DOM
- `script.js`:
  - listens for `onYouTubePlayerReady` event
  - uses the YouTube API

### Docs

About Chrome Extensions:
- <https://developer.chrome.com/extensions/getstarted>

## Contribute

If you wanna contribute or have any questions just mail me:
- [lang.peter.github@gmail.com](mailto:lang.peter.github@gmail.com?Subject=AutoHD)

