<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          icon="menu"
        />
        <q-toolbar-title>
          Menu
        </q-toolbar-title>
        <q-space/>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      bordered
      class="bg-primary text-white"

    >
      <q-list>
        <q-item clickable active-class="q-item-no-link-highlighting" @click="$router.push('/dashboard')">
          <q-item-section avatar>
            <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable active-class="q-item-no-link-highlighting" @click="$router.push('/entretiens')">
          <q-item-section avatar>
            <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Entretiens</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable active-class="q-item-no-link-highlighting" @click="$router.push('/manages')">
          <q-item-section avatar>
            <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Manage</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable active-class="q-item-no-link-highlighting" @click="$router.push('/listes')">
          <q-item-section avatar>
            <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Liste</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item
          icon="pages"
          label="Annexe"
        >
        <q-item style="margin-left: 65px  !important;" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label>page1</q-item-label>
              </q-item-section>
            </q-item>
            <q-item style="margin-left: 65px  !important;" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label>page2</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>          
    </q-list>
  </q-drawer>

  <q-page-container class="bg-grey-2">
    <router-view/>
  </q-page-container>
</q-layout>
</template>