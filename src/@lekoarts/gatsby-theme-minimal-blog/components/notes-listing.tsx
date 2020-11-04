/** @jsx jsx */
import { jsx } from "theme-ui"
import NotesListItem from "./notes-list-item"

type ListingProps = {
  notes: {
    slug: string
    title: string
    date: string
    excerpt: string
    description: string
    timeToRead?: number
    labels?: {
      name: string
      slug: string
    }[]
  }[]
  className?: string
  showTags?: boolean
}

const Listing = ({ notes, className = ``, showTags = true }: ListingProps) => (
  <section sx={{ mb: [4, 5, 6] }} className={className}>
    {notes.map((note) => (
      <NotesListItem key={note.slug} note={note} showTags={showTags} />
    ))}
  </section>
)

export default Listing
