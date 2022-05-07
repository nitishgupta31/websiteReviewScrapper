const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance, url){
	let browser;
	try{
		browser = await browserInstance;
		return await pageScraper(browser,url);	
		
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance, url) => scrapeAll(browserInstance, url)