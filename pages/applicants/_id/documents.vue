<template>
  <div class="applicant applicant-documents">
    <PageHeader title="Applicant documents" show-back-button show-actions>
      <template #actions>
        <button class="btn btn-success download-files">
          <Icon name="document-download" />
          Download all files
        </button>
      </template>
    </PageHeader>
    <div class="container">
      <div class="applicant-documents_inner">
        <b-tabs>
          <b-tab title="Documents">
            <div class="row justify-content-between">
              <div class="col-lg-7">
                <div class="document-items">
                  <ul>
                    <li
                      v-for="document in documents"
                      :key="document.id"
                      class="d-flex align-items-center justify-content-between"
                    >
                      <div class="title">
                        <span>{{ document.title }}</span>
                      </div>
                      <div class="actions d-flex align-items-center">
                        <button class="btn">
                          <Icon name="trash" />
                        </button>
                        <button class="btn">
                          <Icon name="document-download" />
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-4">
                <client-only>
                  <Dropzone
                    id="passport-dropzone"
                    :destroy-dropzone="true"
                    :options="dropzoneOptions"
                    @vdropzone-thumbnail="handleDropzoneAttach"
                  />
                </client-only>
              </div>
            </div>
          </b-tab>
          <b-tab title="Passports"></b-tab>
          <b-tab title="Visas"></b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'
export default {
  name: 'ApplicantDocuments',
  components: {
    Dropzone,
  },
  data() {
    return {
      documents: [
        {
          id: 1,
          title: 'Bank account statement/Evidence of sufficient funds',
        },
        {
          id: 2,
          title: 'Certificate of employment/Student ID',
        },
        {
          id: 3,
          title: 'Work reference from e-government portal',
        },
      ],
      dropzoneOptions: {
        url: '/api/v1/scanner/scan',
        maxFiles: 1,
        uploadMultiple: false,
        autoProcessQueue: false,
        addRemoveLinks: true,
        previewTemplate: this.template(),
        thumbnailWidth: null,
        thumbnailHeight: null,
        autoDiscover: false,
        dictDefaultMessage: this.message(),
      },
    }
  },
  methods: {
    template: function () {
      return '<div style="display:flex !important" class="dz-preview d-flex align-items-center flex-column dz-file-preview">\n  <div class="dz-details">\n  <img data-dz-thumbnail class="img-responsive img-thumbnail_custom" />\n  <div class="dz-filename"><span data-dz-name></span></div>\n    <div class="dz-size" data-dz-size></div>\n<div class="dz-success-mark"><img src="https://img.icons8.com/fluent/48/000000/checkmark.png"/></div>\n  <div class="dz-error-mark"><img src="https://img.icons8.com/fluent/50/000000/no-image.png"/></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n</div>'
    },
    message() {
      return '<div class="dropzone-custom-message"><h2>Drag drop passport file here</h2> <span>or</span> <button class="btn">Upload</button> <span>png, jpg ,pdf</span></div>'
    },
    handleDropzoneAttach(file, dataUrl) {
      console.log(file, dataUrl)
    },
  },
}
</script>
