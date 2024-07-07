<template>
    <div>
        <a v-for="(banner, index) in banners" :key="index" :href="banner.link" :name="banner.name" :title="banner.name"
            class="banner" target="_blank">
            <img v-if="banner.icon" :src="banner.icon" width="22" height="22" />
            <span>
                <p v-if="banner.name" class="name">{{ banner.name }}</p>
                <p v-if="banner.info1" class="info">{{ banner.info1 }}</p>
                <p v-if="banner.info2" class="info">{{ banner.info2 }}</p>
                <p v-if="banner.version" class="version">最新版本: {{ banner.latestVersion }}</p>
            </span>
        </a>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
    name: 'BannerComponent',
    setup() {
        const banners = ref([
            {
                link: 'https://t.me/nezhanews',
                icon: 'https://nezha.wiki/logo.png',
                name: '哪吒监控公告板',
                info1: 'Telegram Channel',
                version: true,
                // latestVersion: 'v0.0.0',
            },
            // {
            //     link: 'https://t.me/nezhamonitoring_global',
            //     icon: 'https://nezha.wiki/logo.png',
            //     name: 'Nezha Monitoring Global',
            //     // info1: '哪吒监控（英文群组）',

            // },
            // {
            //     link: 'https://t.me/nezhamonitoring',
            //     icon: 'https://nezha.wiki/logo.png',
            //     name: '哪吒监控（中文群组）',
            // },
        ]);

        onMounted(async () => {
            await fetchLatestVersions();
        });

        const fetchLatestVersions = async () => {
            for (let banner of banners.value) {
                if (banner.version) {
                    try {
                        const response = await fetch('https://api.github.com/repos/naiba/nezha/releases/latest');
                        const data = await response.json();
                        banner.latestVersion = data.tag_name;
                    } catch (error) {
                        console.error('Error fetching latest version:', error);
                    }
                }
            }
        };

        return {
            banners,
            fetchLatestVersions
        };
    },
});
</script>

<style lang="scss" scoped>
.VPDocAsideSponsors {
    margin-top: 8px !important;
}

.banner {
    margin: 0.25rem 0;
    padding: 0.4rem 0;
    border-radius: 0.8rem;
    position: relative;
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1rem;
    background-color: var(--vp-c-bg-alt);
    border: 2px solid var(--vp-c-bg-alt);
    transition: border-color 0.5s;

    &:last-of-type {
        margin-bottom: 1rem;
    }

    &:hover {
        border: 2px solid var(--vp-c-brand-1);
    }

    img {
        transition: transform 0.5s;
        transform: scale(1.25);
    }

    &:hover img {
        transform: scale(1.75);
    }


    .info {
        color: var(--vp-c-text-2);
        font-size: 0.7rem;
        padding-left: 0.1rem;
    }

    .name {
        background-image: linear-gradient(120deg, var(--vp-c-brand-3) 32%, var(--vp-c-brand-2), var(--vp-c-brand-1));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .version {
        color: var(--vp-c-text-2);
        font-size: 0.7rem;
        padding-left: 0.1rem;
    }

    &:hover {
        .info {
            opacity: 0.9;
        }
    }
}
</style>
