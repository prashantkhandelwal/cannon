const {By, Builder, Browser} = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');
const assert = require("assert");

suite(function (env) {
  describe('Hackatoh 2023', function () {
    let driver;

    before(async function () {
      driver = await new Builder().forBrowser('MicrosoftEdge').build();

    });

    after(async () => await driver.quit());

    it('Testing on Selenium Edge', async function () {

      await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

      let title = await driver.getTitle();
      assert.equal("Web form", title);

      await driver.manage().setTimeouts({implicit: 500});

      let textBox = await driver.findElement(By.name('my-text'));
      let submitButton = await driver.findElement(By.css('button'));

      await textBox.sendKeys('Selenium');
      await submitButton.click();

      let message = await driver.findElement(By.id('message'));
      let value = await message.getText();
      assert.equal("Received!", value);
    });
    
    
  });
}, { browsers: [Browser.EDGE]});