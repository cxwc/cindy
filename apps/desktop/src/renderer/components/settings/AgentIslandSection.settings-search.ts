import { TAB_LABEL_KEY } from '@/lib/tabLabels';
import {
  AGENT_ISLAND_MASCOT_SKINS,
  AGENT_ISLAND_SHAPE_STYLES,
  AGENT_ISLAND_SOUND_EVENTS,
  AGENT_ISLAND_SOUND_OPTIONS,
} from '../../../shared/agentIsland';
import { defineSettings, type SettingsSearchContext, type SettingsSearchModule } from './settingsSearchTypes';

const areIslandControlsVisible = ({ agentIsland }: SettingsSearchContext) =>
  agentIsland?.supported === true && agentIsland.enabled;

const areCapsuleControlsVisible = (context: SettingsSearchContext) =>
  areIslandControlsVisible(context) && context.agentIsland?.capsule === true;

const SHAPE_STYLE_LABEL_KEYS = {
  notch: 'settings.agentIsland.appearanceStyleNotch',
  capsule: 'settings.agentIsland.appearanceStyleCapsule',
} as const;

/** Character and sounds also serve the Live Activity, so they stay visible with it alone. */
const areSharedControlsVisible = ({ agentIsland }: SettingsSearchContext) =>
  agentIsland?.supported === true
  && (agentIsland.enabled || (agentIsland.liveActivitySupported === true && agentIsland.liveActivity === true));

