'use strict';

const lang = 'fr';
const NAMESPACES = {
  addons: 'Add-ons/WebExtensions/API',
  javascript: 'Web/JavaScript',
  global: 'Web/JavaScript/Reference/Global_Objects',
  reference: 'Web/JavaScript/Reference',
  web: 'Web/API',
  window: 'Web/API/WindowOrWorkerGlobalScope',
};

module.exports = function MDNExtension () {
  this.blockMacro('mdn', function(){
    this.positionalAttributes('page');
    this.process((parent, target, attrs) => {
      const doc_attrs = parent.getDocument().getAttributes();
      const {title='', page, text=''} = attrs;
      const titleOrPage = title || page;

      const {'mdn-caption':mdn_caption='📖'} = doc_attrs;
      const {'mdn-caption-prefix':mdn_caption_prefix} = doc_attrs;

      attrs['textlabel'] = mdn_caption;
      attrs['role'] = 'info';
      attrs['name'] = 'note';

      if (mdn_caption_prefix) {
        attrs['title'] = `${mdn_caption_prefix} ${titleOrPage}`;
      }
      else {
        attrs['title'] = titleOrPage;
      }

      const path = NAMESPACES[target] ? '/' + NAMESPACES[target] : '';

      const content = `
Rendez-vous sur _MDN web docs_ pour en savoir plus sur ${text || titleOrPage}. +
link:https://developer.mozilla.org/docs/${lang}${path}/${page}[role="URL",window="_blank"]
      `;

      return this.createBlock(parent, 'admonition', content, attrs);
    })
  });
};
