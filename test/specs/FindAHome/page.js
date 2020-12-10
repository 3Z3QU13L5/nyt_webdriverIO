const Base = require("../base");
const Selectors = require("./selectors");

class FindAHome extends Base {
    constructor (baseURL, selector) {
        super(baseURL, selector);
    }
    
    searchInput (input) {
        $(Selectors.searchBarInput).click();
        $(Selectors.searchBarInput).setValue(input);
        $(Selectors.suggestedResult).waitForDisplayed(6000);
    
        var suggestions = $$(Selectors.suggestions);
        var suggestionIndx = 0;
        var wasFound = false;
        suggestions.forEach((element, index) => {
            if(element.getText().includes(input + ',')&&(!wasFound)){
                suggestionIndx = index;
                wasFound = true;
            } else if(index >= (suggestions.length - 1)&&(!wasFound)){
              $(Selectors.searchBarInput).clearValue();
              this.searchInput(input);
            }
        });
        return suggestions[suggestionIndx]
    }

    cleanSuggestion () {
        $(Selectors.searchBarInput).click();
        $(Selectors.searchBarInput).setValue('A');
        $(Selectors.searchBarInput).clearValue();
        $(Selectors.searchBarInput).click();
    }

    playVideo(selector){
        var playButton = $(selector);
        playButton.click();
        browser.waitUntil(()=>{
            return !this.isPaused();
        }, 6000);
    }

    isPaused () {
        return browser.execute(() => document.querySelector('video[id]').paused);
    }

    waitForVideo (state) {
        result = browser.waitUntil(()=>{
            return this.isPaused();
        }, 6000);
        return state === result;
    }

    fastForwardVideo () {
        return browser.execute(
            () => {
                var video = document.querySelector('video[id]');
                var timeLeft = video.duration * 0.05;
                var newTime = video.duration * 0.95;
                video.currentTime = newTime;
                return timeLeft;
            });
    }

    pinPointArticle (selector, collectionNumber, articleNumber) {
        var newSelector = selector.replace('CollectionNumber', collectionNumber);
        newSelector = newSelector.replace('ArticleNumber', articleNumber);
        return newSelector
    }
}

module.exports = new FindAHome('./real-estate/find-a-home', Selectors);