<template>
	<div v-if="!loading" class="task">
		<div class="main">
			<div class="list">
				<List></List>
			</div>
			<div class="editor">
				<Editor :task="task" :user="user" :date="date"></Editor>
			</div>
		</div>
	</div>
	<div v-else class="loading">Loading...</div>
</template>

<script>

	import List from '@/components/List.vue';
	import Editor from '@/components/Editor.vue';

	export default {
		name: 'task',
		components: {
			List,
			Editor
		},
		props: ['userId', 'taskId'],
		computed: {
			loading() {
				return this.$store.getters.loading;
			},
			task() {
				const paramsUserId = this.userId;
				const paramsTaskId = this.taskId;
				const userId = parseInt(paramsUserId);
				const taskId = parseInt(paramsTaskId);
				return this.$store.getters.taskId(userId, taskId);
			},
			user() {
				const paramsUserId = this.userId;
				const userId = parseInt(paramsUserId);
				return userId;
			},
			date() {
				const prevDate = this.task.due_date.split('.');
				const nextDate = new Date(prevDate[2], prevDate[1] - 1, prevDate[0]);
				return nextDate.toString();
			}
		}
	}
</script>

<style lang="scss">
	.main {
		display: flex;
	}

	.list {
		flex: 0 0 260px;
		max-width: 260px;
		margin-right: 50px;
	}

	.editor {
		flex: 1 1 0%;
	}

	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		font-size: 32px;
	}
</style>
