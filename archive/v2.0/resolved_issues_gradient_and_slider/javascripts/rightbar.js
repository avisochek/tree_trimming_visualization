$(document).on("ready",function(){

$(window).scroll(function(){
    $('#rightbar').css({
        'right': 0-$(this).scrollLeft() //Why this 15, because in the CSS, we have set left 15, so as we scroll, we would want this to remain at 15px left
    });
});

});
