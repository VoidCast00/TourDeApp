//this is the vue state + logic for stops (components that show stops access this)
import { ref } from 'vue'
import type { Stop } from '@shared/types'
import { fetchStops } from '@/api/stopsApi'

const stops = ref<Stop[]>([])
const message = ref('') // feedback line when loading fails
const loading = ref(false)

async function loadStops() {
  loading.value = true
  try {
    stops.value = await fetchStops()
    message.value = ''
  } catch (err) {
    console.error("failed to get stops: ", err)
    message.value = "could not load stops"
  }
  loading.value = false
}

//esier exports of functions and variables
export function useStopState() {
  return { stops, loading, message, loadStops }
}
