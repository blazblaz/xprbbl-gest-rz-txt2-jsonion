/* 

	# Actions, possible in (broader) context of this package
	( an extensible dictionary, mapped with database collections later on )

*/

import { rhizome } from 'node-rhizome/types.actions'
import { extend } from 'node-rhizome/fn.util'

// This is a dictionary object, translating actionFn() to a schema field name
// … action types: with 'ed' (as 'actionNameString') ; 
const actions = () => { return extend(ActionsRz, {

	__suffix: { 
		EN_en: 'ed',	 // verbs with an irregular suffix are defined as { "{{verb}}": "{{suffix}}" }
		overlap: true, // Omit appending overlapping characters among verb and suffix definitions
	}

	gestureReflection: [
		'reflect', { 'cut': null }

 	__synonyms: {
 		'reflect': ['meditate']
 	}
}) }

// Actions, related to this package, possible within bounds of  online service
actions.platform = { stem: '+med', cut: '',
                     /*...*/ };

// Actions, requested from users by this package, which were made offline at another point in time
actions.offline = {};

// Actions, with which this package imports data from external, integrated online services
actions.imported = {};