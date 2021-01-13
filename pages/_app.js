import "../styles/globals.css";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import {
	faGithub,
	faTwitter,
	faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import {
	faArrowCircleDown,
	faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
library.add(faGithub, faTwitter, faLinkedin, faArrowCircleDown, faEnvelope);
function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default MyApp;
