<template>
  <div class="consultations consultation_id">
    <page-header :title="'Consultation details'" :showActions="true" :showBackButton="true" :showBorder="true" />
    <div class="container">
      <div class="add-consultation-inner row justify-content-between">
        <div class="main col-8">
          <div class="forms">
            <b-col xl="12" class="customer-details">
              <h3>Customer details</h3>
              <b-form class="d-flex">
                <b-col xl="6" class="d-flex flex-column pl-0">
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
                    <strong>ali.e@gmail.com</strong>
                  </detail-field>
                  <detail-field :label="'Citizen of'">
                    <strong>Azerbaijan</strong>
                  </detail-field>

                </b-col>
                <b-col xl="6">
                  <detail-field :label="'Resident of'">
                    <strong>Azerbaijan</strong>
                  </detail-field>
                  <detail-field :label="'Travel to'">
                    <strong>France</strong>
                  </detail-field>
                  <detail-field :label="'Visa type'">
                    <strong>14.05.2022</strong>
                  </detail-field>
                  <detail-field :label="'Travel date from'">
                    <strong>14.05.3033</strong>
                  </detail-field>
                  <detail-field :label="'Travel date to'">
                    <strong>14.05.2022</strong>
                  </detail-field>
                </b-col>
              </b-form>
            </b-col>
            <b-col xl="12" class="appointment-details">
              <h3>Appointment details</h3>

              <b-form class="d-flex">
                <b-col xl="6" class="pl-0">
                  <detail-field :label="'Travel date to'">
                    <strong>14.05.2022</strong>
                  </detail-field>
                  <detail-field :label="'Specialist'">
                    <strong>Ibrahim Suleymanov</strong>
                  </detail-field>
                  <detail-field :label="'Additional notes'">
                    <strong>Additional notes here</strong>
                  </detail-field>
                </b-col>
                <b-col xl="6">
                  <detail-field :label="'Language'">
                    <strong>English</strong>
                  </detail-field>
                  <detail-field :label="'Specialist time'">
                    <strong>14:00</strong>
                  </detail-field>
                  <detail-field :label="'Status'">
                    <badge :category="'status'" :text="'Pending'" />
                  </detail-field>
                </b-col>
              </b-form>
            </b-col>
          </div>
          <b-col xl="12" class="documents d-flex">
            <b-col xl="6" class="pl-0">
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

                    <badge :category="'document'" :text="element.document_type" />
                  </div>
                </draggable>
                <button class="btn btn-borderless">
                  <icon :name="'plus-circle'" />
                  <span>Add file</span>
                </button>
              </div>
            </b-col>
            <b-col xl="6" class="pr-0">
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

                    <badge :category="'document'" :text="element.document_type" />
                  </div>
                </draggable>
                <button class="btn btn-borderless">
                  <icon :name="'plus-circle'" />
                  <span>Add file</span>
                </button>
              </div>
            </b-col>
          </b-col>


        </div>
        <aside>
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
                    <icon :name="'close-circle'" />
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
          <div class="visachance-score">
            <div class="visachance-score_head">
              <h3>Visa chance score</h3>
              <button class="btn btn-info">Recheck</button>
            </div>
            <div class="visachance-score_progress">
              <client-only>
                <vue-ellipse-progress :progress="100" dot="7">
                  <span slot="legend-value">
                    %
                  </span>
                  <div slot="legend-caption">
                    <p class="mb-0">Excellent</p>
                  </div>
                </vue-ellipse-progress>
              </client-only>
            </div>
            <button class="btn">
              <icon :name="'message-question'"/>
              View questions
            </button>
          </div>
        </aside>
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
      draggable,
    },
    data() {
      return {
        gradient: {
          radial: false,
          colors: [
            {
              color: '#EF3565',
              offset: 0,
              opacity: '1',
            },
            {
              color: '#8068E0',
              offset: 0,
              opacity: '1',
            },
            {
              color: '#42CCF6',
              offset: 0,
              opacity: '1',
            },
            {
              color: '#5CE09C',
              offset: 0,
              opacity: '1',
            },
          ]
        },
        birthDate: '',
        showAddPopup: false,
        customers: [{
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
        fields: ['Name', 'Surname', 'Phone', 'Email'],
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