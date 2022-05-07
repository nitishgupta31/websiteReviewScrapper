const browserObject = require('./browser');
const scraperController = require('./pageController');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

//To extract the data from the website to the index.js file
app.use(express.urlencoded({ extended: true }))

app.post('/pagescrapper', async (req, res) => {
    try {
        // Start the browser and create a browser instance
        let browserInstance = browserObject.startBrowser();
        
        // Pass the browser instance and url to the scraper controller
        let data = await scraperController(browserInstance, req.body.url);
        res.status(200).send(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
})

//listening on specified Port
app.listen(port, () => {
    console.log(`server is running at port ${port}`);
});