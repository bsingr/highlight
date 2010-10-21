/*

=== highlight v3.1 ===

a fork of highlight v3 by dpree
http://github.com/dpree/highlight

CHANGELOG
- added event-hooks
- added callbacks

=== highlight v3 ===

highlight v3

Highlights arbitrary terms.

<http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>

MIT license.

Johann Burkard
<http://johannburkard.de>
<mailto:jb@eaio.com>

*/
(function(jQuery){  
  jQuery.fn.highlight = function(pat, _c) {
   function innerHighlight(node, pat, callback) {
    var skip = 0;
    if (node.nodeType == 3) {
     var pos = node.data.toUpperCase().indexOf(pat);
     if (pos >= 0) {
      var spannode = document.createElement('span');
      spannode.className = 'highlight';
      var middlebit = node.splitText(pos);
      var endbit = middlebit.splitText(pat.length);
      var middleclone = middlebit.cloneNode(true);
      spannode.appendChild(middleclone);
      middlebit.parentNode.replaceChild(spannode, middlebit);
      skip = 1;
      var ui = {"highlighted": spannode};
      jQuery(middlebit.parentNode).trigger("ui-highlighted", ui)
      if (callback) {callback(ui)};
     }
    }
    else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
     for (var i = 0; i < node.childNodes.length; ++i) {
      i += innerHighlight(node.childNodes[i], pat, callback);
     }
    }
    return skip;
   }
   return this.each(function() {
    innerHighlight(this, pat.toUpperCase(), _c);
   });
  };

  jQuery.fn.removeHighlight = function() {
   return this.find("span.highlight").each(function() {
    this.parentNode.firstChild.nodeName;
    with (this.parentNode) {
     replaceChild(this.firstChild, this);
     normalize();
    }
   }).end();
  };
})(jQuery);