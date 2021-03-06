// Copyright 2016 Volker Sorge
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
 * @fileoverview Combines all implemented and available speech rules.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SpeechRuleStores');

goog.require('sre.BaseRuleStore');
goog.require('sre.ClearspeakFrench');
goog.require('sre.ClearspeakGerman');
goog.require('sre.ClearspeakRules');
goog.require('sre.EmacspeakRules');
goog.require('sre.MathspeakFrench');
goog.require('sre.MathspeakGerman');
goog.require('sre.MathspeakRules');
goog.require('sre.MathspeakSpanish');
goog.require('sre.NemethRules');
goog.require('sre.PrefixFrench');
goog.require('sre.PrefixGerman');
goog.require('sre.PrefixRules');
goog.require('sre.PrefixSpanish');
goog.require('sre.SemanticTreeRules');
goog.require('sre.SummaryFrench');
goog.require('sre.SummaryGerman');
goog.require('sre.SummaryRules');
goog.require('sre.SummarySpanish');


/**
 * @type {!Object.<sre.BaseRuleStore>}
 * @private
 */
sre.SpeechRuleStores.RULE_SETS_ = {
  'SemanticTreeRules': sre.SemanticTreeRules,
  'MathspeakFrench': sre.MathspeakFrench,
  'MathspeakGerman': sre.MathspeakGerman,
  'MathspeakRules': sre.MathspeakRules,
  'MathspeakSpanish': sre.MathspeakSpanish,
  'NemethRules': sre.NemethRules,
  'ClearspeakFrench': sre.ClearspeakFrench,
  'ClearspeakGerman': sre.ClearspeakGerman,
  'ClearspeakRules': sre.ClearspeakRules,
  'EmacspeakRules': sre.EmacspeakRules,
  'SummaryFrench': sre.SummaryFrench,
  'SummaryGerman': sre.SummaryGerman,
  'SummaryRules': sre.SummaryRules,
  'SummarySpanish': sre.SummarySpanish,
  'PrefixFrench': sre.PrefixFrench,
  'PrefixGerman': sre.PrefixGerman,
  'PrefixRules': sre.PrefixRules,
  'PrefixSpanish': sre.PrefixSpanish
};


/**
 * @return {Array.<string>} A list of all rule set names.
 */
sre.SpeechRuleStores.availableSets = function() {
  return Object.keys(sre.SpeechRuleStores.RULE_SETS_);
};


/**
 * Retrieves a constructor of a valid rule set.
 * @param {string} name The name of the rule set.
 * @return {sre.BaseRuleStore} The constructor of the rule store.
 */
sre.SpeechRuleStores.getConstructor = function(name) {
  var set = sre.SpeechRuleStores.RULE_SETS_[name];
  return set ? set : null;
};
