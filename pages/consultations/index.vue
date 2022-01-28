<template>
  <div class="consultations">
      <page-header :title="'Consultations'"/>
    <div class="container">
    <user-table :fields="fields">
        <tbody>
            <template v-for="consultation in consultations" >
              <tr :key="consultation.id">
                <td>
                  <span>{{consultation.customer.name}}</span>
                </td>
                <td>
                  <strong>{{consultation.customer.surname}}</strong>
                </td>
                <td>
                  <strong>{{consultation.travel_to_country}}</strong>
                </td>
                <td>
                  <span>{{consultation.title}}</span>
                </td>
                <td>
                    <badge :status="consultation.status">
                        {{consultation.status}}
                    </badge>
                </td>
                <td class="actions" :class="{'active':activeAction === consultation.id}">
                  <button class="show-actions" @click="toggleActions(consultation)" v-scroll-to="`#element-${consultation.id}`" ref="showActions">
                    <icon :name="'more'" />
                  </button>
                   <div class="table-actions" v-show="activeAction === consultation.id" :id="`element-${consultation.id}`" ref="actionsBlock">
                     <button>
                       <icon :name="'edit-2'"/>
                       Edit
                     </button>
                     <button>
                       <icon :name="'trash'"/>
                       Delete
                     </button>
                   </div>
                </td>
              </tr>
            </template>
        </tbody>
    </user-table>
    </div>
  </div>
</template>

<script>
import PageHeader from '../../components/layout/PageHeader.vue'
import UserTable from '../../components/tables/UserTable.vue'
import { mapGetters } from 'vuex'
export default {
  components: { PageHeader, UserTable },
  data() {
    return {
      fields: ['Customer','Date & Time','Travel to','Specialist','Status'],
      activeAction: null,
    }
  },
  computed: {
    ...mapGetters({
      consultations: 'consultations/consultations'
    })
  },
  methods: {
    toggleActions(item){
        this.activeAction = item.id
    },
    handleDocClick(event) {
        if(this.activeAction === null) {
          return
        }
        let clickedActionBtn = event.target.classList.contains('icon-more');
        let clickedActionBlock = event.target.classList.contains('table-actions');
        
        if(!clickedActionBtn && !clickedActionBlock) {
          this.activeAction = null;
        }
      }
  },
  mounted() {
    document.addEventListener('click', this.handleDocClick);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleDocClick);
  },
  async asyncData({store}){
    await store.dispatch('consultations/fetchConsultations')
  }
}
</script>

<style>

</style>