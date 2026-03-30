import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './authStore'
import roomsData from '@/data/rooms.json'

export interface Room {
    id: string
    name: string
    description: string
    members: string[]
    createdAt: string
}

export const useRoomStore = defineStore('rooms', () => {
    const rooms = ref<Room[]>([...roomsData])
    const activeRoomId = ref<string | null>(null)

    const activeRoom = computed(() => {
        if (!activeRoomId.value) return null
        return rooms.value.find((r) => r.id === activeRoomId.value) ?? null
    })

    const getRoomById = computed(() => {
        return (id: string) => rooms.value.find((r) => r.id === id) ?? null
    })

    const sortedRooms = computed(() => {
        return [...rooms.value].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
    })

    function setActiveRoom(roomId: string | null) {
        activeRoomId.value = roomId
    }

    function createRoom(name: string, description: string = '') {
        const authStore = useAuthStore()
        const members = authStore.user ? [authStore.user.id] : []

        const newRoom: Room = {
            id: `room-${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
            name: name.trim(),
            description: description.trim(),
            members,
            createdAt: new Date().toISOString(),
        }

        rooms.value.unshift(newRoom)
        return newRoom
    }

    function deleteRoom(roomId: string) {
        const index = rooms.value.findIndex((r) => r.id === roomId)
        if (index === -1) return

        rooms.value.splice(index, 1)

        if (activeRoomId.value === roomId) {
            activeRoomId.value = null
        }
    }

    return {
        rooms,
        activeRoomId,
        activeRoom,
        getRoomById,
        sortedRooms,
        setActiveRoom,
        createRoom,
        deleteRoom,
    }
})