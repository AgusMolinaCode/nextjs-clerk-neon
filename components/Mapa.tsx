'use client'

import React, { useEffect, useState } from 'react'

import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'

const Mapa = () => {
  const [coords, setCoords] = useState({ lng: -58.3816, lat: -34.6037 })

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [coords.lng, coords.lat], // Buenos Aires coordinates
      zoom: 12 // starting zoom
    })

    const marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([coords.lng, coords.lat])
      .addTo(map)

    marker.on('dragend', () => {
      const lngLat = marker.getLngLat()
      setCoords({ lng: lngLat.lng, lat: lngLat.lat })

      // Reverse geocoding to get city name
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${mapboxgl.accessToken}`)
        .then(response => response.json())
        .then(data => {
          const placeName = data.features[0]?.place_name || 'Unknown location'
          console.log(`City: ${placeName}`)
        })
        .catch(error => console.error('Error fetching location data:', error))
    })

    return () => map.remove() // Cleanup on unmount
  }, [])

  return <div className='rounded-md' id='map' style={{ width: '100%', height: '100%' }} />
}

export default Mapa
