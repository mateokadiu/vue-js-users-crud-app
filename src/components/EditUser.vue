<template>
  <div class="text-center">
    <v-dialog v-model="showModal" width="600">
      <v-card>
        <div class="card-header">
          <v-card-title class="text-h5 lighten-2">
            Edit User Info
          </v-card-title>
          <span @click="hide()" class="cross-sign">
            <div class="cross-sign_circle"></div>
            <div class="cross-sign_stem"></div>
            <div class="cross-sign_stem2"></div>
          </span>
        </div>
        <v-divider></v-divider>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <div class="form-group">
                    <label>Full Name</label>
                    <input v-model="state.name" placeholder="John Gonzales" />
                    <span v-if="v$.name.$error">
                      {{ v$.name.$errors[0].$message }}
                    </span>
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <div class="form-group">
                    <div class="address-label">
                      <label>Address</label>
                      <div class="location">
                        <input v-model="location" type="checkbox" />
                        <label>Use Google Location</label>
                      </div>
                    </div>
                    <!-- <GMapAutocomplete
                    v-model="state.address.street"
                    @place_changed="setPlace"
                    placeholder="Reter 43"
                  >
                  </GMapAutocomplete> -->
                    <input
                      placeholder="Reter 43"
                      v-model="state.address.street"
                    />
                    <span v-if="v$.address.street.$error">
                      {{ v$.address.street.$errors[0].$message }}
                    </span>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <div class="form-group">
                    <label>Username</label>
                    <input
                      placeholder="johngonzales13"
                      v-model="state.username"
                    />
                    <span v-if="v$.username.$error">
                      {{ v$.username.$errors[0].$message }}
                    </span>
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <div class="form-group">
                    <label>City</label>
                    <input placeholder="Tirana" v-model="state.address.city" />
                    <span v-if="v$.address.city.$error">
                      {{ v$.address.city.$errors[0].$message }}
                    </span>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <div class="form-group">
                    <label>Email</label>
                    <input
                      placeholder="johngonzales1332@gmail.com"
                      v-model="state.email"
                    />
                    <span v-if="v$.email.$error">
                      {{ v$.email.$errors[0].$message }}
                    </span>
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <div class="form-group">
                    <label>Zip Code</label>
                    <input placeholder="1060" v-model="state.address.zipcode" />
                    <span v-if="v$.address.zipcode.$error">
                      {{ v$.address.zipcode.$errors[0].$message }}
                    </span>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <div class="form-group">
                    <label>Phone Number</label>
                    <input
                      placeholder="+355 69 76 76 654"
                      v-model="state.phone"
                    />
                    <span v-if="v$.phone.$error">
                      {{ v$.phone.$errors[0].$message }}
                    </span>
                  </div>
                </v-col>

                <v-col v-if="location" cols="12" md="3">
                  <div class="form-group">
                    <label>Latitude</label>
                    <input
                      placeholder="41.327953"
                      v-model="state.address.geo.lat"
                    />
                    <span v-if="v$.address.geo.lat.$error">
                      {{ v$.address.geo.lat.$errors[0].$message }}
                    </span>
                  </div>
                </v-col>

                <v-col v-if="location" cols="12" md="3">
                  <div class="form-group">
                    <label>Longitude</label>
                    <input
                      placeholder="19.819025"
                      v-model="state.address.geo.lng"
                    />
                    <span v-if="v$.address.geo.lng.$error">
                      {{ v$.address.geo.lng.$errors[0].$message }}
                    </span>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <button class="save-button" text @click="submitForm">Save</button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  data() {
    return {
      dialog: true,
      showModal: false,
      user: null,
      location: false,
    };
  },
  setup() {
    const state = reactive({
      name: "",
      username: "",
      email: "",
      address: {
        city: "",
        street: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
      phone: "",
    });
    const rules = {
      name: { required },
      username: { required },
      email: { required, email },
      address: {
        street: { required },
        city: { required },
        zipcode: { required },
        geo: {
          lat: {},
          lng: {},
        },
      },
      phone: { required },
    };

    const v$ = useVuelidate(rules, state);

    return { state, v$ };
  },
  methods: {
    show(user) {
      this.showModal = true;
      this.user = user;
      this.state.name = user.name;
      this.state.username = user.username;
      this.state.email = user.email;
      this.state.phone = user.phone;
      this.state.address.street = user.address.street;
      this.state.address.zipcode = user.address.zipcode;
      this.state.address.city = user.address.city;
      this.state.address.geo.lat = user.address.geo.lat;
      this.state.address.geo.lng = user.address.geo.lng;
    },
    hide() {
      this.showModal = false;
    },
    // setPlace(place){
    //   this.state.address.street = place;
    // },
    submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.editUser({ ...this.state, id: this.user.id });
        this.hide();
      }
    },
  },
  props: {
    editUser: Function,
  },
};
</script>

<style>
.location {
  display: flex;
  align-content: center;
}

.location label {
  margin-left: 10px;
}

.address-label {
  display: flex;
  justify-content: space-between;
}
</style>
