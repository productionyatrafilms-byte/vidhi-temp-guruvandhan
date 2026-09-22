// index.html — "Gyan ke Dohe" state machine.
// data-state="idle" -> "open" on click; no slider/carousel — only the first Gyan slide (Mati)
// is ever shown. Each real slide (Mati/Shrut) holds its own <video>; the play/pause/replay
// controls below act on whichever slide is active, alongside that video's own native controls bar.
(function () {
    var stage = document.getElementById('stage');
    var btnOpen = document.getElementById('btnOpen');
    var track = document.getElementById('scrollTrack');
    var slides = track.querySelectorAll('.gyan-slide');

    var scrollPlay = document.getElementById('scrollPlay');
    var btnPlay = document.getElementById('btnPlay');
    var btnPause = document.getElementById('btnPause');
    var btnReplay = document.getElementById('btnReplay');
    var btnIchhakar = document.getElementById('btnIchhakar');
    var btnAbbhutthio = document.getElementById('btnAbbhutthio');

    var index = 0;

    function activeVideo() {
        var slide = slides[index];
        return slide ? slide.querySelector('video') : null;
    }

    function setPlaying(isPlaying) {
        scrollPlay.classList.toggle('is-playing', isPlaying);
    }

    function playFrom(seconds) {
        var video = activeVideo();
        if (!video) { return; }
        video.currentTime = seconds;
        video.play();
        setPlaying(true);
    }

    // plays only [start, end) of the video, then pauses — the pause listener below checks
    // `pendingSegmentPause` and skips its usual setPlaying(false), so the pause+replay pair
    // (including the refresh button) stays visible instead of reverting to the solo play button.
    function playSegment(start, end) {
        var video = activeVideo();
        if (!video) { return; }

        function onTimeUpdate() {
            if (video.currentTime >= end) {
                video.removeEventListener('timeupdate', onTimeUpdate);
                video.pendingSegmentPause = true;
                video.pause();
            }
        }

        video.removeEventListener('timeupdate', onTimeUpdate);
        video.addEventListener('timeupdate', onTimeUpdate);
        video.currentTime = start;
        video.play();
        setPlaying(true);
    }

    function render() {
        slides.forEach(function (slide, i) {
            slide.classList.toggle('is-active', i === index);
        });
    }

    function open() {
        stage.setAttribute('data-state', 'open');
        // Home lives outside .stage now (fixed to the viewport corner), so it can't be shown
        // via a `.stage[data-state="open"] .btn-home` descendant selector — flag it on body
        // instead: hidden at the very start, fades in once the user has actually gone inside.
        document.body.classList.add('gyan-open');
    }

    btnOpen.addEventListener('click', open);

    // both sutra buttons play the same (only) video, 1.mp4, but seek to their own timestamp first.
    // Ichhakar plays only its own 0:19-0:46 portion, then stops (see playSegment).
    btnIchhakar.addEventListener('click', function () { playSegment(19, 45); });
    btnAbbhutthio.addEventListener('click', function () { playFrom(46); });

    btnPlay.addEventListener('click', function () {
        var video = activeVideo();
        if (!video) { return; }
        video.play();
        setPlaying(true);
    });

    btnPause.addEventListener('click', function () {
        var video = activeVideo();
        if (video) { video.pause(); }
        setPlaying(false);
    });

    btnReplay.addEventListener('click', function () {
        var video = activeVideo();
        if (!video) { return; }
        video.currentTime = 0;
        video.play();
        setPlaying(true);
    });

    // the <video> has its own native `controls` bar too, so its play/pause can also be driven
    // from there (or from a keyboard shortcut, etc.) — listening to the video's own play/pause/
    // ended events, not just our buttons' clicks, keeps the solo/pause+replay overlay in sync
    // regardless of what actually started or stopped playback.
    slides.forEach(function (slide) {
        var video = slide.querySelector('video');
        if (!video) { return; }
        video.addEventListener('play', function () { setPlaying(true); });
        video.addEventListener('pause', function () {
            // segment-end auto-pause (see playSegment) keeps the pause+replay pair visible
            // instead of reverting to the solo play button
            if (video.pendingSegmentPause) {
                video.pendingSegmentPause = false;
                return;
            }
            setPlaying(false);
        });
        video.addEventListener('ended', function () { setPlaying(false); });
    });

    render();
})();
