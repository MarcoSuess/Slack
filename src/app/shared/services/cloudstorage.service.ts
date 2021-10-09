import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class CloudstorageService {
  constructor(public userService: UserService) {}

  fileToUpload: any;

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  uploadImg(folder: string) {
    console.log(this.fileToUpload);

    const storage = getStorage();
    const storageRef = ref(storage, folder + '/' + this.fileToUpload.name);

    uploadBytes(storageRef, this.fileToUpload).then((snapshot) => {
      console.log('Uploaded', snapshot);
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

        this.userService.user.photoURL = url;
        this.userService.saveUserData();
        console.log(url);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
}
