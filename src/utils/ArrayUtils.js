
export function toggle (array, element) {
  let idx = array.indexOf(element)
  if (idx < 0) array.push(element)
  else array.splice(idx, 1)
}

export function remove (array, element) {
  let idx = array.indexOf(element)

  if (idx >= 0) array.splice(idx, 1)
}