

const tyt = ( args ) => {

  var microtime = (
        typeof args.t !== 'undefined' && 
        !isNaN(args.t) && args.t.toString().indexOf('.') != -1
      ) ? args.t
        : process.hrtime()[0] * 1000000 + process.hrtime()[1] / 1000,

    { tree, package, fn, ref } = args

  // 

  return {
    id: package,
    t: microtime,
    ty: tree
  }
}


const refToDeep = ( args ) => {

  var { into, ref } = args


}


const writeToTree( 
  tree = {}, ref = 'ROOT', mergeDataNode = {} 
){

  // Tree reference
  ref = ( !tree.length() ) ? ref = 'ROOT' : ref


  if( ref == 'ROOT' ){

    tree[]
  } else {


  }


  return {

  }
}


//
// ${parserPackageName} - tree root
// - Registered function -> tree node ID
//  - loops / steps ; characters parsed
//