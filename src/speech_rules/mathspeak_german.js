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

//
// This work was sponsored by ETH Zurich
//

/**
 * @fileoverview Mathspeak rules in German.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MathspeakGerman');

goog.require('sre.MathStore');
goog.require('sre.MathspeakUtil');



/**
 * Rule initialization.
 * @constructor
 * @extends {sre.MathStore}
 */
sre.MathspeakGerman = function() {
  sre.MathspeakGerman.base(this, 'constructor');

  this.locale = 'de';
};
goog.inherits(sre.MathspeakGerman, sre.MathStore);
goog.addSingletonGetter(sre.MathspeakGerman);


/**
 * @type {sre.MathStore}
 */
sre.MathspeakGerman.mathStore = sre.MathspeakGerman.getInstance();


/** @private */
sre.MathspeakGerman.defineRule_ = goog.bind(
    sre.MathspeakGerman.mathStore.defineRule,
    sre.MathspeakGerman.mathStore);


/** @private */
sre.MathspeakGerman.defineRuleAlias_ = goog.bind(
    sre.MathspeakGerman.mathStore.defineRulesAlias,
    sre.MathspeakGerman.mathStore);


/** @private */
sre.MathspeakGerman.defineSpecialisedRule_ = goog.bind(
    sre.MathspeakGerman.mathStore.defineSpecialisedRule,
    sre.MathspeakGerman.mathStore);


/** @private */
sre.MathspeakGerman.addContextFunction_ = goog.bind(
    sre.MathspeakGerman.mathStore.contextFunctions.add,
    sre.MathspeakGerman.mathStore.contextFunctions);


/** @private */
sre.MathspeakGerman.addCustomQuery_ = goog.bind(
    sre.MathspeakGerman.mathStore.customQueries.add,
    sre.MathspeakGerman.mathStore.customQueries);


/** @private */
sre.MathspeakGerman.addCustomString_ = goog.bind(
    sre.MathspeakGerman.mathStore.customStrings.add,
    sre.MathspeakGerman.mathStore.customStrings);


