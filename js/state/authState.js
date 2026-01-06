export let isAdmin = false;

export function setAdmin(value) {
  isAdmin = value;
}

export function resetAdmin() {
  isAdmin = false;
}
