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
  currentUserIMG: any;
  userImageUpload: boolean = false;

  handleFileInput(event: any, location: string) {
    this.fileToUpload = event.target.files[0];

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      let imageResult = reader.result as string;
      if(location == 'chat') {
        this.imageURL.push({
          name: this.fileToUpload.name,
          src: imageResult,
          uploaded: false,
        });
      } else {
     
        this.currentUserIMG = imageResult;
      }
   
    };
    reader.readAsDataURL(this.fileToUpload);

  }

  uploadImg(folder: string) {
    this.userImageUpload = true;
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
          this.userImageUpload = false;
          this.userService.user.photoURL = url;
          this.userService.saveUserData();
        } else if (folder == 'chat') {
          this.chatImages.push({
            name: this.fileToUpload.name,
            src: url,
          });

          for (let i = 0; i < this.imageURL.length; i++) {
            this.imageURL[i].uploaded = true;
          }

          // filter Upload array
        }
      })

      .catch((error) => {
        console.log('error', error);
      });
  }

  deletePickedImg(img: any) {
    const desertRef = ref(this.storage, 'chat' + '/' + img.name);
    let spiceIndex = this.imageURL.indexOf(img);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        this.chatImages.splice(spiceIndex, 1);
        this.imageURL.splice(spiceIndex, 1);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}