goog.scope(function() {
var defineRule = sre.MathspeakGerman.defineRule_;
var defineRuleAlias = sre.MathspeakGerman.defineRuleAlias_;
var defineSpecialisedRule = sre.MathspeakGerman.defineSpecialisedRule_;

var addCQF = sre.MathspeakGerman.addCustomQuery_;
var addCSF = sre.MathspeakGerman.addCustomString_;
var addCTXF = sre.MathspeakGerman.addContextFunction_;


/**
 * Initialize the custom functions.
 * @private
 */
sre.MathspeakGerman.initCustomFunctions_ = function() {
  addCQF('CQFspaceoutNumber', sre.MathspeakUtil.spaceoutNumber);
  addCQF('CQFspaceoutIdentifier', sre.MathspeakUtil.spaceoutIdentifier);

  addCSF('CSFspaceoutText', sre.MathspeakUtil.spaceoutText);
  // Fraction function.
  addCSF('CSFopenFracVerbose', sre.MathspeakUtil.openingFractionVerbose);
  addCSF('CSFcloseFracVerbose', sre.MathspeakUtil.closingFractionVerbose);
  addCSF('CSFoverFracVerbose', sre.MathspeakUtil.overFractionVerbose);
  addCSF('CSFopenFracBrief', sre.MathspeakUtil.openingFractionBrief);
  addCSF('CSFcloseFracBrief', sre.MathspeakUtil.closingFractionBrief);
  addCSF('CSFopenFracSbrief', sre.MathspeakUtil.openingFractionSbrief);
  addCSF('CSFcloseFracSbrief', sre.MathspeakUtil.closingFractionSbrief);
  addCSF('CSFoverFracSbrief', sre.MathspeakUtil.overFractionSbrief);
  addCSF('CSFvulgarFraction', sre.NumbersUtil.vulgarFraction);
  addCQF('CQFvulgarFractionSmall', sre.MathspeakUtil.isSmallVulgarFraction);

  // Radical function.
  addCSF('CSFopenRadicalVerbose', sre.MathspeakUtil.openingRadicalVerbose);
  addCSF('CSFcloseRadicalVerbose', sre.MathspeakUtil.closingRadicalVerbose);
  addCSF('CSFindexRadicalVerbose', sre.MathspeakUtil.indexRadicalVerbose);
  addCSF('CSFopenRadicalBrief', sre.MathspeakUtil.openingRadicalBrief);
  addCSF('CSFcloseRadicalBrief', sre.MathspeakUtil.closingRadicalBrief);
  addCSF('CSFindexRadicalBrief', sre.MathspeakUtil.indexRadicalBrief);
  addCSF('CSFopenRadicalSbrief', sre.MathspeakUtil.openingRadicalSbrief);
  addCSF('CSFindexRadicalSbrief', sre.MathspeakUtil.indexRadicalSbrief);

  // Sub- Superscript.
  addCSF('CSFsuperscriptVerbose', sre.MathspeakUtil.superscriptVerbose);
  addCSF('CSFsuperscriptBrief', sre.MathspeakUtil.superscriptBrief);
  addCSF('CSFsubscriptVerbose', sre.MathspeakUtil.subscriptVerbose);
  addCSF('CSFsubscriptBrief', sre.MathspeakUtil.subscriptBrief);
  addCSF('CSFbaselineVerbose', sre.MathspeakUtil.baselineVerbose);
  addCSF('CSFbaselineBrief', sre.MathspeakUtil.baselineBrief);
  // Tensor specific.
  addCSF('CSFleftsuperscriptVerbose', sre.MathspeakUtil.superscriptVerbose);
  addCSF('CSFleftsubscriptVerbose', sre.MathspeakUtil.subscriptVerbose);
  addCSF('CSFrightsuperscriptVerbose', sre.MathspeakUtil.superscriptVerbose);
  addCSF('CSFrightsubscriptVerbose', sre.MathspeakUtil.subscriptVerbose);
  addCSF('CSFleftsuperscriptBrief', sre.MathspeakUtil.superscriptBrief);
  addCSF('CSFleftsubscriptBrief', sre.MathspeakUtil.subscriptBrief);
  addCSF('CSFrightsuperscriptBrief', sre.MathspeakUtil.superscriptBrief);
  addCSF('CSFrightsubscriptBrief', sre.MathspeakUtil.subscriptBrief);

  // Over- Underscore.
  addCSF('CSFunderscript', sre.MathspeakUtil.nestedUnderscore);
  addCSF('CSFoverscript', sre.MathspeakUtil.nestedOverscore);

  addCTXF('CTXFordinalCounter', sre.NumbersUtil.ordinalCounter);
  addCTXF('CTXFcontentIterator', sre.StoreUtil.contentIterator);

  // Layout related.
  addCQF('CQFdetIsSimple', sre.MathspeakUtil.determinantIsSimple);
  addCSF('CSFRemoveParens', sre.MathspeakUtil.removeParens);

  // Dummy.
  addCQF('CQFresetNesting', sre.MathspeakUtil.resetNestingDepth);

};


/**
 * Mathspeak rules.
 * @private
*/
sre.MathspeakGerman.initMathspeakGerman_ = function() {
  // TODO: This needs to be prioritized!
  //
  // We could say "kollabiert X", but the postscript avoids hassle with Grammar.
  defineRule(
      'collapsed', 'mathspeak.default',
      '[n] . (engine:modality=summary,grammar:collapsed); [t] "kollabiert"',
      'self::*', '@alternative', 'not(contains(@grammar, "collapsed"))',
      'self::*', 'self::*', 'self::*', 'self::*', 'self::*'
  );
  defineSpecialisedRule(
      'collapsed', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'collapsed', 'mathspeak.brief', 'mathspeak.sbrief');

  // Initial rule
  defineRule(
      'stree', 'mathspeak.default',
      '[n] ./*[1]', 'self::stree', 'CQFresetNesting');

  // Dummy rules
  defineRule(
      'unknown', 'mathspeak.default', '[n] text()',
      'self::unknown');

  defineRule(
      'protected', 'mathspeak.default', '[t] text()',
      'self::number', 'contains(@grammar, "protected")');

  defineRule(
      'omit-empty', 'mathspeak.default',
      '[p] (pause:100)', // Pause necessary to voice separators between empty.
      'self::empty');
  defineRule(
      'blank-empty', 'mathspeak.default',
      '[t] "leer"', 'self::empty', 'count(../*)=1',
      'name(../..)="cell" or name(../..)="line"');

  // Font rules
  defineRule(
      'font', 'mathspeak.default',
      '[t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)',
      'self::*', 'name(self::*)!="number"', '@font',
      'not(contains(@grammar, "ignoreFont"))', '@font!="normal"');

  defineRule(
      'font-number', 'mathspeak.default',
      '[t] @font (grammar:localFontNumber); [n] . (grammar:ignoreFont=@font)',
      'self::number', '@font',
      'not(contains(@grammar, "ignoreFont"))', '@font!="normal"');

  defineRule(
      'font-identifier-short', 'mathspeak.default',
      '[t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)',
      'self::identifier', 'string-length(text())=1',
      '@font', 'not(contains(@grammar, "ignoreFont"))', '@font="normal"',
      '""=translate(text(), ' +
      '"abcdefghijklmnopqrstuvwxyz\u03B1\u03B2\u03B3\u03B4' +
      '\u03B5\u03B6\u03B7\u03B8\u03B9\u03BA\u03BB\u03BC\u03BD\u03BE\u03BF' +
      '\u03C0\u03C1\u03C2\u03C3\u03C4\u03C5\u03C6\u03C7\u03C8\u03C9' +
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ\u0391\u0392\u0393\u0394' +
      '\u0395\u0396\u0397\u0398\u0399\u039A\u039B\u039C\u039D\u039E\u039F' +
      '\u03A0\u03A1\u03A3\u03A3\u03A4\u03A5\u03A6\u03A7\u03A8\u03A9", "")',
      '@role!="unit"');

  defineRule(
      'font-identifier', 'mathspeak.default',
      '[t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)',
      'self::identifier', 'string-length(text())=1 or string-length(text())=2',
      '@font', '@font="normal"', 'not(contains(@grammar, "ignoreFont"))',
      '@role!="unit"');

  defineRule(
      'omit-font', 'mathspeak.default',
      '[n] . (grammar:ignoreFont=@font)',
      'self::identifier', 'string-length(text())=1 or string-length(text())=2',
      '@font', 'not(contains(@grammar, "ignoreFont"))', '@font="italic"',
      'self::*'); // Redudancy for ordering

  defineRule(
      'font-double-struck', 'mathspeak.default',
      '[n] . (grammar:ignoreFont=@font); [t] @font (grammar:localFont)',
      'self::*', 'name(self::*)!="number"',
      'string-length(text())=1 or string-length(text())=2', '@font',
      'not(contains(@grammar, "ignoreFont"))', '@font="double-struck"');

  defineRule(
      'font-number-double-struck', 'mathspeak.default',
      '[n] . (grammar:ignoreFont=@font); [t] @font (grammar:localFontNumber)',
      'self::number',
      'string-length(text())=1 or string-length(text())=2', '@font',
      'not(contains(@grammar, "ignoreFont"))', '@font="double-struck"');

  // Number rules
  defineRule(
      'number', 'mathspeak.default', '[n] text()', 'self::number');

  defineRule(
      'mixed-number', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[2]; ',
      'self::number', '@role="mixed"');

  defineRule(
      'number-with-chars', 'mathspeak.default',
      '[t] "Zahl"; [m] CQFspaceoutNumber (grammar:protected)',
      'self::number', '@role="othernumber"',
      '"" != translate(text(), "0123456789.,", "")',
      'not(contains(@grammar, "protected"))');

  // Maybe duplicate this rule for self::text
  defineRule(
      'number-as-upper-word', 'mathspeak.default',
      '[t] "Wort groß"; [t] CSFspaceoutText', 'self::number',
      'string-length(text())>1', 'text()=translate(text(), ' +
      '"abcdefghijklmnopqrstuvwxyz\u03B1\u03B2\u03B3\u03B4' +
      '\u03B5\u03B6\u03B7\u03B8\u03B9\u03BA\u03BB\u03BC\u03BD\u03BE\u03BF' +
      '\u03C0\u03C1\u03C2\u03C3\u03C4\u03C5\u03C6\u03C7\u03C8\u03C9", ' +
      '"ABCDEFGHIJKLMNOPQRSTUVWXYZ\u0391\u0392\u0393\u0394' +
      '\u0395\u0396\u0397\u0398\u0399\u039A\u039B\u039C\u039D\u039E\u039F' +
      '\u03A0\u03A1\u03A3\u03A3\u03A4\u03A5\u03A6\u03A7\u03A8\u03A9")',
      '""=translate(text(), "ABCDEFGHIJKLMNOPQRSTUVWXYZ\u0391\u0392\u0393' +
      '\u0394\u0395\u0396\u0397\u0398\u0399\u039A\u039B\u039C\u039D\u039E' +
      '\u039F\u03A0\u03A1\u03A3\u03A3\u03A4\u03A5\u03A6\u03A7\u03A8\u03A9",' +
      '"")');
  defineSpecialisedRule(
      'number-as-upper-word', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'number-as-upper-word', 'mathspeak.default', 'mathspeak.sbrief');

  defineRule(
      'number-baseline', 'mathspeak.default',
      '[t] "Grundlinie"; [n] . (grammar:baseline)',
      'self::number', 'not(contains(@grammar, "ignoreFont"))',
      'preceding-sibling::identifier', 'not(contains(@grammar, "baseline"))',
      'preceding-sibling::*[1][@role="latinletter" or @role="greekletter" or' +
      ' @role="otherletter"]',
      'parent::*/parent::infixop[@role="implicit"]');
  defineSpecialisedRule(
      'number-baseline', 'mathspeak.default', 'mathspeak.brief',
      '[t] "Grund"; [n] . (grammar:baseline)');
  defineSpecialisedRule(
      'number-baseline', 'mathspeak.brief', 'mathspeak.sbrief');


  defineRule(
      'number-baseline-font', 'mathspeak.default',
      '[t] "Grundlinie"; [t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)',
      'self::number', '@font', 'not(contains(@grammar, "ignoreFont"))',
      '@font!="normal"', 'preceding-sibling::identifier',
      'preceding-sibling::*[@role="latinletter" or @role="greekletter" or' +
      ' @role="otherletter"]',
      'parent::*/parent::infixop[@role="implicit"]');
  defineSpecialisedRule(
      'number-baseline-font', 'mathspeak.default', 'mathspeak.brief',
      '[t] "Grund"; [t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)');
  defineSpecialisedRule(
      'number-baseline-font', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'identifier', 'mathspeak.default', '[m] CQFspaceoutIdentifier',
      'self::identifier', 'string-length(text())>1', '@role!="unit"',
      'not(@font) or @font="normal" or contains(@grammar, "ignoreFont")',
      'text()!=translate(text(), ' +
      '"abcdefghijklmnopqrstuvwxyz\u03B1\u03B2\u03B3\u03B4' +
      '\u03B5\u03B6\u03B7\u03B8\u03B9\u03BA\u03BB\u03BC\u03BD\u03BE\u03BF' +
      '\u03C0\u03C1\u03C2\u03C3\u03C4\u03C5\u03C6\u03C7\u03C8\u03C9' +
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ\u0391\u0392\u0393' +
      '\u0394\u0395\u0396\u0397\u0398\u0399\u039A\u039B\u039C\u039D\u039E' +
      '\u039F\u03A0\u03A1\u03A3\u03A3\u03A4\u03A5\u03A6\u03A7\u03A8\u03A9", ' +
      '"")');

  defineRule(
      'identifier', 'mathspeak.default', '[n] text()', 'self::identifier');

  // minus sign
  defineRule(
      'negative', 'mathspeak.default',
      '[t] "minus"; [n] children/*[1]',
      'self::prefixop', '@role="negative"', 'children/identifier');
  defineRuleAlias(
      'negative',
      'self::prefixop', '@role="negative"', 'children/number');
  defineRuleAlias(
      'negative',
      'self::prefixop', '@role="negative"',
      'children/fraction[@role="vulgar"]');

  defineRule(
      'negative', 'mathspeak.default',
      '[t] "minus"; [n] children/*[1]',
      'self::prefixop', '@role="negative"');

  // Operator rules
  defineRule(
      'prefix', 'mathspeak.default',
      '[m] content/*; [n] children/*[1]',
      'self::prefixop');
  defineRule(
      'postfix', 'mathspeak.default',
      '[n] children/*[1]; [m] content/*',
      'self::postfixop');

  defineRule(
      'binary-operation', 'mathspeak.default',
      '[m] children/* (sepFunc:CTXFcontentIterator);', 'self::infixop');

  // Implicit times is currently ignored!
  defineRule(
      'implicit', 'mathspeak.default',
      '[m] children/*', 'self::infixop', '@role="implicit"');
  defineRuleAlias(
      'implicit', 'self::infixop', '@role="leftsuper" or' +
      ' @role="leftsub" or @role="rightsuper" or @role="rightsub"');

  // TODO: Do we really need this?
  defineRule('subtraction', 'mathspeak.default',
             '[m] children/* (separator:"minus");', 'self::infixop',
             '@role="subtraction"');

  // Function rules
  defineRule(
      'function-unknown', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::appl');

  defineRule(
      'function-prefix', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::appl', 'children/*[1][@role="prefix function"]');


  // Fences rules
  defineRule(
      'fences-open-close', 'mathspeak.default',
      '[n] content/*[1]; [n] children/*[1]; [n] content/*[2]',
      'self::fenced', '@role="leftright"');

  defineRule(
      'fences-neutral', 'mathspeak.default',
      '[t] "Anfang Betrag"; [n] children/*[1]; [t] "Ende Betrag"',
      'self::fenced', '@role="neutral"',
      'content/*[1][text()]="|" or content/*[1][text()]="❘" or' +
      ' content/*[1][text()]="｜"');
  defineSpecialisedRule(
      'fences-neutral', 'mathspeak.default', 'mathspeak.sbrief',
      '[t] "Betrag"; [n] children/*[1]; [t] "Ende Betrag"');
  defineRule(
      'fences-neutral', 'mathspeak.default',
      '[n] content/*[1]; [n] children/*[1]; [n] content/*[2]',
      'self::fenced', '@role="neutral"');


  // TODO (sorge) Maybe check for punctuated element and singleton?
  defineRule(
      'fences-set', 'mathspeak.default',
      '[t] "Anfang Menge"; [n] children/*[1]; [t] "Ende Menge"',
      'self::fenced', '@role="set empty" or @role="set extended"' +
      ' or @role="set singleton" or @role="set collection"',
      // 'self::fenced', '@role="leftright"', 'content/*[1][text()]="{"',
      // 'content/*[2][text()]="}"', 'count(children/*)=1',
      'not(name(../..)="appl")');
  defineSpecialisedRule(
      'fences-set', 'mathspeak.default', 'mathspeak.sbrief',
      '[t] "Menge"; [n] children/*[1]; [t] "Ende Menge"');


  // Text rules
  defineRule(
      'text', 'mathspeak.default', '[n] text()', 'self::text');

  // Special symbols
  defineRule(
      'factorial', 'mathspeak.default', '[t] "Fakultät"', 'self::punctuation',
      'text()="!"', 'name(preceding-sibling::*[1])!="text"');
  // TODO: Do we really need this?
  defineRule(
      'minus', 'mathspeak.default', '[t] "minus"',
      'self::operator', 'text()="\u002D"');

  defineRule(
      'single-prime', 'mathspeak.default', '[t] "Strich"',
      'self::punctuated', '@role="prime"', 'count(children/*)=1');
  defineRule(
      'double-prime', 'mathspeak.default', '[t] "zwei Strich"',
      'self::punctuated', '@role="prime"', 'count(children/*)=2');
  defineRule(
      'triple-prime', 'mathspeak.default', '[t] "drei Strich"',
      'self::punctuated', '@role="prime"', 'count(children/*)=3');
  defineRule(
      'quadruple-prime', 'mathspeak.default', '[t] "vier Strich"',
      'self::punctuated', '@role="prime"', 'count(children/*)=4');
  defineRule(
      'counted-prime', 'mathspeak.default',
      '[t] count(children/*); [t] "Strich"',
      'self::punctuated', '@role="prime"');

  // Fraction rules

  defineRule(
      'fraction', 'mathspeak.default',
      '[t] CSFopenFracVerbose; [n] children/*[1];' +
          ' [t] CSFoverFracVerbose; [n] children/*[2]; [t] CSFcloseFracVerbose',
      'self::fraction');

  defineRule(
      'fraction', 'mathspeak.brief',
      '[t] CSFopenFracBrief; [n] children/*[1];' +
          ' [t] CSFoverFracVerbose; [n] children/*[2]; [t] CSFcloseFracBrief',
      'self::fraction');

  defineRule(
      'fraction', 'mathspeak.sbrief',
      '[t] CSFopenFracSbrief; [n] children/*[1];' +
          ' [t] CSFoverFracSbrief; [n] children/*[2]; [t] CSFcloseFracSbrief',
      'self::fraction');

  defineRule(
      'vulgar-fraction', 'mathspeak.default',
      '[t] CSFvulgarFraction (grammar:correctOne)',
      'self::fraction', '@role="vulgar"', 'CQFvulgarFractionSmall');
  defineSpecialisedRule(
      'vulgar-fraction', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'vulgar-fraction', 'mathspeak.default', 'mathspeak.sbrief');

  defineRule(
      'continued-fraction-outer', 'mathspeak.default',
      '[t] "Kettenbruch"; [n] children/*[1];' +
      '[t] "durch"; [n] children/*[2]',
      'self::fraction', 'not(ancestor::fraction)',
      'children/*[2]/descendant-or-self::*[@role="ellipsis" and ' +
      'not(following-sibling::*)]');

  defineRule(
      'continued-fraction-inner', 'mathspeak.default',
      '[t] "Anfang Bruch"; [n] children/*[1];' +
      '[t] "durch"; [n] children/*[2]',
      'self::fraction', 'ancestor::fraction',
      'children/*[2]/descendant-or-self::*[@role="ellipsis" and ' +
      'not(following-sibling::*)]');
  defineSpecialisedRule(
      'continued-fraction-inner', 'mathspeak.default', 'mathspeak.sbrief',
      '[t] "Bruch"; [n] children/*[1];' +
      '[t] "durch"; [n] children/*[2]');

  // Radical rules

  defineRule(
      'sqrt', 'mathspeak.default',
      '[t] CSFopenRadicalVerbose; [n] children/*[1];' +
          ' [t] CSFcloseRadicalVerbose',
      'self::sqrt');

  defineRule(
      'sqrt', 'mathspeak.brief',
      '[t] CSFopenRadicalBrief; [n] children/*[1];' +
          ' [t] CSFcloseRadicalBrief',
      'self::sqrt');

  defineRule(
      'sqrt', 'mathspeak.sbrief',
      '[t] CSFopenRadicalSbrief; [n] children/*[1];' +
          ' [t] CSFcloseRadicalBrief',
      'self::sqrt');

  defineRule(
      'root-small', 'mathspeak.default',
      '[t] CSFopenRadicalVerbose; [n] children/*[2];' +
          ' [t] CSFcloseRadicalVerbose',
      'self::root', 'children/*[1][text()=3 or text()=2]');

  defineRule(
      'root-small', 'mathspeak.brief',
      '[t] CSFopenRadicalBrief; [n] children/*[2];' +
          ' [t] CSFcloseRadicalBrief',
      'self::root', 'children/*[1][text()=3 or text()=2]');

  defineRule(
      'root-small', 'mathspeak.sbrief',
      '[t] CSFopenRadicalSbrief; [n] children/*[2];' +
          ' [t] CSFcloseRadicalBrief',
      'self::root', 'children/*[1][text()=3 or text()=2]');

  defineRule(
      'root', 'mathspeak.default',
      '[t] CSFindexRadicalVerbose; [n] children/*[1];' +
          '[t] CSFopenRadicalVerbose; [n] children/*[2];' +
          ' [t] CSFcloseRadicalVerbose',
      'self::root');

  defineRule(
      'root', 'mathspeak.brief',
      '[t] CSFindexRadicalBrief; [n] children/*[1];' +
          '[t] CSFopenRadicalBrief; [n] children/*[2];' +
          ' [t] CSFcloseRadicalBrief',
      'self::root');

  defineRule(
      'root', 'mathspeak.sbrief',
      '[t] CSFindexRadicalSbrief; [n] children/*[1];' +
          '[t] CSFopenRadicalSbrief; [n] children/*[2];' +
          ' [t] CSFcloseRadicalBrief',
      'self::root');

  // Limits
  defineRule(
      'limboth', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];' +
      '[t] CSFoverscript; [n] children/*[3]',
      'self::limboth', 'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]');
  defineRule(
      'limlower', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];',
      'self::limlower', 'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]');
  defineRule(
      'limupper', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFoverscript; [n] children/*[2];',
      'self::limupper', 'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]');
  defineRuleAlias(
      'limlower', 'self::underscore', '@role="limit function"',
      'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]');
  defineRuleAlias(
      'limlower', 'self::underscore', 'children/*[2][@role!="underaccent"]',
      'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]');
  defineRuleAlias(
      'limupper', 'self::overscore', 'children/*[2][@role!="overaccent"]',
      'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]');

  defineRule(
      'limboth-end', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];' +
      '[t] CSFoverscript; [n] children/*[3]; [t] "Ende Überschrift"',
      'self::limboth');
  defineRule(
      'limlower-end', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];' +
      ' [t] "Ende Unterschrift"',
      'self::limlower');
  defineRule(
      'limupper-end', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFoverscript; [n] children/*[2];' +
      ' [t] "Ende Überschrift"',
      'self::limupper');
  defineRuleAlias(
      'limlower-end', 'self::underscore', '@role="limit function"');
  defineRuleAlias(
      'limlower-end', 'self::underscore');
  defineRuleAlias(
      'limupper-end', 'self::overscore');

  // Integral rules
  defineRule(
      'integral', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[2]; [n] children/*[3];',
      'self::integral');
  defineRule(
      'integral', 'mathspeak.default',
      '[n] children/*[1]; [t] "Index"; [n] children/*[2];' +
      '[t] "Hoch"; [n] children/*[3]; [t] "Grundlinie";',
      'self::limboth', '@role="integral"');
  defineSpecialisedRule(
      'integral', 'mathspeak.default', 'mathspeak.brief',
      '[n] children/*[1]; [t] "Index"; [n] children/*[2];' +
      '[t] "Hoch"; [n] children/*[3]; [t] "Base";');
  defineSpecialisedRule(
      'integral', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'bigop', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[2];',
      'self::bigop');



  // Relations
  defineRule(
      'relseq', 'mathspeak.default',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::relseq');

  defineRule(
      'equality', 'mathspeak.default',
      '[n] children/*[1]; [n] content/*[1]; [n] children/*[2]',
      'self::relseq', '@role="equality"', 'count(./children/*)=2');

  defineRule(
      'multi-equality', 'mathspeak.default',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::relseq', '@role="equality"', 'count(./children/*)>2');

  defineRule(
      'multrel', 'mathspeak.default',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::multirel');

  // Subscripts
  defineRule(
      'subscript', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFsubscriptVerbose; [n] children/*[2]',
      'self::subscript');
  defineRule(
      'subscript', 'mathspeak.brief',
      '[n] children/*[1]; [t] CSFsubscriptBrief; [n] children/*[2]',
      'self::subscript');
  defineSpecialisedRule(
      'subscript', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'subscript-simple', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::subscript',
      'name(./children/*[1])="identifier"',
      // Second child is a number but not mixed or other.
      'name(./children/*[2])="number"',
      './children/*[2][@role!="mixed"]',
      './children/*[2][@role!="othernumber"]');
  defineSpecialisedRule(
      'subscript-simple', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'subscript-simple', 'mathspeak.default', 'mathspeak.sbrief');

  defineRule(
      'subscript-baseline', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFsubscriptVerbose; [n] children/*[2];' +
      ' [t] CSFbaselineVerbose',
      'self::subscript', 'following-sibling::*',
      'not(name(following-sibling::subscript/children/*[1])="empty" or ' +
      '(name(following-sibling::infixop[@role="implicit"]/children/*[1])=' +
      '"subscript" and ' +
      'name(following-sibling::*/children/*[1]/children/*[1])="empty")) and ' +
      '@role!="subsup"',
      'not(following-sibling::*[@role="rightsuper" or @role="rightsub"' +
      ' or @role="leftsub" or @role="leftsub"])');
  defineSpecialisedRule(
      'subscript-baseline', 'mathspeak.default', 'mathspeak.brief',
      '[n] children/*[1]; [t] CSFsubscriptBrief; [n] children/*[2];' +
      ' [t] CSFbaselineBrief');
  defineSpecialisedRule(
      'subscript-baseline', 'mathspeak.brief', 'mathspeak.sbrief');
  defineRuleAlias(
      'subscript-baseline',
      'self::subscript', 'not(following-sibling::*)',
      'ancestor::fenced|ancestor::root|ancestor::sqrt|ancestor::punctuated|' +
      'ancestor::fraction',
      'not(ancestor::punctuated[@role="leftsuper" or @role="rightsub"' +
      ' or @role="rightsuper" or @role="rightsub"])');
  defineRuleAlias(
      'subscript-baseline',
      'self::subscript', 'not(following-sibling::*)',
      'ancestor::relseq|ancestor::multirel',
      sre.MathspeakUtil.generateBaselineConstraint());
  defineRuleAlias(
      'subscript-baseline',
      'self::subscript', 'not(following-sibling::*)',
      '@embellished');

  defineRule(
      'subscript-empty-sup', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::subscript',
      'name(children/*[2])="infixop"',
      'name(children/*[2][@role="implicit"]/children/*[1])="superscript"',
      'name(children/*[2]/children/*[1]/children/*[1])="empty"');
  defineSpecialisedRule(
      'subscript-empty-sup', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'subscript-empty-sup', 'mathspeak.brief', 'mathspeak.sbrief');
  defineRuleAlias(
      'subscript-empty-sup', 'self::subscript',
      'name(children/*[2])="superscript"',
      'name(children/*[2]/children/*[1])="empty"');


  // Superscripts
  defineRule(
      'superscript', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2]',
      'self::superscript');
  defineSpecialisedRule(
      'superscript', 'mathspeak.default', 'mathspeak.brief',
      '[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2]');
  defineSpecialisedRule(
      'superscript', 'mathspeak.brief', 'mathspeak.sbrief');


  defineRule(
      'superscript-baseline', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2];' +
      '[t] CSFbaselineVerbose',
      'self::superscript', 'following-sibling::*',
      'not(name(following-sibling::superscript/children/*[1])="empty" or ' +
      '(name(following-sibling::infixop[@role="implicit"]/children/*[1])=' +
      '"superscript" and ' +
      'name(following-sibling::*/children/*[1]/children/*[1])="empty")) and ' +
      'not(following-sibling::*[@role="rightsuper" or @role="rightsub"' +
      ' or @role="leftsub" or @role="leftsub"])');
  defineSpecialisedRule(
      'superscript-baseline', 'mathspeak.default', 'mathspeak.brief',
      '[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2];' +
      '[t] CSFbaselineBrief');
  defineSpecialisedRule(
      'superscript-baseline', 'mathspeak.brief', 'mathspeak.sbrief');
  defineRuleAlias(
      'superscript-baseline',
      'self::superscript', 'not(following-sibling::*)',
      'ancestor::punctuated',
      'ancestor::*/following-sibling::* and ' +
      'not(ancestor::punctuated[@role="leftsuper" or @role="rightsub"' +
      ' or @role="rightsuper" or @role="rightsub"])');
  defineRuleAlias(
      'superscript-baseline',
      'self::superscript', 'not(following-sibling::*)',
      'ancestor::fraction|ancestor::fenced|ancestor::root|ancestor::sqrt');
  defineRuleAlias(
      'superscript-baseline',
      'self::superscript', 'not(following-sibling::*)',
      'ancestor::relseq|ancestor::multirel',
      'not(@embellished)',
      sre.MathspeakUtil.generateBaselineConstraint());
  defineRuleAlias(
      'superscript-baseline',
      'self::superscript', 'not(following-sibling::*)',
      '@embellished', 'not(children/*[2][@role="prime"])');


  defineRule(
      'superscript-empty-sub', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::superscript',
      'name(children/*[2])="infixop"',
      'name(children/*[2][@role="implicit"]/children/*[1])="subscript"',
      'name(children/*[2]/children/*[1]/children/*[1])="empty"');
  defineSpecialisedRule(
      'superscript-empty-sub', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'superscript-empty-sub', 'mathspeak.brief', 'mathspeak.sbrief');
  defineRuleAlias(
      'superscript-empty-sub', 'self::superscript',
      'name(children/*[2])="subscript"',
      'name(children/*[2]/children/*[1])="empty"');

  // Square
  defineRule(
      'square', 'mathspeak.default',
      '[n] children/*[1]; [t] "Quadrat"',
      'self::superscript', 'children/*[2]',
      'children/*[2][text()=2]',
      'name(children/*[1])!="text" or ' +
      // Special exception dealing with footnotes.
      'not(name(children/*[1])="text" and ' +
      '(name(../../../punctuated[@role="text"]/..)="stree" ' +
      'or name(..)="stree"))',
      'name(children/*[1])!="subscript" or (' +
      // Keep squared if we have a simple subscript.
      'name(children/*[1])="subscript" and ' +
      'name(children/*[1]/children/*[1])="identifier" and ' +
      'name(children/*[1]/children/*[2])="number" and ' +
      'children/*[1]/children/*[2][@role!="mixed"] and ' +
      'children/*[1]/children/*[2][@role!="othernumber"])',
      'not(@embellished)');
  defineSpecialisedRule(
      'square', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'square', 'mathspeak.default', 'mathspeak.sbrief');
  defineRuleAlias(
      'square', 'self::superscript', 'children/*[2]',
      'children/*[2][text()=2]', '@embellished',
      'children/*[1][@role="prefix operator"]');

  // Cube
  defineRule(
      'cube', 'mathspeak.default',
      '[n] children/*[1]; [t] "Kubik"',
      'self::superscript', 'children/*[2]',
      'children/*[2][text()=3]',
      'name(children/*[1])!="text" or ' +
      // Special exception dealing with footnotes.
      'not(name(children/*[1])="text" and ' +
      '(name(../../../punctuated[@role="text"]/..)="stree" ' +
      'or name(..)="stree"))',
      'name(children/*[1])!="subscript" or (' +
      // Keep cubed if we have a simple subscript.
      'name(children/*[1])="subscript" and ' +
      'name(children/*[1]/children/*[1])="identifier" and ' +
      'name(children/*[1]/children/*[2])="number" and ' +
      'children/*[1]/children/*[2][@role!="mixed"] and ' +
      'children/*[1]/children/*[2][@role!="othernumber"])',
      'not(@embellished)');
  defineSpecialisedRule(
      'cube', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'cube', 'mathspeak.default', 'mathspeak.sbrief');
  defineRuleAlias(
      'cube', 'self::superscript', 'children/*[2]',
      'children/*[2][text()=3]', '@embellished',
      'children/*[1][@role="prefix operator"]');

  // Primes
  // This rule uses some redundancy for ordering!
  defineRule(
      'prime', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::superscript', 'children/*[2]', 'children/*[2][@role="prime"]');
  defineSpecialisedRule(
      'prime', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'prime', 'mathspeak.default', 'mathspeak.sbrief');

  defineRule(
      'prime-subscript', 'mathspeak.default',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
      ' [t] CSFsubscriptVerbose; [n] children/*[1]/children/*[2]',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="subscript"', 'not(following-sibling::*)');
  defineSpecialisedRule(
      'prime-subscript', 'mathspeak.default', 'mathspeak.brief',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
      ' [t] CSFsubscriptBrief; [n] children/*[1]/children/*[2]');
  defineSpecialisedRule(
      'prime-subscript', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'prime-subscript-baseline', 'mathspeak.default',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
      ' [t] CSFsubscriptVerbose; [n] children/*[1]/children/*[2];' +
      ' [t] CSFbaselineVerbose',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="subscript"', 'following-sibling::*');
  defineSpecialisedRule(
      'prime-subscript-baseline', 'mathspeak.default', 'mathspeak.brief',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
      ' [t] CSFsubscriptBrief; [n] children/*[1]/children/*[2];' +
      ' [t] CSFbaselineBrief');
  defineSpecialisedRule(
      'prime-subscript-baseline', 'mathspeak.brief', 'mathspeak.sbrief');
  defineRuleAlias(
      'prime-subscript-baseline',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="subscript"', 'not(following-sibling::*)',
      '@embellished');

  defineRule(
      'prime-subscript-simple', 'mathspeak.default',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
      '[n] children/*[1]/children/*[2]',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="subscript"',
      'name(children/*[1]/children/*[1])="identifier"',
      // Second child is a number but not mixed or other.
      'name(children/*[1]/children/*[2])="number"',
      'children/*[1]/children/*[2][@role!="mixed"]',
      'children/*[1]/children/*[2][@role!="othernumber"]'
  );
  defineSpecialisedRule(
      'prime-subscript-simple', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'prime-subscript-simple', 'mathspeak.default', 'mathspeak.sbrief');

  // TODO: Not sure about the modifying translation!
  // Modifiers
  defineRule(
      'overscore', 'mathspeak.default',
      '[t] "modifiziert oben"; [n] children/*[1]; [t] "mit"; [n] children/*[2]',
      'self::overscore', 'children/*[2][@role="overaccent"]'
  );
  defineSpecialisedRule(
      'overscore', 'mathspeak.default', 'mathspeak.brief',
      '[t] "mod oben"; [n] children/*[1]; [t] "mit"; [n] children/*[2]'
  );
  defineSpecialisedRule(
      'overscore', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'double-overscore', 'mathspeak.default',
      '[t] "modifiziert oben oben"; [n] children/*[1]; [t] "mit";' +
      ' [n] children/*[2]',
      'self::overscore', 'children/*[2][@role="overaccent"]',
      'name(children/*[1])="overscore"',
      'children/*[1]/children/*[2][@role="overaccent"]'
  );
  defineSpecialisedRule(
      'double-overscore', 'mathspeak.default', 'mathspeak.brief',
      '[t] "mod oben oben"; [n] children/*[1]; [t] "mit"; [n] children/*[2]'
  );
  defineSpecialisedRule(
      'double-overscore', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'underscore', 'mathspeak.default',
      '[t] "modifiziert unten"; [n] children/*[1]; [t] "mit"; [n] children/*[2]',
      'self::underscore', 'children/*[2][@role="underaccent"]'
  );
  defineSpecialisedRule(
      'underscore', 'mathspeak.default', 'mathspeak.brief',
      '[t] "mod unten"; [n] children/*[1]; [t] "mit"; [n] children/*[2]'
  );
  defineSpecialisedRule(
      'underscore', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'double-underscore', 'mathspeak.default',
      '[t] "modifiziert unten unten"; [n] children/*[1]; [t] "mit";' +
      ' [n] children/*[2]',
      'self::underscore', 'children/*[2][@role="underaccent"]',
      'name(children/*[1])="underscore"',
      'children/*[1]/children/*[2][@role="underaccent"]');
  defineSpecialisedRule(
      'double-underscore', 'mathspeak.default', 'mathspeak.brief',
      '[t] "mod unten unten"; [n] children/*[1]; [t] "mit"; [n] children/*[2]'
  );
  defineSpecialisedRule(
      'double-underscore', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'overbar', 'mathspeak.default',
      '[n] children/*[1]; [t] "Überstrich"',
      'self::overscore',
      '@role="latinletter" or @role="greekletter" or @role="otherletter"',
      'children/*[2][@role="overaccent"]',   // redundancy
      'children/*[2][text()="\u00AF" or text()="\uFFE3" or text()="\uFF3F"' +
      ' or text()="\u005F" or text()="\u203E"]'
  );

  defineRule(
      'underbar', 'mathspeak.default',
      '[n] children/*[1]; [t] "Unterstrich"',
      'self::underscore',
      '@role="latinletter" or @role="greekletter" or @role="otherletter"',
      'children/*[2][@role="underaccent"]',   // redundancy
      'children/*[2][text()="\u00AF" or text()="\uFFE3" or text()="\uFF3F"' +
      ' or text()="\u005F" or text()="\u203E"]'
  );

  defineRule(
      'overtilde', 'mathspeak.default',
      '[n] children/*[1]; [t] "Tilde oben"',
      'self::overscore',
      'children/*[2][@role="overaccent"]',   // redundancy
      '@role="latinletter" or @role="greekletter" or @role="otherletter"',
      'children/*[2][text()="\u007E" or text()="\u02DC" or text()="\u223C"' +
      ' or text()="\uFF5E"]'
  );

  defineRule(
      'undertilde', 'mathspeak.default',
      '[n] children/*[1]; [t] "Tilde unten"',
      'self::underscore',
      '@role="latinletter" or @role="greekletter" or @role="otherletter"',
      'children/*[2][@role="underaccent"]',   // redundancy
      'children/*[2][text()="\u007E" or text()="\u02DC" or text()="\u223C"' +
      ' or text()="\uFF5E"]'
  );

  // Layout Elements
  defineRule(
      'matrix-fence', 'mathspeak.default',
      '[n] children/*[1];',
      'self::fenced', 'count(children/*)=1', 'name(children/*[1])="matrix"');

  defineRule(
      'matrix', 'mathspeak.default',
      '[t] "Anfang"; [t] count(children/*);  [t] "mal";' +
      '[t] count(children/*[1]/children/*); [t] "Matrize"; ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile ");' +
      ' [t] "Ende Matrize"',
      'self::matrix');
  defineRule(
      'matrix', 'mathspeak.sbrief',
      '[t] count(children/*);  [t] "mal";' +
      '[t] count(children/*[1]/children/*); [t] "Matrize"; ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile ");' +
      ' [t] "Ende Matrize"', 'self::matrix');
  defineRuleAlias(
      'matrix', 'self::vector');

  defineRule(
      'matrix-row', 'mathspeak.default',
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Spalte");' +
      '[p] (pause: 200)',
      'self::row');
  defineRule(
      'row-with-label', 'mathspeak.default',
      '[t] "mit Bezeichner"; [n] content/*[1]; [t] "Ende Bezeichner"(pause: 200); ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Spalte")',
      'self::row', 'content');
  defineRule(
      'row-with-label', 'mathspeak.brief',
      '[t] "Bezeichner"; [n] content/*[1]; ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Spalte")',
      'self::row', 'content');
  defineSpecialisedRule(
      'row-with-label', 'mathspeak.brief', 'mathspeak.sbrief');
  defineRule(
      'row-with-text-label', 'mathspeak.sbrief',
      '[t] "Bezeichner"; [t] CSFRemoveParens;' +
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Spalte")',
      'self::row', 'content', 'name(content/cell/children/*[1])="text"');
  defineRule(
      'empty-row', 'mathspeak.default',
      '[t] "Blank"', 'self::row', 'count(children/*)=0');

  defineRule(
      'matrix-cell', 'mathspeak.default',
      '[n] children/*[1]; [p] (pause: 300)', 'self::cell');

  defineRule(
      'empty-cell', 'mathspeak.default',
      '[t] "leer"; [p] (pause: 300)', 'self::cell', 'count(children/*)=0');


  defineRule(
      'determinant', 'mathspeak.default',
      '[t] "Anfang"; [t] count(children/*);  [t] "mal";' +
      '[t] count(children/*[1]/children/*); [t] "Determinante";' +
      ' [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile ");' +
      ' [t] "Ende Determinante"',
      'self::matrix', '@role="determinant"');
  defineSpecialisedRule(
      'determinant', 'mathspeak.default', 'mathspeak.sbrief',
      '[t] count(children/*);  [t] "mal";' +
      '[t] count(children/*[1]/children/*); [t] "Determinante";' +
      ' [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile ");' +
      ' [t] "Ende Determinante"');

  defineRule(
      'determinant-simple', 'mathspeak.default',
      '[t] "Anfang"; [t] count(children/*);  [t] "mal";' +
      '[t] count(children/*[1]/children/*); [t] "Determinante";' +
      ' [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile",' +
      'grammar:simpleDet); [t] "Ende Determinante"',
      'self::matrix', '@role="determinant"', 'CQFdetIsSimple');
  defineSpecialisedRule(
      'determinant-simple', 'mathspeak.default', 'mathspeak.sbrief',
      '[t] count(children/*);  [t] "mal";' +
      '[t] count(children/*[1]/children/*); [t] "Determinante";' +
      ' [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile",' +
      'grammar:simpleDet); [t] "Ende Determinante"');
  defineRule(
      'row-simple', 'mathspeak.default',
      '[m] children/*;',
      'self::row', '@role="determinant"', 'contains(@grammar, "simpleDet")');

  defineRule(
      'layout', 'mathspeak.default', '[t] "Anfang Anordnung"; ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile ");' +
      ' [t] "Ende Anordnung"', 'self::table');
  defineRule(
      'layout', 'mathspeak.sbrief', '[t] "Anordnung"; ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile ");' +
      ' [t] "Ende Anordnung"', 'self::table');

  defineRule(
      'binomial', 'mathspeak.default',
      '[t] "Anfang Binomialkoeffizient"; [n] children/*[2]/children/*[1]; ' +
      '[t] "aus";  [n] children/*[1]/children/*[1];' +
      ' [t] "Ende Binomialkoeffizient"',
      'self::vector', '@role="binomial"');
  defineRule(
      'binomial', 'mathspeak.brief',
      '[t] "Anfang Binomial"; [n] children/*[2]/children/*[1]; ' +
      '[t] "aus";  [n] children/*[1]/children/*[1];' +
      ' [t] "Ende Binomial"',
      'self::vector', '@role="binomial"');
  defineRule(
      'binomial', 'mathspeak.sbrief',
      '[t] "Binomial"; [n] children/*[2]/children/*[1]; ' +
      '[t] "aus";  [n] children/*[1]/children/*[1];' +
      ' [t] "Ende Binomial"',
      'self::vector', '@role="binomial"');

  defineRule(
      'cases', 'mathspeak.default', '[t] "Anfang Fallunterscheidung"; ' +
      '[t] "große"; [n] content/*[1];' +
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile ");' +
      ' [t] "Ende Fallunterscheidung"', 'self::cases');
  defineRule(
      'cases', 'mathspeak.brief', '[t] "Anfang Fälle"; ' +
      '[t] "große"; [n] content/*[1];' +
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile ");' +
      ' [t] "Ende Fälle"', 'self::cases');
  defineRule(
      'cases', 'mathspeak.sbrief', '[t] "Fälle"; ' +
      '[t] "große"; [n] content/*[1];' +
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile ");' +
      ' [t] "Ende Fälle"', 'self::cases');

  // Multiline rules.
  defineRuleAlias(
      'layout', 'self::multiline');

  defineRule(
      'line', 'mathspeak.default',
      '[m] children/*', 'self::line');
  defineRule(
      'line-with-label', 'mathspeak.default',
      '[t] "mit Bezeichner"; [n] content/*[1]; [t] "Ende Bezeichner" (pause: 200); ' +
      '[m] children/*',
      'self::line', 'content');
  defineSpecialisedRule(
      'line-with-label', 'mathspeak.default', 'mathspeak.brief',
      '[t] "Bezeichner"; [n] content/*[1] (pause: 200); [m] children/*');
  defineSpecialisedRule(
      'line-with-label', 'mathspeak.brief', 'mathspeak.sbrief');
  defineRule(
      'line-with-text-label', 'mathspeak.sbrief',
      '[t] "Bezeichner"; [t] CSFRemoveParens; [m] children/*',
      'self::line', 'content', 'name(content/cell/children/*[1])="text"');
  defineRule(
      'empty-line', 'mathspeak.default',
      '[t] "leer"', 'self::line', 'count(children/*)=0', 'not(content)');
  defineSpecialisedRule('empty-line', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule('empty-line', 'mathspeak.brief', 'mathspeak.sbrief');
  defineRule(
      'empty-line-with-label', 'mathspeak.default',
      '[t] "mit Bezeichner"; [n] content/*[1]; [t] "Ende Bezeichner"(pause: 200); ' +
      '[t] "leer"', 'self::line', 'count(children/*)=0', 'content');
  defineSpecialisedRule(
      'empty-line-with-label', 'mathspeak.default', 'mathspeak.brief',
      '[t] "Bezeichner"; [n] content/*[1] (pause: 200); [t] "leer"');
  defineSpecialisedRule(
      'empty-line-with-label', 'mathspeak.brief', 'mathspeak.sbrief');

  // Enclose
  defineRule(
      'enclose', 'mathspeak.default',
      '[t] "Anfang Umschließung"; [t] @role (grammar:localEnclose);' +
      ' [n] children/*[1]; [t] "Ende Umschließung"',
      'self::enclose');
  defineRuleAlias(
      'overbar', 'self::enclose', '@role="top"');
  defineRuleAlias(
      'underbar', 'self::enclose', '@role="bottom"');
  defineRule(
      'leftbar', 'mathspeak.default',
      '[t] "senkrechter Strich"; [n] children/*[1]',
      'self::enclose', '@role="left"');
  defineRule(
      'rightbar', 'mathspeak.default',
      '[n] children/*[1]; [t] "senkrechter Strich"',
      'self::enclose', '@role="right"');

  // Crossout
  defineRule(
      'crossout', 'mathspeak.default',
      '[t] "durchgestrichen"; [n] children/*[1]; [t] "Ende duchgestrichen"',
      'self::enclose', '@role="updiagonalstrike" or' +
      ' @role="downdiagonalstrike" or @role="horizontalstrike"');
  defineRule(
      'cancel', 'mathspeak.default',
      '[t] "durchgestrichen"; [n] children/*[1]/children/*[1]; [t] "mit";' +
      ' [n] children/*[2]; [t] "Ende duchgestrichen"',
      'self::overscore', '@role="updiagonalstrike" or' +
      ' @role="downdiagonalstrike" or @role="horizontalstrike"');
  defineSpecialisedRule(
      'cancel', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'cancel', 'mathspeak.default', 'mathspeak.sbrief');
  defineRuleAlias('cancel',
      'self::underscore', '@role="updiagonalstrike" or' +
      ' @role="downdiagonalstrike" or @role="horizontalstrike"');
  defineRule(
      'cancel-reverse', 'mathspeak.default',
      '[t] "durchgestrichen"; [n] children/*[2]/children/*[1]; [t] "mit";' +
      ' [n] children/*[1]; [t] "Ende duchgestrichen"',
      'self::overscore', 'name(children/*[2])="enclose"',
      'children/*[2][@role="updiagonalstrike" or' +
      ' @role="downdiagonalstrike" or @role="horizontalstrike"]');
  defineSpecialisedRule(
      'cancel-reverse', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'cancel-reverse', 'mathspeak.default', 'mathspeak.sbrief');
  defineRuleAlias('cancel-reverse',
      'self::underscore', 'name(children/*[2])="enclose"',
      'children/*[2][@role="updiagonalstrike" or' +
      ' @role="downdiagonalstrike" or @role="horizontalstrike"]');

  // Rules for punctuated expressions.
  defineRule(
      'end-punct', 'mathspeak.default',
      '[m] children/*',
      'self::punctuated', '@role="endpunct"');

  defineRule(
      'start-punct', 'mathspeak.default',
      '[n] content/*[1]; [m] children/*[position()>1]',
      'self::punctuated', '@role="startpunct"');

  defineRule(
      'integral-punct', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[3]',
      'self::punctuated', '@role="integral"');

  defineRule(
      'punctuated', 'mathspeak.default',
      '[m] children/*',
      'self::punctuated');

  // Unit rules.
  defineRule(
      'unit', 'mathspeak.default',
      '[t] text() (grammar:annotation="unit":translate:plural)',
      'self::identifier', '@role="unit"');
  defineRule(
      'unit-square', 'mathspeak.default',
      '[t] "Quadrat"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'children/*[2][text()=2]',
      'name(children/*[1])="identifier"');

  defineRule(
      'unit-cubic', 'mathspeak.default',
      '[t] "Kubik"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'children/*[2][text()=3]',
      'name(children/*[1])="identifier"');
  defineRule(
      'reciprocal', 'mathspeak.default',
      '[n] children/*[1]; [t] "invers"',
      'self::superscript', '@role="unit"', 'name(children/*[1])="identifier"',
      'name(children/*[2])="prefixop"', 'children/*[2][@role="negative"]',
      'children/*[2]/children/*[1][text()=1]',
      'count(preceding-sibling::*)=0 or preceding-sibling::*[@role!="unit"]');
  defineRule(
      'reciprocal', 'mathspeak.default',
      '[t] "pro"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'name(children/*[1])="identifier"',
      'name(children/*[2])="prefixop"', 'children/*[2][@role="negative"]',
      'children/*[2]/children/*[1][text()=1]',
      'preceding-sibling::*[@role="unit"]');
  defineRule(
      'unit-combine', 'mathspeak.default',
      '[m] children/*', 'self::infixop', '@role="unit"');
  defineRule(
      'unit-divide', 'mathspeak.default',
      '[n] children/*[1]; [t] "pro"; [n] children/*[2]',
      'self::fraction', '@role="unit"');

  defineRule(
      'inference', 'mathspeak.default',
      '[t] "Schlussregel"; [m] content/*; [t] "mit Folgerung"; ' +
      '[n] children/*[1]; [t] "aus"; [t] count(children/*[2]/children/*); ' +
      '[t] "Prämissen"',
      'self::inference');
  defineRule(
      'inference', 'mathspeak.default',
      '[t] "Schlussregel"; ; [m] content/*; [t] "mit Folgerung"; ' +
      '[n] children/*[1]; [t] "aus"; [t] count(children/*[2]/children/*); ' +
      '[t] "Prämisse"',
      'self::inference', 'count(children/*[2]/children/*)<2');
  defineRule(
      'premise', 'mathspeak.default',
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Prämisse ");',
      'self::premises');
  defineRule(
      'conclusion', 'mathspeak.default',
      '[n] children/*[1]', 'self::conclusion');
  defineRule(
      'label', 'mathspeak.default',
      '[t] "Regel"; [n] children/*[1]',
      'self::rulelabel');
  defineRule(
      'axiom', 'mathspeak.default',
      '[t] "Axiom"; [m] children/*[1];',
      'self::inference', '@role="axiom"');
  defineRule(
      'axiom', 'mathspeak.default',
      '[t] "leeres Axiom";',
      'self::empty', '@role="axiom"');

};


/**
 * Generates the tensor rules.
 * @private
 */
sre.MathspeakGerman.generateTensorRules_ = function() {
  sre.MathspeakUtil.generateTensorRules(sre.MathspeakGerman.mathStore);
};

});  // goog.scope



sre.MathspeakGerman.getInstance().initializer = [
  sre.MathspeakGerman.initCustomFunctions_,
  sre.MathspeakGerman.initMathspeakGerman_,
  sre.MathspeakGerman.generateTensorRules_
];