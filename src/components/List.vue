<template>
	<div>
		<h2 class="title">Users</h2>
		<nav class="nav">
			<div
				v-for="user of list"
				:key="user.id"
				class="user__list"
			>
			<span
				@click="$event.target.classList.toggle('active')"
				class="user__item active"
			>{{ user.name }}</span>
				<div
					:id="user.id"
					class="task__list"
				>
					<div
						v-for="task of user.tasks"
						:key="task.id"
						class="task__item"
						:class="{ empty: !task.name }"
					>
						<div class="task__item-wrapper">
							<router-link
								class="task__item-name"
								:to="'/user/' + user.id + '/task/' + task.id"
							>{{ task.name }}</router-link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
	export default {
		name: 'List',
		computed: {
			list() {
				return this.$store.getters.list;
			}
		}
	}
</script>

<style lang="scss">
	@mixin before($width, $height, $top: 0, $bg-color: #000) {
		display: block;
		content: '';
		position: absolute;
		top: $top;
		left: 0;
		width: $width;
		height: $height;
		background-color: $bg-color;
	}

	.nav {
		min-height: 350px;
		padding: 20px;
		overflow-y: auto;
		border: 1px solid #333;
	}

	.user,
	.task {
		&__item {
			cursor: pointer;
		}
	}

	.user {
		&__list {
			&:not(:last-child) {
				margin-bottom: 10px;
			}
		}

		&__item {
			display: block;
			color: #333;
			font-weight: 700;

			&.active + .task__list {
				display: block;
			}

			& + .task__list {
				display: none;
			}
		}
	}

	.task {
		&__item {
			position: relative;

			&::before {
				@include before(1px, 100%, -50%);
			}

			&.empty,
			&.empty:last-child {
				display: none;

				&::before {
					display: none;
				}
			}

			&:first-child {
				&::before {
					@include before(1px, 50%);
				}
			}
		}

		&__item-wrapper {
			position: relative;

			&::before {
				@include before(15px, 1px, 50%);
			}
		}

		&__item-name {
			display: block;
			padding-left: 20px;
			color: #2c8;

			&.router-link-active {
				color: #28c;
			}
		}
	}
</style>
