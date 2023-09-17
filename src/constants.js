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

// --- Activities --- //

export const optionsList = [
   { value: 1, name: 'Coding' },
   { value: 2, name: 'Reading' },
   { value: 3, name: 'Training' }
]