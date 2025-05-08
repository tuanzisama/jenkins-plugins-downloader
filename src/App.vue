<template>
  <div class="app-container">
    <div class="app-header">
      <p class="app-header__title">Jenkins Plugin Downloader</p>
    </div>
    <div class="app-body">
      <t-alert theme="info" :message="`Loaded ${jks.pluginList.value.length} plugin(s) data.`" />
      <t-form :model="formData" layout="inline">
        <t-form-item label="Jenkins Version">
          <t-input v-model="formData.jksVersion" />
        </t-form-item>
      </t-form>

      <div class="plugin-table">
        <t-table row-key="index" :data="jks.pluginList.value" :columns="tableColumns" hover cell-empty-content="-"
          height="400px" lazy-load>
        </t-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useJenkins } from "./composables/jenkins";
import { Button as TButton } from "tdesign-vue-next";
import type { PrimaryTableCol } from "tdesign-vue-next";
import type { JksPlugin } from "./types/jks-plugin";

const jks = useJenkins();
const formData = reactive({
  jksVersion: "",
});

const tableColumns = ref<PrimaryTableCol[]>([
  { colKey: "name", title: "Plugin name", width: "120", ellipsis: true },
  { colKey: "id", title: "Identifier", width: "120" },
  {
    colKey: "versionLength",
    title: "Number of available",
    width: "100",
    cell: (h, { row }) => h("span", null, { default: () => row.list.length }),
  },
  {
    colKey: "operation",
    title: "Action",
    width: "60",
    cell: (h, { row }) =>
      h(TButton, {
        theme: "primary", size: "small", variant: "text", onClick: () => onDownloadClickHandler(row as JksPlugin),
      }, "Download")
  },
]);

onMounted(() => {
  console.info(jks.pluginList);
});

function onDownloadClickHandler(plugin: JksPlugin) {
  console.info(plugin);
  // jks.downloadPlugin(plugin.id, plugin.list[0]);
  window.open(plugin.list[0].link, "_blank", "noopener,noreferrer")
}
</script>

<style lang="scss" scoped>
@import "./style.css";

.app-container {
  width: 96%;
  max-width: 1000px;
  margin: 0 auto;
}

.app-header {
  padding: 30px 0;

  &__title {
    font-size: 30px;
    font-weight: bold;

    &:before {
      content: "🐳";
      margin-right: 10px;
    }
  }
}

.app-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
