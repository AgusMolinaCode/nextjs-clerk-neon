'use client'

import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ServiceCategories } from '@/constants'

interface SelectCategoriesProps {
  value?: string
  onChange?: (value: string) => void
}

const SelectCategories = ({ value, onChange }: SelectCategoriesProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Selecciona una categoría' />
      </SelectTrigger>
      <SelectContent>
        {ServiceCategories.map((category, index) => (
          <SelectGroup key={index}>
            <SelectLabel className={`font-semibold px-2 py-1.5 rounded-sm text-md text-indigo-400`}>
              {category.label}
            </SelectLabel>
            {category.items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectCategories
