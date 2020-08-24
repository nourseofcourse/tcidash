// Restrict login/register pages if logged in
export default function({ store, redirect }) {
  if (store.state.auth.loggedIn && store.auth.state.user.id != 2) {
    return redirect('/')
  }
}
