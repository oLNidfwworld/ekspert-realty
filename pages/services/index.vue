<script setup>

</script>
<template>
  <div>
    <ServicesBlocks :only4="false"></ServicesBlocks>
  </div>
</template>
<style scoped lang="postcss">

  .services{

    &-item{

    }

    &-title{
      @apply text-center;
      border:1px solid var(--grey-light);
    }

  }

  .img-n{
    @apply min-h-[150px];
    background: var(--grey-light);
  }
</style>