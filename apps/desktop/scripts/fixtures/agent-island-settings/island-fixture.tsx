import { mountPage } from '../../ui-page/harness';
import { AgentIslandSection } from '../../../src/renderer/components/settings/AgentIslandSection';

mountPage({
  host: (ctx) => {
    localStorage.setItem('notifications.agentIslandEnabled', 'true');
    if (ctx.case === 'subtle') localStorage.setItem('notifications.agentIslandSubtleReminders', 'true');
    else localStorage.removeItem('notifications.agentIslandSubtleReminders');
    if (ctx.case === 'capsule') {
      localStorage.setItem('notifications.agentIslandAppearance', JSON.stringify({ shapeStyle: 'capsule', capsuleCenterGap: 80 }));
    } else {
      localStorage.removeItem('notifications.agentIslandAppearance');
    }
    return {
      platform: 'darwin', osRelease: '24.0.0',
      agentIsland: {
        setEnabled: async () => ({ ok: true }),
        setSubtleReminders: async () => ({ ok: true }),
        setSoundSettings: async () => ({ ok: true }),
        setMascotSkin: async () => ({ ok: true }),
        setAppearance: async () => ({ ok: true }),
        setDisplayTarget: async () => ({ ok: true }),
        getDisplayOptions: async () => ({ ok: true, options: [] }),
      },
    };
  },
  render: () => <div className="mx-auto max-w-3xl p-6"><AgentIslandSection /></div>,
});
