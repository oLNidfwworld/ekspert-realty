<script setup>
const {data: buyLinks} = await useAsyncData(() => $fetch('/api/buyLinks'))
const {data: rentLinks} = await useAsyncData(() => $fetch('/api/rentLinks'))
const {data: servicesLinks} = await useAsyncData(() => $fetch('/api/servicesLinks'))
const isLargeScreen = await useMediaQuery('(min-width: 780px)')
const code = computed(() => isLargeScreen.value)
const currentYear = new Date().getFullYear()
</script>
<template>
  <footer v-show="code">
    <div class="footer-inner__wrapper">
      <div class="container">
        <div class="flex flex-col 2lg:flex-row items-start justify-between">
          <div class="flex w-full mb-6 2lg:mb-0">
            <ClientOnly>
              <LogoFooter class="w-1/2" :date="currentYear"/>
            </ClientOnly>
            <div class="md:grid grid-cols-3 gap-4 w-full hidden">
              <FooterMenu title="Купить" :menu-links="buyLinks"/>
              <FooterMenu title="Арендовать" :menu-links="rentLinks"/>
              <FooterMenu title="Услуги" :menu-links="servicesLinks"/>
            </div>
          </div>
          <div class="flex 2lg:grid 2lg:grid-cols-2 gap-3 justify-between w-full 2lg:w-2/5">
            <div>
              <h4 class="font-bold mb-4">
                Мы в соц.сетях
              </h4>
              <ul class="socials">
                <nuxt-link href="https://vk.com/ekspert_realty">
                  <nuxt-icon width="30px" height="30px" name="Vk"/>
                </nuxt-link> 
                <nuxt-link href="https://www.youtube.com/channel/UCMF6FOeygEuzxZ5Mk7rOIgg">
                  <nuxt-icon width="30px" height="30px" name="YouTube"/>
                </nuxt-link>
              </ul>
              <div class="flex flex-col">
                <nuxt-link href="/blog/">
                  Блог
                </nuxt-link>
              </div>
            </div>
            <div class="flex flex-col items-end">
                  <span class="font-bold mb-4">
                    <a href="tel:+79015178651">+7 901 517-86-51</a>
                  </span>
              <ul class="socials">
                <!-- <nuxt-link>
                  <nuxt-icon width="30px" height="30px" name="Viber"/>
                </nuxt-link> -->
                <nuxt-link href="https://wa.me/79015178651">
                  <nuxt-icon width="30px" height="30px" name="WhatsApp"/>
                </nuxt-link>
<!--                <nuxt-link  >-->
<!--                  <nuxt-icon width="30px" height="30px" name="Telegram"/>-->
<!--                </nuxt-link>-->
                <nuxt-link href="mailto:ekspert07@bk.ru">
                  <nuxt-icon width="30px" height="30px" name="Mailru"/>
                </nuxt-link>
              </ul>
              <p class="text-sm">
                <a href="https://yandex.ru/maps/-/CDQWu6KJ">МО, г.Павловский Посад,<br> ул. Кирова, д.91</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <footer v-show="!code">
    <span class="footer-inner__wrapper__mobile">
    © 2005–{{currentYear}}
    </span>
  </footer>
</template>
<style lang="postcss">
.footer {
  &-inner {
    &__wrapper {
      @apply bg-red text-white flex justify-center py-11 w-full;
      &__mobile {
        @apply flex justify-center py-11;
      }
    }
  }
}
.socials {
  @apply flex items-center mb-6;
  & > a:not(:last-child){
    @apply mr-2;
  }
}
/*Для ебанутого сафари*/
.socials .nuxt-icon svg {
  width: 30px;
  height: 30px;
}
</style>
