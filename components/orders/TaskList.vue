<template>
  <div class="order-tasks">
      <div class="order-tasks_inner">
        <button class="btn ml-auto add-task" @click="handleAddSlideOut">
          <icon name="plus-circle"/>
          Add task
        </button>
          <user-table :fields="tableFields" :withActions="true">
            <tbody>
              <tr v-for="task in taskList" :key="task.id">
                <td style="width: 400px">
                  <p>{{task.title}}</p>
                </td>
                <td>
                  <strong>{{task.id}}</strong>
                </td>
                <td><strong>{{task.assignee.display_name ? task.assignee.display_name : 'None'}}</strong></td>
                <td><span>{{task.due_date ? $moment(task.due_date).format('DD.MM.YYYY') : 'None'}}</span></td>
                <td>  
                  <badge :category="'status'" :text="$capitalizeString(task.status)"/>
                </td>
                <td>
                  <button @click="handleEditSlideOut(task.id)">
                    <icon name="edit-2"/>
                  </button>
                </td>
              </tr>
            </tbody>
          </user-table>

            <slide-out 
            :slideIsActive="showAddSlideOut" 
            @close-slide="showAddSlideOut = false" 
            title="Add task" 
            >
             <template #body>
               <b-form @submit.prevent="handleAddTaskFormSubmit" ref="addTaskForm">
                  <b-form-group label="Title">
                     <form-field 
                     :placeholder="'Enter'" 
                     v-model="addTaskForm.title"
                     :is-invalid="$v.addTaskForm.title.$error" 
                     >
                    <b-form-invalid-feedback v-if="!$v.addTaskForm.title.$required">
                      Input can't be empty
                    </b-form-invalid-feedback>
                  </form-field>
                  </b-form-group>
                  <b-form-group label="Description">
                    <b-form-textarea
                    placeholder="Enter"
                    rows="3"
                    max-rows="3"
                    no-resize
                    v-model="addTaskForm.description"
                    :class="{'is-invalid':$v.addTaskForm.description.$error}" 
                  />
                    <b-form-invalid-feedback v-if="!$v.addTaskForm.description.$required">
                      Input can't be empty
                    </b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group label="Assigned to">
                    <v-select
                     v-model="addTaskForm.user"
                     :options="userListOptions"
                     :reduce="data => data.value"
                     :class="{'is-invalid':$v.addTaskForm.user.$error}"
                     >
                    </v-select>
                     <span class="select-invalid" v-if="$v.addTaskForm.user.$error">
                         Input can't be empty
                     </span>
                  </b-form-group>
                    <b-form-group label="Due date">
                      <date-picker
                      value-type="format" 
                      format="YYYY-MM-DD" 
                      placeholder="Choose date"
                      v-model="addTaskForm.due_date"
                      :class="{'is-invalid':$v.addTaskForm.due_date.$error}"
                          />
                      <span class="select-invalid" v-if="$v.addTaskForm.due_date.$error">
                      Input can't be empty
                     </span>
                  </b-form-group>
                  <b-form-group label="Label">
                     <form-field 
                     :placeholder="'Enter'"
                      v-model="addTaskForm.label"
                     :is-invalid="$v.addTaskForm.label.$error" 
                     >
                    <b-form-invalid-feedback v-if="!$v.addTaskForm.label.$required">
                      Input can't be empty
                    </b-form-invalid-feedback>
                  </form-field>
                  </b-form-group>
                     <b-form-group label="Status">
                    <v-select 
                      v-model="addTaskForm.status"
                      :options="taskStatusOptions"
                      :reduce="data => data.value"
                       :class="{'is-invalid':$v.addTaskForm.status.$error}"
                     >
                    </v-select>
                     <span class="select-invalid" v-if="$v.addTaskForm.status.$error">
                         Input can't be empty
                     </span>
                  </b-form-group>
                 <b-form-group>
                    <div class="add_attachment mt-4" v-for="(attachment,index) in addTaskForm.attachments" :key="index">
                      <div class="attachment-upload_input mb-4" v-if="!addTaskForm.attachments[index]['file']">
                          <label :for='index'>
                            <div>
                              <h3>Add an attachment</h3>
                              <span>png, jpg, pdf</span>
                            </div>
                            <strong>Choose</strong>
                            <input type="file" :id="index" hidden @change="handleUpload($event,'addTaskForm')">
                          </label>
                           
                        </div>
                        <div class="attachment-upload_progress" v-if="addTaskForm.attachments[index]['file']">
                          <div class="attachment-progress_inner d-flex flex-column align-items-start">
                            <!-- <span>{{editTaskForm.attachments[index]['file']}}</span> -->
                            <img :src="addTaskForm.attachments[index]['file']" alt="" style="width:50px;height: auto;margin:auto;">
                          </div>
                        </div>
                         <b-form-group class="mt-4" label="Document type">
                            <v-select
                            v-model="addTaskForm.attachments[index]['document_id']"
                            :options="documentListOptions"
                            :reduce="data => data.value"
                            :class="{'is-invalid':$v.addTaskForm.user.$error}"
                            >
                            </v-select>
                            <span class="select-invalid" v-if="$v.addTaskForm.user.$error">
                                Input can't be empty
                            </span>
                          </b-form-group>
                    </div>
                     <button class="btn ml-auto add-task"  @click.prevent="handleAddMoreAttachments('addTaskForm')">
                        <icon name="plus-circle"/>
                        Add more
                      </button>
                 </b-form-group>
                  <button :class="['btn','btn-success',{'pending':pending}]" type="submit">Save task</button>
               </b-form>

            </template>
      </slide-out>
      <slide-out
            v-if="itemToEdit"
            :slideIsActive="showEditSlideOut" 
            @close-slide="showEditSlideOut = false" 
            title="Edit task" 
            >
             <template #body>
               <b-form @submit.prevent="handleEditTaskFormSubmit">
                 <b-form-group label="Title">
                     <form-field 
                     :placeholder="'Enter'" 
                     v-model="editTaskForm.title"
                     :is-invalid="$v.editTaskForm.title.$error" 
                     >
                    <b-form-invalid-feedback v-if="!$v.editTaskForm.title.$required">
                      Input can't be empty
                    </b-form-invalid-feedback>
                  </form-field>
                  </b-form-group>
                  <b-form-group label="Description">
                    <b-form-textarea
                    placeholder="Enter"
                    rows="3"
                    max-rows="3"
                    no-resize
                    v-model="editTaskForm.description"
                    :class="{'is-invalid':$v.editTaskForm.description.$error}" 
                  />
                    <b-form-invalid-feedback v-if="!$v.editTaskForm.description.$required">
                      Input can't be empty
                    </b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group label="Assigned to">
                    <v-select
                     v-model="editTaskForm.user"
                     :options="userListOptions"
                     :reduce="data => data.value"
                     :class="{'is-invalid':$v.editTaskForm.user.$error}"
                     >
                    </v-select>
                     <span class="select-invalid" v-if="$v.editTaskForm.user.$error">
                         Input can't be empty
                     </span>
                  </b-form-group>
                    <b-form-group label="Due date">
                      <date-picker
                      value-type="format" 
                      format="YYYY-MM-DD" 
                      :placeholder="$moment(editTaskForm.due_date).format('YYYY-MM-DD')"
                      v-model="editTaskForm.due_date"
                      :class="{'is-invalid':$v.editTaskForm.due_date.$error}"
                          />
                      <span class="select-invalid" v-if="$v.editTaskForm.due_date.$error">
                      Input can't be empty
                     </span>
                  </b-form-group>
                  <b-form-group label="Label">
                     <form-field 
                     :placeholder="'Enter'"
                      v-model="editTaskForm.label"
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
                      :reduce="data => data.value"
                       :class="{'is-invalid':$v.editTaskForm.status.$error}"
                     >
                    </v-select>
                     <span class="select-invalid" v-if="$v.editTaskForm.status.$error">
                         Input can't be empty
                     </span>
                  </b-form-group>
                 <b-form-group>
                   <div class="edit-task_attachments" v-if="editSlideOutItem.attachments.length ">
                    <span>Attachments</span>
                     <ul class="attachments-list" v-for="attachment in editSlideOutItem.attachments" :key="attachment.id">
                        <li class="attachments-list_item">
                          <icon :name="checkAttachmentFileType(attachment.title)"/>
                          <a :href="`https://stg.abeona.pickvisa.com/${attachment.file}`" target="_blank">{{attachment.title.split('/').pop()}}</a>
                          <button class="btn" @click.prevent="handleAttachmentDelete(attachment.id)">
                            <icon name="trash"/>
                          </button>
                        </li>
                      </ul>
                  </div>
                 </b-form-group>
                 <b-form-group>
                    <div class="add_attachment mt-4" v-for="(attachment,index) in editTaskForm.attachments" :key="index">
                      <div class="attachment-upload_input mb-4" v-if="!editTaskForm.attachments[index]['file']">
                          <label :for='index'>
                            <div>
                              <h3>Add an attachment</h3>
                              <span>png, jpg, pdf</span>
                            </div>
                            <strong>Choose</strong>
                            <input type="file" :id="index" hidden @change="handleUpload($event,'editTaskForm')">
                          </label>
                           
                        </div>
                        <div class="attachment-upload_progress" v-if="editTaskForm.attachments[index]['file']">
                          <div class="attachment-progress_inner d-flex flex-column align-items-start">
                            <!-- <span>{{editTaskForm.attachments[index]['file']}}</span> -->
                            <img :src="editTaskForm.attachments[index]['file']" alt="" style="width:50px;height: auto;margin:auto;">
                          </div>
                        </div>
                         <b-form-group class="mt-4" label="Document type">
                            <v-select
                            v-model="editTaskForm.attachments[index]['document_id']"
                            :options="documentListOptions"
                            :reduce="data => data.value"
                            :class="{'is-invalid':$v.editTaskForm.user.$error}"
                            >
                            </v-select>
                            <span class="select-invalid" v-if="$v.editTaskForm.user.$error">
                                Input can't be empty
                            </span>
                          </b-form-group>
                    </div>
                     <button class="btn ml-auto add-task"  @click.prevent="handleAddMoreAttachments('editTaskForm')">
                        <icon name="plus-circle"/>
                        Add more
                      </button>
                 </b-form-group>
                  <!-- <div class="edit-task_comments">
                    <h4></h4>
                     <ul>
                        <li></li>
                      </ul>
                  </div> -->
                  <button class="btn btn-success" type="submit">Save</button>
               </b-form>
               <modal :item="itemToDelete" :toggle="showDeleteModal"/> 
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
export default {
  components: { UserTable, Modal },
  name: 'Tasks',
  data(){
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
      tableFields: ['Topic','Task id','Assigned to','Due date','Status'],
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
           file: ''
         }
        ]
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
           file: null
         }
        ]
      }
    }
  },
  validations: {
      addTaskForm: {
        title: {required},
        description: {required},
        user: {required},
        due_date: {required},
        label: {required},
        status: {required}
      },
      editTaskForm: {
        title: {required},
        description: {required},
        user: {required},
        due_date: {required},
        label: {required},
        status: {required}
      }
  },
  computed: {
    ...mapGetters({
      taskList: 'orders/order_tasks',
      userListOptions: 'orders/userListOptions',
      taskStatusOptions: 'orders/taskStatusOptions',
      documentListOptions: 'orders/documentListOptions'
    }),
    editSlideOutItem(){
      return this.taskList.find(task => task.id === this.itemToEdit)
    },
  },
  methods: {
    checkAttachmentFileType(file){
      const fileType = file.split('.').pop()
      // const regex = /\.(jpe?g|png|gif|bmp)$/i.test(fileType)

      switch(fileType){
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
    handleUpload(event,form) {
       var reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onload = () => {
            this[form].attachments[event.target.id]['file'] = reader.result
        };
      
    },
    async handleAddSlideOut(){
      this.showAddSlideOut = true
    }, 
      handleEditSlideOut(id){
      this.itemToEdit = id
      if(this.editSlideOutItem){
        this.editTaskForm.title = this.editSlideOutItem.title
        this.editTaskForm.description = this.editSlideOutItem.description
        this.editTaskForm.user = this.editSlideOutItem.assignee?.id
        this.editTaskForm.status = this.editSlideOutItem.status
        this.editTaskForm.due_date = this.editSlideOutItem.due_date
        this.editTaskForm.label = this.editSlideOutItem.label
      }
        this.showEditSlideOut = true
    },
    handleAttachmentDelete(id){
      this.$store.dispatch('orders/deleteTaskAttachment',id)
    },
    async handleAddTaskFormSubmit(){
      this.$v.addTaskForm.$touch();
       if (this.$v.addTaskForm.$invalid){
          this.$toast.error('Please fill in all required fields')
          return
      }
      this.pending = true
      await this.$store.dispatch('orders/createNewOrderTask',this.addTaskForm)
      await this.$store.dispatch('orders/fetchOrderTasks',this.$route.params.id)
      this.pending = false
      this.addTaskForm = {}
      this.$v.addTaskForm.$reset()
      this.addTaskForm.order= this.$route.params.id
      this.showAddSlideOut = false
    },
    async handleEditTaskFormSubmit(){
      this.$v.editTaskForm.$touch();
       if (this.$v.editTaskForm.$invalid){
          this.$toast.error('Please fill in all required fields')
          return
      }
      this.pending = true
      await this.$store.dispatch('orders/updateExistingOrderTask',{task_id: this.itemToEdit,form:this.editTaskForm})
      await this.$store.dispatch('orders/fetchOrderTasks',this.$route.params.id)
      this.pending = false
      this.$v.editTaskForm.$reset()
      this.editTaskForm.order_id= this.$route.params.id
      this.showEditSlideOut = false
    },
    handleAddMoreAttachments(form){
      const newAttachment =  {
           document_id: '',
           file: null
      }
      this[form].attachments.push(newAttachment)
    }
  },
}
</script>

<style>

</style>