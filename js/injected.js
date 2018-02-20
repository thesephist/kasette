(function () {
    const PLAY_STATE_CHECK_TIMER = 1500;
    const NAMESPACED_PLAYSTATE = '__kasette_autorepeat_enabled';

    const playButtons = $$('.ytp-play-button');

    let checkTimer;

    if (playButtons.length < 1) {
        alert('Are you sure you\'re watching a YouTube video? Kasette couldn\'t find one...');
    } else {
        const pb = playButtons[0];
        const enable = () => {
            checkTimer = setInterval(() => {
                if (pb.getAttribute('title') === 'Replay') {
                    pb.click();
                } else if (!window.location.href.includes('//www.youtube.com/watch')) {
                    disable();
                }
            }, PLAY_STATE_CHECK_TIMER);
            window[NAMESPACED_PLAYSTATE] = true;
            alert('Kasette auto-repeat enabled!');
        }
        const disable = () => {
            clearInterval(checkTimer);
            alert('Kasette auto-repeat disabled!');
            window[NAMESPACED_PLAYSTATE] = false;
        }
        if (window[NAMESPACED_PLAYSTATE]) {
            disable();
        } else {
            enable();
        }
    }
})();
