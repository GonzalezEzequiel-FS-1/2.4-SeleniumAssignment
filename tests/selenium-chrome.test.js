const { Builder, By, Key } = require('selenium-webdriver');
require('dotenv').config();

const BROWSER = process.env.BROWSER || 'chrome';
const URL = process.env.URL || 'https://duckduckgo.com';
const SEARCH_QUERY = process.env.SEARCH_QUERY || 'Selenium';
const ENGINE = process.env.ENGINE || 'DuckDuckGo';

describe('DuckDuckGo Search Test', () => {
    let driver;
    let title;
    
    beforeAll(async () => {
        console.log("Starting query...");
        driver = await new Builder().forBrowser(BROWSER).build();
        await driver.manage().window().maximize();

        // Open DuckDuckGo
        await driver.get(URL);

        // Find search box
        let searchBox = await driver.findElement(By.name('q'));
        console.log(`Searchbox found, typing: ${SEARCH_QUERY}`);

        // Send the search query
        await searchBox.sendKeys(SEARCH_QUERY, Key.RETURN);

        // Wait for the page title to update
        await driver.sleep(2000);

        // Store the title for later validation
        title = await driver.getTitle();
        console.log(`The Title is: ${title}`);
    });

    afterAll(async () => {
        // After we are done, we will quit the browser
        if (driver) {
            await driver.quit();
        }
    });

    // Was the Browser Opened?
    test("Is the browser opened?", async () => {
        expect(title).toBeTruthy();
    });
    
    // Is there a SearchBox
    test("Search box should exist", async () => {
        const searchBox = await driver.findElement(By.name('q'));
        expect(searchBox).toBeDefined();
    });

    //  Is the Title the one we expect?
    test("Is the search result title correct?", async () => {
        expect(title).toContain(`${SEARCH_QUERY} at ${ENGINE}`);
    });
    
    
    
});
