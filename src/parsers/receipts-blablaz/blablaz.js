// 	Inputs: receipts as monthly text transcripts as an array of files' pathnames
//	Output: JSON array of: "receipts", "providers", "resources" (instead of distinguished goods and services)
//
//  Test (as if script was run from just outside the 'parsers' folder):	
/*

import { exportJSON } from './parsers'
import { parseFilesIn } from './parsers/receipts-blablaz'
exportJSON( parseFilesIn('./parsers/receipts-blablaz/(11.'18) [mall] Mercator.txt') )

*/

import { createArrayWithRegex } from '../index'

const regexParentheses = new RegExp('/\(([^)]+)\)/')
const regexSquareBrackets = new RegExp('\[(.*?)\]')
const regexTrim = new RegExp('[^ ].*[^ ]')

const regexResources = new RegExp('(?:^— \[.*(\s+\+.*)+\s.*|^— \[.*)')
const regexReceipts = new RegExp('^— \(.*')


const createTemporaryId = (string) => {
  return string
}

const outputDatasets = {
  createObjects: {
    '1': new RegExp('/^(.*(?=d\.d|d\.o\.o|s\.p|d\.n\.o|k\.d|z\.o\.o).*\.), (.*)/m'),
    '2': new RegExp('/^⁰ (.*(?=d\.d|d\.o\.o|s\.p|d\.n\.o|k\.d|z\.o\.o).*\.), (.*): .* *$/gm')
    // "longform" from a screenshot 
    // ^(.*(?=\, d\.d\.|\, d\.o\.o|\, s\.p\.|\, d\.n\.o\.|\, k\.d\.).*\.), (.*)
  },
  service_providers: {
    createArray: true,
    createTemporaryId: 1,
    company: 1,
    city: { '2': [ 
      new RegExp('/^.*, (.*) *$/img'),    // take the last word
      new RegExp('/^.*[0-9]* (.*) *$/m')  // strip postal code
    ] },
    address: 2
  },
  places: {
    createObjects: [
      { regex: new RegExp('/^((?:¹|²|³|⁴|⁵|⁶|⁷|⁸|⁹)) (.*) *$/gm'),
        createTemporaryId: 1 },
      { regex: new RegExp('/^⁰ .*: (.*) *$/gm'),
        delimiters: ['|', ';', '⋅', '·', '·', '・'],
        createTemporaryId:  }
    ],
    createTemporaryId: {
      '1': 1,
      '2': new RegExp('/^((?:¹|²|³|⁴|⁵|⁶|⁷|⁸|⁹)) .* *$/gm')
    },
    company_id: { 'service_providers.createTemporaryId': 1 },
    name: {
      '2': 
    },
    address: null
  },
  receipts: {

  },
  resources: []
}



//
//  Folder structure*
/*
— 	Root folder
	- Year number (full number, since AD): contains single files
*/


import _ from 'lodash'
import {  diff_match_patch as dmp } from 'diff_match_patch' /*

          To compare two strings for similarity:

          dmp.levenshtein( dmp.diff_main( diff_main(text1, text2) ) )
*/


//
//  Form of a single file (which contains a month of receipts)
/*	

		Filename: "(11.'18) [pub, restaurant] Place (disambiguation).txt"
		— "(First parentheses)": Month and year of transcript
			— "First number.": [Number of month in a year].
			— "'Second number": '[Number of a year after 2000 (20 omitted / 2000 substracted)]
		— "[square_brackets]": Types of services provided, comma separated tags (in camelCase or low_dash)
		— "What isn't enclosed in any brackets": Name of place
		— "(Second parentheses)" optional: Declaration of disambiguation (eg. city, )

*/


const regexParentheses = new RegExp('/\(([^)]+)\)/')
/* Breakdown:

    \( : match an opening parentheses
    ( : begin capturing group
    [^)]+: match one or more non ) characters
    ) : end capturing group
    \) : match closing parentheses
*/
const regexSquareBrackets = new RegExp('\[(.*?)\]') /*
if not (?:\[(\w)+\s+\]|\[\s(\w)+\]|\[(\w)\])  // with specific cases
and not \[([^]]+)\]                           // where new lines in square brackets are accepted, too
*/

const regexTrim = new RegExp('[^ ].*[^ ]') // trim empty space on beginning and end of a string


//
//  Content of file
/*  

    Service provider: first line
    & Stores & address: line starts with "¹", "²", "³", ...

    Resources used: line starts with "— [", 
                    followed with [item_quantity] item_description: price_per_stores¹²³

    Receipts: line starts with 
*/

const 

export const parseReceiptFiles = (paths = {}) => {


}

export const parseSampleFile = () => {

}





const outputDatasets = {
  receipts: [],
  providers: [],
  resources: []
}