import { Injectable } from '@angular/core';
import { getStorage, ref } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class CloudstorageService {
  constructor() {}

  fileToUpload: any;


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}



  uploadImg() {

    // Create a root reference
    const storage = getStorage();

    // Create a reference to 'mountains.jpg'
    const mountainsRef = ref(storage, this.fileToUpload);

    // Create a reference to 'images/mountains.jpg'
    const mountainImagesRef = ref(storage, 'images/' + this.fileToUpload);

    // While the file names are the same, the references point to different files
    mountainsRef.name === mountainImagesRef.name; // true
    mountainsRef.fullPath === mountainImagesRef.fullPath; // false
  }



}
