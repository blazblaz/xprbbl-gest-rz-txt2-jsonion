## Why use lowdb in the first place? Because …

- it structures a simple interface with a few adapters ready to use in-browser and in Node.js (in-memory, localStorage, fileSystem) — so besides using it in-browser (in-memory for testing with smaller datasets and with localStorage for production) initial development on server-side is made easier with small .json database files and in-memory (though not production-ready)

- it is easy to extend, using db._.mixin('functionName', () => {...}) of lodash to create custom functions to transform (manipulate) data with, and writing custom adapters to get() and set() data with to databases (as is apparent by a relatively large number of forks on [GitHub]( https://www.github.com/typicode/lowdb))


## List of optimizations — to improve efficiency (imagined)

- Larger task at hand: a loop, wrapping the default sort function, capable of processing multidimensional arrays (that lodash can handle well), giving possibility to run other data transformations in the same loop — without the limitation or necessity to loop through same data list multiple times, as is usually the case with chained functions

```js
array.sort( (a, b) => { return (a > b) } )  // combinatorics will tell you how many loops are necessary to sort an array of N items
array.sort( (a, b) => { return (1 == 1) } ) // you would notice that number of loops equals number of items in array

// Another set of functions sorts Object keys, something like ...
/*
var data = {...someDataObject}
Object.keys(data).sort().forEach(function(v, i) { console.log(v, data[v]); });
*/
```

- Functions to include in sort() loop (using lowdash as reference)
    - _.find(arrayObject, { key: { match: 'value' } },
    - _.filter( arrObj, (item) => { return item.active }, {...rules} )
    - _.merge( obj1, obj2¸....longtailOfObjects )
    

### Easier option: Extend or modify { _ } 'lodash' package

- Lodash's _.sortBy algorithm implemented as a wrapper function, which applies operations to particular data keys while looping to extract given ['key', 's']

	-> 	with additional parameter _.operationMixin({egMergeObj}, {intoObj}, sort: 'asc')
        … Is this possible? Possibly requires writing functions anew

        [A "forbidden" article covering main ways of extending lodash](https://www.bennadel.com/blog/2845-the-philosophy-of-extending-lodash-in-javascript.htm)
          
- Lodash can be loaded partially (function as a distinct package), without the complete ~65kb (lodash-core) package... However, the _.fn() wrapper is dismantled and some functionalities, such as _.chain(), _.


### Option: Modify 'coseq' package as an alternative to lodash' _.chain().fn() model

- Instead of looping through array with each function in chain, set a model of necessary, compatible operations and run multiple in less consequtive loops
- There's more work to be done
