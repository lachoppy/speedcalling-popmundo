document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('hrefAbout').addEventListener('click', function() {
        chrome.tabs.update({ url: chrome.runtime.getURL('about.html') });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('hrefOptions').addEventListener('click', function() {
        chrome.tabs.update({ url: chrome.runtime.getURL('options.html') });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('hrefExtensions').addEventListener('click', function() {
        chrome.tabs.update({ url: 'chrome://chrome/extensions/'  });
    });
});
