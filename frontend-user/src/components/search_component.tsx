'use client';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, Stack } from '@mui/material';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import routePath from '~/constant/routePath';
import { generatePathname } from '~/helper/generatePathname';
import useSearchCourse from '~/hooks/course/useSearchCourse';

const SearchComponent: React.FC = () => {
  const { mutate, data: searchCourse, isPending: isLoading } = useSearchCourse();
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = _.debounce(mutate, 500);
  // Data simple

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    if (event.target.value) {
      handleSearch(event.target.value);
    }
  };

  const deleteText = () => {
    setQuery('');
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <div
        className={ 
          isFocused
            ? 'border  bg-white border-black rounded-2xl flex-1 h-10 px-2 sm:px-4 transition duration-200 w-full flex items-center'
            : 'border  bg-white border-gray-300 rounded-2xl flex-1 h-10 px-2 sm:px-4 transition duration-200 w-full flex items-center'
        }
      >
        <SearchIcon className="opacity-70 lg:mr-2 w-1/12"></SearchIcon>
        <input
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="search...."
          value={query}
          className="border-none flex-1 h-full outline-none px-0 sm:px-4 text-sm"
          onChange={handleInputChange}
        />
        {query != '' && <CancelIcon onClick={deleteText} className="object-right opacity-50 ml-4"></CancelIcon>}
      </div>
      {query.length > 0 && (
        <div className="absolute top-full left-0 w-full rounded-lg bg-white shadow-xl z-10 mt-4">
          {isLoading ? (
            <div className="items-center p-4">
              <Stack sx={{ color: 'grey.500', alignItems: 'center' }} spacing={2} direction="row">
                <CircularProgress color="inherit" size={20} />
                <span className="">Search &quot;{query}&quot;</span>
              </Stack>
            </div>
          ) : (
            <div className="items-center p-4">
              <SearchIcon className="opacity-60  mr-2"></SearchIcon>
              {searchCourse == null ? (
                <span className="text-gray-500">No result for &quot;{query}&quot;</span>
              ) : (
                <span className="text-gray-500">Result for &quot;{query}&quot;</span>
              )}

              {searchCourse?.map((item) => (
                <div
                  key={item._id}
                  className="p-2 cursor-pointer"
                  onClick={() =>
                    router.push(
                      generatePathname({
                        pathName: routePath.COURSE_DETAIL,
                        query: {
                          courseId: item._id,
                        },
                      }),
                    )
                  }
                >
                  {item.title}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
