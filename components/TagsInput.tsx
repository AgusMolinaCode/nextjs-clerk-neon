'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface TagsInputProps {
  value: string[]
  onChange: (value: string[]) => void
}

const TagsInput = ({ value, onChange }: TagsInputProps) => {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault()
      const newTag = inputValue.trim().toLowerCase()
      if (value.length < 6 && !value.includes(newTag)) {
        onChange([...value, newTag])
        setInputValue('')
      }
    }
  }

  const removeTag = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove))
  }

  return (
    <div className='flex flex-col gap-2'>
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe una especialidad en tu servicio y presiona Enter para agregar (máx. 6)"
        disabled={value.length >= 6}
        className="w-full"
      />
      <div className='flex flex-wrap gap-2'>
        {value.map((tag: string, index: number) => (
          <Badge 
            key={index} 
            variant="secondary"
            className='text-sm font-medium flex items-center gap-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground'
            onClick={() => removeTag(index)}
          >
            {tag}
            <X className='h-3 w-3' />
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default TagsInput