<template>
  <div class="content-wrapper">
    <button class="add-button" @click="openAddDialog">
      <div class="plus"></div>
      Create New User
    </button>
    <div class="table-wrapper">
      <table>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td class="icons">
              <v-img
                @click="openEditDialog(user)"
                style="cursor: pointer"
                src="../assets/svg/edit_icon.svg"
                alt="Edit user"
              ></v-img>
              <v-img
                @click="removeUser(user)"
                style="cursor: pointer"
                src="../assets/svg/delete_icon.svg"
                alt="Delete user"
              ></v-img>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <AddUser :addUser="addUser" ref="AddUser"></AddUser>
  <EditUser :editUser="editUser" ref="EditUser"></EditUser>
</template>

<script>
import AddUser from "./AddUser.vue";
import EditUser from "./EditUser.vue";
let id = 0;
export default {
  data() {
    return {
      users: [],
      dialog: false,
    };
  },
  methods: {
    submitForm() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        if (this.mode === "add") this.users.push({ id: ++id, ...this.state });
        if (this.mode == "edit") this.users.filter((u) => u == u);
        alert("Form successfully submitted.");
        this.dialog = true;
      } else {
        //TODO
      }
    },
    async fetchUsers() {
      this.users = [];
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      this.users = await res.json();
      id = this.users[9].id;
    },
    openAddDialog() {
      this.$refs.AddUser.show();
    },
    openEditDialog(user) {
      this.$refs.EditUser.show(user);
    },
    addUser(user) {
      this.users.push({ id: ++id, ...user });
    },
    editUser(user) {
      this.users = this.users.map((u) => {
        if (u.id == user.id) {
          return { id: u.id, ...user };
        }
        return u;
      });
    },
    removeUser(user) {
      this.users = this.users.filter((u) => u != user);
    },
  },
  mounted() {
    this.fetchUsers();
  },
  components: { AddUser, EditUser },
};
</script>

<style>
.content-wrapper {
  width: 80%;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  color: #4e5964;
}

.add-button {
  align-self: flex-end;
  height: 40px;
  background-color: #3c81fc;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;
  margin-right: 10px;
}

.plus {
  width: 22px;
  height: 22px;
  position: relative;
  bottom: 1px;
  right: 3px;
}

.plus::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 2px;
  margin-top: -5px;
  border-top: 10px solid;
}

.plus::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  height: 2px;
  margin-left: -4px;
  margin-top: -1px;
  border-left: 10px solid;
}
.table-wrapper {
  width: 100%;
  margin-top: 10px;
}
table {
  width: inherit;
  border-spacing: 0 10px;
}
th {
  height: 2.2rem;
  text-align: left;
  position: relative;
}
th:first-child {
  left: 15px;
}
th:nth-child(2) {
  left: 10px;
}

th:nth-child(3) {
  left: 5px;
}

td {
  min-height: 2.5rem;
  border: 1px solid #e7eaf3;
  border-left: none;
  border-right: none;
  padding: 5px;
  position: relative;
  min-width: 3rem;
}

td:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-left: 1px solid #e7eaf3;
  left: 10px;
}
td:nth-child(2) {
  left: 5px;
}

td:nth-child(4) {
  right: 5px;
}

td:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-right: 1px solid #e7eaf3;
  right: 10px;
}
.v-img {
  max-width: 1.3rem;
  flex-direction: row;
  min-width: 1.3rem;
}
.icons {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

@media screen and (max-width: 880px) {
  .content-wrapper {
    width: 90%;
    min-height: 100vh;
  }
  td {
    height: 60px;
  }
}

@media screen and (max-width: 600px) {
  .table-wrapper {
    max-width: 600px;
    overflow-x: scroll;
  }
}
</style>
