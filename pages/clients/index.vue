<template>
  <div class="clients">
    <PageHeader title="Clients" :show-actions="true">
      <form-field :placeholder="'Search'" :type="'search'"> </form-field>
      <button class="btn btn-success add-new">Add new</button>
    </PageHeader>
    <div class="container">
      <user-table :fields="fields" :with-actions="true">
        <tbody>
          <template v-for="customer in customers">
            <tr :key="customer.id" @click="$router.push(`clients/${customer.id}`)">
              <td>
                <span>{{ customer.name }} {{ customer.surname }}</span>
              </td>
              <td>
                <span>{{ customer.email }}</span>
              </td>
              <td>
                <span>{{ customer.phone }}</span>
              </td>
              <td class="actions" :class="{ active: activeAction === customer.id }">
                <button
                  ref="showActions"
                  v-scroll-to="`#element-${customer.id}`"
                  class="show-actions"
                  @click.stop="toggleActions(customer)"
                >
                  <icon :name="'more'" />
                </button>
                <div
                  v-show="activeAction === customer.id"
                  :id="`element-${customer.id}`"
                  ref="actionsBlock"
                  class="table-actions"
                >
                  >
                  <button>
                    <icon :name="'edit-2'" />
                    Edit
                  </button>
                  <button @click.stop="openModal(customer.id)">
                    <icon :name="'trash'" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </user-table>
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
    await store.dispatch('customers/fetchCustomers')
  },
  data() {
    return {
      fields: ['Customer', 'Email', 'Phone'],
    }
  },
  computed: {
    ...mapGetters({
      customers: 'customers/customers',
    }),
  },
}
</script>
