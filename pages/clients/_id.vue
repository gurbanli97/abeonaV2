<template>
  <div class="clients clients_id">
    <PageHeader :show-back-button="true" :title="'Client name'" :show-border="true" />
    <div class="container">
      <div class="clients-id_inner">
        <div class="client-details row flex-column">
          <div class="col d-flex justify-content-between">
            <h2>Client details</h2>
            <button
              v-if="!editClientDetails"
              id="tooltip-target-edit"
              v-b-tooltip.hover
              @click="editClientDetails = true"
            >
              <b-tooltip
                :custom-class="'client-edit_tooltip'"
                target="tooltip-target-edit"
                triggers="hover"
                placement="topleft"
              >
                Edit client details
              </b-tooltip>
              <icon :name="'edit-2'" />
            </button>
            <button v-else class="btn btn-success save">Save</button>
          </div>
          <div class="col">
            <div v-if="!editClientDetails" class="client-info d-flex justify-content-between">
              <DetailField :label="'Name'">
                <strong>Aysel</strong>
              </DetailField>
              <DetailField :label="'Surname'">
                <strong>Huseynova</strong>
              </DetailField>
              <DetailField :label="'Phone'">
                <strong>+994507224461</strong>
              </DetailField>
              <DetailField :label="'Email'">
                <strong>ali.e.gurbanli@gmail.com</strong>
              </DetailField>
            </div>
            <div v-else class="client-edit_form">
              <b-form class="d-flex justify-content-between">
                <b-form-group>
                  <form-field :placeholder="'Enter'" :label="'Name'" />
                </b-form-group>
                <b-form-group>
                  <form-field :placeholder="'Enter'" :label="'Surname'" />
                </b-form-group>
                <b-form-group>
                  <form-field :placeholder="'Enter'" :label="'Phone'" />
                </b-form-group>
                <b-form-group>
                  <form-field :placeholder="'Enter'" :label="'Email'" />
                </b-form-group>
              </b-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="clients-orders">
      <h2>Client's orders</h2>
      <div class="client-orders_inner">
        <ul>
          <li>
            <DetailField>
              <strong>Aysel Huseynova</strong>
            </DetailField>
            <DetailField>
              <strong>000456</strong>
            </DetailField>
            <DetailField class="travel-country">
              <strong>United States of America</strong>
            </DetailField>
            <DetailField :label="'Tourist'" class="visa-type">
              <strong>30 days single entry visa</strong>
            </DetailField>
            <DetailField class="payment-status">
              <span>Receivable</span>
            </DetailField>
            <DetailField class="order-status">
              <span>
                <icon :name="'tick-circle'" />
                Completed
              </span>
            </DetailField>
            <badge :category="'status'" :text="'Completed'"> Processing </badge>
          </li>
        </ul>
      </div>
    </div>
    <div class="container">
      <div class="clients-applicants">
        <h2>Client's applicants</h2>
        <DataTable :with-actions="false">
          <tbody>
            <template v-for="client in clients">
              <tr :key="client.id" @click="$router.push(`/applicants/${client.id}`)">
                <td>
                  <DetailField :label="'Name'">
                    <strong>{{ client.name }} <span class="client-type"> (Client applicant)</span></strong>
                  </DetailField>
                </td>
                <td>
                  <DetailField :label="'Surname'">
                    <strong>{{ client.surname }}</strong>
                  </DetailField>
                </td>
                <td>
                  <DetailField :label="'Phone'">
                    <strong>{{ client.phone }}</strong>
                  </DetailField>
                </td>

                <td :class="['actions', { active: activeAction === client.id }]">
                  <button ref="showActions" class="show-actions" @click.stop="toggleActions(client)">
                    <Icon :name="'more'" />
                  </button>
                  <div
                    v-show="activeAction === client.id"
                    :id="`element-${client.id}`"
                    ref="actionsBlock"
                    class="table-actions"
                  >
                    <button @click.stop="$router.push(`/applicants/${client.id}/details`)">
                      <Icon :name="'edit-2'" />
                      Edit
                    </button>
                    <button>
                      <Icon :name="'profile-1'" />
                      Make applicant
                    </button>
                    <button @click="openModal(client.id)">
                      <Icon :name="'trash'" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </DataTable>
        <modal :toggle="showDeleteModal" :item="itemToDelete" @close="showDeleteModal = false" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { TableActionsMixin } from '~/mixins/table-actions'
import DetailField from '../../components/elements/DetailField.vue'
import PageHeader from '../../components/layout/PageHeader.vue'
import DataTable from '../../components/tables/DataTable.vue'

export default {
  components: {
    PageHeader,
    DetailField,
    DataTable,
  },
  mixins: [TableActionsMixin],
  async asyncData({ store }) {
    await store.dispatch('clients/fetchClients')
  },
  data() {
    return {
      editClientDetails: false,
    }
  },
  computed: {
    ...mapGetters({
      clients: 'clients/clients',
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
}
</script>
