import { defineStore } from "pinia";
import axios from 'axios';

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),
  getters: {
    countTodos: (state) => state.todos.length,
  },
  actions: {
    async fetchTodos() {
      try {
        const response = await axios.get('http://localhost:3100/tasks');
        this.todos = response.data;
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    },

    async toggleStatus(name) {
      const todo = this.todos.find(t => t.name === name);
      if (!todo) return;

      const newCompletedAt = todo.completedAt ? null : new Date().toISOString();

      try {
        const encodedName = encodeURIComponent(name);
        const response = await axios.patch(`http://localhost:3100/tasks/${encodedName}`, {
          completedAt: newCompletedAt,
        });

        const updatedTask = response.data;
        const index = this.todos.findIndex(t => t.name === name);
        if (index !== -1) {
          this.todos[index] = updatedTask;
        }
      } catch (error) {
        console.error('Failed to toggle todo status:', error);
      }
    },    

    async addTodo(name) {
      try {
        const response = await axios.post('http://localhost:3100/tasks', {
          name,
          description: 'description',
        });
        this.todos.push(response.data);
      } catch (error) {
        console.error('Failed to add todo:', error);
      }
    },

    async clearAll() {
      try {
        axios.delete('http://localhost:3100/tasks');
        this.todos = [];
      } catch (error) {
        console.error('Failed to clear todo:', error);
      }
    },
  },
});
