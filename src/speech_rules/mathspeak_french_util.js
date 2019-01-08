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
 * @fileoverview Utility functions for mathspeak rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MathspeakFrenchUtil');

goog.require('sre.BaseUtil');
goog.require('sre.DomUtil');
goog.require('sre.Messages');
goog.require('sre.Semantic');
goog.require('sre.SystemExternal');
goog.require('sre.XpathUtil');


goog.scope(function() {
var msg = sre.Messages;


/**
 * String function to separate text into single characters by adding
 * intermittent spaces.
 * @param {!Node} node The node to be processed.
 * @return {string} The spaced out text.
 */
sre.MathspeakFrenchUtil.spaceoutText = function(node) {
  return node.textContent.split('').join(' ');
};


/**
 * Query function that splits into number nodes and content nodes.
 * @param {!Node} node The node to be processed.
 * @return {Array.<Node>} List of number and content nodes.
 */
sre.MathspeakFrenchUtil.spaceoutNumber = function(node) {
  var content = node.textContent.split('');
  var result = [];
  var dp = new sre.SystemExternal.xmldom.DOMParser();
  for (var i = 0, chr; chr = content[i]; i++) {
    // We ignore Greek characters for now!
    var type = sre.Semantic.Type.NUMBER;
    var role = chr.match(/\W/) ?
        sre.SemanticAttr.lookupMeaning(chr).role :
        sre.Semantic.Role.PROTECTED;
    var doc = dp.parseFromString('<' + type + ' role="' + role + '">' +
                                 chr + '</' + type + '>', 'text/xml');
    result.push(doc.documentElement);
  }
  return result;
};


/**
 * Query function that splits into number nodes and content nodes.
 * @param {!Node} node The node to be processed.
 * @return {Array.<Node>} List of number and content nodes.
 */
sre.MathspeakFrenchUtil.spaceoutIdentifier = function(node) {
  var textContent = node.textContent;
  if (!textContent.match(/[a-zA-Z]+/)) {
    node.setAttribute('role', sre.SemanticAttr.Role.PROTECTED);
    return [node];
  }
  var content = textContent.split('');
  var result = [];
  var dp = new sre.SystemExternal.xmldom.DOMParser();
  for (var i = 0, chr; chr = content[i]; i++) {
    // We ignore Greek characters for now!
    var type = sre.Semantic.Type.IDENTIFIER;
    var role = sre.Semantic.Role.UNKNOWN;
    var doc = dp.parseFromString('<' + type + ' role="' + role + '">' +
                                 chr + '</' + type + '>', 'text/xml');
    result.push(doc.documentElement);
  }
  return result;
};


/**
 * Tags that serve as a nesting barrier by default.
 * @type {Array.<sre.Semantic.Type>}
 */
sre.MathspeakFrenchUtil.nestingBarriers = [
  sre.Semantic.Type.CASES,
  sre.Semantic.Type.CELL,
  sre.Semantic.Type.INTEGRAL,
  sre.Semantic.Type.LINE,
  sre.Semantic.Type.MATRIX,
  sre.Semantic.Type.MULTILINE,
  sre.Semantic.Type.OVERSCORE,
  sre.Semantic.Type.ROOT,
  sre.Semantic.Type.ROW,
  sre.Semantic.Type.SQRT,
  sre.Semantic.Type.SUBSCRIPT,
  sre.Semantic.Type.SUPERSCRIPT,
  sre.Semantic.Type.TABLE,
  sre.Semantic.Type.UNDERSCORE,
  sre.Semantic.Type.VECTOR
];


/**
 * Dictionary to store the nesting depth of each node.
 * @type {Object.<Object.<number>>}
 */
sre.MathspeakFrenchUtil.nestingDepth = {};


/**
 * Resets the nesting depth parameters. Method should be used on every new
 * expression.
 * @param {Node} node The node to translate.
 * @return {Array.<Node>} Array containing the original node only.
 */
sre.MathspeakFrenchUtil.resetNestingDepth = function(node) {
  sre.MathspeakFrenchUtil.nestingDepth = {};
  return [node];
};


/**
 * Computes the depth of nested descendants of a particular set of tags for a
 * node.
 * @param {string} type The type of nesting depth.
 * @param {!Node} node The XML node to check.
 * @param {Array.<string>} tags The tags to be considered for the nesting depth.
 * @param {Array.<sre.Semantic.Attr>=} opt_barrierTags Optional list of tags
 *     that serve as barrier.
 * @param {Object.<string>=} opt_barrierAttrs Attribute value pairs that
 *     serve as barrier.
 * @param {function(!Node): boolean=} opt_func A function that overrides both
 *     tags and attribute barriers, i.e., if function returns true it will be
 *     considered as barrier, otherwise tags and attributes will be considered.
 * @return {number} The nesting depth.
 */
sre.MathspeakFrenchUtil.getNestingDepth = function(type, node, tags, opt_barrierTags,
                                             opt_barrierAttrs, opt_func) {
  opt_barrierTags = opt_barrierTags || sre.MathspeakFrenchUtil.nestingBarriers;
  opt_barrierAttrs = opt_barrierAttrs || {};
  opt_func = opt_func || function(node) { return false; };
  var xmlText = new sre.SystemExternal.xmldom.XMLSerializer().
          serializeToString(node);
  if (!sre.MathspeakFrenchUtil.nestingDepth[type]) {
    sre.MathspeakFrenchUtil.nestingDepth[type] = {};
  }
  if (sre.MathspeakFrenchUtil.nestingDepth[type][xmlText]) {
    return sre.MathspeakFrenchUtil.nestingDepth[type][xmlText];
  }
  if (opt_func(node) || tags.indexOf(node.tagName) < 0) {
    return 0;
  }
  var depth = sre.MathspeakFrenchUtil.computeNestingDepth_(
      node, tags, sre.BaseUtil.setdifference(opt_barrierTags, tags),
      opt_barrierAttrs, opt_func, 0);
  sre.MathspeakFrenchUtil.nestingDepth[type][xmlText] = depth;
  return depth;
};


/**
 * Checks if a node contains given attribute value pairs.
 * @param {!Node} node The XML node to check.
 * @param {Object.<string>} attrs Attribute value pairs.
 * @return {boolean} True if all attributes are contained and have the given
 *     values.
 */
sre.MathspeakFrenchUtil.containsAttr = function(node, attrs) {
  if (!node.attributes) {
    return false;
  }
  var attributes = sre.DomUtil.toArray(node.attributes);
  for (var i = 0, attr; attr = attributes[i]; i++) {
    if (attrs[attr.nodeName] === attr.nodeValue) {
      return true;
    }
  }
  return false;
};


/**
 * Computes the depth of nested descendants of a particular set of tags for a
 * node recursively.
 * @param {!Node} node The XML node to process.
 * @param {Array.<string>} tags The tags to be considered for the nesting depth.
 * @param {Array.<string>} barriers List of tags that serve as barrier.
 * @param {Object.<string>} attrs Attribute value pairs that serve as
 *     barrier.
 * @param {function(!Node): boolean} func A function that overrides both tags
 *     and attribute barriers, i.e., if function returns true it will be
 *     considered as barrier, otherwise tags and attributes will be considered.
 * @param {number} depth Accumulator for the nesting depth that is computed.
 * @return {number} The nesting depth.
 * @private
 */
sre.MathspeakFrenchUtil.computeNestingDepth_ = function(
    node, tags, barriers, attrs, func, depth) {
  if (func(node) ||
      barriers.indexOf(node.tagName) > -1 ||
      sre.MathspeakFrenchUtil.containsAttr(node, attrs))
  {
    return depth;
  }
  if (tags.indexOf(node.tagName) > -1) {
    depth++;
  }
  if (!node.childNodes || node.childNodes.length === 0) {
    return depth;
  }
  var children = sre.DomUtil.toArray(node.childNodes);
  return Math.max.apply(null, children.map(
      function(subNode) {
        return sre.MathspeakFrenchUtil.computeNestingDepth_(
            subNode, tags, barriers, attrs, func, depth);
      }));
};


// TODO (sorge) Refactor the following to functions wrt. style attribute.
/**
 * Computes and returns the nesting depth of fraction nodes.
 * @param {!Node} node The fraction node.
 * @return {number} The nesting depth. 0 if the node is not a fraction.
 */
sre.MathspeakFrenchUtil.fractionNestingDepth = function(node) {
  return sre.MathspeakFrenchUtil.getNestingDepth(
      'fraction', node, ['fraction'], sre.MathspeakFrenchUtil.nestingBarriers, {},
      msg.MS_FUNC.FRAC_NEST_DEPTH);
};


/**
 * Opening string for fractions in Mathspeak verbose mode.
 * @param {!Node} node The fraction node.
 * @return {string} The opening string.
 */
sre.MathspeakFrenchUtil.openingFractionVerbose = function(node) {
  var depth = sre.MathspeakFrenchUtil.fractionNestingDepth(node);
  return new Array(depth + 1).join(msg.MS.START) + msg.MS.FRAC_V;
};


/**
 * Closing string for fractions in Mathspeak verbose mode.
 * @param {!Node} node The fraction node.
 * @return {string} The closing string.
 */
sre.MathspeakFrenchUtil.closingFractionVerbose = function(node) {
  var depth = sre.MathspeakFrenchUtil.fractionNestingDepth(node);
  return new Array(depth + 1).join(msg.MS.END) + msg.MS.FRAC_V;
};


/**
 * Middle string for fractions in Mathspeak verbose mode.
 * @param {!Node} node The fraction node.
 * @return {string} The middle string.
 */
sre.MathspeakFrenchUtil.overFractionVerbose = function(node) {
  var depth = sre.MathspeakFrenchUtil.fractionNestingDepth(node);
  return new Array(depth + 1).join(msg.MS.FRAC_OVER).trim();
};


/**
 * Opening string for fractions in Mathspeak brief mode.
 * @param {!Node} node The fraction node.
 * @return {string} The opening string.
 */
sre.MathspeakFrenchUtil.openingFractionBrief = function(node) {
  var depth = sre.MathspeakFrenchUtil.fractionNestingDepth(node);
  return new Array(depth + 1).join(msg.MS.START) + msg.MS.FRAC_B;
};


/**
 * Closing string for fractions in Mathspeak brief mode.
 * @param {!Node} node The fraction node.
 * @return {string} The closing string.
 */
sre.MathspeakFrenchUtil.closingFractionBrief = function(node) {
  var depth = sre.MathspeakFrenchUtil.fractionNestingDepth(node);
  return new Array(depth + 1).join(msg.MS.END) + msg.MS.FRAC_B;
};


/**
 * Opening string for fractions in Mathspeak superbrief mode.
 * @param {!Node} node The fraction node.
 * @return {string} The opening string.
 */
sre.MathspeakFrenchUtil.openingFractionSbrief = function(node) {
  var depth = sre.MathspeakFrenchUtil.fractionNestingDepth(node);
  if (depth === 1) {
    return msg.MS.FRAC_S;
  }
  return msg.MS.NEST_FRAC + msg.MS_FUNC.RADICAL_NEST_DEPTH(depth - 1) +
      msg.MS.FRAC_S;
};


/**
 * Closing string for fractions in Mathspeak superbrief mode.
 * @param {!Node} node The fraction node.
 * @return {string} The closing string.
 */
sre.MathspeakFrenchUtil.closingFractionSbrief = function(node) {
  var depth = sre.MathspeakFrenchUtil.fractionNestingDepth(node);
  if (depth === 1) {
    return msg.MS.ENDFRAC;
  }
  return msg.MS.NEST_FRAC + msg.MS_FUNC.RADICAL_NEST_DEPTH(depth - 1) +
      msg.MS.ENDFRAC;
};


/**
 * Middle string for fractions in Mathspeak superbrief mode.
 * @param {!Node} node The fraction node.
 * @return {string} The middle string.
 */
sre.MathspeakFrenchUtil.overFractionSbrief = function(node) {
  var depth = sre.MathspeakFrenchUtil.fractionNestingDepth(node);
  if (depth === 1) {
    return msg.MS.FRAC_OVER;
  }
  return msg.MS.NEST_FRAC + msg.MS_FUNC.RADICAL_NEST_DEPTH(depth - 1) +
      msg.MS.OVER;
};


/**
 * String representation of zero to nineteen.
 * @type {Array.<string>}
 */
sre.MathspeakFrenchUtil.onesNumbers = [
  '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen'
];


/**
 * String representation of twenty to ninety.
 * @type {Array.<string>}
 */
sre.MathspeakFrenchUtil.tensNumbers = [
  '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty',
  'ninety'
];


/**
 * String representation of thousand to decillion.
 * @type {Array.<string>}
 */
sre.MathspeakFrenchUtil.largeNumbers = [
  '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
  'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion',
  'decillion'
];


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param {number} number The number to translate.
 * @return {string} The string representation of that number.
 */
sre.MathspeakFrenchUtil.hundredsToWords = function(number) {
  var n = number % 1000;
  var str = '';
  str += sre.MathspeakFrenchUtil.onesNumbers[Math.floor(n / 100)] ?
      sre.MathspeakFrenchUtil.onesNumbers[Math.floor(n / 100)] + '-hundred' : '';
  n = n % 100;
  if (n) {
    str += str ? '-' : '';
    str += sre.MathspeakFrenchUtil.onesNumbers[n] ||
      (sre.MathspeakFrenchUtil.tensNumbers[Math.floor(n / 10)] +
       (n % 10 ? '-' + sre.MathspeakFrenchUtil.onesNumbers[n % 10] : ''));
  }
  return str;
};


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param {number} number The number to translate.
 * @return {string} The string representation of that number.
 */
sre.MathspeakFrenchUtil.numberToWords = function(number) {
  if (number >= Math.pow(10, 36)) {
    return number.toString();
  }
  var pos = 0;
  var str = '';
  while (number > 0) {
    var hundreds = number % 1000;
    if (hundreds) {
      str = sre.MathspeakFrenchUtil.hundredsToWords(number % 1000) +
        (pos ? '-' + sre.MathspeakFrenchUtil.largeNumbers[pos] +
         '-' : '') +
          str;
    }
    number = Math.floor(number / 1000);
    pos++;
  }
  return str.replace(/-$/, '');
};


/**
 * Translates a number of up to twelve digits into a string representation of
 * its ordinal.
 * @param {number} num The number to translate.
 * @param {boolean} plural A flag indicating if the ordinal is in plural.
 * @return {string} The ordinal of the number as string.
 */
sre.MathspeakFrenchUtil.numberToOrdinal = function(num, plural) {
  if (num === 2) {
    return plural ? 'halves' : 'half';
  }
  var ordinal = sre.MathspeakFrenchUtil.wordOrdinal(num);
  return plural ? ordinal + 's' : ordinal;
};


/**
 * Creates a word ordinal string from a number.
 * @param {number} number The number to be converted.
 * @return {string} The ordinal string.
 */
sre.MathspeakFrenchUtil.wordOrdinal = function(number) {
  var ordinal = sre.MathspeakFrenchUtil.numberToWords(number);
  if (ordinal.match(/one$/)) {
    ordinal = ordinal.slice(0, -3) + 'first';
  } else if (ordinal.match(/two$/)) {
    ordinal = ordinal.slice(0, -3) + 'second';
  } else if (ordinal.match(/three$/)) {
    ordinal = ordinal.slice(0, -5) + 'third';
  } else if (ordinal.match(/five$/)) {
    ordinal = ordinal.slice(0, -4) + 'fifth';
  } else if (ordinal.match(/eight$/)) {
    ordinal = ordinal.slice(0, -5) + 'eighth';
  } else if (ordinal.match(/nine$/)) {
    ordinal = ordinal.slice(0, -4) + 'ninth';
  } else if (ordinal.match(/twelve$/)) {
    ordinal = ordinal.slice(0, -6) + 'twelfth';
  } else if (ordinal.match(/ty$/)) {
    ordinal = ordinal.slice(0, -2) + 'tieth';
  } else {
    ordinal = ordinal + 'th';
  }
  return ordinal;
};


/**
 * Creates a simple ordinal string from a number.
 * @param {number} number The number to be converted.
 * @return {string} The ordinal string.
 */
sre.MathspeakFrenchUtil.simpleOrdinal = function(number) {
  var tens = number % 100;
  var numStr = number.toString();
  if (tens > 10 && tens < 20) {
    return numStr + 'th';
  }
  switch (number % 10) {
    case 1:
      return numStr + 'st';
    case 2:
      return numStr + 'nd';
    case 3:
      return numStr + 'rd';
    default:
      return numStr + 'th';
  }
};


/**
 * Simple counter function for counting ordinals.
 * @param {!Node} node The node for the context function.
 * @param {string} context The context string.
 * @return {function(): string} The context function returning ordinals.
 */
sre.MathspeakFrenchUtil.ordinalCounter = function(node, context) {
  var counter = 0;
  return function() {
    return sre.MathspeakFrenchUtil.simpleOrdinal(++counter) + ' ' + context;
  };
};


/**
 * Checks if a fraction is a convertible vulgar fraction. In this case it
 * translates enumerator and the denominator.
 * @param {!Node} node Fraction node to be translated.
 * @return {{convertible: boolean,
 *           content: (string|undefined),
 *           denominator: (number|undefined),
 *           enumerator: (number|undefined)}} If convertible denominator and
 *     enumerator are set. Otherwise only the text content is given.
 * @private
 */
sre.MathspeakFrenchUtil.convertVulgarFraction_ = function(node) {
  if (!node.childNodes || !node.childNodes[0] ||
      !node.childNodes[0].childNodes ||
      node.childNodes[0].childNodes.length < 2 ||
      node.childNodes[0].childNodes[0].tagName !==
          sre.SemanticAttr.Type.NUMBER ||
      node.childNodes[0].childNodes[0].getAttribute('role') !==
          sre.SemanticAttr.Role.INTEGER ||
      node.childNodes[0].childNodes[1].tagName !==
          sre.SemanticAttr.Type.NUMBER ||
      node.childNodes[0].childNodes[1].getAttribute('role') !==
          sre.SemanticAttr.Role.INTEGER
  ) {
    return {convertible: false,
      content: node.textContent};
  }
  var denStr = node.childNodes[0].childNodes[1].textContent;
  var enumStr = node.childNodes[0].childNodes[0].textContent;
  var denominator = Number(denStr);
  var enumerator = Number(enumStr);
  if (isNaN(denominator) || isNaN(enumerator)) {
    return {convertible: false,
      content: enumStr + ' ' + msg.MS.FRAC_OVER + ' ' + denStr};
  }
  return {convertible: true,
    enumerator: enumerator,
    denominator: denominator};
};


/**
 * Converts a vulgar fraction into string representation of enumerator and
 * denominator as ordinal.
 * @param {!Node} node Fraction node to be translated.
 * @param {string=} opt_sep Separator string.
 * @return {string} The string representation if it is a valid vulgar fraction.
 */
sre.MathspeakFrenchUtil.vulgarFraction = function(node, opt_sep) {
  var sep = (typeof opt_sep === 'undefined') ? '-' : opt_sep;
  var conversion = sre.MathspeakFrenchUtil.convertVulgarFraction_(node);
  if (conversion.convertible &&
      conversion.enumerator &&
      conversion.denominator) {
    return sre.MathspeakFrenchUtil.numberToWords(conversion.enumerator) + sep +
        sre.MathspeakFrenchUtil.numberToOrdinal(conversion.denominator,
        conversion.enumerator !== 1);
  }
  return conversion.content || '';
};


/**
 * Checks if a vulgar fraction is small enough to be convertible to string in
 * MathSpeak, i.e. enumerator in [1..9] and denominator in [1..99].
 * @param {!Node} node Fraction node to be tested.
 * @param {number} enumer Enumerator maximum.
 * @param {number} denom Denominator maximum.
 * @return {boolean} True if it is a valid, small enough fraction.
 */
sre.MathspeakFrenchUtil.vulgarFractionSmall = function(node, enumer, denom) {
  var conversion = sre.MathspeakFrenchUtil.convertVulgarFraction_(node);
  if (conversion.convertible) {
    var enumerator = conversion.enumerator;
    var denominator = conversion.denominator;
    return enumerator > 0 && enumerator < enumer &&
        denominator > 0 && denominator < denom;
  }
  return false;
};


/**
 * Custom query function to check if a vulgar fraction is small enough to be
 * spoken as numbers in MathSpeak.
 * @param {!Node} node Fraction node to be tested.
 * @return {!Array.<Node>} List containing the node if it is eligible. Otherwise
 *     empty.
 */
sre.MathspeakFrenchUtil.isSmallVulgarFraction = function(node) {
  return sre.MathspeakFrenchUtil.vulgarFractionSmall(node, 10, 100) ? [node] : [];
};


/**
 * Computes prefix for sub and superscript nodes.
 * @param {!Node} node Subscript node.
 * @param {string} init Initial prefix string.
 * @param {{sup: string, sub: string}} replace Prefix strings for sub and
 *     superscript.
 * @return {string} The complete prefix string.
 */
sre.MathspeakFrenchUtil.nestedSubSuper = function(node, init, replace) {
  while (node.parentNode) {
    var children = node.parentNode;
    var parent = children.parentNode;
    var nodeRole = node.getAttribute && node.getAttribute('role');
    if ((parent.tagName === sre.Semantic.Type.SUBSCRIPT &&
         node === children.childNodes[1]) ||
        (parent.tagName === sre.Semantic.Type.TENSOR && nodeRole &&
        (nodeRole === sre.Semantic.Role.LEFTSUB ||
        nodeRole === sre.Semantic.Role.RIGHTSUB))) {
      init = replace.sub + ' ' + init;
    }
    if ((parent.tagName === sre.Semantic.Type.SUPERSCRIPT &&
         node === children.childNodes[1]) ||
        (parent.tagName === sre.Semantic.Type.TENSOR && nodeRole &&
        (nodeRole === sre.Semantic.Role.LEFTSUPER ||
        nodeRole === sre.Semantic.Role.RIGHTSUPER))) {
      init = replace.sup + ' ' + init;
    }
    node = parent;
  }
  return init.trim();
};


/**
 * Computes subscript prefix in verbose mode.
 * @param {!Node} node Subscript node.
 * @return {string} The prefix string.
 */
sre.MathspeakFrenchUtil.subscriptVerbose = function(node) {
  return sre.MathspeakFrenchUtil.nestedSubSuper(
      node, msg.MS.SUBSCRIPT, {sup: msg.MS.SUPER, sub: msg.MS.SUB});
};


/**
 * Computes subscript prefix in brief mode.
 * @param {!Node} node Subscript node.
 * @return {string} The prefix string.
 */
sre.MathspeakFrenchUtil.subscriptBrief = function(node) {
  return sre.MathspeakFrenchUtil.nestedSubSuper(
      node, msg.MS.SUB, {sup: msg.MS.SUP, sub: msg.MS.SUB});
};


/**
 * Computes subscript prefix in verbose mode.
 * @param {!Node} node Subscript node.
 * @return {string} The prefix string.
 */
sre.MathspeakFrenchUtil.superscriptVerbose = function(node) {
  return sre.MathspeakFrenchUtil.nestedSubSuper(
      node, msg.MS.SUPERSCRIPT, {sup: msg.MS.SUPER, sub: msg.MS.SUB});
};


/**
 * Computes subscript prefix in brief mode.
 * @param {!Node} node Subscript node.
 * @return {string} The prefix string.
 */
sre.MathspeakFrenchUtil.superscriptBrief = function(node) {
  return sre.MathspeakFrenchUtil.nestedSubSuper(
      node, msg.MS.SUP, {sup: msg.MS.SUP, sub: msg.MS.SUB});
};


/**
 * Computes subscript prefix in verbose mode.
 * @param {!Node} node Subscript node.
 * @return {string} The prefix string.
 */
sre.MathspeakFrenchUtil.baselineVerbose = function(node) {
  var baseline = sre.MathspeakFrenchUtil.nestedSubSuper(
      node, '', {sup: msg.MS.SUPER, sub: msg.MS.SUB});
  if (!baseline) {
    return msg.MS.BASELINE;
  }
  return baseline.replace(new RegExp(msg.MS.SUB + '$'), msg.MS.SUBSCRIPT).
      replace(new RegExp(msg.MS.SUPER + '$'), msg.MS.SUPERSCRIPT);
};


/**
 * Computes subscript prefix in brief mode.
 * @param {!Node} node Subscript node.
 * @return {string} The prefix string.
 */
sre.MathspeakFrenchUtil.baselineBrief = function(node) {
  var baseline = sre.MathspeakFrenchUtil.nestedSubSuper(
      node, '', {sup: msg.MS.SUP, sub: msg.MS.SUB});
  return baseline || msg.MS.BASE;
};


// TODO (sorge) Refactor the following to functions wrt. style attribute.
/**
 * Computes and returns the nesting depth of radical nodes.
 * @param {!Node} node The radical node.
 * @return {number} The nesting depth. 0 if the node is not a radical.
 */
sre.MathspeakFrenchUtil.radicalNestingDepth = function(node) {
  return sre.MathspeakFrenchUtil.getNestingDepth(
      'radical', node, ['sqrt', 'root'], sre.MathspeakFrenchUtil.nestingBarriers, {});
};


/**
 * Nested string for radicals in Mathspeak mode putting together the nesting
 * depth with a pre- and postfix string that depends on the speech style.
 * @param {!Node} node The radical node.
 * @param {string} prefix A prefix string.
 * @param {string} postfix A postfix string.
 * @return {string} The opening string.
 */
sre.MathspeakFrenchUtil.nestedRadical = function(node, prefix, postfix) {
  var depth = sre.MathspeakFrenchUtil.radicalNestingDepth(node);
  var index = sre.MathspeakFrenchUtil.getRootIndex(node);
  postfix = index ? msg.MS_FUNC.COMBINE_ROOT_INDEX(postfix, index) : postfix;
  if (depth === 1) {
    return postfix;
  }
  return prefix + msg.MS_FUNC.RADICAL_NEST_DEPTH(depth - 1) + postfix;
};


/**
 * A string indexing the root.
 * @param {!Node} node The radical node.
 * @return {string} The localised indexing string if it exists.
 */
sre.MathspeakFrenchUtil.getRootIndex = function(node) {
  var content = node.tagName === 'sqrt' ? '2' :
      // TODO (sorge): Make that safer?
      sre.XpathUtil.evalXPath('children/*[1]', node)[0].textContent.trim();
  return msg.MS_ROOT_INDEX[content] || '';
};


/**
 * Opening string for radicals in Mathspeak verbose mode.
 * @param {!Node} node The radical node.
 * @return {string} The opening string.
 */
sre.MathspeakFrenchUtil.openingRadicalVerbose = function(node) {
  return sre.MathspeakFrenchUtil.nestedRadical(node, msg.MS.NESTED, msg.MS.STARTROOT);
};


/**
 * Closing string for radicals in Mathspeak verbose mode.
 * @param {!Node} node The radical node.
 * @return {string} The closing string.
 */
sre.MathspeakFrenchUtil.closingRadicalVerbose = function(node) {
  return sre.MathspeakFrenchUtil.nestedRadical(node, msg.MS.NESTED, msg.MS.ENDROOT);
};


/**
 * Middle string for radicals in Mathspeak verbose mode.
 * @param {!Node} node The radical node.
 * @return {string} The middle string.
 */
sre.MathspeakFrenchUtil.indexRadicalVerbose = function(node) {
  return sre.MathspeakFrenchUtil.nestedRadical(node, msg.MS.NESTED,
                                         msg.MS.ROOTINDEX);
};


/**
 * Opening string for radicals in Mathspeak brief mode.
 * @param {!Node} node The radical node.
 * @return {string} The opening string.
 */
sre.MathspeakFrenchUtil.openingRadicalBrief = function(node) {
  return sre.MathspeakFrenchUtil.nestedRadical(node, msg.MS.NEST_ROOT,
                                         msg.MS.STARTROOT);
};


/**
 * Closing string for radicals in Mathspeak brief mode.
 * @param {!Node} node The radical node.
 * @return {string} The closing string.
 */
sre.MathspeakFrenchUtil.closingRadicalBrief = function(node) {
  return sre.MathspeakFrenchUtil.nestedRadical(node, msg.MS.NEST_ROOT,
                                         msg.MS.ENDROOT);
};


/**
 * Middle string for radicals in Mathspeak superbrief mode.
 * @param {!Node} node The radical node.
 * @return {string} The middle string.
 */
sre.MathspeakFrenchUtil.indexRadicalBrief = function(node) {
  return sre.MathspeakFrenchUtil.nestedRadical(node, msg.MS.NEST_ROOT,
                                         msg.MS.ROOTINDEX);
};


/**
 * Opening string for radicals in Mathspeak superbrief mode.
 * @param {!Node} node The radical node.
 * @return {string} The opening string.
 */
sre.MathspeakFrenchUtil.openingRadicalSbrief = function(node) {
  return sre.MathspeakFrenchUtil.nestedRadical(node, msg.MS.NEST_ROOT, msg.MS.ROOT);
};


/**
 * Middle string for radicals in Mathspeak superbrief mode.
 * @param {!Node} node The radical node.
 * @return {string} The middle string.
 */
sre.MathspeakFrenchUtil.indexRadicalSbrief = function(node) {
  return sre.MathspeakFrenchUtil.nestedRadical(node, msg.MS.NEST_ROOT, msg.MS.INDEX);
};


/**
 * Computes and returns the nesting depth of underscore nodes.
 * @param {!Node} node The underscore node.
 * @return {number} The nesting depth. 0 if the node is not an underscore.
 */
sre.MathspeakFrenchUtil.underscoreNestingDepth = function(node) {
  return sre.MathspeakFrenchUtil.getNestingDepth(
      'underscore', node, ['underscore'], sre.MathspeakFrenchUtil.nestingBarriers,
      {},
      function(node) {
        return node.tagName &&
            node.tagName === sre.Semantic.Type.UNDERSCORE &&
            node.childNodes[0].childNodes[1].getAttribute('role') ===
            sre.Semantic.Role.UNDERACCENT;
      });
};


/**
 * String function to construct and underscript prefix.
 * @param {!Node} node The underscore node.
 * @return {string} The correct prefix string.
 */
sre.MathspeakFrenchUtil.nestedUnderscore = function(node) {
  var depth = sre.MathspeakFrenchUtil.underscoreNestingDepth(node);
  return Array(depth).join(msg.MS.UNDER) + msg.MS.UNDERSCRIPT;
};


/**
 * Computes and returns the nesting depth of overscore nodes.
 * @param {!Node} node The overscore node.
 * @return {number} The nesting depth. 0 if the node is not an overscore.
 */
sre.MathspeakFrenchUtil.overscoreNestingDepth = function(node) {
  return sre.MathspeakFrenchUtil.getNestingDepth(
      'overscore', node, ['overscore'], sre.MathspeakFrenchUtil.nestingBarriers,
      {},
      function(node) {
        return node.tagName &&
            node.tagName === sre.Semantic.Type.OVERSCORE &&
            node.childNodes[0].childNodes[1].getAttribute('role') ===
            sre.Semantic.Role.OVERACCENT;
      });
};


/**
 * String function to construct and overscript prefix.
 * @param {!Node} node The overscore node.
 * @return {string} The correct prefix string.
 */
sre.MathspeakFrenchUtil.nestedOverscore = function(node) {
  var depth = sre.MathspeakFrenchUtil.overscoreNestingDepth(node);
  return Array(depth).join(msg.MS.OVER) + msg.MS.OVERSCRIPT;
};


/**
 * Query function that Checks if we have a simple determinant in the sense that
 * every cell only contains single letters or numbers.
 * @param {!Node} node The determinant node.
 * @return {Array.<Node>} List containing input node if true.
 */
sre.MathspeakFrenchUtil.determinantIsSimple = function(node) {
  if (node.tagName !== sre.Semantic.Type.MATRIX ||
      node.getAttribute('role') !== sre.Semantic.Role.DETERMINANT) {
    return [];
  }
  var cells = sre.XpathUtil.evalXPath(
      'children/row/children/cell/children/*', node);
  for (var i = 0, cell; cell = cells[i]; i++) {
    if (cell.tagName === sre.Semantic.Type.NUMBER) {
      continue;
    }
    if (cell.tagName === sre.Semantic.Type.IDENTIFIER) {
      var role = cell.getAttribute('role');
      if (role === sre.Semantic.Role.LATINLETTER ||
          role === sre.Semantic.Role.GREEKLETTER ||
          role === sre.Semantic.Role.OTHERLETTER) {
        continue;
      }
    }
    return [];
  }
  return [node];
};


/**
 * Generate constraints for the specialised baseline rules of relation
 * sequences.
 * @return {string} The constraint string.
 */
sre.MathspeakFrenchUtil.generateBaselineConstraint = function() {
  var ignoreElems = ['subscript', 'superscript', 'tensor'];
  var mainElems = ['relseq', 'multrel'];
  var breakElems = ['fraction', 'punctuation', 'fenced', 'sqrt', 'root'];

  var ancestrify = function(elemList) {
    return elemList.map(function(elem) {return 'ancestor::' + elem;});
  };

  var notify = function(elem) {
    return 'not(' + elem + ')';
  };

  var prefix = 'ancestor::*/following-sibling::*';
  var middle = notify(ancestrify(ignoreElems).join(' or '));
  var mainList = ancestrify(mainElems);
  var breakList = ancestrify(breakElems);
  var breakCstrs = [];
  for (var i = 0, brk; brk = breakList[i]; i++) {
    breakCstrs = breakCstrs.concat(
        mainList.map(function(elem) {return brk + '/' + elem;}));
  }
  var postfix = notify(breakCstrs.join(' | '));
  return [prefix, middle, postfix].join(' and ');
};


/**
 * Removes parentheses around a label.
 * @param {!Node} node The label to be processed.
 * @return {string} The text of the label.
 */
sre.MathspeakFrenchUtil.removeParens = function(node) {
  if (!node.childNodes.length ||
      !node.childNodes[0].childNodes.length ||
      !node.childNodes[0].childNodes[0].childNodes.length) {
    return '';
  }
  var content = node.childNodes[0].childNodes[0].childNodes[0].textContent;
  return content.match(/^\(.+\)$/) ? content.slice(1, -1) : content;
};

});  // goog.scope