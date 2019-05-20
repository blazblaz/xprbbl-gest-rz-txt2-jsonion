
const exprDelimiters_default = {
	newLine: ['\r\n','\n'],
	dash: ['-', '–', '—']
}

const runnerInit = (document, trie, delimiters = exprDelimiters_default, tyt) => {

	// Gotta work more, me N you

	var focus, inFocus = {},
		mapTokens = {},
		trie_copy = {} // of testTrie = {}

	focus = document.slice(0, 4), text = text.slice(2) // First step outside of the loop — why not?
	while( text = text.slice(2) ){

		focus = focus.slice(2,2) + text.slice(2)
	}
}


const lookAround = (tok3ns, exprTrie, curRef, steps = ['-1', '1']) => {

	// dbLight object contains reduced node lists, while runner is parsing...
	// 
	// 'curIndex': ['N0', 'N2']
	// 'trie'
	/* 		[exprName]: {
					
				} 
	*/
	// 'tree'
	//		
	// [index-l]:
	// 		[expr]
	// 		

	return {
		// ...
	}
}


const minBufferLength_calculate = function (delimiters){

	var obj = (typeof this === 'object' && this.length > 1) ? this : obj,
		expr_maxLen = 0,
		prefix_maxLen = 0, suffix_maxLen = 0



}