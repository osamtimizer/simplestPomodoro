const path = require('path');

module.exports = {
  target: 'web',
  entry: {
    index: './public/javascripts/index.js',
    main: './public/javascripts/main.js',
    pomodoro: './public/javascripts/pomodoro.js',
    isAuth: './public/javascripts/isAuth.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/public/build')
  }
}
