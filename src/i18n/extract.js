const fs = require('fs');
const path = require('path');

const i18nDir = path.dirname(require.main.filename);

const languages =  [
   'ar', 'en', 'de', 'es', 'fr', 'id', 'it', 'pl', 'pt', 'ru', 'th', 'vi', 'zh_cn', 'zh_tw',
   // 'ach', 'ja', 'nl', 'zh', 
];
const keys = [
   // overlay-management + indicator-management
   'Add comparisons', 'Current comparisons', 'Current indicators', 'Favorites', 'Add indicator', 'Volatility Indicators',
   'Overlap Studies', 'Momentum Indicators', 'Price Transformation', 
   'Statistical Functions', 'Pattern Recognition', 'Bill Williams',

   // chart-options
   'Time interval', 'Chart type', 'Indicators', 'Comparisons', 'Drawing tools',
   'Chart template', 'Share chart', 'Share', 'Link', 'Embed code', 'Download as',
   'Candles', 'OHLC', 'Line' , 'Dot' , 'Line Dot' , 'Spline' , 'Table', 'Crosshair',
   'Vertical line', 'Horizontal line', 'Tick', '1 Tick', '1 Minute', '1 Hour',
   '1 Day', 'Ticks', 'Minutes', 'Hours', 'Days',

   // chart-template-manager
   'Cancel', 'OK', 'Delete', 'Remove', 'Rename', 'Back', 'Save', 'Yes', 'No',
   'Load chart template', 'Save changes', 'Save as', 'Upload template',
   `You haven't saved any templates yet`, 'Name', 'This field is required',
   `Use the "Save as ..." button to save the chart settings, type, time period, indicators and comparisons`,

   'Open', 'High', 'Low', 'Close',
   '1t', '1m', '2m', '3m', '5m', '10m', '15m', '30m',
   '1h', '2h', '4h', '8h', '1d', 'Invalid parameter(s)',
   
   'Are you sure you want to delete template?', 'Are you sure you want to overwrite current template?', 
   'Template changes saved', 'Invalid JSON file', 'Invalid template type', 'Successfully applied the template and saved it as',
   'Downloading template as', 'Template name already exists',
   'Add/Remove indicators', 'Add/Remove comparisons',
   'Error getting data for %1', 'Downloading .csv', 'Stroke width', 'Stroke color'
];

const dictionary = { };
keys.forEach(key => {
   dictionary[key] = { };
   languages.forEach(lang => {
      dictionary[key][lang] = '';
   });
});

for(const lang of languages) {
   const filePath = path.join(i18nDir, `${lang}.json`);
   const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
   keys.forEach(key => {
         if(key === 'OK') {
            dictionary[key][lang] = (content['Ok'] && content['Ok'][1]) || '';
         }
         else {
            dictionary[key][lang] = (content[key] && content[key][1]) || '';
         }
         if(dictionary[key][lang] === key)
            dictionary[key][lang] = '';
      });
}

fs.writeFileSync(path.join(i18nDir, 'dictionary.json'), JSON.stringify(dictionary), 'utf-8'); 
console.log('Done.');
