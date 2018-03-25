$(function(){ $('#webTicker').webTicker();
			});
var audio;
var playlist;
var tracks;
var current;

init();
function init(){
    current = 0;
    audio = $('audio');
    playlist = $('#playlist');
    tracks = playlist.find('li a');
    len = tracks.length - 1;
    audio[0].volume = .5;
    audio[0].pause();
    playlist.find('a').click(function(e){
        e.preventDefault();
        link = $(this);
        current = link.parent().index();
        run(link, audio[0]);
    });
    audio[0].addEventListener('ended',function(e){
        current++;
        if(current == len){
            current = 0;
            link = playlist.find('a')[0];
        }else{
            link = playlist.find('a')[current];    
        }
        run($(link),audio[0]);
    });
}
function run(link, player){
        player.src = link.attr('href');
        par = link.parent();
        par.addClass('active').siblings().removeClass('active');
        audio[0].load();
        audio[0].play();
}
$(function() {
    $("#videolist li").on("click", function() {
        $("#videoarea").attr({
            "src": $(this).attr("movieurl"),
            "poster": "",
            "autoplay": "autoplay"
        });
    });
    $("#videoarea").attr({
        "src": $("#videolist li").eq(0).attr("movieurl"),
        "poster": $("#videolist li").eq(0).attr("moviesposter")
    });
});

$('#smallImages').delegate('img', 'click', function() {
    $('#largeImages').attr('src', $(this).attr('src').replace('thumb', 'large'));
    window.location.hash = $('#smallImages img').index(this)+1;
});

var wlh = window.location.hash[1];
if (!isNaN(wlh)) {
    $('#largeImages').attr('src', $('#smallImages img').eq(wlh-1).attr('src').replace('thumb', 'large'));
}