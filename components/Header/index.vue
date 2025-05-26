<template>
  <header>
    <SideMenu />
    <UiLogo />
    <BurgerMenu />
  </header>
</template>

<style lang="scss" scoped>
header {
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100dvw - 40px);
  padding: 10px 20px;

  @include mediaTablet {
    width: calc(100dvw - 60px);
    padding: 20px 30px;
  }
}
</style>
