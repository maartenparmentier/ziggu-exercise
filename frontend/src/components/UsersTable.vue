<template>
  <div v-if="error">
    {{ error }}
  </div>
  <div v-else>
    <table class="table is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Id</th>
          <th>Avatar</th>
          <SortableTableHeader
            headerName="last_name"
            :sortedAttribute="sortedAttribute"
            :sortedDirection="sortedDirection"
            @set-sort-params="setSortParams">
            Last Name
            <template #desc>&darr;</template>
            <template #asc>&uarr;</template>
          </SortableTableHeader>
          <SortableTableHeader
            headerName="first_name"
            :sortedAttribute="sortedAttribute"
            :sortedDirection="sortedDirection"
            @set-sort-params="setSortParams">
            First Name
          </SortableTableHeader>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <UsersTableRow
          v-for="user in users"
          :user="user"
          :key="user.id"/>
      </tbody>
    </table>

    <TablePagination
      :current-page="page"
      :total-pages="totalPages"
      :per-page="perPage"
      @set-page="setPage"
      @set-per-page="setPerPage" >
      <template #previous>&lsaquo;</template>
      <template #next>&rsaquo;</template>
    </TablePagination>
  </div>
</template>

<script>
import UsersTableRow from '@/components/UsersTableRow.vue'
import TablePagination from '@/components/TablePagination.vue'
import SortableTableHeader from '@/components/SortableTableHeader.vue'

export default {
  components: {
    UsersTableRow,
    TablePagination,
    SortableTableHeader
  },

  name: 'UsersTable',

  data() {
    return {
      users: [],
      error: '',
      page: 1,
      perPage: 10,
      totalPages: 1,
      sortedDirection: 'asc',
      sortedAttribute: 'last_name'
    }
  },

  created() {
    this.fetchUsers();
  },

  methods: {
    async fetchUsers() {
      try {
        const { page, perPage, sortedAttribute, sortedDirection } = this;
        const response = await fetch(`//127.0.0.1:3000/api/v1/users?page=${page}&per_page=${perPage}&sort=${sortedAttribute}&direction=${sortedDirection}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();

        this.users = data.users
        this.totalPages = data.meta.total_pages
      } catch(e) {
        this.error = 'Something went wrong while loading your data';
      }
    },
    setPage(page) {
      this.page = page;

      this.fetchUsers();
    },
    setPerPage(perPage) {
      this.perPage = perPage;
      this.page = 1;

      this.fetchUsers();
    },
    setSortParams({sortAttribute, sortDirection}) {
      this.sortedDirection = sortDirection;
      this.sortedAttribute = sortAttribute;

      this.fetchUsers();
    }
  }
}
</script>
