
// hubdb endpoint base
export const apiBase = 'https://api.hubapi.com/hubdb/api/v2/tables';


// navigator geolocate
export const geoLocate = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(pos => resolve(pos), () => reject('error'));
  });
};


// google maps geocode
export const doGeocode = addr => {
  const geocoder = new window.google.maps.Geocoder();
  const args = {};
  const argProp = (addr.lat || addr.lng) ? 'location' : 'address';
  
  args[argProp] = addr;

  return new Promise((resolve, reject) => {
    geocoder.geocode(args, (results, status) => {
      if (status === 'OK') {
        resolve(results);
      } else {
        reject(results);
      }
    });
  });
};

//pull city from geocode response
export const getReverseGeocodedLocation = results => {
  let returned = false;
  results.forEach(result => {
    if (result.types.includes('locality')) {
      returned = result;
    }
  });
  return returned.formatted_address;
};



//parse integer
export const parseIfInt = value => Number.isInteger(value) ? parseInt(value) : value;


//slugify text
export const slugify = text => {
  let specialChars = {"à":'a',"ä":'a',"á":'a',"â":'a',"æ":'a',"å":'a',"ë":'e',"è":'e',"é":'e', "ê":'e',"î":'i',"ï":'i',"ì":'i',"í":'i',"ò":'o',"ó":'o',"ö":'o',"ô":'o',"ø":'o',"ù":'o',"ú":'u',"ü":'u',"û":'u',"ñ":'n',"ç":'c',"ß":'s',"ÿ":'y',"œ":'o',"ŕ":'r',"ś":'s',"ń":'n',"ṕ":'p',"ẃ":'w',"ǵ":'g',"ǹ":'n',"ḿ":'m',"ǘ":'u',"ẍ":'x',"ź":'z',"ḧ":'h',"·":'-',"/":'-',"_":'-',",":'-',":":'-',";":'-'};
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/./g,(target, index, str) => specialChars[target] || target)
    .replace(/&/g, '-and-')        
    .replace(/[^\w\-]+/g, '')      
    .replace(/\-\-+/g, '-')         
    .replace(/^-+/, '')           
    .replace(/-+$/, '');            
}


export const checkMatchingProducts = (str, stateVal) => {
  const cellval = str.split(';').map(val => slugify(val));
  let matches = [];
  stateVal.forEach(val => {
    if (cellval.includes(val)) {
      matches.push(val);
    }
  });
  return matches.length > 0;
};

// converts numeric degrees to radians
const toRadian = val => val * Math.PI / 180;
// get a distance in km or miles between 2 lat/lng sets
// calcs "as the crow flies" not actual driving distance
export const getDistanceBetween = (pos, dest) => {
  const R = 6371; // km
  const dLat = toRadian(dest.lat - pos.lat);
  const dLon = toRadian(dest.lng - pos.lng);
  const lat1 = toRadian(pos.lat);
  const lat2 = toRadian(dest.lat);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c;
  return (d * 0.62137).toFixed(1);
};


//detect if its being viewed through an iframe
export const appInsideIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

