const path = require('path');
const fs = require('fs');

let yml = fs
  .readFileSync(path.resolve(__dirname, `spec-${process.env.stage}.yml`))
  .toString();

if (process.env.stage == 'STAGING') {
  console.log(
    yml
      .replace('$VERSION', process.env.version)
      .replace('$REACT_APP_NEWS_API_KEY', process.env.REACT_APP_NEWS_API_KEY)
      .replace('$REACT_APP_NEWS_API_KEY', process.env.STAGING_BACKEND_URL)
      .replace(
        '$REACT_APP_NEWS_API_KEY',
        process.env.STAGING_CRASH_GAME_BACKEND_URL
      )
  );
} else if (process.env.stage == 'PRODUCTIVE') {
  console.log(
    yml
      .replace('$VERSION', process.env.version)
      .replace('$REACT_APP_NEWS_API_KEY', process.env.REACT_APP_NEWS_API_KEY)
      .replace('$REACT_APP_NEWS_API_KEY', process.env.PRODUCTIVE_BACKEND_URL)
      .replace(
        '$REACT_APP_NEWS_API_KEY',
        process.env.PRODUCTIVE_CRASH_GAME_BACKEND_URL
      )
  );
}
