<template>
  <main>

    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>

    <div class="new-task-form">
        <TaskForm></TaskForm>
    </div>


    <nav class="filter">
      <button @click="filter='all'">All Tasks</button>
      <button @click="filter='favs'">Fav Tasks</button>
    </nav>

    <div class="loading" v-if="loading">
      loading tasks.....
    </div>

    <div class="task-list" v-if="filter==='all'">
      <p>You have {{ totalCount }} tasks left to do</p>
      <div v-for="task in tasks" :key="task.id">
        <TaskDetail :task="task"></TaskDetail>
      </div>
    </div>

    <div class="task-list" v-if="filter==='favs'">
      <p>You have {{ favCount }} favs left to do</p>
      <div v-for="task in favs" :key="task.id">
        <TaskDetail :task="task"></TaskDetail>
      </div>
    </div>

    <button @click="taskStore.$reset">Reset state</button>

  </main>
</template>

<script setup>
import { ref } from 'vue';
import TaskDetail from './components/TaskDetail.vue'
import {useTaskStore} from './stores/TaskStore' 
import TaskForm from './components/TaskForm.vue'
import { storeToRefs } from 'pinia';

const taskStore = useTaskStore();
const {tasks,loading,favs,favCount,totalCount} = storeToRefs(taskStore);
taskStore.getTasks();
const filter = ref('all');


</script>

<style lang="scss" scoped>

</style>