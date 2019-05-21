# JSONIon, JSonIon, JSONion, jsonIon, jsOnion, jsOnIon

A shorthand syntax to change a JSON dataset's structure by a remapping schema... And possibly a meaningful wrapper to a parsing process

… Naming is consequence of a coincidentally fitting overlap, on a conceptual level presenting the process by a metaphor of ionized atoms (which carry parsing rules). JS ions enter a data structure and react with it, so that results can be gathered and mapped into a JSON data tree.



# Something relevant about JSON schema


## Tools

- json schema from json data generator (by inference): jsonschema.net
 (doesn't support oneOf, allOf ; work is lost when pressing [Tab] key in json editor)



---



## References to properties (by keys)

### Accessing a specific property within a document

 - #/properties/${propertyName}/items/properties/${propName}


### Externally

https://${domainName}/${linkToSchema}.json#


### Reusing properties through "definitions" object

```json

"definitions": {
	"propertyExample": { ... }
},
"properties": { 
	"referencedProperty": { "$ref": "#/definitions/propertyExample", ... }
}

```



---



### Special types of properties in JSON schema

oneOf, allOf, … (*whereas //comments contained further on aren't valid syntax*)





# Shorthand syntax of JSONIon

### Finding and modifying specific properties within a JSON data tree

Seeking for a property .{{propName}} in an array (#), nested in root prop .{{propertyName}} — swiftly renamed afterwards
```js

export const jsonIon = { // ".{{propertyName}} # .{{propName}}": { Rename: "{{renamedPropertyName}}" },

```


A referenceable object (defined with a temporary This: ...), to be found nested in an array list of z.B. status_updates from Facebook, with some self-explanatory operations applied. An operation to explain here is Schema, which is an inclusive opt-in list of properties ( = fields, sql en.) which will be mapped to output, whereas others will not (unless explicitly defined in another way).
```js

".{{propertyName}} #": {
	This: "post",
	Schema: ['timestamp', 'full_name', 'action', 'post', 'event_name', 'place_name'],

	".title": {
		Remove: true, // … operation is executed after Ions react, while finally mapping to JSON tree

		// Ions react with data state, if RegExp condition !false ( == true; works for one-liners)
	  '/(.*) shared an event./': { 
	    As: ['full_name'],
	    'post.action': 'event_shared'
	  },
	  '/(.*) was attending (.*) at (.*)./': {
	    As: ['full_name', 'event_name', 'place_name'],
	    'post.action': 'event_attending'
	  }
  }
},

```


### Setting (entangling) data state of newly established collections of properties

… upon previous example whole {{referencedObjectName}} is floating in a buffer. In next step this referenced object is mapped to a newly established collection (hereby a list of "events"). The two established types are merged under some circumstances. Looping through dataset, meanwhile a "text2json" dependency to "extractWords" with tries to populate a "histogram" array with words, their count and sources.
```

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


```



### Histogram of JSONIon function (from imaginary to reality)

Renaming property keys
```

Rename: 'lefthand',
RightHand: '.text2json # .word -> This.word'

```

Matching properties
```

setCollection, .find #: { // <- Corrections: one at a time ; each must appear in "brackets"

	'.*': { ...operationsOnMatch }, // Match any property within context
	

}

```



**Shortlist — **
- 