var $wrapper = $('#wrapper ul');
var tick = 0;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function foobar() {
    var num = 36;
    var width = 100;
    
    
    var rand = getRandomInt(2, 37);
    var movement = (num * (width)) - 150 + rand;
    
    $wrapper.css({left: ($wrapper.position().left - movement)});
    
}

$(document).ready(function () {
    $('#start').on('click', function () {
        foobar();
    });
});