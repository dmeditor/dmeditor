import { loadStyle } from '';

export default function setAppConfig() {
  const initPreload = () => {
    loadPreSource = () => {
      loadWidgets()
      loadTemplates()
      loadStyle()
    }
  }

  const setBaseConfig = () => {
    created()
    setConfig()
    createRoot(() => initPreload())
  }
}

function createRoot() {
  const { $root } = initRoot(config.$el)
  nextTick(() => {
    root: $root
  })
}


