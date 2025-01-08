'use client'

import React from 'react'
import { ReactTags, Tag } from 'react-tag-autocomplete'
import { Control, useController } from 'react-hook-form'
import { X } from 'lucide-react'
import './tags.css'

interface TagsInputProps {
  control: Control<any>
  name: string
}

const TagsInput = ({ control, name }: TagsInputProps) => {
  const { field } = useController({
    name,
    control,
    defaultValue: []
  })

  return (
    <div className='w-full'>
      <label className='text-sm font-medium'>Tags</label>
      <ReactTags
        selected={field.value || []}
        suggestions={[]}
        allowNew
        onAdd={(newTag) => {
          if ((field.value || []).length < 3) {
            field.onChange([...(field.value || []), newTag])
          }
        }}
        onDelete={(tagIndex) => {
          field.onChange(field.value.filter((_: any, i: any) => i !== tagIndex))
        }}
        placeholderText='Agregar tag...'
        
      />
    </div>
  )
}

export default TagsInput