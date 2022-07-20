<template>
  <div class="order-tasks">
    <div class="order-tasks_inner">
      <button class="btn ml-auto add-task" @click="handleAddSlideOut">
        <Icon name="plus-circle" />
        Add task
      </button>
      <UserTable :fields="tableFields" :with-actions="true">
        <tbody>
          <tr v-for="task in taskList" :key="task.id">
            <td style="width: 200px">
              <p>{{ task.title }}</p>
            </td>
            <td>
              <strong>{{ task.assignee.display_name ? task.assignee.display_name : 'None' }}</strong>
            </td>
            <td>
              <span>{{ task.due_date ? $moment(task.due_date).format('DD.MM.YYYY') : 'None' }}</span>
            </td>
            <td>
              <badge :category="'status'" :text="$capitalizeString(task.status)" />
            </td>
            <td>
              <div v-if="task.total_comments > 0" class="comments-count">
                <Icon name="message" />
                <span>Comments({{ task.total_comments }})</span>
              </div>
              <div v-if="task.attachments.length" class="attachment-count">
                <Icon name="document-text" />
                <span>Attachments({{ task.attachments.length }})</span>
              </div>
            </td>
            <td>
              <button @click="handleEditSlideOut(task.id)">
                <Icon name="edit-2" />
              </button>
            </td>
          </tr>
        </tbody>
      </UserTable>

      <slide-out
        v-if="showAddSlideOut"
        :slide-is-active="showAddSlideOut"
        title="Add task"
        @close-slide="showAddSlideOut = false"
      >
        <template #body>
          <b-form ref="addTaskForm" @submit.prevent="handleAddTaskFormSubmit">
            <b-form-group label="Title">
              <form-field v-model="addTaskForm.title" :placeholder="'Enter'" :is-invalid="$v.addTaskForm.title.$error">
                <b-form-invalid-feedback v-if="!$v.addTaskForm.title.$required">
                  Input can't be empty
                </b-form-invalid-feedback>
              </form-field>
            </b-form-group>
            <b-form-group label="Description">
              <b-form-textarea
                v-model="addTaskForm.description"
                placeholder="Enter"
                rows="3"
                max-rows="3"
                no-resize
                :class="{ 'is-invalid': $v.addTaskForm.description.$error }"
              />
              <b-form-invalid-feedback v-if="!$v.addTaskForm.description.$required">
                Input can't be empty
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Assigned to">
              <v-select
                v-model="addTaskForm.user"
                :options="userListOptions"
                :reduce="(data) => data.value"
                :class="{ 'is-invalid': $v.addTaskForm.user.$error }"
              >
              </v-select>
              <span v-if="$v.addTaskForm.user.$error" class="select-invalid"> Input can't be empty </span>
            </b-form-group>
            <b-form-group label="Due date">
              <date-picker
                v-model="addTaskForm.due_date"
                value-type="format"
                format="YYYY-MM-DD"
                placeholder="Choose date"
                :class="{ 'is-invalid': $v.addTaskForm.due_date.$error }"
              />
              <span v-if="$v.addTaskForm.due_date.$error" class="select-invalid"> Input can't be empty </span>
            </b-form-group>
            <b-form-group label="Label">
              <form-field v-model="addTaskForm.label" :placeholder="'Enter'" :is-invalid="$v.addTaskForm.label.$error">
                <b-form-invalid-feedback v-if="!$v.addTaskForm.label.$required">
                  Input can't be empty
                </b-form-invalid-feedback>
              </form-field>
            </b-form-group>
            <b-form-group label="Status">
              <v-select
                v-model="addTaskForm.status"
                :options="taskStatusOptions"
                :reduce="(data) => data.value"
                :class="{ 'is-invalid': $v.addTaskForm.status.$error }"
              >
              </v-select>
              <span v-if="$v.addTaskForm.status.$error" class="select-invalid"> Input can't be empty </span>
            </b-form-group>
            <b-form-group>
              <div v-for="(attachment, index) in addTaskForm.attachments" :key="index" class="add_attachment mt-4">
                <div v-if="!addTaskForm.attachments[index]['file']" class="attachment-upload_input mb-4">
                  <label :for="index">
                    <div>
                      <h3>Add an attachment</h3>
                      <span>png, jpg, pdf</span>
                    </div>
                    <strong>Choose</strong>
                    <input :id="index" type="file" hidden @change="handleUpload($event, 'addTaskForm')" />
                  </label>
                </div>
                <div v-if="addTaskForm.attachments[index]['file']" class="attachment-upload_progress">
                  <div class="attachment-progress_inner d-flex flex-column align-items-start">
                    <!-- <span>{{editTaskForm.attachments[index]['file']}}</span> -->
                    <img
                      :src="addTaskForm.attachments[index]['file']"
                      alt=""
                      style="width: 50px; height: auto; margin: auto"
                    />
                  </div>
                </div>
                <b-form-group class="mt-4" label="Document type">
                  <v-select
                    v-model="addTaskForm.attachments[index]['document_id']"
                    :options="documentListOptions"
                    :reduce="(data) => data.value"
                    :class="{ 'is-invalid': $v.addTaskForm.user.$error }"
                  >
                  </v-select>
                  <span v-if="$v.addTaskForm.user.$error" class="select-invalid"> Input can't be empty </span>
                </b-form-group>
              </div>
              <button class="btn ml-auto add-task" @click.prevent="handleAddMoreAttachments('addTaskForm')">
                <Icon name="plus-circle" />
                Add more
              </button>
            </b-form-group>
            <button :class="['btn', 'btn-success', { pending: pending }]" type="submit">Save task</button>
          </b-form>
        </template>
      </slide-out>
      <slide-out
        v-if="itemToEdit"
        :slide-is-active="showEditSlideOut"
        title="Edit task"
        @close-slide="showEditSlideOut = false"
      >
        <template #body>
          <b-form @submit.prevent="handleEditTaskFormSubmit">
            <b-form-group label="Title">
              <form-field
                v-model="editTaskForm.title"
                :placeholder="'Enter'"
                :is-invalid="$v.editTaskForm.title.$error"
              >
                <b-form-invalid-feedback v-if="!$v.editTaskForm.title.$required">
                  Input can't be empty
                </b-form-invalid-feedback>
              </form-field>
            </b-form-group>
            <b-form-group label="Description">
              <b-form-textarea
                v-model="editTaskForm.description"
                placeholder="Enter"
                rows="3"
                max-rows="3"
                no-resize
                :class="{ 'is-invalid': $v.editTaskForm.description.$error }"
              />
              <b-form-invalid-feedback v-if="!$v.editTaskForm.description.$required">
                Input can't be empty
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Assigned to">
              <v-select
                v-model="editTaskForm.user"
                :options="userListOptions"
                :reduce="(data) => data.value"
                :class="{ 'is-invalid': $v.editTaskForm.user.$error }"
              >
              </v-select>
              <span v-if="$v.editTaskForm.user.$error" class="select-invalid"> Input can't be empty </span>
            </b-form-group>
            <b-form-group label="Due date">
              <date-picker
                v-model="editTaskForm.due_date"
                value-type="format"
                format="YYYY-MM-DD"
                :placeholder="$moment(editTaskForm.due_date).format('YYYY-MM-DD')"
                :class="{ 'is-invalid': $v.editTaskForm.due_date.$error }"
              />
              <span v-if="$v.editTaskForm.due_date.$error" class="select-invalid"> Input can't be empty </span>
            </b-form-group>
            <b-form-group label="Label">
              <form-field
                v-model="editTaskForm.label"
                :placeholder="'Enter'"
                :is-invalid="$v.editTaskForm.label.$error"
              >
                <b-form-invalid-feedback v-if="!$v.editTaskForm.label.$required">
                  Input can't be empty
                </b-form-invalid-feedback>
              </form-field>
            </b-form-group>
            <b-form-group label="Status">
              <v-select
                v-model="editTaskForm.status"
                :options="taskStatusOptions"
                :reduce="(data) => data.value"
                :class="{ 'is-invalid': $v.editTaskForm.status.$error }"
              >
              </v-select>
              <span v-if="$v.editTaskForm.status.$error" class="select-invalid"> Input can't be empty </span>
            </b-form-group>

            <b-form-group>
              <div v-if="editSlideOutItem.attachments.length" class="edit-task_attachments">
                <span>Attachments</span>
                <ul v-for="attachment in editSlideOutItem.attachments" :key="attachment.id" class="attachments-list">
                  <li class="attachments-list_item">
                    <Icon :name="checkAttachmentFileType(attachment.title)" />
                    <a :href="`https://stg.abeona.pickvisa.com/${attachment.file}`" target="_blank">{{
                      attachment.title.split('/').pop()
                    }}</a>
                    <button class="btn" @click.prevent="handleAttachmentDelete(attachment.id)">
                      <Icon name="trash" />
                    </button>
                  </li>
                </ul>
              </div>
            </b-form-group>
            <b-form-group>
              <div v-for="(attachment, index) in editTaskForm.attachments" :key="index" class="add_attachment mt-4">
                <div v-if="!editTaskForm.attachments[index]['file']" class="attachment-upload_input mb-4">
                  <label :for="index">
                    <div>
                      <h3>Add an attachment</h3>
                      <span>png, jpg, pdf</span>
                    </div>
                    <strong>Choose</strong>
                    <input :id="index" type="file" hidden @change="handleUpload($event, 'editTaskForm')" />
                  </label>
                </div>
                <div v-if="editTaskForm.attachments[index]['file']" class="attachment-upload_progress">
                  <div class="attachment-progress_inner d-flex flex-column align-items-start">
                    <!-- <span>{{editTaskForm.attachments[index]['file']}}</span> -->
                    <img
                      :src="editTaskForm.attachments[index]['file']"
                      alt=""
                      style="width: 50px; height: auto; margin: auto"
                    />
                  </div>
                </div>
                <b-form-group class="mt-4" label="Document type">
                  <v-select
                    v-model="editTaskForm.attachments[index]['document_id']"
                    :options="documentListOptions"
                    :reduce="(data) => data.value"
                    :class="{ 'is-invalid': $v.editTaskForm.user.$error }"
                  >
                  </v-select>
                  <span v-if="$v.editTaskForm.user.$error" class="select-invalid"> Input can't be empty </span>
                </b-form-group>
              </div>
              <button class="btn ml-auto add-task" @click.prevent="handleAddMoreAttachments('editTaskForm')">
                <Icon name="plus-circle" />
                Add more
              </button>
            </b-form-group>
            <b-form-group>
              <div class="edit-task_comments">
                <span v-if="taskComments.length">Comments</span>
                <template v-if="taskComments.length">
                  <ul v-for="comment in taskComments" :key="comment.id" class="comments-list">
                    <li class="comments-list_item">
                      <div class="comments-list_item-header">
                        <div class="comments-list_item-profile">
                          <img :src="`http://abeonav2.pickvisa.com/${comment.author.profile_pic}`" alt="" />
                          <span>{{ comment.author.display_name }}</span>
                        </div>
                        <div class="comment-list_item-actions">
                          <span>{{ $moment(comment.created_at).format('DD.MM.YYYY - HH:mm') }}</span>
                          <button class="btn" @click.prevent="handleTaskCommentDelete(comment.id)">
                            <Icon name="trash" />
                          </button>
                        </div>
                      </div>
                      <div class="comments-list_item-body">
                        <p>{{ comment.content }}</p>
                      </div>
                    </li>
                  </ul>
                </template>
                <div class="comments-add-new">
                  <form-field v-model="newCommentForm.content" placeholder="New comment" />
                  <button class="btn" @click.prevent="handleAddNewComment">Add</button>
                </div>
              </div>
            </b-form-group>
            <button class="btn btn-success" type="submit">Save</button>
          </b-form>
          <Modal :item="itemToDelete" :toggle="showDeleteModal" />
        </template>
      </slide-out>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import Modal from '../elements/Modal.vue'
