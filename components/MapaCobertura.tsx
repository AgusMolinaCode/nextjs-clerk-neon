'use client'

import React, { useEffect, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import * as turf from '@turf/turf'

interface MapaCoberturaProps {
  initialCity?: string | null
}

const MapaCobertura: React.FC<MapaCoberturaProps> = ({ initialCity }) => {
  const [coords, setCoords] = useState({ lng: -58.3816, lat: -34.6037 })
  const [cityName, setCityName] = useState<string>(initialCity || '')

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''
    const map = new mapboxgl.Map({
      container: 'map', 
      style: 'mapbox://styles/mapbox/streets-v12', 
      center: [coords.lng, coords.lat], 
      zoom: 10 
    })

    map.on('load', () => {
      if (initialCity) {
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(initialCity)}.json?types=place&access_token=${mapboxgl.accessToken}`
        )
          .then(response => response.json())
          .then(data => {
            if (data.features && data.features[0]) {
              const [lng, lat] = data.features[0].center
              
              // Actualizar coordenadas
              setCoords({ lng, lat })
              map.setCenter([lng, lat])

              // Crear círculo de cobertura
              const center = turf.point([lng, lat])
              const circle = turf.circle(center, 10, 64, 'kilometers')
              
              // Añadir círculo al mapa
              map.addSource('coverage-circle', {
                type: 'geojson',
                data: circle
              })

              map.addLayer({
                id: 'coverage-circle',
                type: 'fill',
                source: 'coverage-circle',
                paint: {
                  'fill-color': 'rgba(33, 150, 243, 0.2)',
                  'fill-outline-color': 'rgba(33, 150, 243, 0.5)'
                }
              })

              // Añadir marcador en el centro
              new mapboxgl.Marker({ color: '#2196F3' })
                .setLngLat([lng, lat])
                .addTo(map)

              const placeName = data.features[0].text || data.features[0].place_name
              setCityName(placeName)
            }
          })
          .catch(error => console.error('Error geocoding initial city:', error))
      }
    })

    return () => map.remove()
  }, [initialCity])

  return (
    <div className='flex flex-col h-full gap-2 w-full max-w-6xl mx-auto pt-4 md:pt-10'>
      <div
        className='rounded-md flex-1 min-h-[500px]'
        id='map'
        style={{ width: '100%' }}
      />
      <p className='text-center text-sm text-gray-600 dark:text-gray-400'>
        Área de cobertura: {cityName} (10km)
      </p>
    </div>
  )
}

export default MapaCobertura