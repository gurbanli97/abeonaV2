<template>
  <div class="order-tasks">
      <div class="order-tasks_inner">
        <button class="btn ml-auto add-task" @click="showAddSlideOut = true">
          <icon name="plus-circle"/>
          Add task
        </button>
          <user-table :fields="tableFields" :withActions="true">
            <tbody>
              <tr v-for="task in taskList" :key="task.id">
                <td style="width: 400px">
                  <p>{{task.title}}</p>
                </td>
                <td>{{task.assignee.display_name ? task.assignee.display_name : 'None'}}</td>
                <td>{{task.due_date ? $moment(task.due_date).format('DD.MM.YYYY') : 'None'}}</td>
                <td>  
                  <badge :category="'status'" :text="task.status"/>
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
               <b-form>
                  <b-form-group label="Topic">
                    <b-form-textarea
                    placeholder="Enter  "
                    rows="3"
                    max-rows="3"
                    no-resize
                  />
                  </b-form-group>
                  <b-form-group label="Assigned to">
                    <v-select>
                    </v-select>
                  </b-form-group>
                    <b-form-group label="Due date">
                      <date-picker
                      value-type="format" 
                      format="YYYY-MM-DD" 
                      placeholder="Choose date"
                      v-model="dateFrom"
                          />
                  </b-form-group>
                   <b-form-group label="Due date time">
                      <date-picker
                      value-type="format" 
                      format="YYYY-MM-DD" 
                      placeholder="Choose date"
                      v-model="dateFrom"
                          />
                  </b-form-group>
                     <b-form-group label="Status">
                    <v-select>
                    </v-select>
                  </b-form-group>
                  <button class="btn btn-success" type="submit">Save task</button>
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
               <b-form>
                  <b-form-group label="Topic">
                    <b-form-textarea
                    placeholder="Enter"
                    rows="3"
                    max-rows="3"
                    no-resize
                  />
                  </b-form-group>
                  <b-form-group label="Assigned to">
                    <v-select>
                    </v-select>
                  </b-form-group>
                    <b-form-group label="Due date">
                      <date-picker
                      value-type="format" 
                      format="YYYY-MM-DD" 
                      placeholder="Choose date"
                      v-model="dateFrom"
                          />
                  </b-form-group>
                     <b-form-group label="Status">
                    <v-select>
                    </v-select>
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
                    <div class="add_attachment">
                      <div class="attachment-upload_input mb-4">
                          <label for="attachment-input">
                            <div>
                              <h3>Add an attachment</h3>
                              <span>png, jpg, pdf</span>
                            </div>
                            <strong>Choose</strong>
                            <input type="file" id="attachment-input" hidden @change="handleUpload($event)">
                          </label>
                        </div>
                        <div class="attachment-upload_progress" v-if="taskAttachment">
                          <div class="attachment-progress_inner d-flex flex-column align-items-start">
                            <span>{{taskAttachment}}</span>
                            <div class="progressbar d-flex align-items-center">
                              <b-progress height="4px" :max="max">
                                <b-progress-bar :value="progressValue"></b-progress-bar>
                              </b-progress>
                              <button class="btn">
                                <icon name="close-circle-2" />
                              </button>
                            </div>


                          </div>
                        </div>
                    </div>
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
import Modal from '../elements/Modal.vue'
import UserTable from '../tables/UserTable.vue'
export default {
  components: { UserTable, Modal },
  name: 'Tasks',
  data(){
    return {
      progressValue: 0,
      max: 100,
      showDeleteModal: false,
      taskAttachment: '',
      showAddSlideOut: false,
      showEditSlideOut: false,
      itemToEdit: null,
      itemToDelete: null,
      dateFrom: '',
      tableFields: ['Topic','Assigned to','Due date','Status']
    }
  },
  computed: {
    ...mapGetters({
      taskList: 'orders/order_tasks'
    }),
    editSlideOutItem(){
      return this.taskList.find(t => t.id === this.itemToEdit)
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
    handleUpload(event) {
        console.log(event.target.files);

        let formData = new FormData();
        formData.append('file', event.target.files[0])
        this.taskAttachment = event.target.files[0].name

        this.$axios.post('/api/v1/attachments',
            formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              onUploadProgress: function (progressEvent) {
                this.progressValue = parseInt(Math.round((progressEvent.loaded / progressEvent
                  .total) * 100));

                console.log(this.progressValue)
              }.bind(this)
            }
          ).then(function () {
            console.log('SUCCESS!!');

          })
          .catch(function () {
            console.log('FAILURE!!');
          });
      },
    handleEditSlideOut(id){
      this.showEditSlideOut = true,
      this.itemToEdit = id
    },
    handleAttachmentDelete(id){
      this.$store.dispatch('orders/deleteTaskAttachment',id)
    }
  },
  mounted(){
    console.log(this.taskList)
  }
}
</script>

<style>

</style>