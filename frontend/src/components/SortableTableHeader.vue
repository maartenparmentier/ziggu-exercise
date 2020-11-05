<template>
  <th @click="onClick()">
    <span v-if="headerName === sortedAttribute">
      <span v-if="sortedDirection === 'desc'"><slot name="desc">&#x25BC;</slot></span>
      <span v-else><slot name="asc">&#x25B2;</slot></span>
    </span>
    <slot></slot>
  </th>

</template>


<script>
export default {
  name: 'SortableTableHeader',

  emit: ['set-sort-params'],

  props: {
    sortedAttribute: {
      type: String,
      required: true
    },
    sortedDirection: {
      type: String,
      required: true
    },
    headerName: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    onClick() {
      const params = {
        sortAttribute: this.headerName,
        sortDirection: 'asc'
      };

      if(this.sortedAttribute === this.headerName) {
        params.sortDirection = this.sortedDirection === 'asc' ? 'desc' : 'asc';
      }

      this.$emit('set-sort-params', params);
    },
  }
}
</script>
