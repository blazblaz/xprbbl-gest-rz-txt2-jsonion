

const exprDelimiters = {
	priority: {
		mdCode: {
			a: '```',
			z: '```'
		},
		mdCodeJSON: [	a: '```json' ],
		mdCodeJS: [	a: '```js' ],
		quotesJSON: {
			a: ['"', "'"],
			z: ['\"', "\'"]
		},
		jsObj: {
			a: '{',
			z: '}'
		},
		jsArr: {
			a: '[',
			z: ']'
		},
		jsComment_enclosing: {
			a: '/*',
			z: '*/'
		},
		jsComment_terminating: {
			a: '//',
			z: ['newLine']
		}
	},
	longTail: {}
}


const tok3n0bserver = ( 
	args
) => {

	tok3n.in( md("#"), ref ).

	return {
		// ...
	}
}