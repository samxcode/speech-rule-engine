// Copyright 2020 Volker Sorge
// Copyright (c) 2020 The MathJax Consortium
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

//
// This work was sponsored by ETH Zurich
//

/**
 * @fileoverview Prefix rules German.
 * @author v.sorge@mathjax.com (Volker Sorge)
 */

goog.provide('sre.PrefixGerman');

goog.require('sre.NumbersUtil');


/**
 * German Prefix rules.
*/
sre.PrefixGerman = {
  modality: 'prefix',
  locale: 'de',
  domain: 'default',
  functions: [
    ['CSF', 'CSFordinalPosition', sre.NumbersUtil.ordinalPosition]
  ],
  rules: [
    ['Rule',
      'numerator', 'default',
      '[t] "Zähler"; [p] (pause:200)',
      'self::*', 'name(../..)="fraction"',
      'count(preceding-sibling::*)=0'],
    ['Rule',
      'denominator', 'default',
      '[t] "Nenner"; [p] (pause:200)',
      'self::*', 'name(../..)="fraction"',
      'count(preceding-sibling::*)=1'],
    ['Rule',
      'base', 'default',
      '[t] "Basis"; [p] (pause:200)',
      'self::*', 'name(../..)="superscript" or name(../..)="subscript"' +
     ' or name(../..)="overscore" or name(../..)="underscore"' +
     ' or name(../..)="tensor"',
      'count(preceding-sibling::*)=0'],
    ['Rule',
      'exponent', 'default',
      '[t] "Exponent"; [p] (pause:200)',
      'self::*', 'name(../..)="superscript"',
      'count(preceding-sibling::*)=1'],
    ['Rule',
      'subscript', 'default',
      '[t] "Index"; [p] (pause:200)',
      'self::*', 'name(../..)="subscript"',
      'count(preceding-sibling::*)=1'],
    ['Rule',
      'overscript', 'default',
      '[t] "Oberer Grenzwert"; [p] (pause:200)',
      'self::*', 'name(../..)="overscore"',
      'count(preceding-sibling::*)=1'],
    ['Rule',
      'underscript', 'default',
      '[t] "Unterer Grenzwert"; [p] (pause:200)',
      'self::*', 'name(../..)="underscore"',
      'count(preceding-sibling::*)=1'],
    ['Rule',
      'radicand', 'default',
      '[t] "Radikand"; [p] (pause:200)',
      'self::*', 'name(../..)="sqrt"'],
    ['Rule',
      'radicand', 'default',
      '[t] "Radikand"; [p] (pause:200)',
      'self::*', 'name(../..)="root"',
      'count(preceding-sibling::*)=1'],
    ['Rule',
      'index', 'default',
      '[t] "Wurzelexponent"; [p] (pause:200)',
      'self::*', 'name(../..)="root"',
      'count(preceding-sibling::*)=0'],
    ['Rule',
      'leftsub', 'default',
      '[t] "linker unterer Index"; [p] (pause:200)',
      'self::*', 'name(../..)="tensor"',
      '@role="leftsub"'],
    ['Rule',
      'leftsub', 'default',
      '[t] CSFordinalPosition; [t] "linker unterer Index"; [p] (pause:200)',
      'self::*', 'name(../..)="punctuated"', 'name(../../../..)="tensor"',
      '../../@role="leftsub"'],
    ['Rule',
      'leftsuper', 'default',
      '[t] "linker oberer Index"; [p] (pause:200)',
      'self::*', 'name(../..)="tensor"',
      '@role="leftsuper"'],
    ['Rule',
      'leftsuper', 'default',
      '[t] CSFordinalPosition; [t] "linker oberer Index"; [p] (pause:200)',
      'self::*', 'name(../..)="punctuated"', 'name(../../../..)="tensor"',
      '../../@role="leftsuper"'],
    ['Rule',
      'rightsub', 'default',
      '[t] "rechter unterer Index"; [p] (pause:200)',
      'self::*', 'name(../..)="tensor"',
      '@role="rightsub"'],
    ['Rule',
      'rightsub', 'default',
      '[t] CSFordinalPosition; [t] "rechter unterer Index"; [p] (pause:200)',
      'self::*', 'name(../..)="punctuated"', 'name(../../../..)="tensor"',
      '../../@role="rightsub"'],
    ['Rule',
      'rightsuper', 'default',
      '[t] "rechter oberer Index"; [p] (pause:200)',
      'self::*', 'name(../..)="tensor"',
      '@role="rightsuper"'],
    ['Rule',
      'rightsuper', 'default',
      '[t] CSFordinalPosition; [t] "rechter oberer Index"; [p] (pause:200)',
      'self::*', 'name(../..)="punctuated"', 'name(../../../..)="tensor"',
      '../../@role="rightsuper"'],
    ['Rule',
      'choice', 'default',
      '[t] "Grundgesamtheit"; [p] (pause:200)',
      'self::line', '@role="binomial"', 'parent::*/parent::vector',
      'count(preceding-sibling::*)=0'],
    ['Rule',
      'select', 'default',
      '[t] "Stichprobengröße"; [p] (pause:200)',
      'self::line', '@role="binomial"', 'parent::*/parent::vector',
      'count(preceding-sibling::*)=1'],

    // Positions in tables
    ['Rule',
      'row', 'default',
      '[t] CSFordinalPosition; [t] "Zeile"; [p] (pause:200)',
      'self::row'
    ],
    ['Aliases',
      'row', 'self::line'
    ],
    ['Rule',
      'cell', 'default',
      '[n] ../..; [t] CSFordinalPosition; [t] "Spalte"; [p] (pause:200)',
      'self::cell', 'contains(@grammar,"depth")'
    ],
    ['Rule',
      'cell', 'default',
      '[t] CSFordinalPosition; [t] "Spalte"; [p] (pause:200)',
      'self::cell'
    ],
  ]
};
