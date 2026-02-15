// file: pies-zokou.js
const { dullah } = require('../Aslam/dullah');
const fetch = require('node-fetch');

const BASE = 'https://shizoapi.onrender.com/api/pies';
const VALID_COUNTRIES = ['china', 'indonesia', 'japan', 'korea', 'hijab', 'tanzania', 'kenya', 'uganda', 'zimbabwe', 'nigeria'];

async function fetchPiesImageBuffer(country) {
    const url = `${BASE}/${country}?apikey=shizo`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('image')) throw new Error('API did not return an image');
    return res.buffer();
}

dullah(
    {
        nomCom: 'pies',
        categorie: 'fun',
        reaction: '🥧',
        alias: ['pie', 'piesimg'],
        desc: 'Send pies images by country, including Tanzania, Kenya, Uganda, Zimbabwe, Nigeria'
    },
    async (dest, zk, { ms, arg, repondre }) => {
        try {
            const sub = (arg && arg[0] ? arg[0].toLowerCase() : '');
            if (!sub) {
                return repondre(`Usage: .pies <country>\nCountries: ${VALID_COUNTRIES.join(', ')}`);
            }

            if (!VALID_COUNTRIES.includes(sub)) {
                return repondre(`❌ Unsupported country: ${sub}. Try one of: ${VALID_COUNTRIES.join(', ')}`);
            }

            // Send reaction while processing
            await zk.sendMessage(dest, { react: { text: '🔄', key: ms.key } });

            const imageBuffer = await fetchPiesImageBuffer(sub);

            await zk.sendMessage(
                dest,
                { image: imageBuffer, caption: `pies: ${sub.charAt(0).toUpperCase() + sub.slice(1)}` },
                { quoted: ms }
            );

        } catch (err) {
            console.error('Error in pies-zokou command:', err);
            await repondre('❌ Failed to fetch image. Please try again.');
        }
    }
);
