/**
 * Normalises WYSIWYG HTML so it wraps correctly on small screens.
 *
 * Rich-text editors often insert non-breaking spaces (&nbsp;) between every
 * word and inline `white-space`/`width` styles. Non-breaking spaces prevent
 * the browser from wrapping lines, which makes text bleed off the screen on
 * mobile. We convert them to normal spaces (keeping intentionally empty
 * paragraphs) and strip layout-breaking inline styles.
 */
export default function cleanHtml(html) {
  if (!html || typeof html !== 'string') return '';
  return html
    // Preserve intentional blank lines: <p>&nbsp;</p> -> <p></p> (styled via :empty)
    .replace(/<p([^>]*)>\s*(?:&nbsp;|\u00a0|\s)*\s*<\/p>/gi, '<p$1></p>')
    // Replace remaining non-breaking spaces with normal spaces
    .replace(/&nbsp;|&#160;|\u00a0/gi, ' ')
    // Remove inline white-space / width declarations that block wrapping
    .replace(/(white-space|min-width|width)\s*:\s*[^;"']+;?/gi, '');
}
