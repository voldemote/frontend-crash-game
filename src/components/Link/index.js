import React from 'react';
import { Link as ReactRouterDomLink } from 'react-router-dom';

const Link = ({ to, search, hash, className, target, children }) => {
  const getToParameter = () => {
    const pathname = to;
    const searchValues = search
      ? Object.entries(search)
          .map(([key, value]) => `${key}=${value}`)
          .join('&')
      : null;
    const hashValue = hash;
    const toParameters = {
      pathname: pathname,
      search: searchValues ? '?' + searchValues : '',
      hash: hashValue ? '#' + hashValue : '',
    };

    return toParameters;
  };

  return (
    <ReactRouterDomLink
      className={className}
      to={getToParameter()}
      target={target}
    >
      {children}
    </ReactRouterDomLink>
  );
};

export default Link;
