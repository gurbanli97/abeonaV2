<template>
  <div class="documents">
    <div class="documents-inner">
      <button class="btn btn-info" @click="showSlideOut = true">
        <Icon name="calendar-add" />
        Set appointment
      </button>
      <b-col xl="12" class="documents-draggable d-flex">
        <div class="drag-box">
          <div class="box-title">
            <span>Customer provides</span>
            <div class="item-count">
              <span>{{ customerProvides.length }}</span>
            </div>
          </div>
          <draggable
            class="list-group customer-provides"
            :list="customerProvides"
            group="people"
            :empty-insert-threshold="100"
            @end="handleAttachmentStatusChange"
          >
            <div v-for="document in customerProvides" :key="document.id" class="list-group-item">
              <p>{{ document.name }}</p>

              <badge :category="'document'" :text="document.document" />
            </div>
          </draggable>
          <button class="btn btn-borderless">
            <icon :name="'plus-circle'" />
            <span>Add file</span>
          </button>
        </div>
        <div class="drag-box">
          <div class="box-title">
            <span>We handle</span>
            <div class="item-count">
              <span>{{ weHandle.length }}</span>
            </div>
          </div>
          <draggable
            class="list-group we-handle"
            :list="weHandle"
            group="people"
            :empty-insert-threshold="100"
            @end="handleAttachmentStatusChange"
          >
            <div v-for="document in weHandle" :key="document.id" class="list-group-item">
              <p>{{ document.name }}</p>

              <badge :category="'document'" :text="document.document" />
            </div>
          </draggable>
          <button class="btn btn-borderless">
            <icon :name="'plus-circle'" />
            <span>Add file</span>
          </button>
        </div>
        <div class="drag-box">
          <div class="box-title">
            <span>Ready</span>
            <div class="item-count">
              <span>{{ ready.length }}</span>
            </div>
          </div>
          <draggable
            class="list-group ready"
            :list="ready"
            group="people"
            :empty-insert-threshold="100"
            @end="handleAttachmentStatusChange"
          >
            <div v-for="document in ready" :key="document.id" class="list-group-item">
              <p>{{ document.name }}</p>
              <badge :category="'document'" :text="document.document" />
            </div>
          </draggable>
          <button class="btn btn-borderless">
            <icon :name="'plus-circle'" />
            <span>Add file</span>
          </button>
        </div>
      </b-col>
    </div>
    <SlideOut :slide-is-active="showSlideOut" title="Set appointment" @close-slide="showSlideOut = false">
      <template #body>
        <b-form @submit.prevent="handleCreateAppointment">
          <b-form-group label="Title">
            <form-field v-model="createAppointmentForm.title" :placeholder="'Enter'"> </form-field>
          </b-form-group>
          <b-form-group label="Appointment type">
            <v-select
              v-model="createAppointmentForm.appointment_type_id"
              :options="appointmentTypeOptions"
              :reduce="(data) => data.value"
              :class="{ 'is-invalid': $v.createAppointmentForm.appointment_type_id.$error }"
            >
            </v-select>
            <span v-if="$v.createAppointmentForm.appointment_type_id.$error" class="select-invalid">
              Input can't be empty
            </span>
          </b-form-group>
          <b-form-group label="Assigned to">
            <v-select
              v-model="createAppointmentForm.user_id"
              :options="userListOptions"
              :reduce="(data) => data.value"
              :class="{ 'is-invalid': $v.createAppointmentForm.user_id.$error }"
            >
            </v-select>
            <span v-if="$v.createAppointmentForm.user_id.$error" class="select-invalid"> Input can't be empty </span>
          </b-form-group>
          <b-form-group label="Appointment datetime">
            <date-picker
              v-model="createAppointmentForm.starting_at"
              value-type="format"
              format="YYYY-MM-DD HH:mm"
              type="datetime"
              placeholder="Choose date"
              :class="{ 'is-invalid': $v.createAppointmentForm.starting_at.$error }"
            />
            <span v-if="$v.createAppointmentForm.starting_at.$error" class="select-invalid">
              Input can't be empty
            </span>
          </b-form-group>
          <b-form-group label="Documents to bring">
            <v-select
              :options="documentListOptions"
              :reduce="(data) => data.value"
              :class="{ 'is-invalid': $v.createAppointmentForm.user_id.$error }"
              @input="handleDocumentToBring"
            >
            </v-select>
            <span v-if="$v.createAppointmentForm.user_id.$error" class="select-invalid"> Input can't be empty </span>
          </b-form-group>
          <b-form-group label="Note">
            <b-form-textarea
              v-model="createAppointmentForm.notes"
              placeholder="Enter"
              rows="3"
              max-rows="3"
              no-resize
            />
          </b-form-group>
          <button :class="['btn', 'btn-success', { pending: pending }]" type="submit">Save task</button>
        </b-form>
      </template>
    </SlideOut>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import draggable from 'vuedraggable'
import { required } from 'vuelidate/lib/validators'
import SlideOut from '../elements/SlideOut.vue'
export default {
  components: {
    draggable,
    SlideOut,
  },
  data() {
    return {
      pending: false,
      showSlideOut: false,
      createAppointmentForm: {
        starting_at: '',
        client_id: '',
        user_id: '',
        appointment_type_id: '',
        title: '',
        notes: '',
        status: 'scheduled',
        documents: [],
      },
    }
  },
  validations: {
    createAppointmentForm: {
      starting_at: { required },
      client_id: { required },
      user_id: { required },
      appointment_type_id: { required },
      status: { required },
    },
  },
  computed: {
    ...mapGetters({
      order: 'orders/orderById',
      documentList: 'orders/document_list',
      documentListOptions: 'orders/documentListOptions',
      appointmentTypeOptions: 'orders/appointmentTypeOptions',
      userListOptions: 'orders/userListOptions',
    }),
    customerProvides() {
      return this.documentList.filter((document) => document.status === 'customer_provide')
    },
    weHandle() {
      return this.documentList.filter((document) => document.status === 'we_handle')
    },
    ready() {
      return this.documentList.filter((document) => document.status === 'ready')
    },
  },
  methods: {
    async handleAttachmentStatusChange(event) {
      const form = {
        order_id: this.$route.params.id,
        status: event.added?.element.id,
      }
      if (event.to.classList.contains('customer-provides')) {
        form.status = 'customer_provide'
      } else if (event.to.classList.contains('we-handle')) {
        form.status = 'we_handle'
      } else if (event.to.classList.contains('ready')) {
        form.status = 'ready'
      }
      await this.$store.dispatch('orders/updateDocumentStatus', { document_id: event.item._underlying_vm_.id, form })
      await this.$store.dispatch('orders/fetchDocumentList', this.$route.params.id)
    },
    handleDocumentToBring(event) {
      const document = {
        id: event,
      }
      if (this.createAppointmentForm.documents.includes(document)) {
        return
      } else {
        this.createAppointmentForm.documents.push(document)
      }
    },
    handleCreateAppointment() {
      this.createAppointmentForm.client_id = this.order.client.id
      this.$v.createAppointmentForm.$touch()
      if (this.$v.createAppointmentForm.$invalid) {
        this.$toast.error('Please fill in all required fields')
        return
      }
      this.pending = true
      this.$store
        .dispatch('orders/createAppointment', {
          form: this.createAppointmentForm,
        })
        .then(() => {
          this.pending = false
          this.showSlideOut = false
          this.$store.dispatch('orders/fetchDocumentList', this.$route.params.id)
        })
    },
  },
}
</script>
