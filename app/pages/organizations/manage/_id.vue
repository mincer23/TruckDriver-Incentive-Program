<template>
  <div>
    <Header :page-title="'Manage ' + orgData.name" :header-image="getHeaderImage" />
    <b-container>
      <b-row>
        <b-col cols="12">
          <b-card title="Manage Drivers">
            <b-container>
              <b-row v-for="driver in orgData.drivers" :key="driver.id" class="py-1">
                <b-col cols="8">
                  {{ driver.firstName + ' ' + driver.lastName }}
                </b-col>
                <b-col cols="3">
                  <b-button block>
                    Adjust Points
                  </b-button>
                </b-col>
                <b-col cols="1">
                  <b-button variant="danger" block @click.prevent="removeDriver(driver.id, driver.firstName + ' ' + driver.lastName)">
                    Kick
                  </b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
        <b-col cols="12">
          <b-card title="Manage Staff">
            <b-container>
              <b-row v-for="staff in orgData.staff" :key="staff.id" class="py-1">
                <b-col cols="8">
                  {{ staff.firstName + ' ' + staff.lastName }}
                </b-col>
                <b-col cols="4">
                  <b-button v-if="orgData.staff.length > 1" variant="danger" block @click.prevent="removeStaff(staff.id, staff.firstName + ' ' + staff.lastName)">
                    Kick
                  </b-button>
                  <b-button v-else variant="danger" block disabled>
                    Can't kick the only staff!
                  </b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
        <b-col cols="12">
          <b-card title="Upload Header Image">
            <b-form @submit="uploadHeaderImage">
              <b-form-file
                v-model="headerImage"
                name="headerImage"
                placeholder="Select header image file (.JPG, .PNG, .GIF, .SVG)"
                drop-placeholder="Drop file here!"
                accept="image/*"
              />
              <b-button type="submit" variant="primary">
                Upload
              </b-button>
            </b-form>
          </b-card>
        </b-col>
        <b-col cols="12">
          <b-card title="Add Sponsor User">
            <b-form @submit="createStaff">
              <br>
              <label>First Name</label>
              <b-form-input
                v-model="firstName"
                type="text"
                name="firstName"
                placeholder="First..."
              />
              <br>
              <label>Last Name</label>
              <b-form-input
                v-model="lastName"
                type="text"
                name="lastName"
                placeholder="Last..."
                required
              />
              <br>
              <label>Username</label>
              <b-form-input
                v-model="username"
                type="text"
                name="username"
                placeholder="Username..."
                required
              />
              <br>
              <label>Email</label>
              <b-form-input
                v-model="email"
                type="text"
                name="email"
                placeholder="Email..."
                required
              />
              <br>
              <label>Confirm Email</label>
              <b-form-input
                v-model="confirmEmail"
                type="text"
                name="confirmEmail"
                placeholder="Retype email.."
              />
              <br>
              <label>Password</label>
              <b-form-input
                v-model="password"
                v-on:input="isPasswordStrong"
                type="password"
                name="password"
                placeholder="Password..."
              />
              <client-only>
                <Password v-model="password" :strength-meter-only="true" />
              </client-only>
              <br>
              <label>Confirm Password</label>
              <b-form-input
                v-model="confirm"
                type="password"
                name="confirm"
                placeholder="Retype Password..."
              />
              <br>
              <label>Select Your Security Question</label>
              <b-form-select v-model="question" name="question" required>
                <option value=null>Choose question...</option>
                <option value="0">What was your first car?</option>
                <option value="1">What was the name of your first pet?</option>
                <option value="2">What high school did you attend?</option>
                <option value="3">What is your dream job?</option>
                <option value="4">What is the name of your favorite sports team?</option>
              </b-form-select>
              <br>
              <br>
              <label>Security Question Answer</label>
              <b-form-input
                v-model="answer"
                type="text"
                name="answer"
                placeholder="Type your answer..."
                required
              />
              <br>
              <Notification class="error" v-if="email!=confirmEmail" :message="error_email" />
              <Notification class="error" v-if="password!=confirm" :message="error_password" />
              <Notification class="error" v-if="strong!=true && password!=''" :message="error_strong" />
              <Notification v-if="status" class="success" :message="success_newUser" />
              <b-button :disabled="password!=confirm || strong!=true || email!=confirmEmail" type="submit" variant="primary" class="button is-fullwidth">
                Update Password
              </b-button>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Password from '~/node_modules/vue-password-strength-meter'
import Notification from '~/components/Notification'
import zxcvbn from '~/node_modules/zxcvbn'
export default {
  async asyncData ({ $http, params, res }) {
    if (!params?.id) {
      res.redirect('/organizations')
    }
    const orgData = await $http.$get('/api/organizations/' + params.id)
    return { orgData, orgId: params.id }
  },
  componets: {
    Notification,
    Password
  },
  data () {
    return {
      headerImage: null,
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      username: '',
      password: '',
      confirm: '',
      strong: null,
      error_email: 'Emails do not match',
      error_password: 'Passwords do not match',
      error_strong: 'Password is too weak',
      success_newUser: 'Successfully created new Sponsor user!',
      question: null,
      answer: '',
      status: null
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getHeaderImage'])
  },
  methods: {
    async removeDriver (id, fullName) {
      const result = await this.$http.$delete('/api/organizations/' + this.orgId + '/driver/' + id)
      if (result) {
        alert('Successfully removed driver: ' + fullName)
      }
    },
    async removeStaff (id, fullName) {
      const result = await this.$http.$delete('/api/organizations/' + this.orgId + '/staff/' + id)
      if (result) {
        alert('Successfully removed staff: ' + fullName)
      }
    },
    async uploadHeaderImage (event) {
      event.preventDefault()
      const formdata = new FormData(event.target)
      const result = await this.$http.$put('/api/organizations/' + this.orgId, formdata)
      if (result) {
        alert('Successfully uploaded new header image!')
      }
    },
    async createStaff (event) {
      event.preventDefault()
      const data = {
        userName: this.userName,
        password: this.password,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        question: this.question,
        answer: this.answer
      }
      const result = await this.$http.$post('/api/organizations/' + this.orgId + '/user', data)
      this.status = !!result
    },
    isPasswordStrong () {
      if (zxcvbn(this.password).score > 2) {
        this.strong = true
      } else {
        this.strong = false
      }
    }
  }
}
</script>

<style scoped>
.error {
  margin: 10px 0px;
  padding: 20px;
  color: #D8000C;
  background-color: #FFD2D2;
  border: 1px solid;
  box-shadow: 1px 1px 3px #888;
  border-radius: .5em;
  text-align: center;
}
.success {
  margin: 10px 0px;
  padding: 20px;
  color: #4F8A10;
  background-color: #DFF3BF;
  border: 1px solid;
  box-shadow: 1px 1px 3px #888;
  border-radius: .5em;
  text-align: center;
}
</style>
