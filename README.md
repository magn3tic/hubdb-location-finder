
# HubDb Location Finder

An embedable google maps location finder for Hubspot customers with the website add-on (requires HubDB).

It makes use of HubDB's built-in sorting functionality - orderBy=geo_distance() - as well as the Haversine formula to determine the visitors closest locations.

http://hubdb-location-finder.surge.sh


``` Html

<!-- ProStone Location Finder Embed -->
<div id="hubdb-locationfinder-root"></div>
<link rel="stylesheet" href="https://cdn2.hubspot.net/hubfs/3974799/location-finder-embed/main.css">
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.min.css">
<script src="//maps.googleapis.com/maps/api/js?key=AIzaSyCmQltveJTrzgy3GKGdNPVkiAbdlT3chIE"></script>
<script src="https://cdn2.hubspot.net/hubfs/3974799/location-finder-embed/main.js"></script>
<script>
  window.onload = function() {
    window.hubdbLocationFinder({
      portal: '3974799',
      table: '1027020',
      color: '#91785A',
      columnsMap: {
        name: '1',
        address_street: '2',
        address_unit: '',
        address_state: '5',
        address_city: '4',
        address_zip: '6',
        email: '12',
        phone: '11',
        fax: '999',
        hours_weekday: '10',
        hours_saturday: '999',
        hours_sunday: '999',
        map_location: '15',
        products: '14'
      },
      locationColumnName: 'map_location',
      fieldDefaults: {
        radius: '50',
        resultscount: '50'
      },
      mapTheme: 'default'
    });
  };
</script>

```

