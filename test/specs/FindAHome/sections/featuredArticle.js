const findAHome = require('../page.js');

describe('Discover Fearured Article', () => {
    //Fearured Article
    beforeEach(() => {
        browser.url(findAHome.baseURL);
    });
    
    //verify it exist and clickable
    it('Fearured Article image should exist and is clickable', () => {
        var featureArticle = $(findAHome.selector.featureArticle);
        findAHome.isPresentAndClickable(featureArticle, 'Fearured Article'); 
    });
    
    //verify content valid text
    it('Fearured Article image should content valid text', () => {
        var articleHeadline = $(findAHome.selector.featureArticle);
        findAHome.isPresent(articleHeadline, 'Fearured Article text');
        expect(articleHeadline.getText()).to.include('Read:');
    });
    
    //verify it redirect correctly
    it('Fearured Article image should redirect correctly', () => {
        const expectTitle = $(findAHome.selector.featureArticle).getText();
        browser.execute(() => document.querySelector('a[class="css-1qjxqa5"]').click());
        const titlePage = browser.getTitle().split('-')[0];
        expect(expectTitle).to.include(titlePage);
    });
    
    // Channel Selector Should be present and be clickable
    it('Channel Selector should be present and be clickable', () => {
        var channelSelector = $(findAHome.selector.searchChannelSelector);
        findAHome.isPresentAndClickable(channelSelector, 'Channel Selector');
    });
    
    // Channel Selector Should display one of the selector option
    it('Channel Selector should be one of the selector option', () => {
        var channels = {
            1: $(findAHome.selector.channels.forSale),
            2: $(findAHome.selector.channels.forRent),
        }
        var isVisble = channels[1].getAttribute('data-active') == 'true' || channels[2].getAttribute('data-active') == 'true';
        expect(isVisble).to.be.true;
    });
    
    // Channel Selector Should appear the channel options (For Sale/For Rent)
    it('When clicked Should appear the channel options (For Sale/For Rent)', () => {
        var channelSelector = $(findAHome.selector.searchChannelSelector);
        var optionHeight = $(findAHome.selector.channels.forSale).getCSSProperty('height').parsed.value;
        channelSelector.click();
        var height = channelSelector.getCSSProperty('height').parsed.value;
        var expectedHeight = optionHeight * 2;
        expect(height >= expectedHeight, 'The channel selector is not opening').to.be.true;
    });
    
    // Channel Selector Show appear this option on the channel selector
    it('Correct option should appears on the channel selector', () => {
        var channelSelector = $(findAHome.selector.searchChannelSelector);
        var channels = {
            1: $(findAHome.selector.channels.forSale),
            2: $(findAHome.selector.channels.forRent)
        };
        
        for(i=2; i>0; i--){
            channelSelector.click();
        channels[i].click();
        var isVisble = channels[i].getAttribute('data-active') == 'true';
        expect(isVisble, "Channel Selector is not changing of option").to.be.true;
        }
    });

    // Search Bar should be there and clickeable
    it('Search Bar should be there and clickeable', () => {
        var searchBarInput = $(findAHome.selector.searchBarInput);
        findAHome.isPresentAndClickable(searchBarInput, 'Search Bar');
    });

    // Search Bar A suggested result should appear below the field
    it('A suggested result should appear below the field', () => {
        var searchBarInput = $(findAHome.selector.searchBarInput);
        searchBarInput.setValue('New York');
        var suggestedResult = $(findAHome.selector.suggestedResult);
        suggestedResult.waitForDisplayed(3000);
        findAHome.isPresentAndClickable(suggestedResult, 'Suggested Result');
    });

    // Search Bar That place should be added to the search bar  INCOMPLETE
    it('After selecting a place should be added to the search bar', () => {
        //Enable search bar
        //Type a address, neighborhood, city, etc.
        //Select element from suggetion
        var selection = findAHome.searchInput('Manhattan');
        selection.click();
        var suggestedResult = $(findAHome.selector.suggestedResult);
        findAHome.cleanSuggestion();
        $(findAHome.selector.searchBarInput).clearValue();
        // //check sugested result disappears
        // expect(suggestedResult.isDisplayed(), 'Sugested Result list still present after selection').to.be.false;
        //check the bullion was added
        var bullions = $$(findAHome.selector.bullions);
        expect(bullions.length >= 1, 'The selection does not appear on the search bar (no bullions)').to.be.true
        //check is the correc bullion
        var bullion = bullions[0];
        expect(bullion.getText(),'Bullion value is incorrect').to.include('Manhattan');
    });

    // Search Bar The 10 places should be added to the search
    it('Maximun 10 places should be added to the search', () => {
        //enable search bar
        //Variable test address, city, etc.
        var locations = ['Manhattan', 'Brooklyn Heights', 'Bronxdale', 'Long Island City', 'Chicago', 'Bronxwood', 'Brooklyn', 'Queens', 'Sheepshead Bay', 'Staten Island'];
        //Repeat 9 more times
        locations.forEach((element, index) => {
            var locationSuggested = findAHome.searchInput(element);
            locationSuggested.click();
            findAHome.cleanSuggestion();
            if($(findAHome.selector.addLocationButton).isExisting()){
                $(findAHome.selector.addLocationButton).click();
            }
            var bullions = $$(findAHome.selector.bullions);
            expect(bullions.length == (index + 1), 'The selection does not appear on the search bar (no bullions)').to.be.true;
        });

        var locationSuggested = findAHome.searchInput('Los Angeles');
        locationSuggested.click();

        var bullions = $$(findAHome.selector.bullions);
        expect(bullions.length > 10, 'More than 10 places were added to the search').to.be.false;
    });

    // The item should be remove and just that item
    it('Address(bullions) should be removeable', () => {
        //Add bullion
        var locationSuggested = findAHome.searchInput('Manhattan');
        locationSuggested.click();
        //Check it was added
        var bullions = $$(findAHome.selector.bullions);
        expect(bullions.length == 1, 'The selection does not appear on the search bar (no bullions)').to.be.true

        //remove bullion
        var bullionCloseButton = $(findAHome.selector.bullionDelete);
        bullionCloseButton.click();

        //check it was removed
        bullions = $$('li.css-14bzxxp');
        expect(bullions.length == 1, 'The address(bullion) was not removed from the search bar').to.be.true
    });

    // Search Button Should be redirected to the listings result
    it('Search Button Should be redirected to the default listings result',() => {
        var searchButton = $(findAHome.selector.searchButton);
        //Press Search Button
        searchButton.click();
        //Extract bullions for search bar
        var searchContain = $$(findAHome.selector.text);
        searchContain.forEach((item,index)=>{ searchContain[index] = item.getText(); })
        //Check redirection to the correct default search result findAHome
        findAHome.selector.defaultResult.forEach((item, index) => { expect(searchContain).to.include(item); })
    });
    
    it('Search Button Should be redirected to the listings result',() => {
        var searchButton = $(findAHome.selector.searchButton);
        //add a address to the search bar
        var selection = findAHome.searchInput('Manhattan');
        selection.click();
        //Press Search Button
        //Check redirection to the correct search resul
        findAHome.correctRedirectionWithReference(searchButton,'Manhattan', findAHome.baseURL, findAHome.selector.text);
    })
});