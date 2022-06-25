<template>
   <div class="passport-details">
          <h3>Customer passports</h3>
          <div class="passport-details_inner">
            <b-tabs>
              <b-tab title="Passport: C123230">
                <button class="btn btn-success ml-auto">---</button>
                <div class="row">
                  <div class="col-12 d-flex  justify-content-between mb-4">
                    <detail-field label='Passport number'>
                      <strong>C123230</strong>
                    </detail-field>
                    <detail-field label='Surname'>
                      <strong>Agayev</strong>
                    </detail-field>
                    <detail-field label='Name'>
                      <strong>Ibrahim</strong>
                    </detail-field>
                    <detail-field label='Patronymic'>
                      <strong>Hasan</strong>
                    </detail-field>

                  </div>
                  <div class="col-12 d-flex justify-content-between mb-4">
                    <detail-field label='Nationality'>
                      <strong>Azerbaijan</strong>
                    </detail-field>
                    <detail-field label='PIN'>
                      <strong>HDF8563</strong>
                    </detail-field>
                    <detail-field label='Date of birth'>
                      <strong>18.11.1993</strong>
                    </detail-field>
                    <detail-field label='Date of issue'>
                      <strong>02.06.2022</strong>
                    </detail-field>

                  </div>
                  <div class="col-12 d-flex justify-content-between">
                    <detail-field label='Date of expiry'>
                      <strong>02.05.2032</strong>
                    </detail-field>
                    <detail-field label='Issuing authority'>
                      <strong>Baku, Narimanov district. Passport department</strong>
                    </detail-field>
                    <detail-field label='Gender'>
                      <strong>Male</strong>
                    </detail-field>
                    <detail-field label='Expired reason'>
                      <strong>N/A</strong>
                    </detail-field>
                  </div>
                  <div class="col-12 passport-upload mt-5 d-flex align-items-center">
                    <div class="passport-upload_input">
                      <label for="passport-input">
                        <div>
                          <h3>Passport image</h3>
                          <span>png, jpg, pdf</span>
                        </div>
                        <strong>Choose</strong>
                        <input type="file" id="passport-input" hidden>
                      </label>
                    </div>
                    <div class="passport-active_checkbox d-flex align-items-center">
                      <label for="passport-active">
                        <input type="checkbox" id="passport-active">
                        <span>This passport is active</span>
                      </label>
                    </div>
                  </div>

                </div>
              </b-tab>
              <b-tab title="Passport: C12322130">
                <p>I'm the second tab</p>
              </b-tab>
            </b-tabs>
          </div>
        </div>
</template>

<script>
export default {

}
</script>

<style>

</style>