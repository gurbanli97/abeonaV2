<template>
  <div class="consultations">
      <page-header :title="'Consultations'" :showActions="true">
          <button class="btn clear-filters" v-if="filtersActive" @click="$nuxt.$emit('clear-filters')">
                  <icon :name="'eraser-1'"/>
                  <span>Clear filters</span>
              </button>
              <button class="btn open-filters" @click="toggleFilters">
                  <icon :name="!filtersActive ? 'filter-search' : 'close-circle'"/>
                  <span v-if="!filtersActive">Filters</span>
                  <span v-else>Hide Filters</span>
              </button>
             <div class="d-flex justify-content-end open-calendar">
                  <NuxtLink :to="'/consultations/calendar'" class="btn btn-success open-calendar">Calendar</NuxtLink>
             </div>
              <div class="d-flex justify-content-end add-consultation">
                  <NuxtLink :to="'/consultations/add'" class="btn btn-success add-consultation">Add new</NuxtLink>
             </div>
      </page-header>
    <div class="container">
    <user-table :fields="fields">
        <tbody>
               <template v-for="consultation in consultations" >
                <tr :key="consultation.id" @click="$router.push(`consultations/${consultation.id}`)">
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
                    <span>{{consultation.user.display_name}}</span>
                  </td>
                  <td>
                      <badge :category="'status'" :text="consultation.status">
                          {{consultation.status}}
                      </badge>
                  </td>
                  <!-- <td class="actions" :class="{'active':activeAction === consultation.id}">
                    <button class="show-actions" @click="toggleActions(consultation)" v-scroll-to="`#element-${consultation.id}`" ref="showActions">
                      <icon :name="'more'" />
                    </button>
                    <div class="table-actions" v-show="activeAction === consultation.id" :id="`element-${consultation.id}`" ref="actionsBlock">
                      <button>
                        <icon :name="'edit-2'"/>
                        Edit
                      </button>
                      <button @click="openModal(consultation.id)">
                        <icon :name="'trash'"/>
                        Delete
                      </button>
                    </div>
                  </td> -->
                </tr>
              </template>

        </tbody>
    </user-table>
    <modal 
      :toggle="showDeleteModal"
      @close="showDeleteModal = false"
      :item="itemToDelete"
    />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Consultations',
  data() {
    return {
      fields: ['Customer','Date & Time','Travel to','Specialist','Status'],
      activeAction: null,
      showDeleteModal: false,
      itemToDelete: null
    }
  },
  computed: {
    ...mapGetters({
      consultations: 'consultations/consultations',
      filtersActive: 'filtersActive'
    }),
  },
  methods: {
    toggleFilters(){
      this.$store.commit('TOGGLE_FILTERS')
    },
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
      },
      openModal(item){
        this.showDeleteModal = true,
        this.itemToDelete = item
      },
    handleDelete(item){
      console.log('id:',item)
    }
  },
  mounted() {
    this.$nuxt.$on('modal-delete-click', this.handleDelete);
    document.addEventListener('click', this.handleDocClick);
  },
  beforeDestroy() {
    this.$nuxt.$off('modal-delete-click', this.handleDelete);
    document.removeEventListener('click', this.handleDocClick);
  },
  async asyncData({store}){
    await store.dispatch('consultations/fetchConsultations')
  }
}
</script>

<style>

</style>