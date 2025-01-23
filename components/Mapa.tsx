'use client'

import React, { useEffect, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import * as turf from '@turf/turf'

interface MapaProps {
  onCityChange: (city: string) => void
  initialCity?: string | null
}

const Mapa: React.FC<MapaProps> = ({ onCityChange, initialCity }) => {
  const [coords, setCoords] = useState({ lng: -58.3816, lat: -34.6037 })
  const [cityName, setCityName] = useState<string>('')
  const [map, setMap] = useState<mapboxgl.Map | null>(null)

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''
    const mapInstance = new mapboxgl.Map({
      container: 'map', 
      style: 'mapbox://styles/mapbox/streets-v12', 
      center: [coords.lng, coords.lat], 
      zoom: 12 
    })

    setMap(mapInstance)

    const marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([coords.lng, coords.lat])
      .addTo(mapInstance)

    // Añadir círculo de 10km
    mapInstance.on('load', () => {
      const center = [coords.lng, coords.lat]
      const radius = 10 // radio en kilómetros
      const circle = turf.circle(center, radius)

      mapInstance.addSource('10km-circle', {
        type: 'geojson',
        data: circle
      })

      mapInstance.addLayer({
        id: '10km-circle',
        type: 'fill',
        source: '10km-circle',
        paint: {
          'fill-color': 'rgba(33, 150, 243, 0.2)', // Color azul transparente
          'fill-outline-color': 'rgba(33, 150, 243, 0.5)'
        }
      })
    })

    marker.on('dragend', () => {
      const lngLat = marker.getLngLat()
      setCoords({ lng: lngLat.lng, lat: lngLat.lat })

      // Reverse geocoding para obtener información detallada
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?types=place&access_token=${mapboxgl.accessToken}`
      )
        .then(response => response.json())
        .then(data => {
          const placeName = data.features[0]?.text || data.features[0]?.place_name || 'Ubicación desconocida'
          setCityName(placeName)
          onCityChange(placeName)

          // Actualizar círculo de 10km
          const center = [lngLat.lng, lngLat.lat]
          const radius = 10 // radio en kilómetros
          const circle = turf.circle(center, radius, {
            properties: {},
            steps: 64 // Optional: increases circle smoothness
          })
          
          if (mapInstance.getSource('10km-circle')) {
            (mapInstance.getSource('10km-circle') as mapboxgl.GeoJSONSource).setData(circle)
          }
        })
        .catch(error => console.error('Error fetching location data:', error))
    })

    if (initialCity) {
      // Geocodificar la ciudad inicial
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(initialCity)}.json?types=place&access_token=${mapboxgl.accessToken}`
      )
        .then(response => response.json())
        .then(data => {
          const [lng, lat] = data.features[0]?.center || [
            coords.lng,
            coords.lat
          ]
          setCoords({ lng, lat })
          marker.setLngLat([lng, lat])
          mapInstance.setCenter([lng, lat])
          
          // Actualizar el círculo de 10km
          const center = [lng, lat]
          const radius = 10 // radio en kilómetros
          const circle = turf.circle(center, radius, {
            properties: {},
            steps: 64 // Optional: increases circle smoothness
          })
          
          if (mapInstance.getSource('10km-circle')) {
            (mapInstance.getSource('10km-circle') as mapboxgl.GeoJSONSource).setData(circle)
          }

          const placeName = data.features[0]?.text || data.features[0]?.place_name || 'Ubicación desconocida'
          setCityName(placeName)
          onCityChange(placeName)
        })
        .catch(error => console.error('Error geocoding initial city:', error))
    }

    return () => mapInstance.remove() // Cleanup on unmount
  }, [initialCity])

  return (
    <div className='flex flex-col h-full gap-2'>
      <div
        className='rounded-md flex-1 min-h-[300px]'
        id='map'
        style={{ width: '100%' }}
      />
      <p className='text-center text-sm text-gray-600 dark:text-gray-400'>
        Área de cobertura: {cityName} (10km)
      </p>
    </div>
  )
}

export default Mapa
