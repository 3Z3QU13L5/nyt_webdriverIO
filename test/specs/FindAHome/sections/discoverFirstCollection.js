const findAHome = require('../page');

const articlesAmount = 3;

// Discover Collection
describe('Discover On the Market Articles Collection', () => {
    beforeEach(() => {
        browser.url(findAHome.baseURL);
    });
    // Should be there and be clickable
    it('Header should be present and be clickable', () => {
        var collectionHeader = $(findAHome.selector.collectionHeader.theHunt);
        findAHome.isPresentAndClickable(collectionHeader, 'Article Collection Header');
    });
    // Verify redirection don't return 404
    it('Header should redirect to correcponding Page', () => {
        var collectionHeader = $(findAHome.selector.collectionHeader.theHunt);
        var headerText = collectionHeader.getText();
        collectionHeader.click();
        const title = browser.getTitle();
        expect(title, 'Is not redirecting to the corresponding page').to.equal( headerText + ' - The New York Times');
    });
    // The Headline should be the same kicker of the articles
    it('The Header should be the same kicker of each articles', () => {
        var collectionHeader = $(findAHome.selector.collectionHeader.theHunt).getText();
        for(ind = 1; ind<=articlesAmount; ind++){
            var articleKickers = $(findAHome.pinPointArticle(findAHome.selector.articles.kicker, 1, ind)).getText();
            expect(collectionHeader.toUpperCase(), 'Header and the kicker from article no.' + (ind) + ' are different' ).to.equal(articleKickers.toUpperCase());
        }
    });
    //Should be there and be clickable
    it('Article Picture should be there and be clickable', () => { 
        for(ind = 1; ind<=articlesAmount; ind++){
            var articlePictures = $(findAHome.pinPointArticle(findAHome.selector.articles.picture, 1, ind));
            findAHome.isPresentAndClickable(articlePictures, 'Article Picture');
        }
    });
    //Verify redirection don't return 404
    it('Article Picture should redirect to the corresponding findAHome', () => {
        for(ind = 1; ind<=articlesAmount; ind++){
            var headline = $(findAHome.pinPointArticle(findAHome.selector.articles.headline, 1, ind)).getText();
            var picture = $(findAHome.pinPointArticle(findAHome.selector.articles.picture, 1, ind));
            findAHome.correctRedirection(picture,headline,findAHome.baseURL);
        }
    });
    //Article Picture Byline Should be there 
    it('Article Picture Byline should be present', () => {
        for(ind = 1; ind<=articlesAmount; ind++){
            var articlePictureBylines = $(findAHome.pinPointArticle(findAHome.selector.articles.pictureByLine, 1, ind));
            var elementName = 'Article '+ (ind) +' Picture Byline';
            findAHome.isPresent(articlePictureBylines, elementName);
        }
    });
    // Should be there and be clickable
    it('Article Headline should be there and be clickable', () => {
        for(ind = 1; ind<=articlesAmount; ind++){
            var articleHeadlines = $(findAHome.pinPointArticle(findAHome.selector.articles.headline, 1, ind));
            var elementName = 'Article '+ (ind) +' Headline';
            findAHome.isPresent(articleHeadlines, elementName);
        }
    })
    //Verify redirection don't return 404 
    it('Article Headline should redirect to the corresponding findAHome', () => {
        for(ind = 1; ind<=articlesAmount; ind++){
            var headline = $(findAHome.pinPointArticle(findAHome.selector.articles.headline, 1, ind));
            var expectedTitle = headline.getText()
            findAHome.correctRedirection(headline,expectedTitle,findAHome.baseURL);
        }
    });
    //Article Kicker Should be there
    it('Article Kicker should be there', () => {
        for(ind = 1; ind<=articlesAmount; ind++){
            var articleKicker = $(findAHome.pinPointArticle(findAHome.selector.articles.kicker, 1, ind));
            var elementName = 'Article '+ (ind) +' Kicker';
            findAHome.isPresent(articleKicker, elementName);
        }
    });
    //Article Summary Should be there
    it('Article Summary should be present', () => {
        for(ind = 1; ind<=articlesAmount; ind++){
            var articleSummary = $(findAHome.pinPointArticle(findAHome.selector.articles.summaries, 1, ind));
            var elementName = 'Article '+ (ind) +' Summary';
            findAHome.isPresent(articleSummary, elementName);
        }
    });
    //Article Byline Should be there 
    it('Article Byline should be present', () => {
        for(ind = 1; ind<=articlesAmount; ind++){
            var articleBylines = $(findAHome.pinPointArticle(findAHome.selector.articles.byLines, 1, ind));
            var elementName = 'Article '+ (ind) +' Byline';
            findAHome.isPresent(articleBylines, elementName);
        }
    });
    // Should be 3 articles by collection
    it('There should be ' + articlesAmount + ' articles by collection', () => {
        var articleCollectionSize = $$(findAHome.pinPointArticle(findAHome.selector.articles.articles, 1, ind)).length;
        expect(articleCollectionSize, 'There is a difference with the expected number of articles on the collection').to.be.equal(articlesAmount);
    })
});