

// Case: Expected structure with a clearly defined, unambigous flow
// -> no parallel flows and operations to resolve on front-end


// Types… ( = XML/React component), types… ( = JS expr)
import { typesStd, Str, modifyExpr } from 'text2json/expressions'
import { OneOf } from 'text2json/logic'


export { tx2context, tx2json }


const stringsDelimited_ = modifyExpr(typesStd.stringsDelimited, '.delimiters', [";"])


// Merger of two concepts here [in-dev]: "text2json" parser package and "jsonion" shorthand template
const tx2context = () => { return {

		Filesystem: { // Possibility of data in tree structure of folders and files or in flat strings
			Alias: 'fs',
			deduct: true, // Expressions are naturally evaluated one-by-one,
										// excluded from further evaluation once matched

			'.This.Y -> Year': [typesStd.Year, typesStd.dateTime],
			'.This.M -> Month': '.ExprChains .datetime.Month',

			Folders: { 
				reverseThis: true, // … sometimes code just reads nicer when order is reversed (makes sense if deduct==true)

				'/categories/ -> tags #...This': [stringsDelimited_], // each array item gets pushed into 'context.fs.tags'

				'/(.*) \((.*)\)/': { // reverse: false, // … already declared (reverseThis variable scope is limited)
					
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
				}
			}, // … for a given node in tree of folders, parser will maintain references until onFolderChange()
			File: {
				'.This.M -> Month': '.ExprChains .datetime.Month',
				'.This.Y -> Year': [typesStd.Year, typesStd.dateTime],
				'timestamp <- .This.M, .This.Y': [typesStd.timestamp],
				'/placeName/': [typesStd.string],
				'.This.createdAt -> createdAt': [typesStd.fileMeta.created],
				'.This.modifiedAt -> modifiedAt': [typesStd.fileMeta.modified],
				'/categories/ -> tags #...This': [stringsDelimited_]
			}
		},

		ExprChains: { // reusable rulechains for recurring patterns here …
			'datetime.Month': [typesStd.Month, typesStd.dateTime]
		}
	}
}


const tx2json = () => {

	return {

	}
}


const tx2 = () => {


	var filename = (
		<OneOf>

		</OneOf>
	)
}