const pageScraper = require('./pageScraper');

async function scraper(browser, url) {
    let page = await browser.newPage();
    console.log(`Navigating to ${url}...`);

    // Navigate to the selected page
    await page.goto(url);

    const data = await page.evaluate(() => {

        let reviewerNames = [];
        let reviewTitles = [];
        let reviewComments = [];
        let overallRatings = [];
        let reviewDates = [];
        let customerReviews = document.getElementById('customerReviews');

        //scraping reviewerNames
        for (let elements of customerReviews.getElementsByClassName('reviewer')) {
            let element = elements.getElementsByTagName("dd");
            reviewerNames.push(element[0].innerText);
            reviewDates.push(element[1].innerText);
        }

        //scraping overallRatings
        for (let elements of customerReviews.getElementsByClassName("itemRating")) {
            overallRatings.push(elements.innerText);
        }

        //scraping reviewTitles and reviewComments
        for (let elements of customerReviews.childNodes) {
            if (elements.childNodes[1] && elements.childNodes[1].childNodes[3] && elements.childNodes[1].childNodes[3].childNodes[1] && elements.childNodes[1].childNodes[3].childNodes[1].childNodes[1]) {
                reviewTitles.push(elements.childNodes[1].childNodes[3].childNodes[1].childNodes[1].innerText);
                reviewComments.push(elements.childNodes[1].childNodes[3].childNodes[1].childNodes[3].innerText);
            }
        }

        return {
            reviewerNames,
            reviewDates,
            overallRatings,
            reviewTitles,
            reviewComments
        }
    })
    return data;
}

module.exports = (browserInstance, url) => scraper(browserInstance, url)