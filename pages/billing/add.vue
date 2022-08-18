<template>
  <div class="billing add-new">
    <PageHeader title="Add invoice" show-back-button show-actions>
      <button class="btn btn-success">Save invoice</button>
    </PageHeader>
    <div class="container">
      <div class="actions d-flex align-items-center justify-content-between flex-wrap">
        <b-form-group label="Customer">
          <v-select :close-on-select="true" :clearable="false"> </v-select>
        </b-form-group>
        <b-form-group label="Currency">
          <v-select :close-on-select="true" :clearable="false"> </v-select>
        </b-form-group>
        <b-form-group label="Payment type">
          <v-select :close-on-select="true" :clearable="false"> </v-select>
        </b-form-group>
        <b-form-group label="Payment method">
          <v-select :close-on-select="true" :clearable="false"> </v-select>
        </b-form-group>
      </div>
      <DataTable :fields="fields">
        <tbody>
          <template v-for="(row, index) in invoiceRows">
            <tr :key="row.id">
              <td>
                <strong>#{{ index + 1 }}</strong>
              </td>
              <td>
                <form-field :placeholder="'Enter'" />
              </td>
              <td>
                <form-field :placeholder="'Enter'" />
              </td>
              <td style="max-width: 100px">
                <form-field :placeholder="'Enter'" />
              </td>
              <td style="max-width: 100px">
                <form-field :placeholder="'Enter'" />
              </td>
              <td style="max-width: 100px">
                <v-select :close-on-select="true" :clearable="false"> </v-select>
              </td>
              <td class="d-flex align-items-center justify-content-center">
                <b-form-checkbox />
                <button
                  v-if="invoiceRows.length > 1"
                  class="d-flex align-items-center justify-content-center"
                  @click="handleRowDelete(index)"
                >
                  <Icon name="trash" />
                </button>
              </td>
            </tr>
          </template>
        </tbody>
        <button class="btn add-row" @click="handleAddRow">
          <Icon name="plus-circle" />
          Add row
        </button>
      </DataTable>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: ['', 'Title', 'Description', 'Quantity', 'Unit price', 'Currency', 'Only payment'],
      invoiceRows: [
        {
          id: 1,
          title: 'Service 1',
          description: 'Service 1 description',
          quantity: 1,
          unitPrice: 100,
          currency: 'USD',
          onlyPayment: false,
        },
      ],
    }
  },
  methods: {
    handleAddRow() {
      this.invoiceRows.push({
        id: this.invoiceRows.length + 1,
        title: '',
        description: '',
        quantity: 1,
        unitPrice: 100,
        currency: 'USD',
        onlyPayment: false,
      })
    },
    handleRowDelete(index) {
      this.invoiceRows.splice(index, 1)
    },
  },
}
</script>