/** Static search metadata owned by this settings module; no component mounting or IPC. */
export const agentIslandSettings = defineSettings({
  agentIsland: {
    id: 'agentIsland',
    tab: 'agent-island',
    targetId: 'settings-panel-agent-island',
    titleKey: TAB_LABEL_KEY['agent-island'],
    sectionKey: 'settings.sections.agentIsland',
  },
  enableLabel: {
    isVisible: ({ agentIsland }) => agentIsland?.supported === true,
    id: 'settings.agentIsland.enableLabel',
    fallbackTargetId: 'settings-panel-agent-island',
    tab: 'agent-island',
    targetId: 'settings-search-settings-agentIsland-enableLabel',
    titleKey: 'settings.agentIsland.enableLabel',
    sectionKey: 'settings.tabs.agentIsland',
    descriptionKey: 'settings.agentIsland.enableHint',
    // Former names (Agent Island / 灵动岛), so people who knew them still find the switch.
    aliases: ['Agent Island', '灵动岛', '靈動島', '刘海', 'notch'],
  },
  liveActivityLabel: {
    isVisible: ({ agentIsland }) => agentIsland?.supported === true && agentIsland.liveActivitySupported === true,
    id: 'settings.agentIsland.liveActivityLabel',
    fallbackTargetId: 'settings-panel-agent-island',
    tab: 'agent-island',
    targetId: 'settings-search-settings-agentIsland-liveActivityLabel',
    titleKey: 'settings.agentIsland.liveActivityLabel',
    sectionKey: 'settings.tabs.agentIsland',
    descriptionKey: 'settings.agentIsland.liveActivityHint',
  },
    subtleRemindersLabel: {
    isVisible: areIslandControlsVisible,
    id: 'settings.agentIsland.subtleRemindersLabel',
    fallbackTargetId: 'settings-panel-agent-island',
    tab: 'agent-island',
    targetId: 'settings-search-settings-agentIsland-subtleRemindersLabel',
    titleKey: 'settings.agentIsland.subtleRemindersLabel',
    sectionKey: 'settings.tabs.agentIsland',
    descriptionKey: 'settings.agentIsland.subtleRemindersHint',
  },
  displayLabel: {
    isVisible: areIslandControlsVisible,
    id: 'settings.agentIsland.displayLabel',
    fallbackTargetId: 'settings-panel-agent-island',
    tab: 'agent-island',
    targetId: 'settings-search-settings-agentIsland-displayLabel',
    titleKey: 'settings.agentIsland.displayLabel',
    sectionKey: 'settings.tabs.agentIsland',
    descriptionKey: 'settings.agentIsland.displayHint',
  },
  appearanceStyleLabel: {
    isVisible: areIslandControlsVisible,
    id: 'settings.agentIsland.appearanceStyleLabel',
    fallbackTargetId: 'settings-panel-agent-island',
    tab: 'agent-island',
    targetId: 'settings-search-settings-agentIsland-appearanceStyleLabel',
    titleKey: 'settings.agentIsland.appearanceStyleLabel',
    sectionKey: 'settings.tabs.agentIsland',
    descriptionKey: 'settings.agentIsland.appearanceStyleHint',
    aliases: ['灵动岛', '刘海', 'notch', 'capsule', '椭圆'],
    options: AGENT_ISLAND_SHAPE_STYLES.map((style) => ({ value: style, labelKey: SHAPE_STYLE_LABEL_KEYS[style] })),
  },
  capsuleHeightLabel: {
    isVisible: areCapsuleControlsVisible,
    id: 'settings.agentIsland.capsuleHeightLabel',
    fallbackTargetId: 'settings-panel-agent-island',
    tab: 'agent-island',
    targetId: 'settings-search-settings-agentIsland-capsuleHeightLabel',
    titleKey: 'settings.agentIsland.capsuleHeightLabel',
    sectionKey: 'settings.tabs.agentIsland',
  },
  capsuleTopGapLabel: {
    isVisible: areCapsuleControlsVisible,
    id: 'settings.agentIsland.capsuleTopGapLabel',
    fallbackTargetId: 'settings-panel-agent-island',
    tab: 'agent-island',
    targetId: 'settings-search-settings-agentIsland-capsuleTopGapLabel',
    titleKey: 'settings.agentIsland.capsuleTopGapLabel',
    sectionKey: 'settings.tabs.agentIsland',
  },
  compactTitleLabel: {
    isVisible: areIslandControlsVisible,
    id: 'settings.agentIsland.compactTitleLabel',
    fallbackTargetId: 'settings-panel-agent-island',
    tab: 'agent-island',
    targetId: 'settings-search-settings-agentIsland-compactTitleLabel',
    titleKey: 'settings.agentIsland.compactTitleLabel',
    sectionKey: 'settings.tabs.agentIsland',
    descriptionKey: 'settings.agentIsland.compactTitleHint',
  },
  skinLabel: {
    isVisible: areSharedControlsVisible,
    id: 'settings.agentIsland.skinLabel',
    fallbackTargetId: 'settings-panel-agent-island',
    tab: 'agent-island',
    targetId: 'settings-search-settings-agentIsland-skinLabel',
    titleKey: 'settings.agentIsland.skinLabel',
    sectionKey: 'settings.tabs.agentIsland',
    descriptionKey: 'settings.agentIsland.skinHint',
    options: AGENT_ISLAND_MASCOT_SKINS.map((skin) => ({
      value: skin,
      labelKey: `settings.agentIsland.skins.${skin}.name`,
      descriptionKey: `settings.agentIsland.skins.${skin}.description`,
    })),
  },
  soundLabel: {
    isVisible: areSharedControlsVisible,
    id: 'settings.agentIsland.soundLabel',
    fallbackTargetId: 'settings-panel-agent-island',
    tab: 'agent-island',
    targetId: 'settings-search-settings-agentIsland-soundLabel',
    titleKey: 'settings.agentIsland.soundLabel',
    sectionKey: 'settings.tabs.agentIsland',
    descriptionKey: 'settings.agentIsland.soundHint',
    options: [
      ...AGENT_ISLAND_SOUND_EVENTS.map((event) => ({
        value: `event.${event}`, labelKey: `settings.agentIsland.soundEvents.${event}`,
      })),
      ...AGENT_ISLAND_SOUND_OPTIONS.map((option) => ({
        value: option, labelKey: `settings.agentIsland.soundOptions.${option}`,
      })),
      { value: '__custom__', labelKey: 'settings.agentIsland.soundOptions.custom' },
    ].map((option) => ({
      ...option,
      isVisible: ({ agentIsland }: SettingsSearchContext) => agentIsland?.soundEnabled === true,
    })),
  },
});

export default {
  id: 'agent-island',
  order: 10,
  entries: Object.values(agentIslandSettings),
} satisfies SettingsSearchModule;
