/**
 * Interface representing the synchronization state of Jenkins plugins
 */
export interface JksPluginSync {
  /** Last update timestamp */
  lastUpdated: string;
  /** Array of Jenkins plugins */
  plugins: JksPlugin[];
}

/**
 * Interface representing a Jenkins plugin
 */
export interface JksPlugin {
  /** Plugin display name */
  name: string
  /** Unique plugin identifier */
  id: string
  /** List of available versions for this plugin */
  list: JksPluginVersion[]
}

/**
 * Interface representing a specific version of a Jenkins plugin
 */
export interface JksPluginVersion {
  /** Download URL for the plugin */
  link: string
  /** Release date of this version */
  released: string
  /** SHA1 hash for integrity verification */
  sha1: string
  /** SHA256 hash for integrity verification */
  sha256: string
  /** Compatible Jenkins version */
  jksVersion: string
  /** Plugin version string */
  version: string
}
