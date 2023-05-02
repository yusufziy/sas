const Discord = require('discord.js');
const { EmbedBuilder, PermissionsBitField, roleMention } = require("discord.js");
const Levonasdb = require("croxydb");
// Levonas - discord.gg/altyapilar
module.exports = {
    name: "duyuru-yap",
    description: "Duyuru yaparsın.",
    type: 1,
    options: [
        {
            name: "duyuru-mesajı",
            description: "Duyuru mesajı yazın.",
            type: 3,
            required: true,
        },
        {
            name: "mesaj-tipi",
            description: "Mesajın nasıl gönderileceğini seçin.",
            type: 3,
            required: true,
            choices: [
                {
                    name: 'Embed',
                    value: "embed"
                },

                {
                    name: 'Normal',
                    value: "normal"
                },
            ]
        },
        {
            name: "etiket",
            description: "Everyone etiketi atılmasını istiyorsan işaretle.",
            type: 3,
            required: true,
            choices: [
                {
                    name: 'Etiket Atılsın',
                    value: "atilsin"
                },

                {
                    name: 'Etiket Atılmasın',
                    value: "atilmasin"
                },
            ]
        }
    ],
    run: async (client, interaction) => {

        const yetki_embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bu komudu kullanabilmek için `Yönetici` yetkisine sahip olmalısın.")

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki_embed], ephemeral: true })

        const data = Levonasdb.get(`duyuru_channel_${interaction.guild.id}`)
        if (!data) return interaction.reply({ content: "Duyuru kanalı ayarlanmamış!", ephemeral: true })
        const channel = client.channels.cache.get(data)
        if (!channel) return interaction.reply({ content: "Duyuru kanalını tekrar ayarlayın!", ephemeral: true })

        const mesaj = interaction.options.getString('duyuru-mesajı')
        let input = interaction.options.getString('mesaj-tipi')
        let input1 = interaction.options.getString('etiket')

        if (input === "embed") {
            if (input1 === "atilsin") {
                const duyuru_embed = new EmbedBuilder()
                    .setColor("DarkButNotBlack")
                    .setAuthor({ name: `📢 ${interaction.user.username} bir duyuru yaptı!` })
                    .setDescription(`${mesaj || "Bir duyuru gönderildi"}`)
                    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                    .setTimestamp()

                interaction.reply({ content: `Duyuru başarıyla gönderildi ${channel}`, ephemeral: true })
                channel.send({ content: `📢 @everyone @here`, embeds: [duyuru_embed] })
            }

            if (input1 === "atilmasin") {
                const duyuru_embed = new EmbedBuilder()
                    .setColor("DarkButNotBlack")
                    .setAuthor({ name: `📢 ${interaction.user.username} bir duyuru yaptı!` })
                    .setDescription(`${mesaj || "Bir duyuru gönderildi"}`)
                    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                    .setTimestamp()

                interaction.reply({ content: `Duyuru başarıyla gönderildi ${channel}`, ephemeral: true })
                channel.send({ embeds: [duyuru_embed] })
            }
        }

        if (input === "normal") {
            if (input1 === "atilsin") {
                interaction.reply({ content: `Duyuru başarıyla gönderildi ${channel}`, ephemeral: true })
                channel.send({ content: `${mesaj || "bir sorun oluştu"} @everyone 📢` })
            }

            if (input1 === "atilmasin") {
                interaction.reply({ content: `Duyuru başarıyla gönderildi ${channel}`, ephemeral: true })
                channel.send({ content: `${mesaj || "bir sorun oluştu"} 📢` })
            }
        }
    }
};