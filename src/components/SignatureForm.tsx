'use client'

import React from 'react'

export type SignatureData = {
  name: string
  position: string
  phone: string
  email: string
}

interface SignatureFormProps {
  data: SignatureData
  onChange: (data: SignatureData) => void
}

export default function SignatureForm({ data, onChange }: SignatureFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onChange({ ...data, [name]: value })
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select() // Select all text on focus so typing replaces it immediately
  }

  return (
    <div className="form-container">
      <h2>Informations de l'employé</h2>
      
      <div className="input-group">
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          id="name"
          name="name"
          value={data.name}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="Jean Dupont"
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="position">Poste</label>
        <input
          type="text"
          id="position"
          name="position"
          value={data.position}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="Directeur Commercial"
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="phone">Téléphone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="+228 90 00 00 00"
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="jean.dupont@facamstairwaytogo.com"
          required
        />
      </div>
    </div>
  )
}
