<script setup>
import {useFavoriteStore} from "../../store/favorite";
const favorite = useFavoriteStore()

const props = defineProps({
  productId: Number,
  enableText: {
    type: Boolean,
    default: false
  }
})
onMounted(() => {})
const isFavorite = computed(() => favorite.isFavorite(props.productId))
</script>
<template>
  <button class="favorite" @click="favorite.addToFavorite(props.productId)">
    <svg :class="[{'favorite__added' : isFavorite.value === true}, 'favorite']" xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
      <path d="M18.3644 1.74705C17.3299 0.635129 15.8804 0.00246211 14.3617 0.000117107C12.8417 0.00187611 11.3906 0.634209 10.3546 1.74634L10.0015 2.11946L9.64836 1.74634C7.59251 -0.466321 4.13215 -0.593391 1.91953 1.46246C1.82148 1.5536 1.72679 1.64825 1.63565 1.74634C-0.545217 4.09867 -0.545217 7.7341 1.63565 10.0865L9.48255 18.3615C9.75403 18.6481 10.2064 18.6604 10.493 18.3889C10.5024 18.38 10.5115 18.3709 10.5204 18.3615L18.3645 10.0865C20.5452 7.73435 20.5452 4.09914 18.3644 1.74705ZM17.3302 9.10217L10.0015 16.8312L2.67281 9.10217C1.00676 7.30477 1.00676 4.52729 2.67281 2.72989C4.1858 1.09005 6.74172 0.987229 8.38156 2.50021C8.46118 2.57367 8.53778 2.65028 8.61124 2.72989L9.48255 3.64912C9.76969 3.93441 10.2333 3.93441 10.5204 3.64912L11.3917 2.7306C12.9047 1.09076 15.4606 0.987939 17.1005 2.50092C17.1801 2.57439 17.2567 2.65099 17.3302 2.7306C19.0107 4.53085 19.023 7.3134 17.3302 9.10217Z" fill="#E02D1F"/>
      <path d="M17.674 8.9708L9.99187 17L2.30977 8.9708C0.563375 7.10358 0.563375 4.21821 2.30977 2.35098C3.89572 0.647443 6.57489 0.540628 8.29381 2.11238C8.37727 2.1887 8.45756 2.26828 8.53457 2.35098L9.44789 3.30592C9.74888 3.6023 10.2348 3.6023 10.5358 3.30592L11.4491 2.35172C13.0351 0.64818 15.7142 0.541365 17.4332 2.11312C17.5166 2.18944 17.5969 2.26902 17.674 2.35172C19.4355 4.2219 19.4484 7.11255 17.674 8.9708Z"/>
    </svg>
    <span class="ml-2" v-if="props.enableText">
    {{isFavorite.value === true ? 'В избранном' : 'В избранное'}}
    </span>
  </button>
</template>

<style>
.favorite {
  @apply flex transition-all duration-500;
  transform: rotateY(0);
  &__added {
    @apply fill-red transition-all duration-500;
    transform: rotateY(180deg);
  }
}
</style>
