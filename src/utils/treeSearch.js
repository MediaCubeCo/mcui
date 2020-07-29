export const findParentComponent = ($component, name) => {
  let $parent = null
  do {
    if (!$component) {
      return null
    }
    let $componentParent = $component.$parent
    if ($componentParent && $componentParent.$options.name === name) {
      $parent = $componentParent
    } else {
      $component = $componentParent
    }
  } while ($parent == null)
  return $parent
}

export const findChildrenComponents = ($component, name) => {
  if ($component.$children == null || $component.$children.length === 0) return []

  let $collapses = []
  $component.$children.forEach($child => {
    if ($child.$options.name === name) {
      $collapses = [...$collapses, $child]
    } else {
      $collapses = [...$collapses, ...findChildrenComponents($child, name)]
    }
  })

  return $collapses
}
