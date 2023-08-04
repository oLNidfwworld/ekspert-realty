<script setup>
import   TheHeader   from '/components/TheHeader'
import   TheFooter   from '/components/TheFooter'
import   EBtn   from '/components/Base/E-btn'
import {useRoute} from "nuxt/app";
  const props = defineProps(['error']);
  const route = useRoute();

</script>
<template>
  <div class="page-wrapper" >
    <TheHeader></TheHeader>

      <div class="content-wrapper">
        <div class="error__code"> {{ error.statusCode }} </div>
        <div class="error__description" v-if="error.statusCode == 404"> Страница по адресу <b>{{ error.url }}</b> не найдена или удалена <br> </div>
        <div class="error__description " v-else> Произошла непредвиденная ошибка! <br> Пожалуйста, свяжитесь с разработчиками  </div>
        <div class="error__debug-trace" v-if="route.query.admindebug ==1 "> <pre>{{ error }}</pre>  </div>

        <EBtn class="mt-4" to='/'>На главную</EBtn>
      </div>

    <TheFooter></TheFooter>
  </div>

</template>
<style scoped>
.page{
&-wrapper{
   @apply flex flex-col;
   min-height:70vh;
 }
}
.content{
&-wrapper{
   @apply flex flex-col items-center overflow-hidden;
   min-height:70vh;
 }
}
  .error{
    &__code{
      @apply text-[100px] md:text-[200px] lg:text-[340px]  my-8;
     }
     &__description{
      @apply text-center text-[15px] md:text-[30px];
      }
      &__debug-trace{
        @apply text-left text-[20px];
       padding:0 20px;
      margin: 30px 0;
       background:black;
       color: #2dff2d;
        pre{
          white-space: break-spaces;
        }
       }
  }
</style>
