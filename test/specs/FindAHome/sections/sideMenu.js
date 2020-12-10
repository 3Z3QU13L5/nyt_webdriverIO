const findAHome = require('../page');

describe('Side Menu', () => {
    beforeEach(() => {
        browser.url(findAHome.baseURL);
    });
    // Should be presente,
    it('Show More button should be presente and be clickable',() => {
        var showmoreButtons = $$(findAHome.selector.showMore);
        showmoreButtons.forEach((element, index) => {
            findAHome.isPresentAndClickable(element, ('Show More Button ' + index + ' '));
        });
    });
    // show 5 links before clicking "Show More"
    it('show 20 links before clicking "Show More"', () => {
        var sideMenuColumns = $$(findAHome.selector.sideMenuColumn + ' ul');
        for (let index = 1; index <= sideMenuColumns.length; index++) {
            var sideMenuLinks = $$(findAHome.selector.sideMenuColumn + ':nth-child(' + index + ') ' + findAHome.selector.sideMenuItem);
            let condition = (sideMenuLinks.length <= 5 && sideMenuLinks.length != 0);
            expect(condition, 'There is a difference on the presented links').to.be.true;
        }
    });
    // Should be presente, and should show 25
    it('show 5 or more links after clicking "Show More"', () => {
        var showmoreButton = $(findAHome.selector.showMore);
        showmoreButton.click();
        var sideMenuColumns = $$(findAHome.selector.sideMenuColumn);
        for (let index = 1; index <= sideMenuColumns.length; index++) {
            var sideMenuLinks = $$(findAHome.selector.sideMenuColumn + ':nth-child(' + index + ') ' + findAHome.selector.sideMenuItem);
            expect(sideMenuLinks.length >= 5 && sideMenuLinks.length <= 25, 'There is a difference on the presented links: ' + sideMenuLinks.length ).to.be.true;
        }
    });
    // Each link redirect to the corresponding findAHome
    it('Each link redirect to the corresponding findAHome', () => {
        var showmoreButton = $(findAHome.selector.showMore);
        showmoreButton.click();
        var columnAmount = $$(findAHome.selector.sideMenuColumn).length;
        for(colunm = 1; colunm <= columnAmount; colunm++){
            var rowAmount = $$(findAHome.selector.sideMenuColumn + ':nth-child(' + colunm + ') ' + findAHome.selector.sideMenuItem).length;
            for(row = 1; row <= rowAmount; row++){
                var linkSelector = findAHome.selector.sideMenuColumn + ':nth-child(' + colunm + ') ' + findAHome.selector.sideMenuItem + ':nth-child(' + row + ') a';
                var link = $(linkSelector);
                var expectTitle = link.getText().replace(' - ', ' ');
                findAHome.correctRedirectionWithReference(link,expectTitle,findAHome.baseURL,findAHome.selector.text);
                showmoreButton.click();
            }
        }
    })
});