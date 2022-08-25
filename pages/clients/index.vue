<template>
  <div class="clients">
    <PageHeader title="Clients" :show-actions="true">
      <template #actions>
        <form-field v-model="search" :placeholder="'Search'" :type="'search'"> </form-field>
        <button class="btn btn-success add-new">Add new</button>
      </template>
    </PageHeader>
    <div class="container">
      <DataTable :fields="fields" :with-actions="true">
        <tbody>
          <template v-for="client in clients">
            <tr :key="client.id" @click="$router.push(`clients/${client.id}`)">
              <td>
                <strong>{{ client.name || '---' }} {{ client.surname || '' }}</strong>
              </td>
              <td>
                <span>{{ client.email || '---' }}</span>
              </td>
              <td>
                <span>{{ client.phone || '---' }}</span>
              </td>
              <td class="actions" :class="{ active: activeAction === client.id }">
                <button
                  ref="showActions"
                  v-scroll-to="`#element-${client.id}`"
                  class="show-actions"
                  @click.stop="toggleActions(client)"
                >
                  <Icon :name="'more'" />
                </button>
                <div
                  v-show="activeAction === client.id"
                  :id="`element-${client.id}`"
                  ref="actionsBlock"
                  class="table-actions"
                >
                  <button>
                    <icon :name="'edit-2'" />
                    Edit
                  </button>
                  <button @click.stop="openModal(client.id)">
                    <icon :name="'trash'" />
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
</template>

<script>
import { TableActionsMixin } from '~/mixins/table-actions'
import { mapGetters } from 'vuex'
import PageHeader from '../../components/layout/PageHeader.vue'
export default {
  components: { PageHeader },
  mixins: [TableActionsMixin],
  async asyncData({ store }) {
    await store.dispatch('clients/fetchClients')
  },
  data() {
    return {
      search: '',
      fields: ['Client', 'Email', 'Phone'],
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
