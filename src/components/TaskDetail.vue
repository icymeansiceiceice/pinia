<template>
    <div>
        <div class="task">
            <h3>{{ task.title }}</h3>
            <div class="icons">
                <i class="material-icons" @click="taskStore.deleteTasks(task.id)">delete</i>   
                <i class="material-icons" @click="taskStore.toggleFav(task.id)" :class="{active: task.isFav}">favorite</i>    
            </div>
        </div>
    </div>
</template>

<script setup>
import {useTaskStore} from '../stores/TaskStore' 


const taskStore = useTaskStore();
const props = defineProps({
    task:{
        type: Object,
        required: true
    }
})





</script>

<style lang="scss" scoped>

</style>