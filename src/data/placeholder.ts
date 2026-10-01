// fake data so the ui has something to show, delete once the api has listing/category endpoints
import type { Category, Listing } from '@shared/types'

export const categories: Category[] = [
  { slug: 'cleaning', name: 'Cleaning' },
  // { slug: 'repairs', name: 'Repairs & Handyman' },
  // { slug: 'moving', name: 'Moving & Transport' },
  // { slug: 'garden', name: 'Garden' },
  // { slug: 'tutoring', name: 'Tutoring' },
  // { slug: 'it', name: 'IT & Computers' },
  // { slug: 'pets', name: 'Pet care' },
  // { slug: 'other', name: 'Other' },
]

export const listings: Listing[] = [
  { id: 1, title: 'Apartment cleaning, same day', description: 'Regular or one-off cleaning of flats and small houses. Own supplies, references available.', category: 'cleaning', city: 'Bratislava', price: '20 €/h', postedAt: 'Today', author: 'Jana', featured: true },
  { id: 2, title: 'Fix leaking tap / small plumbing jobs', description: 'Taps, siphons, toilet tanks, small leaks. Usually can come the same or next day.', category: 'repairs', city: 'Košice', price: '30 €', postedAt: 'Today', author: 'Peter' },
  // { id: 3, title: 'Moving help with van (3.5 t)', description: 'Two people + van. Flats, offices, single furniture pieces. Around the region and further.', category: 'moving', city: 'Nitra', price: '40 €/h', postedAt: 'Yesterday', author: 'Marek' },
  // { id: 4, title: 'Math tutoring for high school students', description: 'Preparation for maturita and university entrance exams. Online or in person.', category: 'tutoring', city: 'Žilina', price: '15 €/h', postedAt: '29.9.', author: 'Lucia' },
  // { id: 5, title: 'Lawn mowing and hedge trimming', description: 'Own equipment, green waste taken away. Seasonal contracts possible.', category: 'garden', city: 'Trnava', price: 'Negotiable', postedAt: '29.9.', author: 'Jozef' },
  // { id: 6, title: 'PC repair, Windows reinstall, virus removal', description: 'Laptops and desktops, data backup, upgrades. Can come to you.', category: 'it', city: 'Bratislava', price: 'from 25 €', postedAt: '28.9.', author: 'Tomáš', featured: true },
  // { id: 7, title: 'Dog walking & pet sitting', description: 'Walks morning/evening, feeding while you are on holiday. Experience with large breeds.', category: 'pets', city: 'Banská Bystrica', price: '8 € / walk', postedAt: '27.9.', author: 'Katka' },
  // { id: 8, title: 'Furniture assembly (IKEA etc.)', description: 'Wardrobes, beds, kitchens. Fast and tidy, own tools.', category: 'repairs', city: 'Prešov', price: '18 €/h', postedAt: '26.9.', author: 'Michal' },
  // { id: 9, title: 'Window cleaning, including frames', description: 'Flats and family houses, also high windows. Weekends possible.', category: 'cleaning', city: 'Trenčín', price: '3 € / window', postedAt: '25.9.', author: 'Eva' },
  // { id: 10, title: 'English lessons for beginners', description: 'Conversation-focused lessons for adults. First lesson free.', category: 'tutoring', city: 'Bratislava', price: '12 €/h', postedAt: '24.9.', author: 'Anna' },
]

export function getCategoryName(slug: string): string {
  return categories.find((c) => c.slug === slug)?.name ?? slug
}
