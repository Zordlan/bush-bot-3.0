import { BushTask } from '../lib/extensions/BushTask';
import { Global } from '../lib/models';

export default class UpdateCacheTask extends BushTask {
	constructor() {
		super('updateCache', {
			delay: 300_000, // 5 minutes
			runOnStart: true
		});
	}
	async exec(): Promise<void> {
		const environment = this.client.config.dev ? 'development' : 'production';
		const row =
			(await Global.findByPk(environment)) ||
			(await Global.create({
				environment,
				superUsers: [],
				blacklistedChannels: [],
				blacklistedGuilds: [],
				blacklistedUsers: [],
				disabledCommands: []
			}));

		for (const option in row) {
			if (this.client.cache[option]) this.client.cache[option] = row[option];
		}
		this.client.logger.verbose(`UpdateCache`, `Updated cache.`);
	}
}
