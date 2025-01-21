import { Label } from '@/components/ui/label'
import { SelectNative } from '@/components/ui/select-native'
import { useId } from 'react'

interface SelectNativeComponentProps {
  cities: string[]
  onCityChange: (city: string) => void
}

export default function SelectNativeComponent({ 
  cities, 
  onCityChange 
}: SelectNativeComponentProps) {
  const id = useId()

  return (
    <div className='space-y-2'>
      <SelectNative 
        id={id} 
        onChange={(e) => onCityChange(e.target.value)}
        defaultValue=""
      >
        <option value="">Todas las ciudades</option>
        {cities.sort().map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </SelectNative>
    </div>
  )
}
