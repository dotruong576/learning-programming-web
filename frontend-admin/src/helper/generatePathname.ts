export const generatePathname = (props: { pathName: string; query: { [key: string]: string } } | string) => {
  if (typeof props === 'string') return props;

  const { pathName: _, query } = props as { pathName: string; query: { [key: string]: string } };

  let pathName = _;

  for (let key in query) {
    pathName = pathName.replace(`[${key}]`, query[key]);
  }

  return pathName;
};
