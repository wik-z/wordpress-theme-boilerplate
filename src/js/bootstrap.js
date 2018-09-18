import Vue from 'vue';
import $ from 'jquery';
import axios from 'axios';

window.Vue = Vue;
window.$ = window.jQuery = $;
window.axios = axios;

window.axios.defaults.headers.common['Accept'] = 'application/json';