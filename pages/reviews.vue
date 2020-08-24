<template>
  <div>
    <ul>
      <li v-for="entry in structure">
        <strong>{{ entry.name }}</strong>
      </li>
    </ul>
    <label
      >File
      <input
        type="file"
        id="file"
        ref="file"
        v-on:change="handleFileUpload()"
      />
    </label>
  </div>
</template>

<script>
import { Dropbox } from 'dropbox'

export default {
  data() {
    return {
      accessToken:
        'Tk3TIDpUjWAAAAAAAAAAiupaN94o2fez5gC--AGxYWBUnVtUfCHBpJVWhSF00Lfm',
      structure: [],
      file: ''
    }
  },
  head() {
    return {
      title: 'Reviews'
    }
  },
  methods: {
    dropbox() {
      return new Dropbox({ accessToken: this.accessToken })
    },
    getFolderStructure(path) {
      this.dropbox()
        .filesListFolder({
          path: path,
          include_media_info: true
        })
        .then(res => {
          this.structure = res.entries
        })
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
      this.dropbox()
        .filesUpload({
          contents: this.file,
          path: '/' + this.file.name,
          autorename: true
        })
        .then(res => {
          // Use id for our data: res.id
          this.getFolderStructure('')
        })
    }
  },
  created() {
    this.getFolderStructure('')
  }
}
</script>

<style lang="scss" scoped></style>
