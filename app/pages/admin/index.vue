<template>
  <div>
    <Header page-title="Admin Utilities" />
    <b-container>
      <b-row align-h="center">
        <b-col>
          <b-card>
            <b-container>
              <b-row align-h="center" align-v="center">
                <b-col cols="12" class="d-flex justify-content-center py-3">
                  <b-button variant="primary" to="/admin/manage/users">Manage Users</b-button>
                </b-col>
                <b-col cols="12" class="d-flex justify-content-center py-3">
                  <b-button variant="primary" to="/admin/manage/organizations">Manage Organizations</b-button>
                </b-col>
                <b-col cols="12" class="d-flex justify-content-center py-3">
                  <b-button variant="primary" to="/admin/manage/catalogs">Manage Catalogs</b-button>
                </b-col>
                <b-col cols="12" class="d-flex justify-content-center py-3">
                  <b-button variant="primary" to="/admin/manage/reports">View Reports</b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
}
</script>

<style>

</style>
