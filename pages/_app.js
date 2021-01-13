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
			window.addEventListener("load", function () {
				navigator.serviceWorker.register("/sw.js").then(
					function (registration) {
						console.log(
							"Service Worker registration successful with scope: ",
							registration.scope
						);
					},
					function (err) {
						console.log(
							"Service Worker registration failed: ",
							err
						);
					}
				);
			});
		}
	}, []);
	return <Component {...pageProps} />;
}

export default MyApp;
