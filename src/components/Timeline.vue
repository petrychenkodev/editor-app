<script setup lang="ts">
import { ref } from 'vue';
import type { Post, Period } from '../types';

const periods: Period[] = [
    { id: 1, name: 'Today' },
    { id: 2, name: 'This Week' },
    { id: 3, name: 'This Month' },
]
const selectedPeriod = ref<string>('Today')
function selectPeriod(period: string) {
    selectedPeriod.value = period
}
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
        content: 'An overview of the most important events in the tech world this week.',
        periodId: 2,
        created: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
        id: 103,
        title: 'Third Post: Monthly Plans',
        content: 'We have drafted a plan for developing new functionality for the next month.',
        periodId: 3,
        created: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
    },
];
</script>

<template>
    <nav class="is-primary panel">
        <span class="panel-tabs">
            <a v-for="period in periods" :key="period.id" @click="selectPeriod(period.name)"
                :class="selectedPeriod === period.name ? 'is-active' : ''">
                {{ period.name }}
            </a>
        </span>
        <a v-for="post of posts" :key="post.id" class="panel-block">
            <div>
                <a>{{ post.title }}</a>
                <div>{{ post.created.toLocaleDateString('uk-UA', {
                    day: 'numeric', month: 'short', year: 'numeric', hour:
                        '2-digit', minute: '2-digit'
                }) }}</div>
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