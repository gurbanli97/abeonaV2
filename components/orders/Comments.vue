<template>
  <div class="order-tasks">
    <div class="order-tasks_inner">
      <button class="btn ml-auto add-task" @click="handleAddSlideOut">
        <Icon name="plus-circle" />
        Add comment
      </button>
      <UserTable :fields="tableFields" :with-actions="true">
        <tbody>
          <tr v-for="comment in commentList" :key="comment.id">
            <td>
              <strong>{{ comment.author.display_name }}</strong>
            </td>
            <td>
              <p>{{ comment.content }}</p>
            </td>
            <td>
              <span>{{ $moment(comment.created_at).format('DD.MM.YYYY') }}</span>
            </td>
            <td>
              <button @click="handleDeleteModalOpen(comment.id)">
                <Icon name="trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </UserTable>

      <slide-out :slide-is-active="showAddSlideOut" title="Add comment" @close-slide="showAddSlideOut = false">
        <template #body>
          <b-form @submit.prevent="handleAddNewComment">
            <b-form-group label="Description">
              <b-form-textarea v-model="newCommentForm.content" placeholder="Enter" rows="6" max-rows="6" />
            </b-form-group>
            <button :class="['btn', 'btn-success', { pending: pending }]" type="submit">Save comment</button>
          </b-form>
        </template>
      </slide-out>
      <Modal
        :toggle="showDeleteModal"
        @close="showDeleteModal = false"
        @modal-delete-click="handleCommentDelete(itemToDelete)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Modal from '../elements/Modal.vue'
import UserTable from '../tables/UserTable.vue'
import Icon from '../elements/Icon.vue'
export default {
  name: 'Comments',
  components: { UserTable, Modal, Icon },
  data() {
    return {
      pending: false,
      progressValue: 0,
      max: 100,
      showDeleteModal: false,
      showAddSlideOut: false,
      showEditSlideOut: false,
      itemToDelete: null,
      dateFrom: '',
      tableFields: ['Author', 'Content', 'Created at'],
      newCommentForm: {
        order_id: '',
        content: '',
      },
    }
  },
  computed: {
    ...mapGetters({
      commentList: 'orders/order_comments',
      userListOptions: 'orders/userListOptions',
      taskStatusOptions: 'orders/taskStatusOptions',
      documentListOptions: 'orders/documentListOptions',
      taskComments: 'orders/task_comments',
    }),
    editSlideOutItem() {
      return this.commentList.find((comment) => comment.id === this.itemToEdit)
    },
  },
  methods: {
    handleDeleteModalOpen(id) {
      this.itemToDelete = id
      this.showDeleteModal = true
    },
    async handleAddSlideOut() {
      this.showAddSlideOut = true
    },
    async handleAddNewComment() {
      this.newCommentForm.order_id = this.$route.params.id
      await this.$store.dispatch('orders/createNewTaskComment', this.newCommentForm)
      await this.$store.dispatch('orders/fetchOrderComments', this.$route.params.id)
      this.newCommentForm.content = ''
      this.showAddSlideOut = false
    },
    async handleCommentDelete(id) {
      await this.$store.dispatch('orders/deleteTaskComment', id)
      await this.$store.dispatch('orders/fetchOrderComments', this.$route.params.id)
      this.showDeleteModal = false
    },
  },
}
</script>

<style></style>
