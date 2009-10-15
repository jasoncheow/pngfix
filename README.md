# PNG Fix

Allows the use of alpha transparent PNGs (both foreground and background) on MSIE 5.5-6. Works on elements that are loaded dynamically, as well as elements that use class names to toggle between different PNG backgrounds.

Read more about [PNG Fix](http://www.pngfix.com/) hacks and solutions.

## Configuration

To use, the following three variables need to be configured:

1. `transparentGIF` - absolute path to the location of 1px x 1px transparent gif image.

        transparentGIF: '/images/spacer.gif',
    
    or
    
        transparentGIF: 'http://domain.com/images/spacer.gif',

2. `foregroundPNGSelectors` - comma separated CSS selectors (as you would specify in a css file) targeting elements using PNG in the foreground.

        foregroundPNGSelectors: 'img',

3. `backgroundPNGSelectors` - comma separated CSS selectors (as you would specify in a css file) targeting elements using PNG in the background.

    When png images are specified as the background image for elements in the css:
    
        #header {background: url('/images/header-background.png')}
        .comment {background: url('/images/comment-background.png')}
        #nav li {background: url('/images/nav-item-background.png')}
    
    Entry the selectors in a comma-separated list like this:

        backgroundPNGSelectors: '#header, .comment, #nav li',

## Including the Script in HTML

After configuration, include this file in the <head> portion of a page and limit the fix to IE 6 and below using conditional comments:

    <!--[if lte IE 6]>
    <script type="text/javascript" src="/javascripts/pngfix.js">
    <![endif]-->

Note that background-position and background-repeat properties cannot be used, as the AlphaImageLoader filter does not support positioning and tiling of images.

However, this fix tries to mimic background-repeat by setting "sizingMethod" for the filter to "scale" if background-repeat is set to anything other than "no-repeat".

## Credits

Adapted from: <http://komodomedia.com/blog/index.php/2007/11/05/css-png-image-fix-for-ie>

Contributors:

1. [Beau Smith](http://beausmith.com/): Great work on enhancing the documentation.

Copyright (c) 2008 Jason Cheow, under the MIT license
