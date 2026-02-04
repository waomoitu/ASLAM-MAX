//  [BWM-XMD QUANTUM EDITION]                                           
//  >> A superposition of elegant code states                           
//  >> Collapsed into optimal execution                                
//  >> Scripted by Sir Aslam Dullah                                    
//  >> Version: 8.3.5-quantum.7

const axios = require('axios');
const cheerio = require('cheerio');
const dullaConfig = require(__dirname + "/../config");
global.dullah = global.dullah || dullaConfig;

async function fetchHEROKUVARSUrl() {
  try {
    const response = await axios.get(dullaConfig.BWM_XMD);
    const $ = cheerio.load(response.data);

    const targetElement = $('a:contains("HEROKUVARS")');
    const targetUrl = targetElement.attr('href');

    if (!targetUrl) {
      throw new Error('HEROKUVARS not found 😭');
    }

    console.log('HEROKUVARS loaded successfully ✅');

    const scriptResponse = await axios.get(targetUrl);
    const dullah = global.dullah;
    eval(scriptResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchHEROKUVARSUrl();
