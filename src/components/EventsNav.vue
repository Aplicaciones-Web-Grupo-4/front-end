<template>
  <nav class="events-nav">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/explore">Explore</router-link></li>
      <li><router-link to="/tickets">Tickets</router-link></li>
      <li><router-link to="/following">Following</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "EventsNav",
};
</script>

<style>
.events-nav {
  background-color: #fffdf8;
  padding: 12px 40px;
  border-bottom: 1px solid #e0e0e0;
}

.events-nav ul {
  display: flex;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.events-nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.events-nav a.router-link-active {
  color: #e6b800;
}
</style>
