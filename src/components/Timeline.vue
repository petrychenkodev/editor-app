<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Post, Period } from '../types'

const periods: Period[] = [
    { id: 1, name: 'Today' },
    { id: 2, name: 'This Week' },
    { id: 3, name: 'This Month' },
]

const selectedPeriod = ref('Today')
const selectPeriod = (period: string) => selectedPeriod.value = period

const posts: Post[] = [
    {
        id: 101,
        title: 'First Post: Vue Programming',
        content: 'Vue 3 and the Composition API.',
        periodId: 1,
        created: new Date(),
    },
    {
        id: 102,
        title: 'Second Post: Weekly News',
        content: 'An overview of this week.',
        periodId: 2,
        created: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
        id: 103,
        title: 'Third Post: Monthly Plans',
        content: 'Next month plans.',
        periodId: 3,
        created: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    },
]

const filteredPosts = computed(() => {
    const now = new Date()

    if (selectedPeriod.value === 'Today') {
        return posts.filter(post =>
            post.created.toDateString() === now.toDateString()
        )
    }

    if (selectedPeriod.value === 'This Week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        return posts.filter(post => post.created >= weekAgo)
    }

    if (selectedPeriod.value === 'This Month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        return posts.filter(post => post.created >= monthAgo)
    }

    return posts
})
</script>

<template>
    <nav class="is-primary panel">
        <span class="panel-tabs">
            <a v-for="period in periods" :key="period.id" @click="selectPeriod(period.name)"
                :class="selectedPeriod === period.name ? 'is-active' : ''">
                {{ period.name }}
            </a>
        </span>

        <a v-for="post in filteredPosts" :key="post.id" class="panel-block">
            <div>
                <a>{{ post.title }}</a>
                <div>
                    {{ post.created.toLocaleString('uk-UA', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                    }) }}
                </div>
            </div>
        </a>
    </nav>
</template>

<style scoped>
.panel-tabs a.is-active {
    background-color: #3273dc;
    color: white;
}
</style>