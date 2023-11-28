<script setup>
</script>
<template>
    <div class="print-wrapper">
        <header class="print-header"> 
            <div class="print-container print-header-wrapper">
                <Logo class="w-fit block" width="323" height="93"></Logo> 
                <div class="font-bold text-[30px] leading-[61px]">
                    +7 901 517-86-51
                </div>
            </div>
        </header> 
        <main class="print-content-outer"> 
                <slot/>  
        </main>
        <span style="float: footnote;">2021</span>
    </div>

</template>
<style  lang="postcss" scoped>

@page {
    margin-top: 0;
    margin-bottom: 0;
    size: A4 portrait;
}
e
*{
    --printer-width : 1200px;
}
.print{
    &-wrapper{
        @apply max-w-[var(--printer-width)] m-auto flex flex-col; 
    }
    &-container{
        @apply max-w-[var(--printer-width)]  m-auto;
    }
    &-header-wrapper{
        @apply pt-[58px] pb-[38px] flex justify-between items-center;
        border-bottom: 4px solid var(--grey);

    }
    &-header{
        @apply bg-white; 
        width: 100%;
        margin: auto;
        left: 0; 
        right: 0;
    }
    &-content-outer{

    padding-top: 40px;
    }
}
</style>