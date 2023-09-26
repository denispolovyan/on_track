// -- // ++

export function isNumber(value) {
   return typeof value == 'number'
}

// -- // ++

export function isString(value) {
   return typeof value === 'string'
}

// -- // ++

export function isNotNull(value) {
   return value || null
}

// -- // ++

export function isActivityValid(activity) {
   return isString(activity) && isNotNull(activity)
}

// -- // ++

export function isOptionListValid(optionsList) {
   return optionsList.every(({ value, name }) => isNumber(value) && isString(name))
}

// -- // ++

export function isBackgroundClassValid(backgroundClass) {
   return isString(backgroundClass) && isNotNull(backgroundClass)
}

// -- // ++

export function isPlaceholderValid(placeholder) {
   return isStringNotNumber(placeholder) && isNotNull(placeholder)
}

// -- // ++

export function isInputValueValid(input) {
   return isString(input) && isNotNull(input)
}

// -- // ++

export function isStringNotNumber(value) {
   return !Number(value) && isNotNull(value)
}

// -- // ++

export function isIdValid(value) {
   return isNumber(value)
}

// -- // ++

export function isTaskValid(value) {
   return isNumber(value.id) && isNumber(value.time) && isNumber(value.activity)
}

// -- // ++

export function isTimelineListValid(value) {
   return value.every(({ hour, activity }) => isNumber(hour) && isNumber(activity))
}

// -- // ++

export function isSelectedActivityValid({ hour, activity }) {
   return isNumber(hour) && isNumber(activity)
}

// -- // ++

export function isTasksValid(value) {
   return value.every(
      ({ activity, time, id }) => isNumber(activity) && isNumber(time) && isNumber(id)
   )
}

// -- // ++

export function isActivitiesValid(value) {
   return value.every(({ value, name }) => isNumber(value) && isString(name))
}

// -- // ++

export function isActivityTimesValid(value) {
   return value.every(({ name, value }) => isNumber(value) && isString(name))
}
