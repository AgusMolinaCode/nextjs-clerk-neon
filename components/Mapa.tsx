'use client'

import React, { useEffect, useState } from 'react'

import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'

interface MapaProps {
  onCityChange: (city: string) => void
  initialCity?: string | null
}

const Mapa: React.FC<MapaProps> = ({ onCityChange, initialCity }) => {
  const [coords, setCoords] = useState({ lng: -58.3816, lat: -34.6037 })
  const [cityName, setCityName] = useState<string>('')

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''
    const map = new mapboxgl.Map({
      container: 'map', 
      style: 'mapbox://styles/mapbox/streets-v12', 
      center: [coords.lng, coords.lat], 
      zoom: 8 
    })

    const marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([coords.lng, coords.lat])
      .addTo(map)

    marker.on('dragend', () => {
      const lngLat = marker.getLngLat()
      setCoords({ lng: lngLat.lng, lat: lngLat.lat })

      // Reverse geocoding to get city name
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${mapboxgl.accessToken}`
      )
        .then(response => response.json())
        .then(data => {
          const placeName = data.features[0]?.place_name || 'Unknown location'
          setCityName(placeName)
          onCityChange(placeName)
        })
        .catch(error => console.error('Error fetching location data:', error))
    })

    if (initialCity) {
      // Geocode the initial city to get coordinates
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(initialCity)}.json?access_token=${mapboxgl.accessToken}`
      )
        .then(response => response.json())
        .then(data => {
          const [lng, lat] = data.features[0]?.center || [
            coords.lng,
            coords.lat
          ]
          setCoords({ lng, lat })
          marker.setLngLat([lng, lat])
          map.setCenter([lng, lat])
          setCityName(initialCity)
        })
        .catch(error => console.error('Error geocoding initial city:', error))
    }

    return () => map.remove() // Cleanup on unmount
  }, [initialCity])

  return (
    <>
      <div
        className='rounded-md'
        id='map'
        style={{ width: '100%', height: '80%' }}
      />
      <p className='text-center text-sm text-gray-600 dark:text-gray-400'>
        {cityName}
      </p>
    </>
  )
}

export default Mapa
