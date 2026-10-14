<script setup lang="ts">

</script>

<template>

<div class="topnav">
<img class="logo" src="/images/logos/Think-different-Academy_LOGO_cerny.svg">
<div class="auth">
<button>Sign up</button>
<button>Log in</button>
</div>
</div>



<router-view/>
</template>

<style scoped>

.topnav {
  
  
  display: flex;
  align-items: flex-start;
  background-color: aqua;
  margin: 0% 0% 1% 0%;
  border: 0px solid black;
  border-radius: 20px;
  
  
}
.logo{
    
    
    width: clamp(2em, 10vw, 200rem);
    height: auto;
    

}
.auth{
  
  
    margin-left: auto; 
  display: flex;
  align-items: center;
  
    flex-direction: row;
}


</style>