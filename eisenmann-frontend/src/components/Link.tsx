import * as React from 'react';
import clsx from 'clsx';
import NextLink from 'next/link';
import MuiLink from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import { NextLinkComposedProps, LinkProps } from '@/interfaces/LinkComposed';

const Anchor = styled('a')({});
// Add support for the sx prop for consistency with the other branches.
export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
	function NextLinkComposed(props, ref) {
		const { to, linkAs, href, replace, scroll, shallow, prefetch, locale, ...other } = props;

		return (
			<NextLink
				href={to}
				prefetch={prefetch}
				as={linkAs}
				replace={replace}
				scroll={scroll}
				shallow={shallow}
				passHref
				locale={locale}
			>
				<Anchor ref={ref} {...other} />
			</NextLink>
		);
	},
);

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/api-reference/next/link
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
	const {
		as: linkAs,
		className: classNameProps,
		href,
		noLinkStyle,
		role, // Link don't have roles.
		...other
	} = props;

	const className = clsx(classNameProps);

	const isExternal =
		typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

	if (isExternal) {
		if (noLinkStyle) {
			return <Anchor className={className} href={href} ref={ref} {...other} />;
		}

		return <MuiLink className={className} href={href} ref={ref} {...other} />;
	}

	if (noLinkStyle) {
		return <NextLinkComposed className={className} ref={ref} to={href} {...other} />;
	}

	return (
		<MuiLink
			component={NextLinkComposed}
			linkAs={linkAs}
			className={className}
			ref={ref}
			to={href}
			{...other}
		/>
	);
});

export default Link;