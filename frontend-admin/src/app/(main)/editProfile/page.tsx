'use client';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DoneIcon from '@mui/icons-material/Done';
import { Avatar, Button, IconButton, TextField } from '@mui/material';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingButtonProvider from '~/components/loading_button';
import { userContext } from '~/context/UserContext';
import { useUploadImage } from '~/hooks/useUploadFile';
import useUpdateProfile from '~/hooks/user/useUpdateProfile';

export default function EditProfile() {
  const { isLogin, data } = useContext(userContext);

  const [fullName, setFullName] = useState(data?.fullName);
  const [email, setEmail] = useState(data?.email);
  const [avatar, setAvatar] = useState(data?.avatar);
  const [password, setPassword] = useState('');
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [editingAvatar, setEditingAvatar] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    setFullName(data?.fullName);
    setEmail(data?.email);
    setAvatar(data?.avatar);
  }, [data]);

  const { mutateAsync, isPending } = useUploadImage();
  const { mutate: mutateProfile, isPending: isPendingUpdate } = useUpdateProfile();

  const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setAvatar(URL.createObjectURL(file));
      setNewAvatar(file);
    }
  };

  const handleSubmit = async () => {
    let newAvatarSrc = '';
    if (newAvatar) {
      newAvatarSrc = await mutateAsync(newAvatar as Blob);
    }

    mutateProfile({
      fullName: fullName as string,
      avatar: !newAvatar ? (avatar as string) : newAvatarSrc,
      password,
    });
  };

  const [hoveringAvatar, setHoveringAvatar] = useState(false);

  const handleAvatarHover = () => {
    setHoveringAvatar(true);
  };

  const handleAvatarLeave = () => {
    setHoveringAvatar(false);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordChangeConfirmation = () => {
    if (password === confirmPassword) {
      setShowConfirmation(false);
      setPassword(confirmPassword);
      setEditingPassword(false);
    } else {
      toast('Password does not match, please re-enter', {
        type: 'error',
      });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white p-8 rounded shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <div className="mb-4 rounded p-4 flex flex-col">
        <div className="mb-4 rounded p-4 flex flex-col relative">
          <div
            className="relative flex justify-center items-center"
            onMouseEnter={handleAvatarHover}
            onMouseLeave={handleAvatarLeave}
          >
            <input type="file" id="avatar" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            <Avatar className="!w-24 !h-24" alt="Remy Sharp" src={avatar || '/images/avatar.jpeg'} />
            {hoveringAvatar && (
              <div className="absolute inset-0 flex items-center justify-center">
                <label htmlFor="avatar" className="cursor-pointer">
                  <AddAPhotoIcon fontSize="large" style={{ opacity: '0.5' }} />
                </label>
              </div>
            )}
          </div>
        </div>

        <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">
          UserName
        </label>
        {editingName ? (
          <div className="w-full flex items-center">
            <TextField
              type="text"
              id="fullName"
              value={fullName}
              onChange={handleFullNameChange}
              placeholder="Username"
              fullWidth
            />
            <IconButton onClick={() => setEditingName(false)}>
              <DoneIcon />
            </IconButton>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p>{fullName}</p>
            <Button variant="contained" onClick={() => setEditingName(true)}>
              Edit
            </Button>
          </div>
        )}
      </div>

      <div className="mb-4 rounded p-4 flex flex-col">
        <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <p>{email}</p>
      </div>
      <div className="mb-4 rounded p-4 flex flex-col">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
          Password
        </label>
        {editingPassword ? (
          <div className="w-full flex items-center">
            <TextField
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="********"
              fullWidth
            />
            <IconButton onClick={() => setEditingPassword(false)}>
              <DoneIcon />
            </IconButton>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p>{new Array(password.length || 10).fill('*').join('')}</p>
            <Button variant="contained" onClick={() => setEditingPassword(true)}>
              Edit
            </Button>
          </div>
        )}
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Comfirm password change</h2>
            <p>Are you sure you want to change your password?</p>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500 mt-4"
              placeholder="Enter new password"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="mr-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500"
              >
                cancel
              </button>
              <button
                onClick={handlePasswordChangeConfirmation}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <LoadingButtonProvider className="w-fit ml-auto" isLoading={isPending && isPendingUpdate}>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </LoadingButtonProvider>
    </div>
  );
}
