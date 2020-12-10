module.exports = {
    //FEATURED ARTICLE
      featureArticle: 'a[class="css-1qjxqa5"]',
      searchChannelSelector: 'div[class="css-qczn4h"]',
      channels: {
        forSale: 'button:nth-child(1)[class="css-141s0s"]',
        forRent: 'button:nth-child(2)[class="css-141s0s"]'
      },
      searchBarInput: 'input.css-165wljv',
      addLocationButton: 'button.css-19wfzmz',
      suggestedResult: 'ul.css-2w0kkr',
      suggestions: 'ul.css-2w0kkr li',
      bullions: 'div.css-z8jbf3',
      bullionDelete: 'button.css-bwav6a',
      searchButton: 'button.css-bv8t9c',
      defaultResult: [ 'Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island' ],
  
    //SPONSORED VIDEO SECTION
      featuredVideo: 'video[id]',
      videoHeadline: {
        before: 'div[class="vhs-video-title"] p',
        after: 'div.vhs-video-title-wrapper p'
      },
      playVideoButton: {
        before: 'div.Row-3UfofSZ6',
        after: 'button[class="vhs-plugin-controls-play vhs-icon-pause"]'
      },
      videoPlaceHolder: 'div.container-1iigG_vr div:first-child',
      videoPlayButton: 'button[aria-label="Play"]',
      videoOverlay: 'div.overlay-3hhlCcdi.transitionDefaults-3wbfsVrE',
      videoList : 'div.css-12bel1x',
      videoPlayList: 'div.css-1w2cidb',
      videoPlayListImages: 'button[class="css-1tfmf5w"] img',
      videoPlayListSummary: 'button[class="css-1tfmf5w"] span[class="css-oloyjj"]',
      videoPlayListHeadline: 'button[class="css-1tfmf5w"] h3',
      sponsorLogo: 'section.css-dmro3u  h2  a',
      sponsorLink: 'a.css-1c8da2q',
      pageReference: 'button.css-1kn96on',
  
    //ARTICLE COLLECTION
      collectionHeader: {
        theHunt:  'div.css-oeuvof section:nth-child(1) a.css-1b04hdh',
        onTheMarket:  'div.css-oeuvof section:nth-child(2) a.css-1b04hdh'
      },
      /* Note: move and modify functions to page.js doc. the new fuction should resive 'section:nth-child(CollectionNumber) li:nth-child(ArticleNumber) h3.css-1aa77xd' then 
      substituted CollectionNumber for 1 when is 'The Hunt' and 2 when is 'On The Market', and ArticleNumber for the corresponding article to view, in this doc it should only
      leave on complete collection with the CollectionNumber and ArticleNumber */
      articles: {
        headline: 'section:nth-child(CollectionNumber) li:nth-child(ArticleNumber) h3.css-1aa77xd',
        picture: 'section:nth-child(CollectionNumber) li:nth-child(ArticleNumber) img.css-1vqq9vh',
        kicker: 'section:nth-child(CollectionNumber) li:nth-child(ArticleNumber) span.css-1ucbu0y',
        pictureByLine: 'section:nth-child(CollectionNumber) li:nth-child(ArticleNumber) p.css-150r3de',
        byLines: 'section:nth-child(CollectionNumber) li:nth-child(ArticleNumber) p.css-cimotv',
        summaries: 'section:nth-child(CollectionNumber) li:nth-child(ArticleNumber) p.css-8n1vag',
        articles: 'div.css-oeuvof section:nth-child(CollectionNumber) li',
      },
      
    //SIDE MENU
      showMore: 'button.css-1etlqr2',
      sideMenuItem: 'ul.css-47m7d7 li',
      sideMenuLinks: 'ul.css-47m7d7 li a',
      sideMenuColumn: 'section.css-o8ic72 div',
      text: 'h3.css-tlr5hb',
  }