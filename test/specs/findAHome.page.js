class FindAHome {
    constructor() {
        this.selector = {
          //FEATURED ARTICLE
            featureArticle: 'a[class="css-1qjxqa5"]',
            searchChannelSelector: 'div[class="css-qczn4h"]',
            channels: {
              forSale: 'button:nth-child(1)[class="css-141s0s"]',
              forRent: 'button:nth-child(2)[class="css-141s0s"]'
            },
            searchBarInput: 'input.css-g4xa1o',
            addLocationButton: 'button.css-19wfzmz',
            suggestedResult: 'ul.css-2w0kkr',
            suggestions: 'ul.css-2w0kkr li',
            bullions: 'div.css-z8jbf3',
            bullionDelete: 'button.css-bwav6a',
            searchButton: 'button.css-bv8t9c',

          //SPONSORED VIDEO SECTION
            featuredVideo: 'video[id]',
            videoHeadline: {
              before: 'div[class="vhs-video-title"] p',
              after: 'div.vhs-video-title-wrapper p'
            },
            playVideoButton: {
              before: 'div.Cell-Ytkh88Qj button[aria-label="Play Video"]',
              after: 'button[aria-label="Play Video"]'
            },
            videoPlaceHolder: 'div.container-1RqsFxwC  div  div',
            videoPlayButton: 'button[aria-label="Play"]',
            videoOverlay: 'div.overlay-3hhlCcdi.transitionDefaults-3wbfsVrE',
            videoList : 'div.css-12bel1x',
            videoPlayList: 'button[class="css-1tfmf5w"]',
            videoPlayListImages: 'button[class="css-1tfmf5w"] img',
            videoPlayListSummary: 'button[class="css-1tfmf5w"] span[class="css-oloyjj"]',
            videoPlayListHeadline: 'button[class="css-1tfmf5w"] h3',
            sponsorLogo: 'section.css-dmro3u  h2  a',
            sponsorLink: 'a.css-1c8da2q',

          //ARTICLE COLLECTION
            collectionHeader: {
              theHunt:  'div.css-oeuvof section:nth-child(1) a.css-1b04hdh',
              onTheMarket:  'div.css-oeuvof section:nth-child(2) a.css-1b04hdh'
            },
            articles: {
              theHunt:  'div.css-oeuvof section:nth-child(1) li',
              onTheMarket:  'div.css-oeuvof section:nth-child(2) li'
            },
            kicker: {
              theHunt: 'section:nth-child(1) span.css-nrqnh',
              onTheMarket: 'section:nth-child(2) span.css-nrqnh'
            },
            picture: {
              theHunt: 'section:nth-child(1) img.css-1vqq9vh',
              onTheMarket: 'section:nth-child(2) img.css-1vqq9vh'
            },
            headlines: {
              theHunt: 'section:nth-child(1) h3.css-1aa77xd',
              onTheMarket: 'section:nth-child(2) h3.css-1aa77xd'
            },
            pictureByLine: {
              theHunt: 'section:nth-child(1) p.css-150r3de',
              onTheMarket: 'section:nth-child(2) p.css-150r3de'
            },
            byLines: {
              theHunt: 'section:nth-child(1) p.css-cimotv',
              onTheMarket: 'section:nth-child(2) p.css-cimotv'
            },
            summaries:{
              theHunt: 'section:nth-child(1) p.css-8n1vag',
              onTheMarket: 'section:nth-child(2) p.css-8n1vag'
            },
            
          //SIDE MENU
            showMore: 'button.css-1etlqr2',
            sideMenuItem: 'ul.css-47m7d7 li',
            sideMenuLinks: 'ul.css-47m7d7 li a',
            sideMenuColumn: 'section.css-72rcmn div',
        }
        this.actions = {
        //FEATURED ARTICLE:
          searchInput: (input) => {
            $(this.selector.searchBarInput).click();
            $(this.selector.searchBarInput).setValue(input);
            $(this.selector.suggestedResult).waitForDisplayed(6000);
        
            var suggestions = $$(this.selector.suggestions);
            var suggestionIndx = 0;
            var wasFound = false;
            suggestions.forEach((element, index) => {
                if(element.getText().includes(input + ',')&&(!wasFound)){
                    suggestionIndx = index;
                    wasFound = true;
                } else if(index >= (suggestions.length - 1)&&(!wasFound)){
                  $(this.selector.searchBarInput).clearValue();
                  this.actions.searchInput(input);
                }
            });
            return suggestions[suggestionIndx]
          },
          cleanSuggestion: () => {
            $(this.selector.searchBarInput).click();
            $(this.selector.searchBarInput).setValue('A');
            $(this.selector.searchBarInput).clearValue();
            $(this.selector.searchBarInput).click();
          },
          isPaused: () => {
            return browser.execute(() => document.querySelector('video[id]').paused);
          },
          fastForwardVideo: () => {
            var timeLeft = browser.execute(() => {
                              var video = document.querySelector('video[id]');
                              var timeLeft = video.duration * 0.05;
                              var newTime = video.duration * 0.95;
                              video.currentTime = newTime;
                              return timeLeft;
                            });
            return timeLeft;
          },
        //GENERAL FUCTION --> will be move to a separate js document.
          isPresent: (element, elementName) => {
            var isExisting = element.isExisting();
            expect(isExisting, elementName + ' is not present').to.be.true;
          },
          isPresentAndClickable: (element, elementName) => {
            //Check if it is present
            this.actions.isPresent(element, elementName);
            //Check if it is clickable
            var isEnabled = element.isEnabled();
            expect(isEnabled, elementName + ' is not clickable').to.be.true;
          },
          correctRedirection: (element, expectedTitle) => {
            element.click();
            var title = browser.getTitle();
            expect(title).to.include(expectedTitle);
            browser.url('./real-estate/find-a-home');
          }
        }    
    }
}

module.exports = new FindAHome();