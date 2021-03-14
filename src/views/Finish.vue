<template>
<div id="app" class="container">
	<h2>Todo</h2>
	<p>
		全{{todos.length}}件中残り{{isChecked}}件
	</p>
	<ul class="list-unstyled">
		<li v-for="(todo, index) in todos" :key="index">
			<label>
				<input type="checkbox" v-model="todo.done" />
				{{todo.text}}
			</label>
		</li>
	</ul>
</div>
</template>

<script>
export default {
  data() {
    return {
      todoText: '',
      todos: [
        {text: 'Vue.jsを学ぶ', done: false},
        {text: 'Vue.jsでアプリケーションをつくる', done: false},
      ]
    }
	},
	computed: {
		isChecked: function() {
			var count = 0;
			var todos = this.todos;
			var length = todos.length;
			for(var i = 0; i < length; i++) {
				if(todos[i].done) {
					count++;
				}
			}
			return count;
		}
	}
}
</script>