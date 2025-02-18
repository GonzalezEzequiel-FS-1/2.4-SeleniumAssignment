const { Builder, Browser, By, Key, until } = require("selenium-webdriver");



(async function AutoBrowser() {
        //Creating the builder with Chrome as the browser
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        let searchQuery = "Selenium"
   try {
        console.log("Starting query");
        
        // I'm opening DuckDuckGo, because google is sending me to a "Captcha"
        await driver.get("https://www.duckduckgo.com");    
        
        // We look for the searchbox to input the search     
        const searchBox = await driver.findElement(By.name('q'));
        console.log(`Searchbox found typing ${searchQuery}`)
        
        // We send the text to the Searchbox
        await searchBox.sendKeys(searchQuery, Key.RETURN);

        // Wait until the title contains Selenium, for a max of 5 seconds
        await driver.wait(until.titleContains(searchQuery), 5000);
        
        // Now, we check the title to make sure we got the correct result
        const title = await driver.getTitle()
        
        if(title.includes(`${searchQuery} at DuckDuckGo`)){
                // Quick check, if the title === Selenium at DuckDuckGo log the title
                console.log(`The Title is ${title}`)
        
        }else{
                //If the title is not the right one throw an error
                console.error(`The Title is ${title}`)
                console.error("Wrong Site")
        }
   } catch (error) {
   
        // Catch the error if any
        console.error(error.message)
   } finally{
   
        // Close the browser when done!
        console.log('Closing Browser')
        await driver.quit();
   }
})();
