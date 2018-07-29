import Vue from 'vue';
import $ from 'jquery';
import axios from 'axios';

// import styles
import '../../css/src/app.scss';

window.Vue = Vue;
window.$ = window.jQuery = $;
window.axios = axios;


window.axios.defaults.headers.common['accept'] = 'application/json';