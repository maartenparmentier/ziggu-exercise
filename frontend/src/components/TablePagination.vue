<!--
  The minimal version of this component can be invoked with
  <TablePagination
    :current-page="page"
    :total-pages="totalPages"
    @set-page="setPage"
    @set-per-page="setPerPage"/>

  In case you want to specify your own previous or next button content, pass
  <TablePagination ...>
    <template #previous>&lsaquo;</template>
    <template #next>&rsaquo;</template>
  </TablePagination>

  If you want to be able to change the amount of records per page, pass
  <TablePagination :per-page="perPage" .../>
 -->

<template>
  <div v-if="perPage" class="block select is-rounded">
    <select :value="perPage" @change="$emit('set-per-page',$event.target.value)">
      <option>10</option>
      <option>25</option>
      <option>50</option>
    </select>
  </div>
  <nav class="pagination is-centered is-rounded mb-4" role="navigation" aria-label="pagination">
    <a @click="goToPage(currentPage - 1)" class="pagination-previous" :disabled="currentPage === 1 ? 'true' : null">
      <slot name="previous">
        Previous
      </slot>
    </a>
    <a @click="goToPage(currentPage + 1)" class="pagination-next" :disabled="currentPage === totalPages ? 'true' : null">
      <slot name="next">
        Next page
      </slot>
    </a>
    <ul class="pagination-list">
      <li v-for="n in pageRangeWithDots" :key="n">
        <a @click="goToPage(n)" class="pagination-link" :class="{ 'is-current': isCurrentPage(n) }">{{n}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'TablePagination',

  emit: ['set-page', 'set-per-page'],

  props: {
    currentPage: {
      type: Number,
      required: true,
      default: 1
    },
    totalPages: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number
    }
  },

  computed: {
    // https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
    pageRangeWithDots() {
      let current = this.currentPage,
        last = this.totalPages,
        delta = 1,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

      for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
      }

      for (let i of range) {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
            rangeWithDots.push('...');
          }
        }
        rangeWithDots.push(i);
        l = i;
      }

      return rangeWithDots;
    }
  },

  methods: {
    isCurrentPage(n) {
      return n === this.currentPage;
    },
    goToPage(newPage) {
      if(typeof newPage !== 'number') return;
      if(newPage === this.currentPage || newPage === 0 || newPage > this.totalPages) return;

      this.$emit('set-page', newPage);
    }
  }
}
</script>

<style scoped>
  .pagination-list {
    flex-grow: 0
  }
  nav {
    justify-content: center;
  }
</style>
