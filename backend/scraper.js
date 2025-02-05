const puppeteer = require("puppeteer");

// Function to scrape prices from Walmart
async function scrapeWalmart(itemName) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.walmart.com/search?q=${itemName}`);

  const price = await page.evaluate(() => {
    const priceElement = document.querySelector('[data-automation-id="product-price"]');
    return priceElement ? priceElement.innerText : null;
  });

  await browser.close();
  return price ? parseFloat(price.replace(/[^0-9.]/g, "")) : null;
}

// Function to scrape prices from Safeway
async function scrapeSafeway(itemName) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.safeway.com/shop/search-results.html?q=${itemName}`);

  const price = await page.evaluate(() => {
    const priceElement = document.querySelector(".product-price");
    return priceElement ? priceElement.innerText : null;
  });

  await browser.close();
  return price ? parseFloat(price.replace(/[^0-9.]/g, "")) : null;
}

// Function to scrape prices from Target
async function scrapeTarget(itemName) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.target.com/s?searchTerm=${itemName}`);

  const price = await page.evaluate(() => {
    const priceElement = document.querySelector('[data-test="current-price"]');
    return priceElement ? priceElement.innerText : null;
  });

  await browser.close();
  return price ? parseFloat(price.replace(/[^0-9.]/g, "")) : null;
}

// Main function to scrape prices from all stores
async function scrapePrices(itemName) {
  const walmartPrice = await scrapeWalmart(itemName);
  const safewayPrice = await scrapeSafeway(itemName);
  const targetPrice = await scrapeTarget(itemName);

  return {
    Walmart: walmartPrice,
    Safeway: safewayPrice,
    Target: targetPrice,
  };
}

module.exports = scrapePrices;