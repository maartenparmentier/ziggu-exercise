<template>
  <tr >
    <th>{{user.id}}</th>
    <td class="avatar-cell">
      <span>
        <figure class="image is-32x32 is-centered">
          <img class="is-rounded" :src="user.avatar_url">
        </figure>
      </span>
    </td>
    <td>{{user.last_name}}</td>
    <td>{{user.first_name}}</td>
    <td>{{user.email}}</td>
  </tr>
</template>


<script>
export default {
  name: 'UsersTableRow',

  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
  .avatar-cell {
    width: 8rem;
  }
  .avatar-cell > span {
    display: flex;
    justify-content: center;
  }
</style>
