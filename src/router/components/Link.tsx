import React from "react";
import type { LinkProps, Route } from "../types";
import { useRouter } from "../hooks";

// Link component for type-safe navigation
export function Link<TRoutes extends readonly Route<any, any, any>[]>({
  to,
  params,
  searchParams,
  children,
  className,
  ...props
}: React.PropsWithoutRef<LinkProps<TRoutes>> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { navigate } = useRouter();

  // Build URL with params and search params
  const buildUrl = () => {
    let url = to;

    // Replace route params
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url = url.replace(`:${key}`, value);
      });
    }

    // Add search params
    if (searchParams) {
      const searchString = new URLSearchParams(
        Object.entries(searchParams).flatMap(([key, value]) =>
          Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]
        )
      ).toString();
      if (searchString) {
        url += `?${searchString}`;
      }
    }

    return url;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(buildUrl());
  };

  return (
    <a href={buildUrl()} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
