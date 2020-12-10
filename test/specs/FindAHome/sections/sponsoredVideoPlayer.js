const findAHome = require('../page');

//Discover Video Collection
describe('Discover Video Collection',()=>{
    beforeEach(() => {
        browser.url(findAHome.baseURL);
    });

    // Should be present and be clickable, to the left of the header
    it('Sponsor Logo is present and clickable', () => {
        var sponsorLogo = $(findAHome.selector.sponsorLogo);
        findAHome.isPresentAndClickable(sponsorLogo, 'Sponsor Logo');
    });
    // Verify redirection don't return 404
    it('Sponsor Logo redirect to correct page', () => {
        var sponsorLogo = $(findAHome.selector.sponsorLogo);
        console.log(sponsorLogo);
        findAHome.correctRedirection(sponsorLogo, "Sotheby's", findAHome.baseURL);
    });

    // Should be present and be clickable, to the right of the header
    it('Visit Link is present and clickable', () => {
        var sponsorLink = $(findAHome.selector.sponsorLink);
        findAHome.isPresentAndClickable(sponsorLink, 'Visit Link');
    });

    // Verify redirection don't return 404
    it('Visit Link redirect to correct page', () => {
        var sponsorLink = $(findAHome.selector.sponsorLink);
        findAHome.correctRedirection(sponsorLink, "Sotheby's", findAHome.baseURL);
    });
    
    // Featured video should be there and be clickable
    it('Featured video is present and clickable', () => {
        var videoElement = $(findAHome.selector.featuredVideo);
        findAHome.isPresentAndClickable(videoElement, 'Featured video');
    });

    // Should be there and be clickable
    it('Featured Video Headline is present and clickable', () => {
        var videoHeadline = $(findAHome.selector.videoHeadline.before);
        findAHome.isPresentAndClickable(videoHeadline, 'Featured Video Headline before play');
        findAHome.playVideo(findAHome.selector.playVideoButton.before);
        var videoHeadline = $(findAHome.selector.videoHeadline.after);
        findAHome.isPresentAndClickable(videoHeadline, 'Featured Video Headline after play');
    });

    //Verify redirection don't return 404
    it('Featured Video Headline redirect to the correct page', () => {     
        findAHome.playVideo(findAHome.selector.playVideoButton.before);
        var expectedTitle = $(findAHome.selector.videoPlayListSummary).getText();
        expectedTitle = expectedTitle.split(',')
        expectedTitle = expectedTitle[0] + ',' +  expectedTitle[1];
        findAHome.clickByConsole(findAHome.selector.videoHeadline.after + ' a');
        var newWindow = browser.getWindowHandles().pop();
        browser.switchToWindow(newWindow);
        var title = browser.getTitle();
        expect(title, 'Is redirecting incorrectly or there is some issue with the information').to.include(expectedTitle);
    });

    //place holder Should be there before 
    it('Video placeholder Should be there before video start', () => {
         var placeholder = $(findAHome.selector.videoPlaceHolder);
         var placeholderURL = placeholder.getCSSProperty('background-image').value;
         findAHome.isPresent(placeholder, 'Video Placeholder');
         expect(placeholderURL, "There is no URL").not.to.equal('');
    });

    // Clicking play/pause button Should play or pause the video
    it('Clicking play/pause button Should play or pause the video', () => {
        findAHome.playVideo(findAHome.selector.playVideoButton.before)
        var isPaused = findAHome.isPaused();
        expect(isPaused).to.be.false;

        $(findAHome.selector.playVideoButton.after).click();
        browser.waitUntil(()=>{
            return findAHome.isPaused();
        }, 6000);
        var isPaused = findAHome.isPaused();
        expect(isPaused).to.be.true;
    });
    // Video ends Next video should play
    it('When video ends Next video should play', () => {
        $(findAHome.selector.playVideoButton.before).click();
        browser.waitUntil(()=>{
            return !(findAHome.isPaused());
        }, 6000);
        var isPaused = findAHome.isPaused();
        expect(isPaused).to.be.false;
        var videosHeadline = $$(findAHome.selector.videoPlayListHeadline);

        for(index = 0; index <= videosHeadline.length; index++){
            var nextIndex = (index >= videosHeadline.length)? 0 : index;
            var timeLeft = findAHome.fastForwardVideo();

            $$('span.css-rqpm5n')[nextIndex].waitForDisplayed(3500+(timeLeft*2500));
            
            browser.waitUntil(()=>{
                return !(findAHome.isPaused());
            }, 8000);

            var currentVideoHeadline = browser.execute(() => document.querySelector('div.vhs-video-title p').innerText);
            var expectedVideoHedline = videosHeadline[nextIndex].getText();

            expect(currentVideoHeadline).to.include(expectedVideoHedline);
        }
    });

    // Should be 12 Videos total, showing 3 to 4 at a time
    it("Video's List containg 12 or less Videos total" , () => {
        var videosList = $$(findAHome.selector.videoPlayList);
        expect(videosList.length <= 12, 'There is a differrence on amount of videos').to.be.true;
    });
    // Should be present, clickable
    it("Video's List is present and clickable" , () => {
        var videosList = $(findAHome.selector.videoList);
        findAHome.isPresentAndClickable(videosList, "Video's List");
    });
    // Should be able to scroll up and down
    it("Video's List can be scrolled up and down" , () => {
        var videosList = $$(findAHome.selector.videoPlayList);
        videosList[videosList.length - 1].scrollIntoView(false);
        var isDisplayed = videosList[videosList.length - 1].isDisplayedInViewport();
        expect(isDisplayed, "Video's List cannot be scrolled down").to.be.true;
        videosList[0].scrollIntoView(false);
        var isDisplayed = videosList[0].isDisplayedInViewport();
        expect(isDisplayed, "Video's List cannot be scrolled up").to.be.true;
    }); 

    // image Should have be present and clickable
    it('Images on video list should be present and clickable', () => {
        var videoListImages = $$(findAHome.selector.videoPlayListImages);
        videoListImages.forEach((element, index) => {
            findAHome.isPresentAndClickable(element, 'Image in video ' + (index + 1));
        });
    });
    // summary hould have be present and clickable
    it('Summarys on video list should be present and clickable', () => {
        var videoListSummary = $$(findAHome.selector.videoPlayListSummary);
        videoListSummary.forEach((element, index) => {
            findAHome.isPresentAndClickable(element, 'Summary in video ' + (index + 1));
        });
    });
    // Headline Should have be present and clickable
    it('Headlines on video list should be present and clickable', () => {
        var videoListHeadline = $$(findAHome.selector.videoPlayListHeadline);
        videoListHeadline.forEach((element, index) => {
            findAHome.isPresentAndClickable(element, 'Headline in video ' + (index + 1));
        });
    });
    // image Should Play the video on the Featured
    it('Click next video should play the video on the Featured', () => {
        var videosHeadline = $$(findAHome.selector.videoPlayListHeadline).slice(1);
        var videoList = $$(findAHome.selector.videoPlayList).slice(1);
        videoList.forEach((element, index) => {
            element.click();
            browser.waitUntil(()=>{
                return !(findAHome.isPaused());
            }, 8000);
            var videoHeadline = browser.execute(() => document.querySelector('div.vhs-video-title').innerText);
            expect(videoHeadline).to.include(videosHeadline[index].getText());
        });
    })
});