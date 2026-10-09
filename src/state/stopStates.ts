//this is the vue state + logic for stops (components that show stops access this)
import { ref } from 'vue'
import type { Stop, StopInput } from '@shared/types'
import { fetchStops, addStop, deleteStop } from '@/api/stopsApi'

const stops = ref<Stop[]>([])
const message = ref('') // feedback line when loading fails
const loading = ref(false)

const newStop = ref<StopInput>(emptyStop()) // what the add stop form is filling in
const addMessage = ref('') // feedback line for the add stop form

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

function emptyStop(): StopInput {
  return {
    name: '', lines: '', is_transfer: false, transfer_lines: null,
    x: 0, y: 0,
    wheelchair_accessible: false, has_shelter: false, has_bench: false,
    has_ticket_machine: false, has_display: false,
    image_url: null,
  }
}

async function addNewStop() {
  try {
    await addStop(newStop.value)
    addMessage.value = "stop added"
    newStop.value = emptyStop()
    await loadStops() // so the list shows the new stop
  } catch (err) {
    console.error("failed to add stop: ", err)
    addMessage.value = "could not add stop"
  }
}

async function deleteTargetedStop(id: number) {
  try {
    await deleteStop(id)
    await loadStops() // so the list shows the new stop
  } catch (err) {
    console.error("failed to delete stop: ", err)
    addMessage.value = "could not delete stop"
  }
}

async function updateStop(id: number){
  try {
    await updateStop(id)
    await loadStops() // so the list shows the new stop
  } catch (err) {
    console.error("failed to delete stop: ", err)
    addMessage.value = "could not delete stop"
  }
}

//esier exports of functions and variables
export function useStopState() {
  return { stops, loading, message, loadStops, newStop, addMessage, addNewStop, deleteTargetedStop, updateStop }
}
