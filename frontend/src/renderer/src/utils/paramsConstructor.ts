interface paramItem {
  name: string
  value: string | null
}

export const paramsConstructor = (params: paramItem[]): string => {
  const newParams = new URLSearchParams()

  params.map((item) => {
    if (item.value) {
      newParams.append(item.name, item.value)
    }
  })

  return newParams.toString()
}
