/*
 * This file is part of the ekino/sonata project.
 *
 * (c) Ekino
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import initializeBlockSelector from './initializeBlockSelector';

/**
 * Initialize all behaviors on target and its children
 *
 * @param {Element} target
 */
const setup = target => {
  initializeBlockSelector(target);
};

// Create an observer instance
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (!mutation.addedNodes || mutation.addedNodes.length === 0) {
      return;
    }
    // When there is new nodes, we're executing setup on them
    mutation.addedNodes.forEach(node => {
      setup(node);
    });
  });
});

// Configuration of the observer
const config = { attributes: false, childList: true, characterData: true, subtree: true };

/**
 * This module can be used to execute javascript in an ES6 way on the backoffice
 */
jQuery(document).ready(() => {
  setup(document);
  observer.observe(document, config);
});

