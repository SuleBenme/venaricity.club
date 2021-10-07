import { renderToStaticMarkup } from 'react-dom/server';

export default function renderBody(Layout) {
  const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" ' +
    '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'

  return doctype + renderToStaticMarkup(Layout)
}
