import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import config from '../config';

const firebaseConfig = {
    apiKey: config.firebase.apiKey,
    authDomain: config.firebase.authDomain,
    projectId: config.firebase.projectId,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId,
    appId: config.firebase.appId,
    measurementId: config.firebase.measurementId
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  

  export const uploadImage = async (filePath: string) => {
    try {
      const response = await fetch(filePath);
      const blob = await response.blob();
  
      const storageRef = ref(storage, 'images/' + getFileNameFromPath(filePath));
      await uploadBytes(storageRef, blob);
  
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  };
  

  export const uploadVideo = async (filePath: string) => {
    try {
      const response = await fetch(filePath);
      const blob = await response.blob();
  
      const storageRef = ref(storage, 'videos/' + getFileNameFromPath(filePath));
      await uploadBytes(storageRef, blob);
  
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading video:', error);
      throw new Error('Failed to upload video');
    }
  };
  
  // Hàm để lấy tên file từ đường dẫn
  const getFileNameFromPath = (filePath: string) => {
    return filePath.split('/').pop() || 'file';
  };
  
  export { storage, ref, uploadBytes, getDownloadURL };