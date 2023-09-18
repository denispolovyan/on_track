// -- //

export function isNumber(value) {
   return typeof value == 'number'
}

// -- //

export function isString(value) {
   return typeof value == 'string'
}

// -- //

export function isNotNull(value) {
   return value || null
}

// -- //
export function isActivityValid(activity){
	return isString(activity) && isNotNull(activity)
}

// -- //

export function isOptionListValid(optionsList) {
   return optionsList.every(({ value, name }) => isNumber(value) && isString(name))
}

// -- //

export function isTimelineValid(timelineItem) {
   return isNumber(timelineItem.hour) 
}

// -- //

export function isBackgroundClassValid(backgroundClass) {
   return isString(backgroundClass) && isNotNull(backgroundClass)
}