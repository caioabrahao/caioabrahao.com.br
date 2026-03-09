import { ref } from "vue"

export const bucketUpdated = ref(0) // incrementing this triggers watchers

//made this thing to fetch the list again upon a successful upload so you see instantly what you uploaded on the list