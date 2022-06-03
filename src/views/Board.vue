<template>
    <div class="board">
        <div class="flex flex-row items-start">
            <div class="column" v-for="(column, $indexC) in store.board.columns" :key="$indexC"
                @drop="moveTask($event, column.tasks)" @dragover.prevent @dragenter.prevent>
                <div class="flex flex-col mb-2 font-bold">
                    <span class="text-xl">{{ column.name }}</span>
                    <div class="list-reset">
                        <div class="task" v-for="(task, $indexT ) in column.tasks" :key="$indexT"
                            @click="goToTask(task)" draggable="true" @dragstart="pickUpTask($event, $indexT, $indexC)">
                            <span class="w-full flex-no-shrink font-bold">
                                {{ task.name }}
                            </span>
                            <div v-if="task.description" class="w-full mt-1 text-sm font-thin">
                                <p>{{ task.description }}</p>
                                <p>{{ task.id }}</p>
                                <div class="flex justify-end">
                                    <button @click.stop="deleteTask($indexT, column.tasks)"
                                        class="bg-emerald-500 hover:bg-emerald-800 text-white py-1 px-2 rounded-full">
                                        <Poubelle />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <input type="text" class="block p-2 w-full bg-transparent" placeholder="+ Enter new task"
                            @keyup.enter="createTask($event, column.tasks)">
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-modal" v-if="isTaskOpen" @click.self="closeModal">
            <router-view />
        </div>

    </div>
</template>

<script setup>
import Poubelle from '../components/Poubelle.vue'
import { useStore } from '../stores/board.js'
import { RouterView, useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();
const store = useStore();

const isTaskOpen = computed(() => route.name === 'task')

const goToTask = (task) => {
    router.push({
        name: 'task',
        params: { id: task.id }
    })
}
const closeModal = () => { router.push({ name: 'board' }) }

const createTask = (event, colonne) => {
    store.CREATE_TASK(event.target.value, colonne);
    event.target.value = '';
}

const deleteTask = (index, task) => {
    store.DELETE_TASK(task, index);
}

const pickUpTask = (e, indexTask, indexColumn) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.dropEffect = 'move'
    e.dataTransfer.setData('index-Task', indexTask)
    e.dataTransfer.setData('index-Column', indexColumn)
}
const moveTask = (e, toTasks) => {
    const fromColumnIndex = e.dataTransfer.getData('index-Column')
    const taskIndex = e.dataTransfer.getData('index-Task')
    const fromTasks = store.board.columns[fromColumnIndex].tasks
    
    store.MOVE_TASK(fromTasks, toTasks, taskIndex)
}
</script>



<style scoped>
.board {
    @apply p-4 h-full overflow-auto;
}

.column {
    @apply p-2 mr-4 text-left shadow rounded bg-slate-100;
    min-width: 350px;
}

.task {
    @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white no-underline;
}

.bg-modal {
    @apply h-screen w-screen bg-slate-400/75 fixed top-0 left-0 right-0;
}
</style>