import React from "react"
import { useForm } from "react-hook-form"
import './style.css';

type EditFormProps = {
  placeholder: string
  fieldName: string
  initialValue?: string
  onSave: (value: string) => void
  onCancel: () => void
  validationRules: {
    required?: string | boolean
    minLength?: { value: number, message: string }
  }
}

export const EditForm = ({
  placeholder,
  fieldName,
  initialValue = "",
  onSave,
  onCancel,
  validationRules
}: EditFormProps) => {
  const { register, handleSubmit, reset } = useForm<{ [key: string]: string }>()

  const onSubmit = (data: { [key: string]: string }) => {
    
    onSave(data[fieldName])
    reset()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation()
    if (e.key === "Enter") {
      handleSubmit(onSubmit)()
    }
    if (e.key === "Escape") {
      onCancel()
    }
  }

  return (
    <div className="edit-form-container">
      <input
        autoFocus
        className="task-form__input"
        placeholder={placeholder}
        defaultValue={initialValue}
        onKeyDown={handleKeyDown}
        {...register(fieldName, validationRules)}
      />
      
    </div>
  )
}