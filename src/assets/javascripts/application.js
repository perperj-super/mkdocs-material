/*
 * Copyright (c) 2016 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

'use strict';

/* ----------------------------------------------------------------------------
 * Imports
 * ------------------------------------------------------------------------- */

import FastClick from 'fastclick';
import Sidebar from './components/sidebar';
import ScrollSpy from './components/scrollspy';

/* ----------------------------------------------------------------------------
 * Application
 * ------------------------------------------------------------------------- */

/* Initialize application upon DOM ready */
document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  /* Test for iOS */
  Modernizr.addTest('ios', function() {
    return !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
  });

  /* Test for web application context */
  Modernizr.addTest('standalone', function() {
    return !!navigator.standalone;
  });

  /* Attack FastClick to mitigate 300ms delay on touch devices */
  FastClick.attach(document.body);


  var width = window.matchMedia("(min-width: 1200px)");
  var handler = function() {
    if (width.matches) {
      sidebar.listen();
    } else {
      sidebar.unlisten();
    }
  }

  var sidebar = new Sidebar('.md-sidebar--primary');
  handler(); // check listen!

  var toc = new Sidebar('.md-sidebar--secondary');
  toc.listen();

  var spy = new ScrollSpy('.md-nav--toc .md-nav__item a');
  spy.listen();

  window.addEventListener('resize', handler);
});