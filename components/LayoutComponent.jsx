import Head from "next/head";
import config from "../utils/config";

const { TITLE, HANDLE, ABOUT, KEYWORDS, DOMAIN } = config;

const LayoutComponent = props => (
	<>
		<Head>
			<title>{TITLE}</title>
			<meta charset="UTF-8" />
			<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
			<meta
				name="viewport"
				content="width=device-width,initial-scale=1, shrink-to-fit=no"
			/>

			<meta name="title" content={TITLE} />
			<meta name="author" content={HANDLE} />
			<meta name="description" content={ABOUT} />
			<meta name="keywords" content={KEYWORDS} />

			<meta name="theme-color" content="#EDEDED" />
			<link rel="canonical" href={DOMAIN} />

			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/favicon-16x16.png"
			/>

			<link rel="manifest" href="/site.webmanifest" />

			<meta property="og:type" content="website" />
			<meta property="og:url" content={DOMAIN} />
			<meta property="og:title" content={TITLE} />
			<meta property="og:description" content={ABOUT} />
			<meta property="og:image" content="/assets/photo.jpg" />
			<meta property="og:image:type" content="image/jpg" />
			<meta property="og:image:width" content="192" />
			<meta property="og:image:height" content="192" />

			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={DOMAIN} />
			<meta property="twitter:title" content={TITLE} />
			<meta property="twitter:description" content={ABOUT} />
			<meta property="twitter:image" content="/assets/photo.jpg" />

			<meta
				name="google-site-verification"
				content="-V6HnViUv9byKilJ5nbBsZYijb57xnK8sFm9fMNB5l4"
			/>
		</Head>
		<script>
			{(console.log = console.warn = console.error = () => {})}
		</script>
		{props.children}
	</>
);

export default LayoutComponent;
