<template>
    <div>
        <form action="" @submit.prevent="handleSubmit">
            <input type="text" placeholder="i need to ...." v-model="newTask">
            <button>Add</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {useTaskStore} from '../stores/TaskStore' 

const taskStore = useTaskStore();
const newTask = ref('');
const handleSubmit = ()=>{
    if(newTask.value.length > 0){
        taskStore.addTasks({
            title: newTask.value,
            isFav: false,
            id: Math.floor(Math.random() * 10000)
        })
        newTask.value=''
    }
}



</script>

<style lang="scss" scoped>

</style>