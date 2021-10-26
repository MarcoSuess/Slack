import { Injectable } from '@angular/core';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class CloudstorageService {
  constructor(public userService: UserService) {}

  fileToUpload: any;
  imageURL: any = [];
  storage: any = getStorage();
  chatImages: any = [];
  uploaded: boolean = false;

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      let imageResult = reader.result as string;
      this.imageURL.push({
        name: this.fileToUpload.name,
        src: imageResult,
      });
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  uploadImg(folder: string) {
    console.log(this.fileToUpload);

    const storageRef = ref(this.storage, folder + '/' + this.fileToUpload.name);

    uploadBytes(storageRef, this.fileToUpload).then((snapshot) => {
      this.fetchImgUrl(folder);
    });
  }

  fetchImgUrl(folder: string) {
    const storage = getStorage();
    getDownloadURL(ref(storage, folder + '/' + this.fileToUpload.name))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        if (folder == 'users') {
          this.userService.user.photoURL = url;
          this.userService.saveUserData();
        } else if (folder == 'chat') {
          this.chatImages.push({
            name: this.fileToUpload.name,
            src: url,
          });
          this.uploaded = true;

        }
      })

      .catch((error) => {
        console.log('error', error);
      });
  }

  deletePickedImg(img: any) {
    console.log(img);

    const desertRef = ref(this.storage, 'chat' + '/' + img.name);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        for (let i = 0; i < this.chatImages.length; i++) {
          const img = this.chatImages[i];
          let spliceIndex = this.chatImages[i].name.indexOf(img.name);
          this.chatImages.splice(spliceIndex, 1);
          this.imageURL.splice(spliceIndex, 1);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}
