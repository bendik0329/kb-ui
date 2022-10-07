<template>
  <b-card>

    <!-- media -->
    <b-media no-body>
      <b-media-aside>
        <b-link>
          <b-img
            v-if="optionsLocal.avatar"
            ref="previewEl"
            rounded
            :src="optionsLocal.avatar"
            height="80"
          />
          <b-avatar
            v-else
            size="70px"
            square
            class="mr-1"
          />
        </b-link>
        <!--/ avatar -->
      </b-media-aside>

      <b-media-body class="mt-75 ml-75">
        <!-- upload button -->
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          size="sm"
          class="mb-75 mr-75"
          @click="$refs.refInputEl.$el.click()"
        >
          Upload
        </b-button>
        <b-form-file
          ref="refInputEl"
          v-model="profileFile"
          accept=".jpg, .png, .gif"
          :hidden="true"
          plain
          @input="inputImageRenderer"
        />
        <!--/ upload button -->

        <!-- reset -->
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          variant="outline-secondary"
          size="sm"
          class="mb-75 mr-75"
        >
          Reset
        </b-button>
        <!--/ reset -->
        <b-card-text>Allowed JPG, GIF or PNG. Max size of 800kB</b-card-text>
      </b-media-body>
    </b-media>
    <!--/ media -->

    <!-- form -->
    <b-form class="mt-2">
      <b-row>
        <b-col sm="12">
          <b-form-group
            label="Username"
            label-for="account-username"
          >
            <b-form-input
              v-model="optionsLocal.username"
              placeholder="Username"
              name="username"
            />
          </b-form-group>
        </b-col>
        <b-col sm="12">
          <b-form-group
            label="Full Name"
            label-for="account-name"
          >
            <b-form-input
              v-model="optionsLocal.fullName"
              name="name"
              placeholder="Name"
            />
          </b-form-group>
        </b-col>
        <b-col sm="12">
          <b-form-group
            label="E-mail"
            label-for="account-e-mail"
          >
            <b-form-input
              v-model="optionsLocal.email"
              name="email"
              placeholder="Email"
            />

          </b-form-group>
        </b-col>
        <b-col sm="12">
          <b-form-group
            label="Company"
            label-for="account-company"
          >
            <b-form-input
              v-model="optionsLocal.company"
              name="company"
              placeholder="Company name"
            />
          </b-form-group>
        </b-col>

        <b-col sm="12">
          <b-form-group
            label="Phone"
            label-for="account-phone"
          >
            <b-form-input
              v-model="optionsLocal.phone"
              name="phone"
              placeholder="Phone name"
            />
          </b-form-group>
        </b-col>

        <!-- alert -->
        <b-col
          cols="12"
          class="mt-75"
        >
          <b-alert
            show
            variant="warning"
            class="mb-50"
          >
            <h4 class="alert-heading">
              Your email is not confirmed. Please check your inbox.
            </h4>
            <div class="alert-body">
              <b-link class="alert-link">
                Resend confirmation
              </b-link>
            </div>
          </b-alert>
        </b-col>
        <!--/ alert -->

        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-2 mr-1"
            @click.prevent="editProfile()"
          >
            Save changes
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            type="reset"
            class="mt-2"
            @click.prevent="resetForm"
          >
            Reset
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BAvatar,BFormFile, BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BAlert, BCard, BCardText, BMedia, BMediaAside, BMediaBody, BLink, BImg,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'

export default {
  components: {
    BButton,
    BForm,
    BImg,
    BAvatar,
    BFormFile,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BAlert,
    BCard,
    BCardText,
    BMedia,
    BMediaAside,
    BMediaBody,
    BLink,
  },
  directives: {
    Ripple,
  },
  props: {
    generalData: {
      type: Object,
      default: () => {},
    },
    profile: {
      type: Object,
      // default: () => {},
      default () { return {} },
    },
  },
  watch: {
    profile () {
      this.tempProfile = this.profile
      console.log(this.tempProfile)
    }
  },
  data() {
    return {
      optionsLocal: JSON.parse(JSON.stringify(this.generalData)),
      profileFile: null,
      tempProfile: {},
    }
  },
  methods: {
    editProfile() {
        console.log(this.tempProfile ,this.profile)
        const uid = JSON.parse(localStorage.getItem('userData')).id
        const url =`http://${this.GLOBAL.server}:3000/me-page/profile/${uid}`
        this.$http.patch(url,this.optionsLocal)
        .then(res => {
            console.log(res.data)
        })
    },
    resetForm() {
      this.optionsLocal = JSON.parse(JSON.stringify(this.generalData))
    },
  },
  setup() {
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, previewEl)

    return {
      refInputEl,
      previewEl,
      inputImageRenderer,
    }
  },
  mounted () {
    console.log(this.optionsLocal)
  }
}
</script>
