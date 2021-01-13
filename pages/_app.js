import { useEffect } from "react";
import "../styles/globals.css";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import {
	faGithub,
	faTwitter,
	faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import { faDownload, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
library.add(faGithub, faTwitter, faLinkedin, faDownload, faEnvelopeOpen);
function MyApp({ Component, pageProps }) {
	useEffect(() => {
		if ("serviceWorker" in navigator) {
			window.addEventListener("load", async function () {
				await navigator.serviceWorker.register("/sw.js");
			});
		}
	}, []);
	return <Component {...pageProps} />;
}

export default MyApp;
