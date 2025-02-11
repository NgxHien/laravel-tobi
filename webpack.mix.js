const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css/font.css')
    .postCss('resources/css/custom.css', 'public/css')
    .postCss("resources/css/app.css", "public/css", [
        require("tailwindcss"),
    ])
    .copy('node_modules/flickity/dist/flickity.min.css', 'public/css')
    .copy('node_modules/flickity/dist/flickity.pkgd.min.js', 'public/js')
    .copy('node_modules/jquery/dist/jquery.min.js', 'public/js')
    .js('resources/js/ajax.js', 'public/js');
