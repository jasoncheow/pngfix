Allows the use of alpha transparent PNGs (both foreground and background) on MSIE 5.5-6. Works on elements that are loaded dynamically, as well as elements that use class names to toggle between different PNG backgrounds.

## Configuration

To use, the following three variables need to be configured:

1. transparentGIF - absolute path to the location of 1px x 1px transparent gif image.

        transparentGIF: '/images/spacer.gif',
    
    or
    
        transparentGIF: 'http://domain.com/images/spacer.gif',

2. foregroundPNGSelectors - comma separated CSS selectors (as you would specify in a css file) targeting elements using PNG in the foreground.

        foregroundPNGSelectors: ['img'],

3. backgroundPNGSelectors - comma separated CSS selectors (as you would specify in a css file) targeting elements using PNG in the background.

        backgroundPNGSelectors: ['#header, .comment, #nav li'],

## Including Script

After configuration, include this file in the <head> portion of a page and limit the fix to IE 6 and below using conditional comments:

    <!--[if lte IE 6]>
    <script type="text/javascript" src="/javascripts/pngfix.js">
    <![endif]-->

Note that background-position and background-repeat properties cannot be used, as the AlphaImageLoader filter does not support positioning and tiling of images.

However, this fix tries to mimic background-repeat by setting "sizingMethod" for the filter to "scale" if background-repeat is set to anything other than "no-repeat".

Adapted from: <http://komodomedia.com/blog/index.php/2007/11/05/css-png-image-fix-for-ie>
