import { request } from "@/plugins/request";
import type { JksPlugin, JksPluginData, JksPluginVersion } from "@/types/jks-plugin";
import { last, mapValues, values } from "lodash-es";

const isLoaded = ref(false);
const generationTimestamp = ref<Date>();
const pluginList = ref<JksPlugin[]>([]);

export function useJenkins() {
  if (!isLoaded.value) {
    fetchPluginList().then((res) => {
      pluginList.value = values(
        mapValues(res.plugins, (val, key) => {
          const list = values(val);
          return { name: key, list, latest: last(list) as JksPluginVersion };
        })
      );
      isLoaded.value = true;
      generationTimestamp.value = new Date(res.generationTimestamp);
    });
  }

  const pluginsCount = computed(() => pluginList.value.length);

  return {
    pluginList,
    isLoaded,
    generationTimestamp,
    pluginsCount,
    fetchPluginList,
  };
}

function fetchPluginList(): Promise<JksPluginData> {
  // return request({ url: "/jks-api/update-center/plugin-versions.json" }).then((res) => res.data);
  return request({ url: "/plugin-versions.json" }).then((res) => res.data);
}
