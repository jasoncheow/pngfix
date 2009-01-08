/*---------------------------------------------------------------------------
Allows the use of alpha transparent PNGs (both foreground and background) on 
MSIE 5.5-6. Works on elements that are loaded dynamically, as well as 
elements that use class names to toggle between different PNG backgrounds.

To use, the following variables need to be configured:

  Location of 1px transparent gif (transparentGIF).

  CSS selectors targeting elements using PNG in the foreground 
  (foregroundPNGSelectors).

  CSS selectors targeting elements using PNG in the background 
  (backgroundPNGSelectors).

After configuration, include this file in the <head> portion of a page and 
limit the fix to IE 6 and below using conditional comments:

  <!--[if lte IE 6]>
  <script type="text/javascript" src="/javascripts/pngfix.js">
  <![endif]-->

Note that background-position and background-repeat properties cannot be 
used, as the AlphaImageLoader filter does not support positioning and 
tiling of images.

However, this fix tries to mimic background-repeat by setting "sizingMethod" 
for the filter to "scale" if background-repeat is set to anything other 
than "no-repeat".

Adapted from: 
http://komodomedia.com/blog/index.php/2007/11/05/css-png-image-fix-for-ie

Copyright (c) 2008 Jason Cheow, under the MIT license
---------------------------------------------------------------------------*/

var PNGFix = {
  transparentGIF: "/images/spacer.gif",

  foregroundPNGSelectors: ['img'],

  backgroundPNGSelectors: [],
  
  isPNGForeground: function(element) {
    return (element.src && element.src.match(/\.png/i))
  },
  
  isPNGBackground: function(element) {
    return (element.currentStyle.backgroundImage.match(/\.png/i) || element.style.backgroundImage.match(/\.png/i))
  },
  
  fixForeground: function(element) {
    if (PNGFix.isPNGForeground(element)) {
      PNGFix._hideForeground(element);
      var dummyElement = document.createElement('img');
      dummyElement.actualElement = element;
      dummyElement.onreadystatechange = function() {
        if (this.readyState == 'complete') {
          this.onreadystatechange = null;
          PNGFix._fixForeground(this.actualElement);
        }
      };
      dummyElement.src = element.src;
    }
  },
  
  _hideForeground: function(element) {
    element.cachedVisibility = element.runtimeStyle.visibility;
    element.runtimeStyle.visibility = 'hidden';
  },
  
  _fixForeground: function(element) {
    element.runtimeStyle.backgroundImage = 'none';
    element.runtimeStyle.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + element.src + '", sizingMethod="image")';
    element.src = PNGFix.transparentGIF;
    element.runtimeStyle.visibility = element.cachedVisibility;
  },
    
  fixBackground: function(element) {
    if (PNGFix.isPNGBackground(element)) {
      PNGFix._hideBackground(element);
      var dummyElement = document.createElement('img');
      dummyElement.actualElement = element;
      dummyElement.onreadystatechange = function() {
        if (this.readyState == 'complete') {
          this.onreadystatechange = null;
          PNGFix._fixBackground(this.actualElement);
        }
      };
      dummyElement.src = element.cachedSrc;
      element.onpropertychange = function() {
        if (window.event.propertyName.match(/^classname$/i)) {
          PNGFix._hideBackground(element);
          PNGFix._fixBackground(element);
        }
      };
    }
  },
  
  _hideBackground: function(element) {
    element.runtimeStyle.backgroundImage = '';
    element.cachedSrc = (element.currentStyle.backgroundImage || element.style.backgroundImage).toString().replace(/url\("([^"]+)"\)/i, "$1");
    element.cachedSizingMethod = (!(element.currentStyle.backgroundRepeat || element.style.backgroundRepeat).match(/no-repeat/i)) ? 'scale' : 'crop';
    element.runtimeStyle.backgroundImage = 'none';
  },
  
  _fixBackground: function(element) {
    element.runtimeStyle.zoom = '1';
    element.runtimeStyle.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + element.cachedSrc + '", sizingMethod="' + element.cachedSizingMethod + '")';
    if (element.nodeName.match(/^a$/i)) { element.runtimeStyle.cursor = 'pointer'; }
  }
};

(function() {
  if (!!(window.attachEvent && !window.opera)) {
    if (!/MSIE (5\.5|6)/.test(navigator.userAgent)) { return; }
    
    document.writeln('<style type="text/css">');
    
    var elements = PNGFix.foregroundPNGSelectors;
    for (i = 0; i < elements.length; i++) { 
      document.write(elements[i]);
      if (elements[i] != elements[elements.length - 1]) { document.writeln(','); }
    }
    if (elements.length > 0) { document.writeln('{ behavior: expression((this.runtimeStyle.behavior = "none") && (PNGFix.fixForeground(this))); }'); }
    
    var elements = PNGFix.backgroundPNGSelectors;
    for (i = 0; i < elements.length; i++) { 
      document.write(elements[i]);
      if (elements[i] != elements[elements.length - 1]) { document.writeln(','); }
    }
    if (elements.length > 0) { document.writeln('{ behavior: expression((this.runtimeStyle.behavior = "none") && (PNGFix.fixBackground(this))); }'); }
    
    document.writeln('</style>');    
  }
})();
