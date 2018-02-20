const Kasette = {

    // events
    ev: {
        'click .toggleButton': 'injectScripts',
    },

    // functions
    f: {
        injectScripts() {
            chrome.tabs.query({
                active: true,
                currentWindow: true,
            }, tabs => {
                const activeTab = tabs[0];

                chrome.tabs.executeScript(activeTab.id, {
                    file: 'js/injected.min.js',
                });
            });
        },
    }

};

Kasette.init = () => {
    // add event listeners
    Object.keys(Kasette.ev).forEach(identifier => {
        var eventName = identifier.split(" ")[0],
            selector = identifier.split(" ").splice(1).join(" "),
            fn = Kasette.f[Kasette.ev[identifier]].bind(Kasette.f);

        KasetteUtils.eventAdder(selector, eventName, fn);
    });
};

Kasette.init();
