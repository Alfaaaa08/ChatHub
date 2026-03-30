import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import usersData from '@/data/users.json'
import contactsRaw from '@/data/contacts.json'

export interface Contact {
    userId: string
    addedAt: string
}

export interface UserProfile {
    id: string
    username: string
    avatarUrl: string
    status: 'online' | 'offline' | 'away'
}

export const useContactStore = defineStore('contacts', () => {
    const contacts = ref<Contact[]>([...contactsRaw])
    const users = ref<UserProfile[]>([...(usersData as UserProfile[])])
    const searchQuery = ref('')

    const getUserById = computed(() => {
        return (id: string) => users.value.find((u) => u.id === id) ?? null
    })

    const contactsWithDetails = computed(() => {
        return contacts.value
            .map((contact) => {
                const user = users.value.find((u) => u.id === contact.userId)
                if (!user) return null
                return { ...contact, ...user }
            })
            .filter(Boolean) as (Contact & UserProfile)[]
    })

    const filteredContacts = computed(() => {
        const query = searchQuery.value.toLowerCase().trim()
        if (!query) return contactsWithDetails.value
        return contactsWithDetails.value.filter((c) =>
            c.username.toLowerCase().includes(query),
        )
    })

    const onlineContacts = computed(() => {
        return contactsWithDetails.value.filter((c) => c.status === 'online')
    })

    function setSearchQuery(query: string) {
        searchQuery.value = query
    }

    function updateUserStatus(userId: string, status: UserProfile['status']) {
        const user = users.value.find((u) => u.id === userId)
        if (user) {
            user.status = status
        }
    }

    return {
        contacts,
        users,
        searchQuery,
        getUserById,
        contactsWithDetails,
        filteredContacts,
        onlineContacts,
        setSearchQuery,
        updateUserStatus,
    }
})