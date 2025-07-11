<script setup>

</script>

<template>
  <router-view></router-view>
  <header>


    <div class="wrapper">

    </div>
  </header>

  <main>
    <ul>
      <li><router-link to="/incomes" class="menu__link">IncomesPage</router-link></li>
      <li><router-link to="/orders" class="menu__link">OrdersPage</router-link></li>
      <li><router-link to="/sales" class="menu__link">SalesPage</router-link></li>
      <li><router-link to="/stocks" class="menu__link">StocksPage</router-link></li>
    </ul>
  </main>
</template>


