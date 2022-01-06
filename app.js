
Vue.createApp({
  data() {
    return {
      title: 'Список дел',
      placeholderString: 'введите текст',
      inputValue: '',
      warning: false,
      todoList: JSON.parse(localStorage.getItem('todos')) || []
    }
  },

  methods: {
    btnAddTodoHandler() {
      if (this.inputValue) {
        const id = Date.now().toString()
        const createTodo = {
          id: id,
          value: this.inputValue
        }

        this.todoList.push(createTodo)

        this.inputValue = ''
      }
    },

    btnRemoveTodo(index) {
      this.todoList.splice(index, 1)
    },

    stringToUpperCase(item) {
      return item.toUpperCase()
    }
  },

  computed:{
    doubleCount() {
      return this.todoList.length*2
    }
  },

  watch:{
    inputValue(value) {
      this.warning = value.match(/[*&^%]/g)!==null;
    }
  },

  mounted() {
    window.addEventListener('beforeunload',()=> {
      localStorage.setItem('todos', JSON.stringify(this.todoList))
    })
  }

}).mount('#app')
