<template>
  <q-item 
    @click="updateTask({ id: id, updates: { completed: !task.completed } })"
    :class="!task.completed ? 'bg-grey-1' : 'bg-red-3'"
    clickable
    v-ripple>
    <q-item-section side top>
      <q-checkbox 
        v-model="task.completed"
        class="no-pointer-events" />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="{ 'text-strikethrough' : task.completed }">
        {{ task.name }}
      </q-item-label>
    </q-item-section>

    <q-item-section side>
    	<div class="row">
    		<div class="column justify-center">
		    	<q-icon 
		    		name="event"
		    		size="18px"
		    		class="q-mr-xs" />
    		</div>
	    	<div class="column">
          <q-item-label 
          	class="row justify-end"
          	caption>
          	{{ task.dueDate }}
          </q-item-label>
          <q-item-label
          	class="row justify-end"
          	caption>
          	<small>{{ taskDueTime }}</small>
          </q-item-label>
	    	</div>
    	</div>
    </q-item-section>

    <q-item-section side>
      <div class="row">
    	<q-btn
      	@click.stop="showEditTask = true"
      	flat
      	round
      	dense
      	color="primary"
      	icon="edit" />
          <q-btn
           @click.stop="promptToDelete(id)"
           flat
           round
           dense
           color="red"
           icon="delete" />
       </div>
    </q-item-section>
    
    <q-dialog v-model="showEditTask">
  	<edit-task
    	@close="showEditTask = false"
    	:task="task"
    	:id="id" />
     </q-dialog>

  </q-item>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { date } from 'quasar'

	export default {
		props: ['task', 'id'],
    data() {
      return {
        showEditTask: false
      }
    },
    computed: {
      ...mapGetters('settings', ['settings']),
      taskDueTime() {
        if (this.settings.show12HourTimeFormat) {
          return date.formatDate(this.task.dueDate + ' ' + this.task.dueTime, 'h:mmA')
        }
        return this.task.dueTime
      }
    },
    methods: {
      ...mapActions('tasks', ['updateTask', 'deleteTask']),
      showEditTaskModal() {
        this.showEditTask = true
      },
      promptToDelete(id) {
        this.$q.dialog({
          title: 'Confirm',
          message: 'Really delete?',
          ok: {
            push: true
          },
          cancel: {
            color: 'negative'
          },
          persistent: true
        }).onOk(() => {
          this.deleteTask(id)
        })
      } 
    },
    components: {
      'edit-task': require('components/Tasks/Modals/EditTask.vue').default
    }
	}
</script>

<style>
  
</style>
