<script setup>
import { ref, reactive, computed, onMounted, watch, onUnmounted } from 'vue';
import { usePlayerStore } from '~/stores/player';

// Player store
const playerStore = usePlayerStore();

// Props for current track data
const props = defineProps({
    currentTrack: {
        type: Object,
        default: () => null
    },
    playlist: {
        type: Array,
        default: () => []
    },
    currentIndex: {
        type: Number,
        default: 0
    }
});

// Emits for player control
const emit = defineEmits(['next', 'previous', 'play-pause']);

// Player state
const playerState = reactive({
    isPlaying: false,
    currentTime: 0,
    duration: 0
});

// References for audio element
const audioRef = ref(null);

// Computed properties
const trackImage = computed(() => props.currentTrack?.album?.images?.[0]?.url || '');
const trackName = computed(() => props.currentTrack?.name || 'No track playing');
const artistNames = computed(() => {
    if (!props.currentTrack?.artists) return '';
    return props.currentTrack.artists.map(artist => artist.name).join(', ');
});

// Check if a track has playable audio
const hasPreviewUrl = computed(() => {
    return !!props.currentTrack?.preview_url;
});

// Audio source
const audioSrc = computed(() => {
    return props.currentTrack?.preview_url || '';
});

// Basic player controls
function togglePlayback() {
    if (!props.currentTrack || !hasPreviewUrl.value) return;

    playerState.isPlaying = !playerState.isPlaying;

    if (audioRef.value) {
        if (playerState.isPlaying) {
            audioRef.value.play();
        } else {
            audioRef.value.pause();
        }
    }

    emit('play-pause', playerState.isPlaying);
}

function nextTrack() {
    emit('next');
}

function previousTrack() {
    emit('previous');
}

// Audio element event handlers
function onAudioLoaded() {
    if (audioRef.value) {
        playerState.duration = audioRef.value.duration * 1000;
    }
}

function onAudioEnded() {
    playerState.isPlaying = false;
    nextTrack();
}

// Cleanup on component unmount
onUnmounted(() => {
    if (audioRef.value) {
        audioRef.value.pause();
    }
});

// Watch for changes in current track
watch(() => props.currentTrack, (newTrack) => {
    if (newTrack) {
        playerState.currentTime = 0;
        playerState.isPlaying = false;
        
        if (audioRef.value) {
            audioRef.value.pause();
            audioRef.value.src = '';
            audioRef.value.load();
        }
    }
}, { immediate: true });
</script>

<template>
    <div class="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#282828] px-4 py-3 z-50">
        <!-- Audio element (hidden) -->
        <audio ref="audioRef" @loadedmetadata="onAudioLoaded" @ended="onAudioEnded" :src="audioSrc"></audio>
        
        <div class="flex items-center justify-between max-w-7xl mx-auto">
            <!-- Track Info -->
            <div class="flex items-center w-1/3">
                <div class="h-14 w-14 mr-3 flex-shrink-0 relative" v-if="currentTrack">
                    <img :src="trackImage" :alt="trackName" class="h-full w-full object-cover" />
                    <div v-if="!hasPreviewUrl"
                        class="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="text-red-500">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                        </svg>
                    </div>
                </div>
                <div class="overflow-hidden">
                    <div class="text-white text-sm font-medium truncate">{{ trackName }}</div>
                    <div class="text-zinc-400 text-xs truncate">{{ artistNames }}</div>
                </div>
            </div>

            <!-- Player Controls -->
            <div class="flex items-center justify-center gap-4">
                <!-- Previous Button -->
                <button @click="previousTrack" class="text-zinc-400 hover:text-white transition-colors"
                    aria-label="Previous">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path>
                    </svg>
                </button>

                <!-- Play/Pause Button -->
                <button @click="togglePlayback"
                    class="rounded-full p-2 bg-white text-black hover:scale-110 transition-transform"
                    aria-label="Play or Pause">
                    <svg v-if="!playerState.isPlaying" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"></path>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
                    </svg>
                </button>

                <!-- Next Button -->
                <button @click="nextTrack" class="text-zinc-400 hover:text-white transition-colors"
                    aria-label="Next">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Basic styling for the player */
button {
    transition: all 0.2s ease;
}

button:hover {
    transform: scale(1.1);
}
</style>