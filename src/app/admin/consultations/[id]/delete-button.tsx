'use client'

import { deleteSession } from '../actions'

export function DeleteSessionButton({ id }: { id: string }) {
  return (
    <form action={deleteSession.bind(null, id)}>
      <button
        type="submit"
        className="text-xs text-red-400 hover:text-red-300 transition-colors"
        onClick={(e) => {
          if (!confirm('Delete this session? This cannot be undone.')) e.preventDefault()
        }}
      >
        Delete
      </button>
    </form>
  )
}
