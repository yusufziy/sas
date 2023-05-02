const Discord = require('discord.js');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Levonasdb = require("croxydb");
// Levonas - discord.gg/altyapilar
module.exports = {
    name: "duyuru-kanal",
    description: "Duyuru gönderilecek kanalı ayarlarsın.",
    type: 1,
    options: [
        {
            name: "kanal",
            description: "Kanal seçin.",
            type: 7,
            required: true,
            channel_types: [0]
        },
    ],
    run: async (client, interaction) => {

        const yetki_embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bu komudu kullanabilmek için `Yönetici` yetkisine sahip olmalısın.")

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki_embed], ephemeral: true })

        const channel = interaction.options.getChannel('kanal')

        const ayar_embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`Duyuru kanalı başarıyla ayarlandı!`)

        Levonasdb.set(`duyuru_channel_${interaction.guild.id}`, channel.id)
        return interaction.reply({ embeds: [ayar_embed] })
    }
};
