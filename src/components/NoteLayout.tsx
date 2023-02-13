import React from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { NoteType } from '../interfaces'

type NoteLayoutProps = {
    notes: NoteType[]
}

const NoteLayout = ({notes}: NoteLayoutProps) => {
    const {id} = useParams()
    const note = notes.find(n => n.id === id)

    if ( note == null) return <Navigate to='/' replace />

  return (
    <Outlet context={note} />
  )
}

export default NoteLayout

