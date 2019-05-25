//
// Package, devoted to readable remapping of JS/JSON objects


import { coreRunner, generateExprTrie, parseExpr } from 'tx2json-core' /*

Functionable JS object keys (& patterns thereof), contained and processed by tx2json-core:

	… Are (probably) bound to a media type of JSON: json.{{furtherKeys}} …

 -	untouched (remain as they are)
 		Alias, deduct, Rename, As
 ->	transformed to ..

 		CloneProp instruction key & ...
		- Write to TX storage supplied to tx2json as obj.key: `.This.${key} -> key`
		- Write to temporary/contextual TX storage object (This): `.${key} -> This.${new}`
		… right-to-left variation: `${new} <- .${key}`

 -	Functional […] keys, contained by tx2json-core and processed by jSonion
 	( by necessity within process, before ```js return {...} ``` )

 		parseExpr() remapped, bound with As instruction
		- '/categories/ -> tags #...This': [expressionsList]:
			-> somewhere in Trie of Expression Chains
				{ 
					`/{{InlineRegexValidSequence}}/`: { ...RightOnTrie },
					e: [expressionsStart], // Start of matching some expressions
					$: [
						'{{End}}', 'of', 'some', '{{Expressions}}',
						
					],
					...andPossiblySomeMoreObjectTypes
				}
		
*/


export default jSonion


// Transforms JS objects to JSON
const jSonion = () => { return {

// Abbreviated from (relevant types of expressions):
// - ./json-schema with JSONIon.md
// - ../tx2receipts/index.js
/*
	'.This.Y -> Year': [...customParsingDefinions],
	Rename: 'lefthand',
	RightHand: '.text2json # .word -> This.word'
	reverseThis: true || false,
	'/categories/ -> tags #...This': [...customExpressionsArray]

	'/(.*) \((.*)\)/': {
		Expr: [stringsDelimited_],
		As: ['This.tag_s', 'This.subcategories'],

		'.This.subcategories # -> tags #': { // for each subcategory ...
			'tag': 'This.value', 				// value of current This.subcategories item
			'subCatOf': ['This.tag_s']	// all tags preceeding parentheses
		},

		'.This.tag_s # -> This.tag': { // for each tag ...
			'tags #': {
				'tag': 'This.tag'
			}
		}
	},


	".{{propertyName}} #": { 
		Rename: "{{renamedPropertyName}}",
		This: "post",
		Schema: ['timestamp', 'full_name', 'action', 'post', 'event_name', 'place_name'],
		".title": {
			Remove: true,
		  '/(.*) was attending (.*) at (.*)./': {
		    As: ['full_name', 'event_name', 'place_name'],
		    'post.action': 'event_attending'
		  }
		}
	},

	'histogram #count': {
		This: 'word',
	  '.*': { // match any property, independent of depth in tree/onion (when unbound with a This type)
	    ReactTrie: 'text2json/extractWords',
	    Schema: [	'.text2json # .word -> word.word' ], // … short-hand rename ( [...array] omittable)
		  'word.sources # This': [
		  	'',
		  	'.text2json # .index-l -> This.L',
		  	'.text2json # .index-r -> This.R'
		  ]
	  },
	  CountOf: '.text2json # .word -> #count.word',
	  SortDesc: '#count.word'
	},

	'histogram #count': {
		This: 'word',
	  '.*': { // match any property, independent of depth in tree/onion (when unbound with a This type)
	    ReactTrie: 'text2json/extractWords',
	    Schema: [	'.text2json # .word -> word.word' ], // … short-hand rename ( [...array] omittable)
		  'word.sources # This': [
		  	'.text2json # .index-l -> This.L',
		  	'.text2json # .index-r -> This.R'
		  ]
	  },
	  CountOf: '.text2json # .word -> #count.word',
	  SortDesc: '#count.word'
	},

	"events #": {
	  This: 'event',
	  If: 'post.action == ("event_attending" || "event_shared" || ...)', // general mapping conditions

	  Types: { // … conditions to further classify (first off, general mapping conditions apply)
	    "LeapSecond_18-19": [ // z.B.
	      'post.timestamp < 1561939201 && ',		// JS conditions supplied in parts for readability
	      'post.timestamp > /153[04]{3}+3199/',	// RegExp call shorthand (playing combinatorics here)
	      {
	      	// Set some values for this specific type of This 'event'
	      	'This.title': "Graph: Leap second of '18 - '19",
	      	'event.timeframe': { from: 1561939201, to: 1530403199 }
	      }
	    ],
	    "MatchingSuffixType": [
	    	... // Oh, character to letter rhymes are not readily defined
	    ],
	    Merge: {
	    	"LeapSecond_18-19 <- SuffixType": [
	    		' == && (',
	    		'=> || <=',
	    		') && (',
	    		' < || > )'
	    	]
	    }
	  }
	},

	'.This.M -> Month': '.ExprChains .datetime.Month',

	ExprChains: { // reusable rulechains for recurring patterns here …
		'datetime.Month': [typesStd.Month, typesStd.dateTime]
	}
	*/
} }