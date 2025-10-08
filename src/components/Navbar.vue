<template>
  <nav class="navbar">
    <div class="logo">NextHappen</div>
    <ul class="nav-links">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/events">Events</router-link></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
    <div class="nav-right">
      <input type="text" placeholder="Search" class="search-input" />
      <router-link to="/signup">
        <button class="signup-btn">Sign Up</button>
      </router-link>
    </div>
  </nav>
</template>

<style>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 40px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #fffdf8;
}

.logo {
  font-weight: 700;
  font-size: 1.2rem;
}

.nav-links {
  display: flex;
  gap: 24px;
  list-style: none;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.nav-links a.router-link-active {
  color: #e6b800;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.search-input {
  background-color: #f9f4e8;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  width: 180px;
}

.signup-btn {
  background-color: #ffcd00;
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
</style>
