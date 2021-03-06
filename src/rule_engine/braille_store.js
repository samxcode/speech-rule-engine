// Copyright 2014 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Rule store for braille rules.
 *               Sponsored by BTAA (Big Ten Academic Alliance).
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.BrailleStore');

goog.require('sre.MathStore');



/**
 * Braille rule store.
 * @constructor
 * @extends {sre.MathStore}
 */
sre.BrailleStore = function() {
  sre.BrailleStore.base(this, 'constructor');

  this.modality = 'braille';

};
goog.inherits(sre.BrailleStore, sre.MathStore);


/**
 * @override
 */
sre.BrailleStore.prototype.evaluateDefault = function(node) {
  var rest = node.textContent.slice(0);
  var descs = new Array();
  if (rest.match(/^\s+$/)) {
    // Nothing but whitespace: Ignore.
    return descs;
  }
  while (rest) {
    var chr = rest[0];
    var code = chr.charCodeAt(0);
    if (0xD800 <= code && code <= 0xDBFF &&
        rest.length > 1 && !isNaN(rest.charCodeAt(1))) {
      descs.push(sre.AuditoryDescription.create(
          {text: rest.slice(0, 2)}, {adjust: true, translate: true}));
      rest = rest.substring(2);
    } else {
      descs.push(sre.AuditoryDescription.create(
          {text: chr}, {adjust: true, translate: true}));
      rest = rest.substring(1);
    }
  }
  return descs;
};
