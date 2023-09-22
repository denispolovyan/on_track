// --- PAGES --- //

export const PAGE_TIMELINE = 'timeline'
export const PAGE_ACTIVITIES = 'activities'
export const PAGE_PROGRESS = 'progress'

// --- ICONS --- //

import { ClockIcon, ClipboardDocumentListIcon, ForwardIcon } from '@heroicons/vue/24/outline'

// --- PAGES & ICONS --- //

export const NAV_ITEMS = {
   [PAGE_TIMELINE]: ClockIcon,
   [PAGE_ACTIVITIES]: ForwardIcon,
   [PAGE_PROGRESS]: ClipboardDocumentListIcon
}

// --- Time --- //

export const TIME_LIST = [
   { value: 1, name: '0:15' },
   { value: 2, name: '0:20' },
   { value: 3, name: '0:30' }
]

// --- ACTIVITIES --- //

export const ACTIVITIES_LIST = [
   { value: 1, name: 'Coding' },
   { value: 2, name: 'Reading' },
   { value: 3, name: 'Training' }
]
// --- CONSTANTS --- //

export const HOURS_IN_DAY = 24
