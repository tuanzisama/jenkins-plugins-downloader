import { request } from '@/plugins/request'
import type { JksPlugin, JksPluginSync, JksPluginVersion } from '@/types/jks-plugin'

const isLoaded = ref(false)
const lastUpdated = ref<Date>()
const pluginList = ref<JksPlugin[]>([])

export function useJenkins() {

  if (!isLoaded.value) {
    fetchPluginList().then((res) => {
      pluginList.value = res.plugins.slice(0, 30)
      isLoaded.value = true
      lastUpdated.value = new Date(res.lastUpdated)
    })
  }

  const pluginLength = computed(() => pluginList.value.length)

  return {
    pluginList, isLoaded, lastUpdated,
    pluginLength,
    fetchPluginList,
    downloadPlugin
  }
}

function fetchPluginList(): Promise<JksPluginSync> {
  return request({ url: 'https://raw.githubusercontent.com/tuanzi-universe/jenkins-plugins-sync/refs/heads/master/output.json' })
    .then(res => res.data)
}

function downloadPlugin(identifier: string, plugin: JksPluginVersion) {
  return request({
    url: plugin.link,
    method: 'get',
    responseType: 'blob',
    onDownloadProgress: (e) => { console.log(e) }
  }).then(response => {
    const fileName = decodeURI(response.headers['content-disposition'].split(';')[1].split('filename=')[1])

    const blobUrl = window.URL.createObjectURL(response.data)
    const linkEl = document.createElement('a')
    linkEl.setAttribute('href', blobUrl)
    const extension = fileName.split('.').pop()
    linkEl.setAttribute('download', `${identifier}-${plugin.version}.${extension}`)
    linkEl.click()

    window.URL.revokeObjectURL(blobUrl)
    return response
  })
}