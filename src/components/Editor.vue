<template>
	<div>
		<h2 class="title">Task details</h2>
		<form class="form">
			<div class="row">
				<label class="label">Title<sup>*</sup>:</label>
				<div class="field">
					<input
						v-model="task.name"
						class="control"
						:class="{ invalid: errors[0] }"
						name="name"
						@input="checkForm"
					>
					<div v-if="errors.length" class="error-message">{{ errors[0].message }}</div>
				</div>
			</div>
			<div class="row">
				<label class="label">Deadline<sup>*</sup>:</label>
				<div class="field">
					<datepicker
						:value="date"
						:format="customFormatter"
						@selected="selectedDate($event)"
					></datepicker>
				</div>
			</div>
			<div class="row">
				<label class="label">Description:</label>
				<editor
					class="editor"
					:api-key="editorKey"
					:init="{plugins: 'wordcount'}"
					v-model="task.description"
				></editor>
			</div>
		</form>

		<div class="action">
			<button
				type="button"
				class="button"
				@click="save()"
				:disabled="errors.length > 0"
			>Save</button>
		</div>
	</div>
</template>

<script>
	import Editor from '@tinymce/tinymce-vue';
	import Datepicker from 'vuejs-datepicker';
	import { EDITOR_KEY } from "../env";

	export default {
		name: 'Editor',
		components: {
			Datepicker,
			'editor': Editor
		},
		data() {
			return {
				editorKey: EDITOR_KEY,
				updatedDate: '',
				errors: []
			}
		},
		props: {
			task: Object,
			user: Number,
			date: String
		},
		methods: {
			save() {
				const updatedDate = this.updatedDate;
				this.$store.dispatch('updateTask', {
					name: this.task.name,
					due_date: updatedDate,
					description: this.task.description,
					id: this.task.id,
					userId: this.user
				});
			},
			customFormatter(date) {
				return this.$moment(date).format('DD.MM.YYYY');
			},
			selectedDate(date) {
				this.updatedDate = this.$moment(date).format('DD.MM.YYYY');
			},
			checkForm() {
				this.errors = [];

				if (!this.task.name) {
					this.errors.push({ message: 'Title is required' });
				} else {
					return true;
				}
			}
		}
	}
</script>

<style lang="scss">
	.row {
		display: flex;

		&:not(:last-child) {
			margin-bottom: 10px;
		}
	}

	.label {
		flex: 0 0 180px;
		max-width: 180px;
	}

	.field {
		width: 100%;
	}

	.control {
		width: 100%;
		height: 30px;
		padding: 0 10px;
		border: 1px solid #aaa;
		font-size: 14px;

		&.invalid {
			border-color: #f30;
		}
	}

	.error-message {
		color: #f30;
	}

	.vdp-datepicker {
		input {
			height: 30px;
			padding: 0 10px;
			border: 1px solid #aaa;
			font-size: 14px;
			cursor: pointer;
		}
	}

	.editor + div {
		width: 100%;
	}

	.action {
		margin-top: 20px;
		text-align: right;
	}

	.button {
		display: inline-block;
		vertical-align: middle;
		cursor: pointer;
		padding: 10px 30px;
		background-color: #2c8;
		border: 0;
		box-shadow: none;
		color: #fff;
		font-size: 18px;
		font-weight: 700;
		line-height: 22px;
		transition: all .3s ease;

		&:hover {
			background-color: #1b7;
		}

		&:disabled {
			cursor: default;
			background-color: #eee;
			color: #888;
		}

	}
</style>
