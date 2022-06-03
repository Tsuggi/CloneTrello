<template>
    <div class="task-view">
        <div class="flex flex-grow flex-col items-start justify-between px-4">
            <input type="text" :value="task.name" class="flex-grow font-bold w-full"
                @change="updateTask($event, 'name')">
            <textarea :value="task.description" @change="updateTask($event, 'description')"
                class="w-full relative bg-transparent px-2 border mt-2 h-64 border-none leading-normal"></textarea>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useStore } from '../stores/board.js'

const route = useRoute();
const store = useStore();

const task = computed(() => store.getTask(route.params.id))

const updateTask = (e, property) => {
    store.UPDATE_TASK(task.value, property,e.target.value);
    e.target.value = "";
}

</script>

<style scoped>
.task-view {
    @apply relative flex flex-row bg-white m-32 mx-auto py-4 text-left rounded shadow;
    max-width: 700px;
}
</style>