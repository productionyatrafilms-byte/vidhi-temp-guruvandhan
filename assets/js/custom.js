
// language change js
let currentLang = sessionStorage.getItem("lang");
if (!currentLang) {
    val("English");
} else {
    val(currentLang);
}

function val(selectedLang) {
    sessionStorage.setItem("lang", selectedLang);

    let English = document.getElementById("en");
    let Hindi = document.getElementById("hi");
    let Gujrati = document.getElementById("gu");

    if (selectedLang === "English") {

        document.getElementById("body");
        $(".english").show();
        $(".hindi, .gujrati").hide();

        English.checked = true;
        Hindi.checked = false;
        Gujrati.checked = false;
    }

    if (selectedLang === "Hindi") {
        document.getElementById("body");
        $(".hindi").show();
        $(".english, .gujrati").hide();
        English.checked = false;
        Hindi.checked = true;
        Gujrati.checked = false;
    }

    if (selectedLang === "Gujrati") {
        document.getElementById("body");
        $(".gujrati").show();
        $(".english, .hindi").hide();
        English.checked = false;
        Hindi.checked = false;
        Gujrati.checked = true;
    }
}

// language toggle click sound (only on an actual user click, not the
// programmatic val() call that restores the saved language on page load)
document.addEventListener('DOMContentLoaded', function () {
    var langAudio = {
        English: new Audio('./assets/audio/Eng.mp3'),
        Hindi: new Audio('./assets/audio/Hin.mp3'),
        Gujrati: new Audio('./assets/audio/Guj.mp3'),
    };

    document.querySelectorAll('#langSelect input[type="radio"]').forEach(function (input) {
        input.addEventListener('click', function () {
            var audio = langAudio[input.value];
            if (!audio) { return; }
            audio.pause();
            audio.currentTime = 0;
            audio.play().catch(function () {});
        });
    });

    // play / pause / replay (refresh) button click sound
    var clickAudio = new Audio('./assets/audio/click.mp3');
    document.querySelectorAll('#btnPlay, #btnPause, #btnReplay').forEach(function (btn) {
        btn.addEventListener('click', function () {
            clickAudio.currentTime = 0;
            clickAudio.play().catch(function () {});
        });
    });

    // pill nav button click sound (only present on pages with two topic pills)
    var pillAudio = new Audio('./assets/audio/topic.mp3');
    document.querySelectorAll('.gyan-nav__pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            pillAudio.currentTime = 0;
            pillAudio.play().catch(function () {});
        });
    });

    // start page (idle -> open) click sound
    var openAudio = new Audio('./assets/audio/transition/5.mp3');
    var btnOpen = document.getElementById('btnOpen');
    if (btnOpen) {
        btnOpen.addEventListener('click', function () {
            openAudio.currentTime = 0;
            openAudio.play().catch(function () {});
        });
    }

    // prev/next slide nav click sound (only present on pages with a slide swiper)
    var swipeAudio = new Audio('./assets/audio/swipe.mp3');
    document.querySelectorAll('#btnPrev, #btnNext').forEach(function (btn) {
        btn.addEventListener('click', function () {
            swipeAudio.currentTime = 0;
            swipeAudio.play().catch(function () {});
        });
    });

    // home button click sound, played before following the link
    var popAudio = new Audio('./assets/audio/pop.mp3');
    document.querySelectorAll('.btn-home, .home-btn-1').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = link.getAttribute('href');
            if (!href || href === '#') { return; }
            e.preventDefault();

            var navigated = false;
            var go = function () {
                if (navigated) { return; }
                navigated = true;
                window.location.href = href;
            };

            popAudio.currentTime = 0;
            popAudio.addEventListener('ended', go, { once: true });

            var playPromise = popAudio.play();
            if (playPromise !== undefined) {
                playPromise.catch(go);
            }

            setTimeout(go, 600);
        });
    });
});