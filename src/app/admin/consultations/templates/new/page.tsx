import { createTemplate } from '../actions'

export default function NewTemplatePage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-bold text-(--color-foreground) mb-2">New Template</h1>
      <p className="text-xs text-(--color-muted) mb-8">
        Give it a name and description. You'll add questions on the next screen.
      </p>

      <form action={createTemplate} className="rounded-lg border border-(--color-border) bg-(--color-surface) p-6 space-y-4">
        <input
          name="title"
          required
          placeholder="Template title *"
          className="input-field"
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          rows={3}
          className="input-field resize-none"
        />
        <button type="submit" className="admin-btn w-full py-3">
          Create & Add Questions →
        </button>
      </form>
    </div>
  )
}
