<template>
  <div class="saved-container">
    <nav class="events-nav">
      <h1 class="logo">NextHappen</h1>
      <ul class="nav-links">
        <li><router-link to="/home">Home</router-link></li>
        <li><router-link to="/explore">Explore</router-link></li>
        <li><router-link to="/tickets">Tickets</router-link></li>
        <li><router-link to="/following">Following</router-link></li>
      </ul>
      <div class="nav-actions">
        <input type="text" class="search-bar" placeholder="🔍 Search" />
      </div>
    </nav>

    <div class="saved-content">
      <h2>Saved Events</h2>
      <p class="no-saved-title">No saved events yet</p>
      <p class="no-saved-desc">
        Explore events and tap the heart icon to save them for later.
      </p>
      <button class="explore-btn">Explore</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Events",
};
</script>

<style scoped>
.saved-container {
  font-family: 'Inter', sans-serif;
  background-color: #f9f8f5;
  min-height: 100vh;
  text-align: center;
}

.events-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 48px;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
}

.events-nav .logo {
  font-weight: 700;
  font-size: 1.2rem;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 24px;
}

.nav-links a {
  text-decoration: none;
  color: #000;
  font-weight: 500;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-bar {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #e1e1e1;
  background-color: #f3f1ea;
}

.profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.saved-content {
  margin-top: 60px;
}

.saved-content h2 {
  font-size: 1.5rem;
  margin-bottom: 12px;
}

.no-saved-title {
  font-weight: 600;
  font-size: 1.1rem;
}

.no-saved-desc {
  color: #555;
  margin-bottom: 20px;
}

.explore-btn {
  background-color: #e9e2d0;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.happi-img {
  display: block;
  margin: 40px auto;
  width: 180px;
  opacity: 0.8;
}
</style>
