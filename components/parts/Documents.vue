<template>
  <div class="documents">
      <div class="documents_inner">
         <b-col xl="12" class="documents d-flex">
              <div class="drag-box">
                <div class="box-title">
                  <span>Customer provide</span>
                  <div class="item-count">
                    <span>{{customerProvides.length}}</span>
                  </div>
                </div>
                <draggable
                    class="list-group customer-provides"
                    :list="customerProvides"
                    group="people"
                    @end="handleAttachmentStatusChange"
                     :emptyInsertThreshold="100"
                  >
                  <div class="list-group-item" v-for="(document) in customerProvides" :key="document.id">
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
                    <span>{{weHandle.length}}</span>
                  </div>
                </div>
                <draggable 
                 class="list-group we-handle"
                 :list="weHandle" group="people" 
                 @end="handleAttachmentStatusChange"
                 :emptyInsertThreshold="100"
                 >
                  <div class="list-group-item" v-for="(document) in weHandle" :key="document.id">
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
                    <span>{{ready.length}}</span>
                  </div>
                </div>
                <draggable 
                class="list-group ready" 
                :list="ready" 
                group="people" 
                @end="handleAttachmentStatusChange"
                :emptyInsertThreshold="100"
                >
                  <div class="list-group-item" v-for="(document) in ready" :key="document.id">
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
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'
export default {
  components: {
      draggable,
  },
  data(){
    return {
      
    }
  },
  computed: {
    ...mapGetters({
      documentList: 'orders/document_list'
    }),
    customerProvides(){
      return this.documentList.filter(document => document.status === 'customer_provide')
    },
    weHandle(){
      return this.documentList.filter(document => document.status === 'we_handle')
    },
    ready(){
      return this.documentList.filter(document => document.status === 'ready')
    }
  },
  methods: {
      async handleAttachmentStatusChange(event){
        console.log(event)
        const form = {
          order_id: this.$route.params.id,
          status: event.added?.element.id,
        }
        if(event.to.classList.contains('customer-provides')){
          form.status = 'customer_provide'
        }
        else if(event.to.classList.contains('we-handle')){
          form.status = 'we_handle'
        }
        else if(event.to.classList.contains('ready')){
          form.status = 'ready'
        }
        console.log(form)
        await this.$store.dispatch('orders/updateDocumentStatus',{document_id: event.item._underlying_vm_.id, form})
        await this.$store.dispatch('orders/fetchDocumentList',this.$route.params.id)
      }
    }
}
</script>

<style>

</style>