const fs = require('fs').promises;
const path = require('path');

let cachedData = null;
const cacheDuration = 60 * 60 * 1000; // 1 hour in milliseconds
let lastCacheTime = 0;

async function loadData(filePath) {
  // Check if cached data is still valid
  if (cachedData && Date.now() - lastCacheTime < cacheDuration) {
    return cachedData;
  }

  try {
    // Read the JSON file and parse its content
    const fileContent = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent);

    // Validate that data is an array and not empty
    if (Array.isArray(data) && data.length > 0) {
      cachedData = data;
      lastCacheTime = Date.now();
      return data;
    } else {
      throw new Error('No data found or data is not an array');
    }
  } catch (error) {
    console.error('Error loading data:', error);
    throw error; // Re-throw the error to handle it in the caller function
  }
}

async function getRandQuote(filePath) {
  try {
    // Load or get cached data
    const data = await loadData(filePath);

    // Return a random quote from the data
    return data[Math.floor(Math.random() * data.length)];
  } catch (error) {
    console.error('Error retrieving object:', error);
    return null;
  }
}

module.exports = getRandQuote;
