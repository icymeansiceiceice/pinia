import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore',{
    state: ()=>({
        tasks :[],
        loading: false
    }),
    getters:{
        favs(){
            return this.tasks.filter(data => data.isFav)
        },
        favCount(){
            return this.tasks.reduce((p,c)=>{
                return c.isFav ? p+1 : p
            },0)
        },
        totalCount:(state)=>{
            return state.tasks.length
        }
    },
    actions:{
        async getTasks(){
            this.loading = true
            const res = await fetch('http://localhost:3000/tasks')
            const data = await res.json()
            this.tasks = data
            this.loading = false
        },
        async addTasks(task){
            this.tasks.push(task);

            const res = await fetch('http://localhost:3000/tasks',{
                methods: 'POST',
                body : JSON.stringify(task),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            if(res.error){
                console.log(res.error);
            }
        },
        async deleteTasks(id){
            this.tasks = this.tasks.filter(t => {
                return t.id !== id
            })

            const res = await fetch('http://localhost:3000/tasks'+id,{
                methods: 'DELETE'
            })
            if(res.error){
                console.log(res.error);
            }
        },
        async toggleFav(id){
            const task = this.tasks.find(t=> t.id === id)
            task.isFav = !task.isFav

            const res = await fetch('http://localhost:3000/tasks'+id,{
                methods: 'PATCH',
                body : JSON.stringify({
                    isFav: task.isFav
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            if(res.error){
                console.log(res.error);
            }
        }
    }
})