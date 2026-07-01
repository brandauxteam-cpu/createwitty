import DOMPurify from 'dompurify'

// Safely render CMS-authored HTML (headings, links, images, lists, video embeds).
export default function RichContent({ html }) {
  const clean = DOMPurify.sanitize(html || '', {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'target', 'rel'],
  })
  return <div className="prose-cw" dangerouslySetInnerHTML={{ __html: clean }} />
}
