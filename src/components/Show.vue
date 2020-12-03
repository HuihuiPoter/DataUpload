<template>
    <div>
        <File-up></File-up>
        <Audio-up></Audio-up>
    </div>
</template>

<script>
import FileUp from './FileUP'
import AudioUp from './AudioUp'

export default {
    name: 'Show',
    components: {
        FileUp,
        AudioUp
    }
}
</script>