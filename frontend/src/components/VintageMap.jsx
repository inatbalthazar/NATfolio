import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function VintageMap() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    if (mapContainerRef.current._leaflet_id) return;

    const map = L.map(mapContainerRef.current, {
      center: [12.836, 101.328],
      zoom: 11,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      attribution: '&copy; OpenTopoMap'
    }).addTo(map);

    const officeIcon = L.divIcon({
      className: 'office-marker',
      html: '<div class="office-marker-inner"></div>',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    L.marker([12.836, 101.328], { icon: officeIcon })
      .addTo(map)
      .bindPopup('<b>Watcharine Duangsri</b><br>Rayong, Thailand')
      .openPopup();

    return () => {
      map.remove();
    };
  }, []);

  return <div id="vintage-map" ref={mapContainerRef} style={{ width: '100%', height: '400px' }}></div>;
}

export default VintageMap;
