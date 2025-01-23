'use client'

import React from 'react'
import Mapa from '@/components/Mapa'

interface MapaCoberturaProps {
  initialCity?: string | null
}

const MapaCobertura: React.FC<MapaCoberturaProps> = ({ initialCity }) => {
  const handleCityChange = (city: string) => {
    // Puedes agregar lógica adicional si es necesario
    console.log('Ciudad seleccionada:', city)
  }

  return (
    <div>
      <Mapa 
        onCityChange={handleCityChange} 
        initialCity={initialCity} 
      />
    </div>
  )
}

export default MapaCobertura