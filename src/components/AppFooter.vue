<template> 
    <v-footer flat tile outlined color="rgba(255, 0, 0, 0)" class="footer">
        <img src="@/assets/lambda.svg"  height="25" widht="25"/>
    </v-footer>
</template>

<script>
export default {
    name: "AppFooter",
};
</script>


<style lang="scss" scoped>
  .footer{
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
