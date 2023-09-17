const { Client, GatewayIntentBits, Options, Collection } = require("discord.js");
const config = require("../../data/config.json");
const EventHandler = require("./eventHandler.js");
const log = require("../utils/logger.js");

class DiscordClient extends Client {
    constructor(customCacheOptions = {}) {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildModeration,
                GatewayIntentBits.GuildWebhooks,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildIntegrations,
                GatewayIntentBits.MessageContent,
            ],
            makeCache: Options.cacheWithLimits({
                BaseGuildEmojiManager: 0,
                GuildBanManager: 0,
                GuildInviteManager: 0,
                GuildStickerManager: 0,
                PresenceManager: 0,
                ThreadManager: 0,
                ThreadMemberManager: 0,
                CategoryChannelChildManager: 0,
                MessageManager: 0,
                ReactionManager: 0,
                ...customCacheOptions,
            }),
        });

        this.commands = new Collection();

        this.eventHandler = new EventHandler(this);
        this.eventHandler.load();
    }

    startBot() {
        this.login(config.token)
            .catch((error) => {
                log.error('An error occurred while logging in:' + error)
            });
    }
    
}

module.exports = DiscordClient;