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

goog.require('sre.MathspeakUtil');


/**
 * German Mathspeak rules.
 */
sre.MathspeakGerman = {
  locale: 'de',
  domain: 'mathspeak',
  functions: [
    ['CQF', 'CQFspaceoutNumber', sre.MathspeakUtil.spaceoutNumber],
    ['CQF', 'CQFspaceoutIdentifier', sre.MathspeakUtil.spaceoutIdentifier],

    ['CSF', 'CSFspaceoutText', sre.MathspeakUtil.spaceoutText],
    // Fraction function.
    ['CSF', 'CSFopenFracVerbose', sre.MathspeakUtil.openingFractionVerbose],
    ['CSF', 'CSFcloseFracVerbose', sre.MathspeakUtil.closingFractionVerbose],
    ['CSF', 'CSFoverFracVerbose', sre.MathspeakUtil.overFractionVerbose],
    ['CSF', 'CSFopenFracBrief', sre.MathspeakUtil.openingFractionBrief],
    ['CSF', 'CSFcloseFracBrief', sre.MathspeakUtil.closingFractionBrief],
    ['CSF', 'CSFopenFracSbrief', sre.MathspeakUtil.openingFractionSbrief],
    ['CSF', 'CSFcloseFracSbrief', sre.MathspeakUtil.closingFractionSbrief],
    ['CSF', 'CSFoverFracSbrief', sre.MathspeakUtil.overFractionSbrief],
    ['CSF', 'CSFvulgarFraction', sre.NumbersUtil.vulgarFraction],
    ['CQF', 'CQFvulgarFractionSmall', sre.MathspeakUtil.isSmallVulgarFraction],

    // Radical function.
    ['CSF', 'CSFopenRadicalVerbose', sre.MathspeakUtil.openingRadicalVerbose],
    ['CSF', 'CSFcloseRadicalVerbose', sre.MathspeakUtil.closingRadicalVerbose],
    ['CSF', 'CSFindexRadicalVerbose', sre.MathspeakUtil.indexRadicalVerbose],
    ['CSF', 'CSFopenRadicalBrief', sre.MathspeakUtil.openingRadicalBrief],
    ['CSF', 'CSFcloseRadicalBrief', sre.MathspeakUtil.closingRadicalBrief],
    ['CSF', 'CSFindexRadicalBrief', sre.MathspeakUtil.indexRadicalBrief],
    ['CSF', 'CSFopenRadicalSbrief', sre.MathspeakUtil.openingRadicalSbrief],
    ['CSF', 'CSFindexRadicalSbrief', sre.MathspeakUtil.indexRadicalSbrief],

    // Sub- Superscript.
    ['CSF', 'CSFsuperscriptVerbose', sre.MathspeakUtil.superscriptVerbose],
    ['CSF', 'CSFsuperscriptBrief', sre.MathspeakUtil.superscriptBrief],
    ['CSF', 'CSFsubscriptVerbose', sre.MathspeakUtil.subscriptVerbose],
    ['CSF', 'CSFsubscriptBrief', sre.MathspeakUtil.subscriptBrief],
    ['CSF', 'CSFbaselineVerbose', sre.MathspeakUtil.baselineVerbose],
    ['CSF', 'CSFbaselineBrief', sre.MathspeakUtil.baselineBrief],
    // Tensor specific.
    ['CSF', 'CSFleftsuperscriptVerbose', sre.MathspeakUtil.superscriptVerbose],
    ['CSF', 'CSFleftsubscriptVerbose', sre.MathspeakUtil.subscriptVerbose],
    ['CSF', 'CSFrightsuperscriptVerbose', sre.MathspeakUtil.superscriptVerbose],
    ['CSF', 'CSFrightsubscriptVerbose', sre.MathspeakUtil.subscriptVerbose],
    ['CSF', 'CSFleftsuperscriptBrief', sre.MathspeakUtil.superscriptBrief],
    ['CSF', 'CSFleftsubscriptBrief', sre.MathspeakUtil.subscriptBrief],
    ['CSF', 'CSFrightsuperscriptBrief', sre.MathspeakUtil.superscriptBrief],
    ['CSF', 'CSFrightsubscriptBrief', sre.MathspeakUtil.subscriptBrief],

    // Over- Underscore.
    ['CSF', 'CSFunderscript', sre.MathspeakUtil.nestedUnderscore],
    ['CSF', 'CSFoverscript', sre.MathspeakUtil.nestedOverscore],

    ['CTXF', 'CTXFordinalCounter', sre.NumbersUtil.ordinalCounter],
    ['CTXF', 'CTXFcontentIterator', sre.StoreUtil.contentIterator],

    // Layout related.
    ['CQF', 'CQFdetIsSimple', sre.MathspeakUtil.determinantIsSimple],
    ['CSF', 'CSFRemoveParens', sre.MathspeakUtil.removeParens],

    // Dummy.
    ['CQF', 'CQFresetNesting', sre.MathspeakUtil.resetNestingDepth]
  ],

  rules: [
    // TODO: This needs to be prioritized!
    //
    // We could say "kollabiert X", but the postscript avoids hassle with
    // Grammar.
    ['Rule',
      'collapsed', 'default',
      '[n] . (engine:modality=summary,grammar:collapsed); [t] "kollabiert"',
      'self::*[@alternative]', 'not(contains(@grammar, "collapsed"))'
    ],
    ['SpecializedRule',
      'collapsed', 'default', 'brief'],
    ['SpecializedRule',
      'collapsed', 'brief', 'sbrief'],

    // Initial rule
    ['Rule',
      'stree', 'default',
      '[n] ./*[1]', 'self::stree', 'CQFresetNesting'],

    // Dummy rules
    ['Rule',
      'unknown', 'default', '[n] text()',
      'self::unknown'],

    ['Rule',
      'protected', 'default', '[t] text()',
      'self::number', 'contains(@grammar, "protected")'],

    ['Rule',
      'omit-empty', 'default',
      '[p] (pause:100)', // Pause necessary to voice separators between empty.
      'self::empty'],
    ['Rule',
      'blank-empty', 'default',
      '[t] "leer"', 'self::empty', 'count(../*)=1',
      'name(../..)="cell" or name(../..)="line"'],

    // Font rules
    ['Rule',
      'font', 'default',
      '[t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)',
      'self::*', 'name(self::*)!="number"', '@font',
      'not(contains(@grammar, "ignoreFont"))', '@font!="normal"'],

    ['Rule',
      'font-number', 'default',
      '[t] @font (grammar:localFontNumber); [n] . (grammar:ignoreFont=@font)',
      'self::number', '@font',
      'not(contains(@grammar, "ignoreFont"))', '@font!="normal"'],

    ['Rule',
      'font-identifier-short', 'default',
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
      '@role!="unit"'],

    ['Rule',
      'font-identifier', 'default',
      '[t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)',
      'self::identifier', 'string-length(text())=1 or string-length(text())=2',
      '@font', '@font="normal"', 'not(contains(@grammar, "ignoreFont"))',
      '@role!="unit"'],

    ['Rule',
      'omit-font', 'default',
      '[n] . (grammar:ignoreFont=@font)',
      'self::identifier', 'string-length(text())=1 or string-length(text())=2',
      '@font', 'not(contains(@grammar, "ignoreFont"))', '@font="italic"',
     'self::*'], // Redudancy for ordering

    ['Rule',
      'font-double-struck', 'default',
      '[n] . (grammar:ignoreFont=@font); [t] @font (grammar:localFont)',
      'self::*', 'name(self::*)!="number"',
      'string-length(text())=1 or string-length(text())=2', '@font',
      'not(contains(@grammar, "ignoreFont"))', '@font="double-struck"'],

    ['Rule',
      'font-number-double-struck', 'default',
      '[n] . (grammar:ignoreFont=@font); [t] @font (grammar:localFontNumber)',
      'self::number',
      'string-length(text())=1 or string-length(text())=2', '@font',
      'not(contains(@grammar, "ignoreFont"))', '@font="double-struck"'],

    // Number rules
    ['Rule',
      'number', 'default', '[n] text()', 'self::number'],

    ['Rule',
      'mixed-number', 'default',
      '[n] children/*[1]; [n] children/*[2]; ',
      'self::number', '@role="mixed"'],

    ['Rule',
      'number-with-chars', 'default',
      '[t] "Zahl"; [m] CQFspaceoutNumber (grammar:protected)',
      'self::number', '@role="othernumber"',
      '"" != translate(text(), "0123456789.,", "")',
      'not(contains(@grammar, "protected"))'],

    // Maybe duplicate this rule for self::text
    ['Rule',
      'number-as-upper-word', 'default',
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
     '"")'],
    ['SpecializedRule',
      'number-as-upper-word', 'default', 'brief'],
    ['SpecializedRule',
      'number-as-upper-word', 'default', 'sbrief'],

    ['Rule',
      'number-baseline', 'default',
      '[t] "Grundlinie"; [n] . (grammar:baseline)',
      'self::number', 'not(contains(@grammar, "ignoreFont"))',
      'preceding-sibling::identifier', 'not(contains(@grammar, "baseline"))',
      'preceding-sibling::*[1][@role="latinletter" or @role="greekletter" or' +
     ' @role="otherletter"]',
      'parent::*/parent::infixop[@role="implicit"]'],
    ['SpecializedRule',
      'number-baseline', 'default', 'brief',
      '[t] "Grund"; [n] . (grammar:baseline)'],
    ['SpecializedRule',
      'number-baseline', 'brief', 'sbrief'],


    ['Rule',
      'number-baseline-font', 'default',
      '[t] "Grundlinie"; [t] @font (grammar:localFont);' +
     ' [n] . (grammar:ignoreFont=@font)',
      'self::number', '@font', 'not(contains(@grammar, "ignoreFont"))',
      '@font!="normal"', 'preceding-sibling::identifier',
      'preceding-sibling::*[@role="latinletter" or @role="greekletter" or' +
     ' @role="otherletter"]',
      'parent::*/parent::infixop[@role="implicit"]'],
    ['SpecializedRule',
      'number-baseline-font', 'default', 'brief',
      '[t] "Grund"; [t] @font (grammar:localFont); ' +
     '[n] . (grammar:ignoreFont=@font)'],
    ['SpecializedRule',
      'number-baseline-font', 'brief', 'sbrief'],

    ['Rule',
      'identifier', 'default', '[m] CQFspaceoutIdentifier',
      'self::identifier', 'string-length(text())>1', '@role!="unit"',
      'not(@font) or @font="normal" or contains(@grammar, "ignoreFont")',
      'text()!=translate(text(), ' +
     '"abcdefghijklmnopqrstuvwxyz\u03B1\u03B2\u03B3\u03B4' +
     '\u03B5\u03B6\u03B7\u03B8\u03B9\u03BA\u03BB\u03BC\u03BD\u03BE\u03BF' +
     '\u03C0\u03C1\u03C2\u03C3\u03C4\u03C5\u03C6\u03C7\u03C8\u03C9' +
     'ABCDEFGHIJKLMNOPQRSTUVWXYZ\u0391\u0392\u0393' +
     '\u0394\u0395\u0396\u0397\u0398\u0399\u039A\u039B\u039C\u039D\u039E' +
     '\u039F\u03A0\u03A1\u03A3\u03A3\u03A4\u03A5\u03A6\u03A7\u03A8\u03A9", ' +
     '"")'],

    ['Rule',
      'identifier', 'default', '[n] text()', 'self::identifier'],

    // minus sign
    ['Rule',
      'negative', 'default',
      '[t] "minus"; [n] children/*[1]',
      'self::prefixop', '@role="negative"', 'children/identifier'],
    ['Aliases',
      'negative',
      'self::prefixop', '@role="negative"', 'children/number'],
    ['Aliases',
      'negative',
      'self::prefixop', '@role="negative"',
      'children/fraction[@role="vulgar"]'],

    ['Rule',
      'negative', 'default',
      '[t] "minus"; [n] children/*[1]',
      'self::prefixop', '@role="negative"'],

    // Operator rules
    ['Rule',
      'prefix', 'default',
      '[m] content/*; [n] children/*[1]',
      'self::prefixop'],
    ['Rule',
      'postfix', 'default',
      '[n] children/*[1]; [m] content/*',
      'self::postfixop'],

    ['Rule',
      'binary-operation', 'default',
      '[m] children/* (sepFunc:CTXFcontentIterator);', 'self::infixop'],

    // Implicit times is currently ignored!
    ['Rule',
      'implicit', 'default',
      '[m] children/*', 'self::infixop', '@role="implicit"'],
    ['Aliases',
      'implicit', 'self::infixop', '@role="leftsuper" or' +
     ' @role="leftsub" or @role="rightsuper" or @role="rightsub"'],

    // TODO: Do we really need this?
    ['Rule', 'subtraction', 'default',
     '[m] children/* (separator:"minus");', 'self::infixop',
     '@role="subtraction"'],

    // Function rules
    ['Rule',
      'function-unknown', 'default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::appl'],

    ['Rule',
      'function-prefix', 'default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::appl', 'children/*[1][@role="prefix function"]'],


    // Fences rules
    ['Rule',
      'fences-open-close', 'default',
      '[n] content/*[1]; [n] children/*[1]; [n] content/*[2]',
      'self::fenced', '@role="leftright"'],

    ['Rule',
      'fences-neutral', 'default',
      '[t] "Anfang Betrag"; [n] children/*[1]; [t] "Ende Betrag"',
      'self::fenced', '@role="neutral"',
      'content/*[1][text()]="|" or content/*[1][text()]="❘" or' +
     ' content/*[1][text()]="｜"'],
    ['SpecializedRule',
      'fences-neutral', 'default', 'sbrief',
      '[t] "Betrag"; [n] children/*[1]; [t] "Ende Betrag"'],
    ['Rule',
      'fences-neutral', 'default',
      '[n] content/*[1]; [n] children/*[1]; [n] content/*[2]',
      'self::fenced', '@role="neutral"'],


    // TODO (sorge) Maybe check for punctuated element and singleton?
    ['Rule',
      'fences-set', 'default',
      '[t] "Anfang Menge"; [n] children/*[1]; [t] "Ende Menge"',
      'self::fenced', '@role="set empty" or @role="set extended"' +
     ' or @role="set singleton" or @role="set collection"',
      // 'self::fenced', '@role="leftright"', 'content/*[1][text()]="{"',
      // 'content/*[2][text()]="}"', 'count(children/*)=1',
      'not(name(../..)="appl")'],
    ['SpecializedRule',
      'fences-set', 'default', 'sbrief',
      '[t] "Menge"; [n] children/*[1]; [t] "Ende Menge"'],


    // Text rules
    ['Rule',
      'text', 'default', '[n] text()', 'self::text'],

    // Special symbols
    ['Rule',
      'factorial', 'default', '[t] "Fakultät"', 'self::punctuation',
      'text()="!"', 'name(preceding-sibling::*[1])!="text"'],
    // TODO: Do we really need this?
    ['Rule',
      'minus', 'default', '[t] "minus"',
      'self::operator', 'text()="\u002D"'],

    ['Rule',
      'single-prime', 'default', '[t] "Strich"',
      'self::punctuated', '@role="prime"', 'count(children/*)=1'],
    ['Rule',
      'double-prime', 'default', '[t] "zwei Strich"',
      'self::punctuated', '@role="prime"', 'count(children/*)=2'],
    ['Rule',
      'triple-prime', 'default', '[t] "drei Strich"',
      'self::punctuated', '@role="prime"', 'count(children/*)=3'],
    ['Rule',
      'quadruple-prime', 'default', '[t] "vier Strich"',
      'self::punctuated', '@role="prime"', 'count(children/*)=4'],
    ['Rule',
      'counted-prime', 'default',
      '[t] count(children/*); [t] "Strich"',
      'self::punctuated', '@role="prime"'],

    // Fraction rules

    ['Rule',
      'fraction', 'default',
      '[t] CSFopenFracVerbose; [n] children/*[1];' +
          ' [t] CSFoverFracVerbose; [n] children/*[2]; [t] CSFcloseFracVerbose',
      'self::fraction'],

    ['Rule',
      'fraction', 'brief',
      '[t] CSFopenFracBrief; [n] children/*[1];' +
          ' [t] CSFoverFracVerbose; [n] children/*[2]; [t] CSFcloseFracBrief',
      'self::fraction'],

    ['Rule',
      'fraction', 'sbrief',
      '[t] CSFopenFracSbrief; [n] children/*[1];' +
          ' [t] CSFoverFracSbrief; [n] children/*[2]; [t] CSFcloseFracSbrief',
      'self::fraction'],

    ['Rule',
      'vulgar-fraction', 'default',
      '[t] CSFvulgarFraction (grammar:correctOne)',
      'self::fraction', '@role="vulgar"', 'CQFvulgarFractionSmall'],
    ['SpecializedRule',
      'vulgar-fraction', 'default', 'brief'],
    ['SpecializedRule',
      'vulgar-fraction', 'default', 'sbrief'],

    ['Rule',
      'continued-fraction-outer', 'default',
      '[t] "Kettenbruch"; [n] children/*[1];' +
     '[t] "durch"; [n] children/*[2]',
      'self::fraction', 'not(ancestor::fraction)',
      'children/*[2]/descendant-or-self::*[@role="ellipsis" and ' +
     'not(following-sibling::*)]'],

    ['Rule',
      'continued-fraction-inner', 'default',
      '[t] "Anfang Bruch"; [n] children/*[1];' +
     '[t] "durch"; [n] children/*[2]',
      'self::fraction', 'ancestor::fraction',
      'children/*[2]/descendant-or-self::*[@role="ellipsis" and ' +
     'not(following-sibling::*)]'],
    ['SpecializedRule',
      'continued-fraction-inner', 'default', 'sbrief',
      '[t] "Bruch"; [n] children/*[1];' +
     '[t] "durch"; [n] children/*[2]'],

    // Radical rules

    ['Rule',
      'sqrt', 'default',
      '[t] CSFopenRadicalVerbose; [n] children/*[1];' +
          ' [t] CSFcloseRadicalVerbose',
      'self::sqrt'],

    ['Rule',
      'sqrt', 'brief',
      '[t] CSFopenRadicalBrief; [n] children/*[1];' +
          ' [t] CSFcloseRadicalBrief',
      'self::sqrt'],

    ['Rule',
      'sqrt', 'sbrief',
      '[t] CSFopenRadicalSbrief; [n] children/*[1];' +
          ' [t] CSFcloseRadicalBrief',
      'self::sqrt'],

    ['Rule',
      'root-small', 'default',
      '[t] CSFopenRadicalVerbose; [n] children/*[2];' +
          ' [t] CSFcloseRadicalVerbose',
      'self::root', 'children/*[1][text()=3 or text()=2]'],

    ['Rule',
      'root-small', 'brief',
      '[t] CSFopenRadicalBrief; [n] children/*[2];' +
          ' [t] CSFcloseRadicalBrief',
      'self::root', 'children/*[1][text()=3 or text()=2]'],

    ['Rule',
      'root-small', 'sbrief',
      '[t] CSFopenRadicalSbrief; [n] children/*[2];' +
          ' [t] CSFcloseRadicalBrief',
      'self::root', 'children/*[1][text()=3 or text()=2]'],

    ['Rule',
      'root', 'default',
      '[t] CSFindexRadicalVerbose; [n] children/*[1];' +
          '[t] CSFopenRadicalVerbose; [n] children/*[2];' +
          ' [t] CSFcloseRadicalVerbose',
      'self::root'],

    ['Rule',
      'root', 'brief',
      '[t] CSFindexRadicalBrief; [n] children/*[1];' +
          '[t] CSFopenRadicalBrief; [n] children/*[2];' +
          ' [t] CSFcloseRadicalBrief',
      'self::root'],

    ['Rule',
      'root', 'sbrief',
      '[t] CSFindexRadicalSbrief; [n] children/*[1];' +
          '[t] CSFopenRadicalSbrief; [n] children/*[2];' +
          ' [t] CSFcloseRadicalBrief',
      'self::root'],

    // Limits
    ['Rule',
      'limboth', 'default',
      '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];' +
     '[t] CSFoverscript; [n] children/*[3]',
      'self::limboth', 'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]'],
    ['Rule',
      'limlower', 'default',
      '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];',
      'self::limlower', 'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]'],
    ['Rule',
      'limupper', 'default',
      '[n] children/*[1]; [t] CSFoverscript; [n] children/*[2];',
      'self::limupper', 'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]'],
    ['Aliases',
      'limlower', 'self::underscore', '@role="limit function"',
      'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]'],
    ['Aliases',
      'limlower', 'self::underscore', 'children/*[2][@role!="underaccent"]',
      'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]'],
    ['Aliases',
      'limupper', 'self::overscore', 'children/*[2][@role!="overaccent"]',
      'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]'],

    ['Rule',
      'limboth-end', 'default',
      '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];' +
     '[t] CSFoverscript; [n] children/*[3]; [t] "Ende Überschrift"',
      'self::limboth'],
    ['Rule',
      'limlower-end', 'default',
      '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];' +
     ' [t] "Ende Unterschrift"',
      'self::limlower'],
    ['Rule',
      'limupper-end', 'default',
      '[n] children/*[1]; [t] CSFoverscript; [n] children/*[2];' +
     ' [t] "Ende Überschrift"',
      'self::limupper'],
    ['Aliases',
      'limlower-end', 'self::underscore', '@role="limit function"'],
    ['Aliases',
      'limlower-end', 'self::underscore'],
    ['Aliases',
      'limupper-end', 'self::overscore'],

    // Integral rules
    ['Rule',
      'integral', 'default',
      '[n] children/*[1]; [n] children/*[2]; [n] children/*[3];',
      'self::integral'],
    ['Rule',
      'integral', 'default',
      '[n] children/*[1]; [t] "Index"; [n] children/*[2];' +
     '[t] "Hoch"; [n] children/*[3]; [t] "Grundlinie";',
      'self::limboth', '@role="integral"'],
    ['SpecializedRule',
      'integral', 'default', 'brief',
      '[n] children/*[1]; [t] "Index"; [n] children/*[2];' +
     '[t] "Hoch"; [n] children/*[3]; [t] "Base";'],
    ['SpecializedRule',
      'integral', 'brief', 'sbrief'],

    ['Rule',
      'bigop', 'default',
      '[n] children/*[1]; [n] children/*[2];',
      'self::bigop'],



    // Relations
    ['Rule',
      'relseq', 'default',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::relseq'],

    ['Rule',
      'equality', 'default',
      '[n] children/*[1]; [n] content/*[1]; [n] children/*[2]',
      'self::relseq', '@role="equality"', 'count(./children/*)=2'],

    ['Rule',
      'multi-equality', 'default',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::relseq', '@role="equality"', 'count(./children/*)>2'],

    ['Rule',
      'multrel', 'default',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::multirel'],

    // Subscripts
    ['Rule',
      'subscript', 'default',
      '[n] children/*[1]; [t] CSFsubscriptVerbose; [n] children/*[2]',
      'self::subscript'],
    ['Rule',
      'subscript', 'brief',
      '[n] children/*[1]; [t] CSFsubscriptBrief; [n] children/*[2]',
      'self::subscript'],
    ['SpecializedRule',
      'subscript', 'brief', 'sbrief'],

    ['Rule',
      'subscript-simple', 'default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::subscript',
      'name(./children/*[1])="identifier"',
      // Second child is a number but not mixed or other.
      'name(./children/*[2])="number"',
      './children/*[2][@role!="mixed"]',
      './children/*[2][@role!="othernumber"]'],
    ['SpecializedRule',
      'subscript-simple', 'default', 'brief'],
    ['SpecializedRule',
      'subscript-simple', 'default', 'sbrief'],

    ['Rule',
      'subscript-baseline', 'default',
      '[n] children/*[1]; [t] CSFsubscriptVerbose; [n] children/*[2];' +
     ' [t] CSFbaselineVerbose',
      'self::subscript', 'following-sibling::*',
      'not(name(following-sibling::subscript/children/*[1])="empty" or ' +
     '(name(following-sibling::infixop[@role="implicit"]/children/*[1])=' +
     '"subscript" and ' +
     'name(following-sibling::*/children/*[1]/children/*[1])="empty")) and ' +
     '@role!="subsup"',
      'not(following-sibling::*[@role="rightsuper" or @role="rightsub"' +
     ' or @role="leftsub" or @role="leftsub"])'],
    ['SpecializedRule',
      'subscript-baseline', 'default', 'brief',
      '[n] children/*[1]; [t] CSFsubscriptBrief; [n] children/*[2];' +
     ' [t] CSFbaselineBrief'],
    ['SpecializedRule',
      'subscript-baseline', 'brief', 'sbrief'],
    ['Aliases',
      'subscript-baseline',
      'self::subscript', 'not(following-sibling::*)',
      'ancestor::fenced|ancestor::root|ancestor::sqrt|ancestor::punctuated|' +
     'ancestor::fraction',
      'not(ancestor::punctuated[@role="leftsuper" or @role="rightsub"' +
     ' or @role="rightsuper" or @role="rightsub"])'],
    ['Aliases',
      'subscript-baseline',
      'self::subscript', 'not(following-sibling::*)',
      'ancestor::relseq|ancestor::multirel',
      sre.MathspeakUtil.generateBaselineConstraint()],
    ['Aliases',
      'subscript-baseline',
      'self::subscript', 'not(following-sibling::*)',
      '@embellished'],

    ['Rule',
      'subscript-empty-sup', 'default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::subscript',
      'name(children/*[2])="infixop"',
      'name(children/*[2][@role="implicit"]/children/*[1])="superscript"',
      'name(children/*[2]/children/*[1]/children/*[1])="empty"'],
    ['SpecializedRule',
      'subscript-empty-sup', 'default', 'brief'],
    ['SpecializedRule',
      'subscript-empty-sup', 'brief', 'sbrief'],
    ['Aliases',
      'subscript-empty-sup', 'self::subscript',
      'name(children/*[2])="superscript"',
      'name(children/*[2]/children/*[1])="empty"'],


    // Superscripts
    ['Rule',
      'superscript', 'default',
      '[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2]',
      'self::superscript'],
    ['SpecializedRule',
      'superscript', 'default', 'brief',
      '[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2]'],
    ['SpecializedRule',
      'superscript', 'brief', 'sbrief'],


    ['Rule',
      'superscript-baseline', 'default',
      '[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2];' +
     '[t] CSFbaselineVerbose',
      'self::superscript', 'following-sibling::*',
      'not(name(following-sibling::superscript/children/*[1])="empty" or ' +
     '(name(following-sibling::infixop[@role="implicit"]/children/*[1])=' +
     '"superscript" and ' +
     'name(following-sibling::*/children/*[1]/children/*[1])="empty")) and ' +
     'not(following-sibling::*[@role="rightsuper" or @role="rightsub"' +
     ' or @role="leftsub" or @role="leftsub"])'],
    ['SpecializedRule',
      'superscript-baseline', 'default', 'brief',
      '[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2];' +
     '[t] CSFbaselineBrief'],
    ['SpecializedRule',
      'superscript-baseline', 'brief', 'sbrief'],
    ['Aliases',
      'superscript-baseline',
      'self::superscript', 'not(following-sibling::*)',
      'ancestor::punctuated',
      'ancestor::*/following-sibling::* and ' +
     'not(ancestor::punctuated[@role="leftsuper" or @role="rightsub"' +
     ' or @role="rightsuper" or @role="rightsub"])'],
    ['Aliases',
      'superscript-baseline',
      'self::superscript', 'not(following-sibling::*)',
      'ancestor::fraction|ancestor::fenced|ancestor::root|ancestor::sqrt'],
    ['Aliases',
      'superscript-baseline',
      'self::superscript', 'not(following-sibling::*)',
      'ancestor::relseq|ancestor::multirel',
      'not(@embellished)',
      sre.MathspeakUtil.generateBaselineConstraint()],
    ['Aliases',
      'superscript-baseline',
      'self::superscript', 'not(following-sibling::*)',
      '@embellished', 'not(children/*[2][@role="prime"])'],


    ['Rule',
      'superscript-empty-sub', 'default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::superscript',
      'name(children/*[2])="infixop"',
      'name(children/*[2][@role="implicit"]/children/*[1])="subscript"',
      'name(children/*[2]/children/*[1]/children/*[1])="empty"'],
    ['SpecializedRule',
      'superscript-empty-sub', 'default', 'brief'],
    ['SpecializedRule',
      'superscript-empty-sub', 'brief', 'sbrief'],
    ['Aliases',
      'superscript-empty-sub', 'self::superscript',
      'name(children/*[2])="subscript"',
      'name(children/*[2]/children/*[1])="empty"'],

    // Square
    ['Rule',
      'square', 'default',
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
      'not(@embellished)'],
    ['SpecializedRule',
      'square', 'default', 'brief'],
    ['SpecializedRule',
      'square', 'default', 'sbrief'],
    ['Aliases',
      'square', 'self::superscript', 'children/*[2]',
      'children/*[2][text()=2]', '@embellished',
      'children/*[1][@role="prefix operator"]'],

    // Cube
    ['Rule',
      'cube', 'default',
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
      'not(@embellished)'],
    ['SpecializedRule',
      'cube', 'default', 'brief'],
    ['SpecializedRule',
      'cube', 'default', 'sbrief'],
    ['Aliases',
      'cube', 'self::superscript', 'children/*[2]',
      'children/*[2][text()=3]', '@embellished',
      'children/*[1][@role="prefix operator"]'],

    // Primes
    // This rule uses some redundancy for ordering!
    ['Rule',
      'prime', 'default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::superscript', 'children/*[2]', 'children/*[2][@role="prime"]'],
    ['SpecializedRule',
      'prime', 'default', 'brief'],
    ['SpecializedRule',
      'prime', 'default', 'sbrief'],

    ['Rule',
      'prime-subscript', 'default',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
     ' [t] CSFsubscriptVerbose; [n] children/*[1]/children/*[2]',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="subscript"', 'not(following-sibling::*)'],
    ['SpecializedRule',
      'prime-subscript', 'default', 'brief',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
     ' [t] CSFsubscriptBrief; [n] children/*[1]/children/*[2]'],
    ['SpecializedRule',
      'prime-subscript', 'brief', 'sbrief'],

    ['Rule',
      'prime-subscript-baseline', 'default',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
     ' [t] CSFsubscriptVerbose; [n] children/*[1]/children/*[2];' +
     ' [t] CSFbaselineVerbose',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="subscript"', 'following-sibling::*'],
    ['SpecializedRule',
      'prime-subscript-baseline', 'default', 'brief',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
     ' [t] CSFsubscriptBrief; [n] children/*[1]/children/*[2];' +
     ' [t] CSFbaselineBrief'],
    ['SpecializedRule',
      'prime-subscript-baseline', 'brief', 'sbrief'],
    ['Aliases',
      'prime-subscript-baseline',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="subscript"', 'not(following-sibling::*)',
      '@embellished'],

    ['Rule',
      'prime-subscript-simple', 'default',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
     '[n] children/*[1]/children/*[2]',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="subscript"',
      'name(children/*[1]/children/*[1])="identifier"',
      // Second child is a number but not mixed or other.
      'name(children/*[1]/children/*[2])="number"',
      'children/*[1]/children/*[2][@role!="mixed"]',
      'children/*[1]/children/*[2][@role!="othernumber"]'
    ],
    ['SpecializedRule',
      'prime-subscript-simple', 'default', 'brief'],
    ['SpecializedRule',
      'prime-subscript-simple', 'default', 'sbrief'],

    // TODO: Not sure about the modifying translation!
    // Modifiers
    ['Rule',
      'overscore', 'default',
      '[t] "modifiziert oben"; [n] children/*[1]; [t] "mit"; [n] children/*[2]',
      'self::overscore', 'children/*[2][@role="overaccent"]'
    ],
    ['SpecializedRule',
      'overscore', 'default', 'brief',
      '[t] "mod oben"; [n] children/*[1]; [t] "mit"; [n] children/*[2]'
    ],
    ['SpecializedRule',
      'overscore', 'brief', 'sbrief'],

    ['Rule',
      'double-overscore', 'default',
      '[t] "modifiziert oben oben"; [n] children/*[1]; [t] "mit";' +
     ' [n] children/*[2]',
      'self::overscore', 'children/*[2][@role="overaccent"]',
      'name(children/*[1])="overscore"',
      'children/*[1]/children/*[2][@role="overaccent"]'
    ],
    ['SpecializedRule',
      'double-overscore', 'default', 'brief',
      '[t] "mod oben oben"; [n] children/*[1]; [t] "mit"; [n] children/*[2]'
    ],
    ['SpecializedRule',
      'double-overscore', 'brief', 'sbrief'],

    ['Rule',
      'underscore', 'default',
      '[t] "modifiziert unten"; [n] children/*[1]; [t] "mit";' +
     ' [n] children/*[2]',
      'self::underscore', 'children/*[2][@role="underaccent"]'
    ],
    ['SpecializedRule',
      'underscore', 'default', 'brief',
      '[t] "mod unten"; [n] children/*[1]; [t] "mit"; [n] children/*[2]'
    ],
    ['SpecializedRule',
      'underscore', 'brief', 'sbrief'],

    ['Rule',
      'double-underscore', 'default',
      '[t] "modifiziert unten unten"; [n] children/*[1]; [t] "mit";' +
     ' [n] children/*[2]',
      'self::underscore', 'children/*[2][@role="underaccent"]',
      'name(children/*[1])="underscore"',
      'children/*[1]/children/*[2][@role="underaccent"]'],
    ['SpecializedRule',
      'double-underscore', 'default', 'brief',
      '[t] "mod unten unten"; [n] children/*[1]; [t] "mit"; [n] children/*[2]'
    ],
    ['SpecializedRule',
      'double-underscore', 'brief', 'sbrief'],

    ['Rule',
      'overbar', 'default',
      '[n] children/*[1]; [t] "Überstrich"',
      'self::overscore',
      '@role="latinletter" or @role="greekletter" or @role="otherletter"',
      'children/*[2][@role="overaccent"]',   // redundancy
      'children/*[2][text()="\u00AF" or text()="\uFFE3" or text()="\uFF3F"' +
     ' or text()="\u005F" or text()="\u203E"]'
    ],

    ['Rule',
      'underbar', 'default',
      '[n] children/*[1]; [t] "Unterstrich"',
      'self::underscore',
      '@role="latinletter" or @role="greekletter" or @role="otherletter"',
      'children/*[2][@role="underaccent"]',   // redundancy
      'children/*[2][text()="\u00AF" or text()="\uFFE3" or text()="\uFF3F"' +
     ' or text()="\u005F" or text()="\u203E"]'
    ],

    ['Rule',
      'overtilde', 'default',
      '[n] children/*[1]; [t] "Tilde oben"',
      'self::overscore',
      'children/*[2][@role="overaccent"]',   // redundancy
      '@role="latinletter" or @role="greekletter" or @role="otherletter"',
      'children/*[2][text()="\u007E" or text()="\u02DC" or text()="\u223C"' +
     ' or text()="\uFF5E"]'
    ],

    ['Rule',
      'undertilde', 'default',
      '[n] children/*[1]; [t] "Tilde unten"',
      'self::underscore',
      '@role="latinletter" or @role="greekletter" or @role="otherletter"',
      'children/*[2][@role="underaccent"]',   // redundancy
      'children/*[2][text()="\u007E" or text()="\u02DC" or text()="\u223C"' +
     ' or text()="\uFF5E"]'
    ],

    // Layout Elements
    ['Rule',
      'matrix-fence', 'default',
      '[n] children/*[1];',
      'self::fenced', 'count(children/*)=1', 'name(children/*[1])="matrix"'],

    ['Rule',
      'matrix', 'default',
      '[t] "Anfang"; [t] count(children/*);  [t] "mal";' +
     '[t] count(children/*[1]/children/*); [t] "Matrize"; ' +
     '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile ");' +
     ' [t] "Ende Matrize"',
      'self::matrix'],
    ['Rule',
      'matrix', 'sbrief',
      '[t] count(children/*);  [t] "mal";' +
     '[t] count(children/*[1]/children/*); [t] "Matrize"; ' +
     '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile ");' +
     ' [t] "Ende Matrize"', 'self::matrix'],
    ['Aliases',
      'matrix', 'self::vector'],

    ['Rule',
      'matrix-row', 'default',
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Spalte");' +
     '[p] (pause: 200)',
      'self::row'],
    ['Rule',
      'row-with-label', 'default',
      '[t] "mit Bezeichner"; [n] content/*[1];' +
     ' [t] "Ende Bezeichner"(pause: 200); ' +
     '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Spalte")',
      'self::row', 'content'],
    ['Rule',
      'row-with-label', 'brief',
      '[t] "Bezeichner"; [n] content/*[1]; ' +
     '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Spalte")',
      'self::row', 'content'],
    ['SpecializedRule',
      'row-with-label', 'brief', 'sbrief'],
    ['Rule',
      'row-with-text-label', 'sbrief',
      '[t] "Bezeichner"; [t] CSFRemoveParens;' +
     '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Spalte")',
      'self::row', 'content', 'name(content/cell/children/*[1])="text"'],
    ['Rule',
      'empty-row', 'default',
      '[t] "leer"', 'self::row', 'count(children/*)=0'],

    ['Rule',
      'matrix-cell', 'default',
      '[n] children/*[1]; [p] (pause: 300)', 'self::cell'],

    ['Rule',
      'empty-cell', 'default',
      '[t] "leer"; [p] (pause: 300)', 'self::cell', 'count(children/*)=0'],


    ['Rule',
      'determinant', 'default',
      '[t] "Anfang"; [t] count(children/*);  [t] "mal";' +
     '[t] count(children/*[1]/children/*); [t] "Determinante";' +
     ' [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile ");' +
     ' [t] "Ende Determinante"',
      'self::matrix', '@role="determinant"'],
    ['SpecializedRule',
      'determinant', 'default', 'sbrief',
      '[t] count(children/*);  [t] "mal";' +
     '[t] count(children/*[1]/children/*); [t] "Determinante";' +
     ' [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile ");' +
     ' [t] "Ende Determinante"'],

    ['Rule',
      'determinant-simple', 'default',
      '[t] "Anfang"; [t] count(children/*);  [t] "mal";' +
     '[t] count(children/*[1]/children/*); [t] "Determinante";' +
     ' [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile",' +
     'grammar:simpleDet); [t] "Ende Determinante"',
      'self::matrix', '@role="determinant"', 'CQFdetIsSimple'],
    ['SpecializedRule',
      'determinant-simple', 'default', 'sbrief',
      '[t] count(children/*);  [t] "mal";' +
     '[t] count(children/*[1]/children/*); [t] "Determinante";' +
     ' [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile",' +
     'grammar:simpleDet); [t] "Ende Determinante"'],
    ['Rule',
      'row-simple', 'default',
      '[m] children/*;',
      'self::row', '@role="determinant"', 'contains(@grammar, "simpleDet")'],

    ['Rule',
      'layout', 'default', '[t] "Anfang Anordnung"; ' +
     '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile ");' +
     ' [t] "Ende Anordnung"', 'self::table'],
    ['Rule',
      'layout', 'sbrief', '[t] "Anordnung"; ' +
     '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile ");' +
     ' [t] "Ende Anordnung"', 'self::table'],

    ['Rule',
      'binomial', 'default',
      '[t] "Anfang Binomialkoeffizient"; [n] children/*[2]/children/*[1]; ' +
     '[t] "aus";  [n] children/*[1]/children/*[1];' +
     ' [t] "Ende Binomialkoeffizient"',
      'self::vector', '@role="binomial"'],
    ['Rule',
      'binomial', 'brief',
      '[t] "Anfang Binomial"; [n] children/*[2]/children/*[1]; ' +
     '[t] "aus";  [n] children/*[1]/children/*[1];' +
     ' [t] "Ende Binomial"',
      'self::vector', '@role="binomial"'],
    ['Rule',
      'binomial', 'sbrief',
      '[t] "Binomial"; [n] children/*[2]/children/*[1]; ' +
     '[t] "aus";  [n] children/*[1]/children/*[1];' +
     ' [t] "Ende Binomial"',
      'self::vector', '@role="binomial"'],

    ['Rule',
      'cases', 'default', '[t] "Anfang Fallunterscheidung"; ' +
     '[t] "große"; [n] content/*[1];' +
     '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile ");' +
     ' [t] "Ende Fallunterscheidung"', 'self::cases'],
    ['Rule',
      'cases', 'brief', '[t] "Anfang Fälle"; ' +
     '[t] "große"; [n] content/*[1];' +
     '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile ");' +
     ' [t] "Ende Fälle"', 'self::cases'],
    ['Rule',
      'cases', 'sbrief', '[t] "Fälle"; ' +
     '[t] "große"; [n] content/*[1];' +
     '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Zeile ");' +
     ' [t] "Ende Fälle"', 'self::cases'],

    // Multiline rules.
    ['Aliases',
      'layout', 'self::multiline'],

    ['Rule',
      'line', 'default',
      '[m] children/*', 'self::line'],
    ['Rule',
      'line-with-label', 'default',
      '[t] "mit Bezeichner"; [n] content/*[1]; ' +
     '[t] "Ende Bezeichner" (pause: 200); [m] children/*',
      'self::line', 'content'],
    ['SpecializedRule',
      'line-with-label', 'default', 'brief',
      '[t] "Bezeichner"; [n] content/*[1] (pause: 200); [m] children/*'],
    ['SpecializedRule',
      'line-with-label', 'brief', 'sbrief'],
    ['Rule',
      'line-with-text-label', 'sbrief',
      '[t] "Bezeichner"; [t] CSFRemoveParens; [m] children/*',
      'self::line', 'content', 'name(content/cell/children/*[1])="text"'],
    ['Rule',
      'empty-line', 'default',
      '[t] "leer"', 'self::line', 'count(children/*)=0', 'not(content)'],
    ['SpecializedRule', 'empty-line', 'default', 'brief'],
    ['SpecializedRule', 'empty-line', 'brief', 'sbrief'],
    ['Rule',
      'empty-line-with-label', 'default',
      '[t] "mit Bezeichner"; [n] content/*[1]; ' +
     '[t] "Ende Bezeichner"(pause: 200); [t] "leer"',
      'self::line', 'count(children/*)=0', 'content'],
    ['SpecializedRule',
      'empty-line-with-label', 'default', 'brief',
      '[t] "Bezeichner"; [n] content/*[1] (pause: 200); [t] "leer"'],
    ['SpecializedRule',
      'empty-line-with-label', 'brief', 'sbrief'],

    // Enclose
    ['Rule',
      'enclose', 'default',
      '[t] "Anfang Umschließung"; [t] @role (grammar:localEnclose);' +
     ' [n] children/*[1]; [t] "Ende Umschließung"',
      'self::enclose'],
    ['Aliases',
      'overbar', 'self::enclose', '@role="top"'],
    ['Aliases',
      'underbar', 'self::enclose', '@role="bottom"'],
    ['Rule',
      'leftbar', 'default',
      '[t] "senkrechter Strich"; [n] children/*[1]',
      'self::enclose', '@role="left"'],
    ['Rule',
      'rightbar', 'default',
      '[n] children/*[1]; [t] "senkrechter Strich"',
      'self::enclose', '@role="right"'],

    // Crossout
    ['Rule',
      'crossout', 'default',
      '[t] "durchgestrichen"; [n] children/*[1]; [t] "Ende duchgestrichen"',
      'self::enclose', '@role="updiagonalstrike" or' +
     ' @role="downdiagonalstrike" or @role="horizontalstrike"'],
    ['Rule',
      'cancel', 'default',
      '[t] "durchgestrichen"; [n] children/*[1]/children/*[1]; [t] "mit";' +
     ' [n] children/*[2]; [t] "Ende duchgestrichen"',
      'self::overscore', '@role="updiagonalstrike" or' +
     ' @role="downdiagonalstrike" or @role="horizontalstrike"'],
    ['SpecializedRule',
      'cancel', 'default', 'brief'],
    ['SpecializedRule',
      'cancel', 'default', 'sbrief'],
    ['Aliases', 'cancel',
      'self::underscore', '@role="updiagonalstrike" or' +
     ' @role="downdiagonalstrike" or @role="horizontalstrike"'],
    ['Rule',
      'cancel-reverse', 'default',
      '[t] "durchgestrichen"; [n] children/*[2]/children/*[1]; [t] "mit";' +
     ' [n] children/*[1]; [t] "Ende duchgestrichen"',
      'self::overscore', 'name(children/*[2])="enclose"',
      'children/*[2][@role="updiagonalstrike" or' +
     ' @role="downdiagonalstrike" or @role="horizontalstrike"]'],
    ['SpecializedRule',
      'cancel-reverse', 'default', 'brief'],
    ['SpecializedRule',
      'cancel-reverse', 'default', 'sbrief'],
    ['Aliases', 'cancel-reverse',
      'self::underscore', 'name(children/*[2])="enclose"',
      'children/*[2][@role="updiagonalstrike" or' +
     ' @role="downdiagonalstrike" or @role="horizontalstrike"]'],

    // Rules for punctuated expressions.
    ['Rule',
      'end-punct', 'default',
      '[m] children/*',
      'self::punctuated', '@role="endpunct"'],

    ['Rule',
      'start-punct', 'default',
      '[n] content/*[1]; [m] children/*[position()>1]',
      'self::punctuated', '@role="startpunct"'],

    ['Rule',
      'integral-punct', 'default',
      '[n] children/*[1]; [n] children/*[3]',
      'self::punctuated', '@role="integral"'],

    ['Rule',
      'punctuated', 'default',
      '[m] children/*',
      'self::punctuated'],

    // Unit rules.
    ['Rule',
      'unit', 'default',
      '[t] text() (grammar:annotation="unit":translate:plural)',
      'self::identifier', '@role="unit"'],
    ['Rule',
      'unit-square', 'default',
      '[t] "Quadrat"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'children/*[2][text()=2]',
      'name(children/*[1])="identifier"'],

    ['Rule',
      'unit-cubic', 'default',
      '[t] "Kubik"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'children/*[2][text()=3]',
      'name(children/*[1])="identifier"'],
    ['Rule',
      'reciprocal', 'default',
      '[n] children/*[1]; [t] "invers"',
      'self::superscript', '@role="unit"', 'name(children/*[1])="identifier"',
      'name(children/*[2])="prefixop"', 'children/*[2][@role="negative"]',
      'children/*[2]/children/*[1][text()=1]',
      'count(preceding-sibling::*)=0 or preceding-sibling::*[@role!="unit"]'],
    ['Rule',
      'reciprocal', 'default',
      '[t] "pro"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'name(children/*[1])="identifier"',
      'name(children/*[2])="prefixop"', 'children/*[2][@role="negative"]',
      'children/*[2]/children/*[1][text()=1]',
      'preceding-sibling::*[@role="unit"]'],
    ['Rule',
      'unit-combine', 'default',
      '[m] children/*', 'self::infixop', '@role="unit"'],
    ['Rule',
      'unit-divide', 'default',
      '[n] children/*[1]; [t] "pro"; [n] children/*[2]',
      'self::fraction', '@role="unit"'],

    ['Rule',
      'inference', 'default',
      '[t] "Schlussregel"; [m] content/*; [t] "mit Folgerung"; ' +
     '[n] children/*[1]; [t] "aus"; [t] count(children/*[2]/children/*); ' +
     '[t] "Prämissen"',
      'self::inference'],
    ['Rule',
      'inference', 'default',
      '[t] "Schlussregel"; ; [m] content/*; [t] "mit Folgerung"; ' +
     '[n] children/*[1]; [t] "aus"; [t] count(children/*[2]/children/*); ' +
     '[t] "Prämisse"',
      'self::inference', 'count(children/*[2]/children/*)<2'],
    ['Rule',
      'premise', 'default',
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Prämisse ");',
      'self::premises'],
    ['Rule',
      'conclusion', 'default',
      '[n] children/*[1]', 'self::conclusion'],
    ['Rule',
      'label', 'default',
      '[t] "Regel"; [n] children/*[1]',
      'self::rulelabel'],
    ['Rule',
      'axiom', 'default',
      '[t] "Axiom"; [m] children/*[1];',
      'self::inference', '@role="axiom"'],
    ['Rule',
      'axiom', 'default',
      '[t] "leeres Axiom";',
      'self::empty', '@role="axiom"']
  ],
  initialize: [sre.MathspeakUtil.generateTensorRules]
};
