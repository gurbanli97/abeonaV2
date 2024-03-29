<template>
  <div class="billing">
    <PageHeader title="Billing" show-actions>
      <template #actions>
        <button v-if="filtersActive" class="btn clear-filters" @click="$nuxt.$emit('clear-filters')">
          <icon :name="'eraser-1'" />
          <span>Clear filters</span>
        </button>
        <button class="btn open-filters" @click="toggleFilters">
          <icon :name="!filtersActive ? 'filter-search' : 'close-circle'" />
          <span v-if="!filtersActive">Filters</span>
          <span v-else>Hide Filters</span>
        </button>
        <div class="d-flex justify-content-end mr-3">
          <NuxtLink :to="'/billing/add'" class="btn btn-success excel-export">
            <Icon name="document-download" />
            Export as excel
          </NuxtLink>
        </div>
        <div class="d-flex justify-content-end">
          <NuxtLink :to="'/billing/add'" class="btn btn-success">Create invoice</NuxtLink>
        </div>
      </template>
      <template #filters>
        <div class="col-3">
          <b-form-group>
            <form-field v-model="search" :placeholder="'Enter'" label="Search" type="search" />
          </b-form-group>
        </div>
        <div class="col-3">
          <b-form-group label="Date range">
            <date-picker value-type="format" placeholder="Choose date" range format="YYYY-MM-DD" />
          </b-form-group>
        </div>
        <div class="col-3">
          <b-form-group label="Payment status">
            <v-select placeholder="Choose status" />
          </b-form-group>
        </div>
      </template>
    </PageHeader>
    <div class="container">
      <DataTable :fields="fields">
        <tbody>
          <template v-for="consultation in consultations">
            <tr :key="consultation.id" @click="$router.push(`/billing/${consultation.id}`)">
              <td>
                <span>{{ consultation.client.name }} {{ consultation.client.surname }}</span>
              </td>
              <td>
                <strong>{{ consultation.client.surname }}</strong>
              </td>
              <td>
                <strong>{{ consultation.client.phone }}</strong>
              </td>
              <td>
                <span>{{ consultation.client.email }}</span>
              </td>
              <td>
                <badge :category="'status'" :text="consultation.status">
                  {{ consultation.status }}
                </badge>
              </td>
              <td :class="['actions', { active: activeAction }]">
                <button
                  ref="showActions"
                  v-scroll-to="`#element-${consultation.id}`"
                  class="show-actions"
                  @click.stop="toggleActions(consultation)"
                >
                  <icon :name="'more'" />
                </button>
                <div
                  v-show="activeAction === consultation.id"
                  :id="`element-${consultation.id}`"
                  ref="actionsBlock"
                  class="table-actions"
                >
                  <button @click="$router.push(`/billing/${consultation.id}`)">
                    <icon :name="'edit-2'" />
                    Edit
                  </button>
                  <!-- <button @click="openModal(consultation.id)">
                    <icon :name="'trash'" />
                    Delete
                  </button> -->
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </DataTable>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageHeader from '@/components/layout/PageHeader.vue'
import { TableActionsMixin } from '~/mixins/table-actions'
export default {
  components: { PageHeader },
  mixins: [TableActionsMixin],
  async asyncData({ store }) {
    await store.dispatch('consultations/fetchConsultations')
  },
  data() {
    return {
      search: '',
      fields: [
        'Invoice ID',
        'Order ID',
        'Client',
        'Order type',
        'Amount',
        'Invoice date',
        'Payment status',
        'Payment type',
      ],
    }
  },
  computed: {
    ...mapGetters({
      consultations: 'consultations/consultations',
      filtersActive: 'filtersActive',
    }),
  },
  mounted() {
    this.$nuxt.$on('modal-delete-click', this.handleDelete)
    document.addEventListener('click', this.handleDocClick)
  },
  beforeDestroy() {
    this.$nuxt.$off('modal-delete-click', this.handleDelete)
    document.removeEventListener('click', this.handleDocClick)
  },
  methods: {
    toggleFilters() {
      this.$store.commit('TOGGLE_FILTERS')
    },
  },
}
</script>

<style></style>
