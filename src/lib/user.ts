export function getUserId() {
  let id = localStorage.getItem("calmavibe_user")

  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem("calmavibe_user", id)
  }

  return id
}
