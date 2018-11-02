
require('dotenv').config();

const limit = require('simple-rate-limiter');
const request = require('request');
const throttledRequest = limit((options, callback) => request(options, callback)).to(1).per(110);

const tableId = '1027020';
const tableUrl = `https://api.hubapi.com/hubdb/api/v1/tables/${tableId}/rows?portalId=3974799&limit=3000`;
const hapikey = process.env.HAPI_KEY;



function updateCell(rowid, cellid, posObj, index=0) {
  const requrl = 'https://api.hubapi.com/hubdb/api/v1/tables/'+tableId+'/rows/'+rowid+'/cells/'+cellid+'?hapikey='+hapikey;
  
  return new Promise((resolve, reject) => {
    throttledRequest({
      url: requrl,
      method: 'PUT',
      json: true,
      body: posObj
    }, (err, res, body) => {
      if (body && body.value) {
        resolve('Updated for row ' +index+' id#'+rowid);
      } else {
        console.log(res);
        reject('No response from hubspot :( --- '+index);
      }
    });
  });
};



request({url: tableUrl, json: true}, (err, res, body) => {

  console.log(body.objects);

  // body.objects.forEach((item, i) => {
  //   const lat = parseFloat( item.values[8] );
  //   const long = parseFloat( item.values[9] );

  //   const newData = {value:{type:"location",lat:lat,long:long}};

  //   updateCell(item.id, 15, newData, i)
  //     .then(msg => console.log(msg))
  //     .catch(msg => console.log(msg));
  // });

});