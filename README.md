# YouTube Auto HD

Chrome Extension that lets you specify the preferred video compression of the player (e.g.: 360p, 720p).

The goal is to support the latest YouTube player, and to enable more user preferences.

**Chrome Webstore** link for plugin:
<https://chrome.google.com/webstore/detail/auto-hd-for-youtube-opens/ieabagkfbldpcgdnnlckchlnkmneamml>

## Develop

- Create directory for development, `cd` there
- Run `git clone https://github.com/peter-lang/autohd.git`
- In Chrome, open: <chrome://extensions/>
- Check `Developer mode` checkbox
- Press `Load unpacked extension...` and navigate to the `AutoHD` directory in your project folder

### Project files

- `mainfest.json`: manifest file for extension
- `background.js`:
  - used for legacy Flash players
  - adds `?hd=1` query param
- `contentscript.js`:
  - used for HTML5 players
  - injects `script.js` to HTML DOM
- `script.js`:
  - listens for `onYouTubePlayerReady` event
  - uses the reverse-engineered YouTube API

### Docs

About Chrome Extensions:
- <https://developer.chrome.com/extensions/getstarted>

## Contribute

Feel free to **pull requests** or to **apply as contributor**.

If you have any questions just mail me:
- [lang.peter.github@gmail.com](mailto:lang.peter.github@gmail.com?Subject=AutoHD)

