<template>
	<div class="clients clients_id">
		<page-header :showBackButton="true" :title="'Client name'" :showBorder="true" />
		<div class="container">
			<div class="clients-id_inner">
				<div class="client-details row flex-column">
					<div class="col d-flex justify-content-between">
						<h2>Client details</h2>
						<button v-b-tooltip.hover id="tooltip-target-edit" @click="editClientDetails = true"
							v-if="!editClientDetails">
							<b-tooltip :customClass="'client-edit_tooltip'" target="tooltip-target-edit" triggers="hover"
								placement="topleft">
								Edit client details
							</b-tooltip>
							<icon :name="'edit-2'" />
						</button>
						<button class="btn btn-success save" v-else>
							Save
						</button>
					</div>
					<div class="col">
						<div class="client-info d-flex justify-content-between" v-if="!editClientDetails">
							<detail-field :label="'Name'">
								<strong>Aysel</strong>
							</detail-field>
							<detail-field :label="'Surname'">
								<strong>Huseynova</strong>
							</detail-field>
							<detail-field :label="'Phone'">
								<strong>+994507224461</strong>
							</detail-field>
							<detail-field :label="'Email'">
								<strong>ali.e.gurbanli@gmail.com</strong>
							</detail-field>
						</div>
						<div class="client-edit_form" v-else>
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
							<detail-field>
							<strong>Aysel Huseynova</strong>
						</detail-field>
						<detail-field>
							<strong>000456</strong>
						</detail-field>
						<detail-field class="travel-country">
							<strong>United States of America</strong>
						</detail-field>
						<detail-field :label="'Tourist'" class="visa-type">
							<strong>30 days single entry visa</strong>
						</detail-field>
						<detail-field class="payment-status">
							<span>Receivable</span>
						</detail-field>
							<detail-field class="order-status">
							<span>
								<icon :name="'tick-circle'"/>
								Completed
								</span>
						</detail-field>
						<badge :category="'status'" :text="'Completed'">
									Processing
						</badge>
					</li>
				</ul>
			</div>
		</div>
		<div class="container">
			<div class="clients-applicants">
				<h2>Client's applicants</h2>
				<user-table :withActions="false">
					<tbody>
						<template v-for="customer in customers">
							<tr :key="customer.id">
								<td>
									<detail-field :label="'Name'">
										<strong>{{customer.name}} <span class="client-type"> (Client applicant)</span></strong>
									</detail-field>
								</td>
								<td>
									<detail-field :label="'Surname'">
										<strong>{{customer.surname}}</strong>
									</detail-field>
								</td>
								<td>
									<detail-field :label="'Phone'">
										<strong>{{customer.phone}}</strong>
									</detail-field>
								</td>

								<td class="actions" :class="{'active':activeAction === customer.id}">
									<button class="show-actions" @click="toggleActions(customer)" ref="showActions">
										<icon :name="'more'" />
									</button>
									<div class="table-actions" v-show="activeAction === customer.id" :id="`element-${customer.id}`"
										ref="actionsBlock">
										<button>
											<icon :name="'edit-2'" />
											Edit
										</button>
										<button>
											<icon :name="'profile-1'" />
											Make applicant
										</button>
										<button @click="openModal(customer.id)">
											<icon :name="'trash'" />
											Delete
										</button>
									</div>
								</td>
							</tr>
						</template>
					</tbody>
				</user-table>
				<modal :toggle="showDeleteModal" @close="showDeleteModal = false" :item="itemToDelete" />
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		TableActionsMixin
	} from '~/mixins/table-actions'
	import DetailField from '../../components/elements/DetailField.vue'
	import PageHeader from '../../components/layout/PageHeader.vue'
	import UserTable from '../../components/tables/UserTable.vue'

	export default {
		components: {
			PageHeader,
			DetailField,
			UserTable
		},
		mixins: [TableActionsMixin],
		data() {
			return {
				editClientDetails: false
			}
		},
		computed: {
			...mapGetters({
				customers: 'customers/customers',
			}),
		},
		mounted() {
			console.log(this.customers)
		},
		async asyncData({
			store
		}) {
			await store.dispatch('customers/fetchCustomers')
		}

	}
</script>

<style>

</style>