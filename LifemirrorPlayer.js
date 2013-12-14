/**
 * A classy way to play HTML5 videos on a loop without gaps
 * @author LifeMirror http://www.lifemirror.org/
 * @constructor
 */
function LifemirrorPlayer() {}
var Lifemirror = {};

/**
 * @param playlist An array of URLs to be played - see documentation for details
 * @param container The HTML ID of the element to insert videos into
 * @param baseurl The base URL to append to videos
 * @param options A list of additional <video> options, if any
 */
LifemirrorPlayer.prototype.initialise = function(playlist, container, baseurl, options) {
    Lifemirror.playlist   = playlist;
    Lifemirror.container  = container;
    Lifemirror.baseurl    = baseurl;
    Lifemirror.options    = options;
    Lifemirror.preloaded  = 0;
}


LifemirrorPlayer.prototype.preloadVideos = function() {
    for(var index in Lifemirror.playlist)
    {
        // Prepare HTML to insert
        // This is necessary to prevent the browser closing tags
        var htmlToInsert = "<video height='100%' width='100%' preload oncanplaythrough='LifemirrorPlayer.preloaderCallback()' onended='LifemirrorPlayer.videoCallback(\""+Lifemirror.playlist[index]+"\")' id='"+Lifemirror.playlist[index]+"' style='display:none'"+Lifemirror.options+">";
            htmlToInsert += "<source src='"+Lifemirror.baseurl+Lifemirror.playlist[index]+"/video.mp4' type='video/mp4'>";
            htmlToInsert += "<source src='"+Lifemirror.baseurl+Lifemirror.playlist[index]+"/video.ogg' type='video/ogg'>";
            htmlToInsert += "</video>";

        // Insert the HTML
        document.getElementById(Lifemirror.container).innerHTML += htmlToInsert;
    }
}

LifemirrorPlayer.startPlaying = function() {
    var object = document.getElementById(Lifemirror.playlist[0]);
    object.style.display = 'inline';
    object.play();
}

LifemirrorPlayer.videoCallback = function(id) {
    // Hide current object
    document.getElementById(id).style.display = 'none';

    // Find next object in array
    var index = Lifemirror.playlist.indexOf(id) + 1;
    if(index >= Lifemirror.playlist.length) index = 0;

    // Show next video
    var object = document.getElementById(Lifemirror.playlist[index]);
    object.style.display = 'inline';
    object.play();
}

LifemirrorPlayer.preloaderCallback = function() {
    Lifemirror.preloaded++;
    if(Lifemirror.preloaded == Lifemirror.playlist.length) this.startPlaying();
}
