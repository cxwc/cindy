export default {
  name: 'agent-island-settings',
  entry: './island-fixture.tsx',
  viewport: { width: 900, height: 640 },
  real: 'AgentIslandSection, useAgentIslandSettings, Switch',
  notCovered: 'Native macOS window, IPC authorization, actual notification delivery and sound',
  cases: {
    default: { about: 'Existing automatic cards remain the default' },
    subtle: { about: 'Subtle reminders enabled' },
    capsule: { about: 'Floating capsule with legacy settings and two vertical size sliders' },
  },
  async check(page, ui) {
    if (ui.case === 'capsule') {
      const sliders = page.getByRole('slider');
      const height = page.getByRole('slider', { name: await ui.t('settings.agentIsland.capsuleHeightLabel'), exact: true });
      const topGap = page.getByRole('slider', { name: await ui.t('settings.agentIsland.capsuleTopGapLabel'), exact: true });
      if (await sliders.count() !== 2) throw new Error('Expected only the two vertical size sliders');
      if (await height.getAttribute('aria-valuenow') !== '35' || await topGap.getAttribute('aria-valuenow') !== '8') {
        throw new Error('Saved capsule height and top gap were not restored');
      }
      await height.press('ArrowRight');
      await page.waitForFunction(() => {
        const saved = JSON.parse(localStorage.getItem('notifications.agentIslandAppearance') ?? '{}');
        return saved.shapeStyle === 'capsule' && saved.capsuleHeight === 36 && saved.capsuleTopGap === 8
          && !Object.hasOwn(saved, 'capsuleCenterGap');
      });
    }
    const toggle = page.getByRole('switch', { name: await ui.t('settings.agentIsland.subtleRemindersLabel'), exact: true });
    const before = await toggle.getAttribute('aria-checked');
    await toggle.click();
    await page.waitForFunction(expected => globalThis.localStorage.getItem('notifications.agentIslandSubtleReminders') === expected,
      String(before !== 'true'));
    if (await toggle.getAttribute('aria-checked') === before) throw new Error('Reminder switch did not update');
    await ui.capture('toggled');
    await page.getByRole('button', { name: await ui.t('settings.defaults.restore'), exact: true }).click();
    await page.waitForFunction(() => globalThis.localStorage.getItem('notifications.agentIslandSubtleReminders') === null);
    if (await toggle.getAttribute('aria-checked') !== 'false') throw new Error('Reminder reset did not restore the default');
    await ui.capture('reset');
    const complete = page.locator('#agent-island-sound-complete');
    const card = page.locator('#settings-search-settings-agentIsland-soundLabel').locator('..').locator('..').locator('..');
    // Shared Select (DESIGN §4): open the listbox and pick by visible label.
    const pick = async id => {
      await complete.click();
      await page.getByRole('option', { name: await ui.t(`settings.agentIsland.soundOptions.${id}`), exact: true }).click();
    };
    await pick('none');
    await page.waitForFunction(() => JSON.parse(localStorage.getItem('notifications.agentIslandSoundSettings') ?? '{}').sounds?.complete?.id === 'none');
    await ui.capture('follow-system', { locator: card });
    await pick('gem-collect');
    await page.waitForFunction(() => JSON.parse(localStorage.getItem('notifications.agentIslandSoundSettings') ?? '{}').sounds?.complete?.id === 'gem-collect');
    await ui.capture('event-sounds', { locator: card });
  },
};
