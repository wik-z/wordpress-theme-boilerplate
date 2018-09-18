const mix = require('laravel-mix');

mix
    .setPublicPath('dist')
    .js('src/js/app.js', 'dist/js')
    .sass('src/scss/app.scss', 'dist/css');