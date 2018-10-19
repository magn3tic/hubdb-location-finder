
import Axios from 'axios';


export const apiBase = 'https://api.hubapi.com/hubdb/api/v2/tables';

export const geoLocate = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(pos => resolve(pos), () => reject('error'));
  });
};

export const doGeocode = addr => {
  const apikey = 'AIzaSyCmQltveJTrzgy3GKGdNPVkiAbdlT3chIE';
  return Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${apikey}`);
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


