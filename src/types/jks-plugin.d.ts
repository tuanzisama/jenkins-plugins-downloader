import type { version } from "vue";

export interface JksPluginData {
  generationTimestamp: string;
  plugins: {
    [name: string]: {
      [version: string]: JksPluginVersion;
    };
  };
}

export interface JksPlugin {
  name: string;
  latest: JksPluginVersion;
  list: JksPluginVersion[];
}

export interface JksPluginVersion {
  buildDate: string;
  dependencies: JksPluginDependency[];
  name: string;
  releaseTimestamp: string;
  requiredCore: string;
  sha1: string;
  sha256: string;
  url: string;
  version: string;
}

export interface JksPluginDependency {
  name: string;
  optional: boolean;
  version: string;
}
