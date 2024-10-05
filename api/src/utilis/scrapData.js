const textract = require('textract');
const Crawler = require('js-crawler');

let final_texts = '';

/**
 * @function_name scrapeDatas
 * @return String
 * @description scrape text and hyperlink data and get all hyperlinks and get all text in there. finally return all text in a URL.
 */
const scrapeDatas = async (url) => {
  let domain = new URL(url);
  domain = domain.hostname;
  return new Promise((resolve, reject) => {
    let crawler = new Crawler().configure({
      ignoreRelative: true,
      depth: 2,
      shouldCrawl: function (url) {
        return url.indexOf(domain) >= 0;
      },
    });
    crawler.crawl({
      url: url,
      success: async function (page) {
        if (
          page.url.includes(domain) &&
          !page.url.includes('.jpg') &&
          !page.url.includes('.png') &&
          !page.url.includes('.zip') &&
          !page.url.includes('.pdf')
        ) {
          console.log('passed:', page.url);
          final_texts += await getSingleText(page.url);
        }
      },
      failure: function (page) {
        console.log('Error occurred:', page.url, 'status:', page.status);
      },
      finished: function (crawledUrls) {
        console.log('All crawling finished', final_texts, 'crawledURLs:', crawledUrls);
        resolve(final_texts);
      },
    });
  });
};

/**
 * @function_name getSingleText
 * @return String
 * @description return only text data from a URL.
 */
const getSingleText = async (url) => {
  return new Promise((resolve, reject) => {
    textract.fromUrl(url, { preserveLineBreaks: false }, (err, page) => {
      if (err) return reject(err);
      resolve(page);
    });
  });
};

module.exports = {
  scrapeDatas,
  getSingleText,
};
