import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
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
        if (!response.ok) {
            throw new Error('Failed to fetch the file from the provided path');
        }
        const blob = await response.blob();

        const storageRef = ref(storage, 'gs://learning-programing-web.appspot.com/image/' + getFileNameFromPath(filePath));
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
        if (!response.ok) {
            throw new Error('Failed to fetch the file from the provided path');
        }
        const blob = await response.blob();

        const storageRef = ref(storage, 'gs://learning-programing-web.appspot.com/video/' + getFileNameFromPath(filePath));
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

export { getDownloadURL, ref, storage, uploadBytes };

