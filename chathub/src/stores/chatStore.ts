import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './authStore'
import { useRoomStore } from './roomStore'
import messagesData from '@/data/messages.json'

export interface Message {
    id: string
    roomId: string
    userId: string
    text: string
    timestamp: string
}

export const useChatStore = defineStore('chat', () => {
    const messages = ref<Record<string, Message[]>>({ ...messagesData })
    const readTimestamps = ref<Record<string, string>>({})

    const activeMessages = computed(() => {
        const roomStore = useRoomStore()
        if (!roomStore.activeRoomId) return []
        return messages.value[roomStore.activeRoomId] ?? []
    })

    const getMessagesForRoom = computed(() => {
        return (roomId: string): Message[] => messages.value[roomId] ?? []
    })

    const getLastMessage = computed(() => {
        return (roomId: string): Message | null => {
            const roomMessages = messages.value[roomId]
            if (!roomMessages || roomMessages.length === 0) return null
            return roomMessages[roomMessages.length - 1]
        }
    })

    const getUnreadCount = computed(() => {
        return (roomId: string): number => {
            const authStore = useAuthStore()
            const roomMessages = messages.value[roomId] ?? []
            const lastRead = readTimestamps.value[roomId]

            if (!lastRead) return roomMessages.filter((m) => m.userId !== authStore.user?.id).length

            return roomMessages.filter(
                (m) => m.userId !== authStore.user?.id && m.timestamp > lastRead,
            ).length
        }
    })

    const totalUnreadCount = computed(() => {
        const roomStore = useRoomStore()
        return roomStore.rooms.reduce((total, room) => {
            return total + getUnreadCount.value(room.id)
        }, 0)
    })

    function sendMessage(roomId: string, text: string) {
        const authStore = useAuthStore()
        if (!authStore.user || !text.trim()) return null

        const message: Message = {
            id: `msg-${Date.now()}`,
            roomId,
            userId: authStore.user.id,
            text: text.trim(),
            timestamp: new Date().toISOString(),
        }

        if (!messages.value[roomId]) {
            messages.value[roomId] = []
        }

        messages.value[roomId].push(message)
        markRoomAsRead(roomId)

        return message
    }

    function addMessage(roomId: string, message: Message) {
        if (!messages.value[roomId]) {
            messages.value[roomId] = []
        }
        messages.value[roomId].push(message)
    }

    function markRoomAsRead(roomId: string) {
        readTimestamps.value[roomId] = new Date().toISOString()
    }

    return {
        messages,
        readTimestamps,
        activeMessages,
        getMessagesForRoom,
        getLastMessage,
        getUnreadCount,
        totalUnreadCount,
        sendMessage,
        addMessage,
        markRoomAsRead,
    }
})