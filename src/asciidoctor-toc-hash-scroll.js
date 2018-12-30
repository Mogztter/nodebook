'use strict';

module.exports = function hashScrollExtension () {

  this.docinfoProcessor(function(){
    this.process(({backend}) => {
      if (backend !== 'html5') {
        return '';
      }

      return `<script>
(function(d){
  d.addEventListener('DOMContentLoaded', function(){
    const script = d.createElement('script');
    script.src = 'https://unpkg.com/menuspy@1.3.0/dist/menuspy.js';
    script.async = true;
    script.onload = () => new MenuSpy(document.querySelector('#toc'), {enableLocationHash: false});
    d.body.appendChild(script);
  });
})(document);</script>
<style type="text/css">
#toc li.active > a[href^="#"] {
  font-weight: bold;
}
#toc li.active > a[href^="#"]::before {
  content: "▶ ";
  display: inline-block;
  position: absolute;
  margin-left: -1.2em;
  font-size: .8em;
  margin-top: 3px;
}
</style>`;
    });
  });
};
