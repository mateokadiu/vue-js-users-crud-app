<template>
  <div class="text-center">
    <v-dialog v-model="showModal" width="600">
      <v-card>
        <div class="card-header">
          <v-card-title class="text-h5 lighten-2"> New User Info </v-card-title>
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
                  </GMapAutocomplete>-->
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
import { required, email, helpers } from "@vuelidate/validators";

export default {
  data() {
    return {
      dialog: true,
      showModal: false,
      location: false,
    };
  },
  setup() {
    const phoneRegex = helpers.regex(/^\+(?:[0-9] ?){6,14}[0-9]$/);
    const phoneMessage = helpers.withMessage(
      "Phone number format invalid!",
      phoneRegex
    );
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
      phone: { required, phoneMessage },
    };

    const v$ = useVuelidate(rules, state);

    return { state, v$ };
  },
  methods: {
    show() {
      this.showModal = true;
    },
    hide() {
      this.showModal = false;
      this.state.name = "";
      this.state.username = "";
      this.state.email = "";
      this.state.phone = "";
      this.state.address.street = "";
      this.state.address.zipcode = "";
      this.state.address.city = "";
      this.state.address.geo.lat = "";
      this.state.address.geo.lng = "";
      this.v$.$reset();
    },
    // setPlace(place){
    //   this.state.address.street = place;
    // },
    submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.addUser(this.state);
        this.hide();
      }
    },
  },
  props: {
    addUser: Function,
  },
};
</script>

<style>
.card-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.cross-sign {
  display: inline-block;
  width: 22px;
  height: 22px;
  position: relative;
  transform: rotate(45deg);
  align-self: center;
  margin-right: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.cross-sign:hover {
  filter: brightness(90%);
}

.cross-sign_circle {
  position: absolute;
  width: 22px;
  height: 22px;
  background-color: #f4f7fb;
  border-radius: 11px;
  left: 0;
  top: 0;
}

.cross-sign_stem,
.cross-sign_stem2 {
  position: absolute;
  background-color: #ccd2e3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cross-sign_stem {
  width: 3px;
  height: 9px;
}

.cross-sign_stem2 {
  width: 9px;
  height: 3px;
}
.v-card {
  color: #4e5964;
}
.v-card-title {
  font-weight: 600;
  letter-spacing: 2px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group input {
  outline: none;
  color: #4e5964;
  border: 1px solid #e7eaf3;
  padding: 5px 10px;
  border-radius: 5px;
}

.form-group input::placeholder {
  color: #c4c4c4;
}

.form-group label {
  margin-bottom: 5px;
  font-size: 0.9rem;
  font-weight: 500;
}

.form-group span {
  font-size: 0.6rem;
}

.location {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.location label {
  margin: 0;
  font-weight: 400;
}

.location input {
  vertical-align: middle;
}

.address-label {
  display: flex;
  justify-content: space-between;
}

.save-button {
  background: #3c81fc;
  color: #fff;
  font-size: 1rem;
  letter-spacing: 1px;
  padding: 5px 30px;
  border-radius: 5px;
  margin-right: 30px;
  margin-bottom: 20px;
}
</style>
