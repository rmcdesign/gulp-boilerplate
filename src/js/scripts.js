import collapse from './modules/collapse';
import $ from 'jquery';

if($('.collapse').length) {
    // testing to see if you can pass params to module
    collapse('.collapse');
}

console.log('js working');