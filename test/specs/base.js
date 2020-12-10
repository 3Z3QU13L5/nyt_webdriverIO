module.exports = class Base {
    constructor(baseURL, selectors){
        this.baseURL = baseURL;
        this.selector = selectors;
    }

    isPresent (element, elementName) {
        var isExisting = element.isExisting();
        expect(isExisting, elementName + ' is not present').to.be.true;
    }

    isPresentAndClickable (element, elementName) {
        //Check if it is present
        this.isPresent(element, elementName);
        //Check if it is clickable
        var isEnabled = element.isEnabled();
        expect(isEnabled, elementName + ' is not clickable').to.be.true;
    }

    correctRedirectionWithReference (element, expectedTitle, url, reference) {
        element.click();
        $(reference).waitForExist(6000);
        var title = $(reference).getText().toUpperCase();
        expect(title, 'Is redirecting incorrectly or there is some issue with the information').to.include(expectedTitle.toUpperCase());
        browser.url(url);   
    }

    correctRedirection (element, expectedTitle, url) {
        element.click();
        var title = browser.getTitle();
        expect(title, 'Is redirecting incorrectly or there is some issue with the information').to.include(expectedTitle);
        browser.url(url);
    }

    clickByConsole(selector){
        browser.execute((selector)=>{ document.querySelector(selector).click() }, selector);
    }

}