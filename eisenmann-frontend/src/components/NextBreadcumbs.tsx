import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import CircleIcon from '@mui/icons-material/Circle';
import { useRouter } from 'next/router';
import Link from './Link';
import { useMemo } from 'react';
import { Box } from '@mui/material';

export default function NextBreadcrumbs() {
	// Gives us ability to load the current route details
	const router = useRouter();

	const breadcrumbs = useMemo(function generateBreadcrumbs() {
		// Remove any query parameters, as those aren't included in breadcrumbs
		const asPathWithoutQuery = router.asPath.split("?")[0];

		// Break down the path between "/"s, removing empty entities
		// Ex:"/my/nested/path" --> ["my", "nested", "path"]
		const asPathNestedRoutes = asPathWithoutQuery.split("/")
			.filter(v => v.length > 0);

		// Iterate over the list of nested route parts and build
		// a "crumb" object for each one.
		const crumblist = asPathNestedRoutes.map((subpath, idx) => {
			// We can get the partial nested route for the crumb
			// by joining together the path parts up to this point.
			const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
			// The title will just be the route string for now
			const text = subpath;
			return { href, text };
		})

		// Add in a default "Home" crumb for the top-level
		return [{ href: "/", text: "Dashboard" }, ...crumblist];
	}, [router.asPath])


	return (
		<Breadcrumbs
			separator={
				<Box
					sx={{
						borderRadius: '50%',
						width: '4px',
						height: '4px',
						backgroundColor: 'secondary.main'
					}}
				/>
			}
			aria-label="breadcrumb"
		>
			{
				breadcrumbs.map((crumb, idx) => (
					/*
						Iterate through the crumbs, and render each individually.
						We "mark" the last crumb to not have a link.
					*/
					<Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
				))
			}
		</Breadcrumbs >
	);
}

interface CrumbProps {
	text: string;
	href: string;
	last: boolean;
}
// Each individual "crumb" in the breadcrumbs list
function Crumb({ text, href, last = false }: CrumbProps) {
	// The last crumb is rendered as normal text since we are already on the page
	if (last) {
		return <Typography color="inherit" textTransform="capitalize">{text}</Typography>
	}

	// All other crumbs will be rendered as links that can be visited 
	return (
		<Link underline="hover" color="text.primary" textTransform="capitalize" href={href}>
			{text}
		</Link>
	);
}

