<template>
  <div class="consultations add-new">
    <page-header :title="'New Consultation'" :showActions="true" :showBackButton="true" />
    <div class="container">
      <div class="add-consultation-inner row">
        <div class="main col-8">
         <div class="forms">
            <b-col xl="12" class="customer-details">
            <h3>Customer details</h3>
            <b-form class="d-flex">
              <b-col xl="6" class="d-flex flex-column align-items-end">
                <b-form-group>
                  <form-field :placeholder="'Enter'" :label="'Name'" />
                </b-form-group>
                <b-form-group>
                  <form-field :placeholder="'+'" :label="'Phone'" />
                </b-form-group>
                <b-form-group label="Citizen of">
                  <v-select :closeOnSelect="true" :clearable="false">
                  </v-select>
                </b-form-group>

                <b-form-group label="Travel to">
                  <v-select :closeOnSelect="true" :clearable="false">
                  </v-select>
                </b-form-group>
                <b-form-group label="Travel date from">
                  <date-picker value-type="format" format="YYYY-MM-DD" placeholder="Choose date" v-model="birthDate" />
                </b-form-group>
                <b-form-group label="Consultation type">
                  <v-select :closeOnSelect="true" :clearable="false">
                  </v-select>
                </b-form-group>
              </b-col>
              <b-col xl="6">
                <b-form-group>
                  <form-field :placeholder="'Enter'" :label="'Surname'" />
                </b-form-group>
                <b-form-group>
                  <form-field :placeholder="'Enter'" :label="'Email'" />
                </b-form-group>

                <b-form-group label="Resident of">
                  <v-select :closeOnSelect="true" :clearable="false">
                  </v-select>
                </b-form-group>
                <b-form-group label="Visa type">
                  <v-select :closeOnSelect="true" :clearable="false">
                  </v-select>
                </b-form-group>

                <b-form-group label="Travel date to">
                  <date-picker value-type="format" format="YYYY-MM-DD" placeholder="Choose date" v-model="birthDate" />
                </b-form-group>
              </b-col>
            </b-form>
          </b-col>
          <b-col xl="12" class="appointment-details">
            <h3>Appointment details</h3>

            <b-form class="d-flex">
              <b-col xl="6">
                <b-form-group label="Date">
                  <date-picker value-type="format" format="YYYY-MM-DD" placeholder="Choose date" v-model="birthDate" />
                </b-form-group>
                 <b-form-group label="Language">
                  <v-select :closeOnSelect="true" :clearable="false">
                  </v-select>
                </b-form-group>
                 <b-form-group label="Specialist">
                  <v-select :closeOnSelect="true" :clearable="false">
                  </v-select>
                </b-form-group>
              </b-col>
               <b-col xl="6">
                <b-form-group label="Date">
                  <date-picker value-type="format" format="YYYY-MM-DD" placeholder="Choose date" v-model="birthDate" />
                </b-form-group>
                 <b-form-group label="Language">
                  <v-select :closeOnSelect="true" :clearable="false">
                  </v-select>
                </b-form-group>
                 <b-form-group label="Specialist">
                  <v-select :closeOnSelect="true" :clearable="false">
                  </v-select>
                </b-form-group>
              </b-col>
            </b-form>
          </b-col>
         </div>
          <b-col xl="12" class="documents d-flex">
            <b-col xl="6">
              <div class="drag-box">
                <div class="box-title">
                  <span>Customer provide</span>
                  <div class="item-count">
                    <span>{{list1.length}}</span>
                  </div>
                </div>
                <draggable class="list-group" :list="list1" group="people" @change="log">
                  <div class="list-group-item" v-for="(element) in list1" :key="element.name">
                    <p>{{ element.name }}</p>

                    <badge :category="'document'" :text="element.document_type"/>
                  </div>
                </draggable>
                <button class="btn btn-borderless">
                  <icon :name="'plus-circle'" />
                  <span>Add file</span>
                </button>
              </div>
            </b-col>
            <b-col xl="6">
              <div class="drag-box">
                <div class="box-title">
                  <span>We handle</span>
                  <div class="item-count">
                    <span>{{list2.length}}</span>
                  </div>
                </div>
               <draggable class="list-group" :list="list2" group="people" @change="log">
                  <div class="list-group-item" v-for="(element) in list2" :key="element.name">
                    <p>{{ element.name }}</p>

                    <badge :category="'document'" :text="element.document_type"/>
                  </div>
                </draggable>
                <button class="btn btn-borderless">
                  <icon :name="'plus-circle'" />
                  <span>Add file</span>
                </button>
              </div>
            </b-col>
          </b-col>


          <div class="customer-search_popup">
            <user-table :fields="fields">
              <tbody>
                    <template v-for="customer in customers" >
                      <tr :key="customer.id">
                        <td>
                          <span>{{customer.name}}</span>
                        </td>
                        <td>
                          <span>{{customer.surname}}</span>
                        </td>
                        <td>
                          <span>{{customer.phone}}</span>
                        </td>
                        <td>
                          <span>{{customer.email}}</span>
                        </td>
                      </tr>
                    </template>
              </tbody>
          </user-table>
          </div>
        </div>
        <div class="checkout col-4">
          <div class="checkout-head">
            <span>Checkout</span>
            <button class="btn btn-borderless" @click="showAddPopup = !showAddPopup">
              <icon :name="'plus-circle'" />
              <span>Add service</span>
            </button>

            <div class="add-service-popup" v-show="showAddPopup">
                <div class="popup-head">
                  <span>Add service</span>
                  <button @click="showAddPopup = false">
                    <icon :name="'close-circle'"/>
                  </button>
                </div>
                <b-form class="popup-form">
                  <b-form-group label="Section">
                  <v-select :closeOnSelect="true" :clearable="false">
                  </v-select>
                </b-form-group>
                <b-form-group>
                  <form-field :placeholder="'Enter'" :label="'Service name'" />
                </b-form-group>
                  <b-form-group>
                  <form-field :placeholder="'Enter'" :label="'Fee (in AZN)'" />
                </b-form-group>
                </b-form>
                <button class="btn btn-success">Save changes</button>
            </div>
          </div>
          <div class="checkout-travel_info">
            <ul>
              <li>
                <span>Visa getting period:</span>
                <strong>3-5 business days</strong>
              </li>
              <li>
                <span>Duration of stay:</span>
                <strong>3 month</strong>
              </li>
            </ul>
          </div>
          <div class="checkout-fees">
            <h3>Visa fee</h3>
            <ul>
              <li>
                <span>Consultation fee</span>
                <strong>272 AZN</strong>
              </li>
              <li>
                <span>Our processing fee</span>
                <strong>90.1 AZN</strong>
              </li>
            </ul>
          </div>
            <div class="checkout-other_services">
            <h3>Other services</h3>
            <ul>
              <li>
                <span>Document fee</span>
                <strong>272 AZN</strong>
              </li>
            </ul>
          </div>
              <div class="checkout-total">
                <h3>Total</h3>
                <strong>412.1 AZN</strong>
            </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker'
  import draggable from 'vuedraggable'

  export default {
    order: 1,
    components: {
      DatePicker,
      draggable
    },
    data() {
      return {
        birthDate: '',
        showAddPopup: false,
        customers: [
          {
            id: 1,
            name: 'Ali',
            surname: 'Gurbanli',
            phone: '+994507224461',
            email: 'ali.e.gurbanli@gmail.com'
          },
             {
            id: 2,
            name: 'Ali',
            surname: 'Gurbanli',
            phone: '+994507224461',
            email: 'ali.e.gurbanli@gmail.com'
          },
            {
            id: 3,
            name: 'Ali',
            surname: 'Gurbanli',
            phone: '+994507224461',
            email: 'ali.e.gurbanli@gmail.com'
          }
        ],
        fields: ['Name','Surname','Phone','Email'],
        list1: [{
            name: "Bank account statement/Evidence of sufficient funds",
            document_type: 'Translated',
            id: 1
          },
          {
            name: "Work reference from e-government portal",
            document_type: 'Translated',
            id: 2
          },
          {
            name: "Jean",
            document_type: 'Copy',
            id: 3
          },
          {
            name: "Gerard",
            document_type: 'Original',
            id: 4
          }
        ],
        list2: [{
            name: "Juan",
            id: 5
          },
          {
            name: "Edgard",
            id: 6
          },
          {
            name: "Johnson",
            id: 7
          }
        ]
      };
    },
    methods: {
      // add: function () {  
      //   this.list.push({
      //     name: "Juan"
      //   });
      // },
      // replace: function () {
      //   this.list = [{
      //     name: "Edgard"
      //   }];
      // },
      // clone: function (el) {
      //   return {
      //     name: el.name + " cloned"
      //   };
      // },
      log: function (evt) {
        window.console.log(evt);
      }
    }
  };
</script>

<style>

</style>