import UserTable from '../tables/UserTable.vue'
import Icon from '../elements/Icon.vue'
export default {
  name: 'Tasks',
  components: { UserTable, Modal, Icon },
  data() {
    return {
      pending: false,
      progressValue: 0,
      max: 100,
      showDeleteModal: false,
      showAddSlideOut: false,
      showEditSlideOut: false,
      itemToEdit: null,
      itemToDelete: null,
      dateFrom: '',
      tableFields: ['Topic', 'Assigned to', 'Due date', 'Status', 'Details'],
      newCommentForm: {
        task_id: '',
        content: '',
      },
      addTaskForm: {
        title: '',
        order: this.$route.params.id,
        description: '',
        user: null,
        due_date: '',
        label: '',
        status: '',
        attachments: [
          {
            document_id: '',
            file: '',
          },
        ],
      },
      editTaskForm: {
        title: '',
        order_id: this.$route.params.id,
        description: '',
        user: null,
        due_date: '',
        label: '',
        status: '',
        attachments: [
          {
            document_id: '',
            file: null,
          },
        ],
      },
    }
  },
  validations: {
    addTaskForm: {
      title: { required },
      description: { required },
      user: { required },
      due_date: { required },
      label: { required },
      status: { required },
    },
    editTaskForm: {
      title: { required },
      description: { required },
      user: { required },
      due_date: { required },
      label: { required },
      status: { required },
    },
  },
  computed: {
    ...mapGetters({
      taskList: 'orders/order_tasks',
      userListOptions: 'orders/userListOptions',
      taskStatusOptions: 'orders/taskStatusOptions',
      documentListOptions: 'orders/documentListOptions',
      taskComments: 'orders/task_comments',
    }),
    editSlideOutItem() {
      return this.taskList.find((task) => task.id === this.itemToEdit)
    },
  },
  methods: {
    checkAttachmentFileType(file) {
      const fileType = file.split('.').pop()
      // const regex = /\.(jpe?g|png|gif|bmp)$/i.test(fileType)

      switch (fileType) {
        case 'png':
          return 'gallery'
        case 'jpg':
          return 'gallery'
        case 'jpeg':
          return 'gallery'
        default:
          return 'document-text-2'
      }
    },
    handleUpload(event, form) {
      console.log(event, form)
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = () => {
        this[form].attachments[event.target.id]['file'] = reader.result
      }
    },
    async handleAddSlideOut() {
      this.showAddSlideOut = true
    },
    async handleEditSlideOut(id) {
      this.itemToEdit = id
      await this.$store.dispatch('orders/fetchTaskComments', id)
      if (this.editSlideOutItem) {
        this.editTaskForm.title = this.editSlideOutItem.title
        this.editTaskForm.description = this.editSlideOutItem.description
        this.editTaskForm.user = this.editSlideOutItem.assignee?.id
        this.editTaskForm.status = this.editSlideOutItem.status
        this.editTaskForm.due_date = this.editSlideOutItem.due_date
        this.editTaskForm.label = this.editSlideOutItem.label
      }
      this.showEditSlideOut = true
    },
    async handleAttachmentDelete(id) {
      await this.$store.dispatch('orders/deleteTaskAttachment', id)
    },
    async handleAddTaskFormSubmit() {
      this.$v.addTaskForm.$touch()
      if (this.$v.addTaskForm.$invalid) {
        this.$toast.error('Please fill in all required fields')
        return
      }
      this.pending = true
      await this.$store.dispatch('orders/createNewOrderTask', this.addTaskForm)
      await this.$store.dispatch('orders/fetchOrderTasks', this.$route.params.id)
      this.pending = false
      this.addTaskForm = {}
      this.$v.addTaskForm.$reset()
      this.addTaskForm.order = this.$route.params.id
      this.showAddSlideOut = false
    },
    async handleEditTaskFormSubmit() {
      this.$v.editTaskForm.$touch()
      if (this.$v.editTaskForm.$invalid) {
        this.$toast.error('Please fill in all required fields')
        return
      }
      this.pending = true
      await this.$store.dispatch('orders/updateExistingOrderTask', {
        task_id: this.itemToEdit,
        form: this.editTaskForm,
      })
      await this.$store.dispatch('orders/fetchOrderTasks', this.$route.params.id)
      this.pending = false
      this.$v.editTaskForm.$reset()
      this.editTaskForm.order_id = this.$route.params.id
      this.showEditSlideOut = false
    },
    handleAddMoreAttachments(form) {
      const newAttachment = {
        document_id: '',
        file: null,
      }
      this[form].attachments.push(newAttachment)
    },

    async handleAddNewComment() {
      this.newCommentForm.task_id = this.itemToEdit
      await this.$store.dispatch('orders/createNewTaskComment', this.newCommentForm)
      this.newCommentForm.content = ''
      await this.$store.dispatch('orders/fetchTaskComments', this.itemToEdit)
    },
    async handleTaskCommentDelete(id) {
      await this.$store.dispatch('orders/deleteTaskComment', id)
      await this.$store.dispatch('orders/fetchTaskComments', this.itemToEdit)
    },
  },
}
</script>

<style></style>
