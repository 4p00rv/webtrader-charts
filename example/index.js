import _ from 'lodash';
import $ from 'jquery';
import wtcharts from 'webtrader-charts';

wtcharts.init({
   appId: 11,
   lang: 'en', // default is 'en'
   server: 'wss://ws.binaryws.com/websockets/v3'
});


const $parent = $('#container');
const chart =  wtcharts.chartWindow.addNewChart($parent, {
   "instrumentCode": "R_50",
   "instrumentName": "Volatility index",
   "showInstrumentName": true,
   "timePeriod": "1m",
   "type": "candlestick",
   "indicators": [],
   "overlays": []
});
chart.events.anyChange = () => {
   console.warn(chart.data());
};
const chart2 =  wtcharts.chartWindow.addNewChart($('#container2'), {
   "instrumentCode": "R_50",
   "instrumentName": "Volatility index",
   "showInstrumentName": true,
   "timePeriod": "1m",
   "type": "candlestick",
   "indicators": [],
   "overlays": []
});
chart2.events.anyChange = () => {
   console.warn(chart.data());
}; 


// This is a test for a timing issue in need to fix.
const run_timing_issue_test = () => {
   const configs = [
      {
         "type": "line",
         "timePeriod": "1m",
         "instrumentCode": "RDBULL",
         "instrumentName": "Bull Market Index",
         "showInstrumentName": true, // default is false
         "showOverlays": false, // default is true
         "indicators": [
            {
               "id": "cks",
               "name": "Chande Kroll Stop",
               "options": {
                  "period": 10, "maxMinPeriod": 20,
                  "multiplier": 3, "longStopStroke": "#00C176",
                  "shortStopStroke": "#FF003C", "strokeWidth": 1,
                  "dashStyle": "Solid"
               }
            },
         ],
      },
      {
         "instrumentCode": "GDAXI",
         "instrumentName": "German Index",
         "timePeriod": "1d",
         "type": "candlestick",
         "indicators": [],
         "overlays": []
      }
   ];

   let chart = null;
   const rerender = () => {
      chart && chart.actions.destroy();
      const config = configs[Math.random() > 0.5 ? 1 : 0];
      chart =  wtcharts.chartWindow.addNewChart($parent, config);
      const timeout = Math.random()*2500;
      console.warn(timeout | 0);
      if(!window.stop_test)
         setTimeout(rerender, timeout | 0);
   };
   rerender();
}; 
// run_timing_issue_test();
