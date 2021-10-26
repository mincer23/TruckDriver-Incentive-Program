<template>
  <div class="password-change">
    <form method="post">
      <h1>Change Password</h1>
      <p></p>
      <div class="form-password">
        <label>New Password</label>
        <input type="password" class="form-control" id="newPassword" placeholder="Enter new password..." required />
      </div>
      <p></p>
      <div class="form-confirm-password">
        <label>Confirm New Password</label>
        <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm..." required />
      </div>
      <p></p>
      <button type="submit" class="btn btn-primary btn-lg btn-square">Submit</button>
    </form>
  </div>
</template>

<script>

</script>