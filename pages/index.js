import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutComponent from "../components/LayoutComponent";
import styles from "../styles/Home.module.css";
export default function Home() {
	return (
		<LayoutComponent>
			<div className={styles.container}>
				<div className={styles.main}>
					<h1 className={styles.title}>
						namaste 🙏
						<br />i am{" "}
						<span className={styles.name}>ritik srivastava!</span>
					</h1>
					<p className={styles.description}>
						full-stack dev, passionate about building stuffs
						<br />
						core team member{" "}
						<a
							href="https://dsckiet.com"
							target="_blank"
							rel="noreferrer noopener"
						>
							@dsckiet
						</a>
					</p>
					<div className="social-section row">
						<a
							title="stalk me on github"
							target="_blank"
							rel="noopener noreferrer"
							href="https://github.com/ritiksr25"
						>
							<FontAwesomeIcon
								icon={["fab", "github"]}
								className={styles.contactLink}
							/>
						</a>

						<a
							title="connect with me on linkedin"
							target="_blank"
							rel="noopener noreferrer"
							href="https://linkedin.com/in/ritiksr25"
						>
							<FontAwesomeIcon
								icon={["fab", "linkedin"]}
								className={styles.contactLink}
							/>
						</a>

						<a
							title="follow me on twitter"
							target="_blank"
							rel="noopener noreferrer"
							href="https://twitter.com/ritiksr25"
						>
							<FontAwesomeIcon
								icon={["fab", "twitter"]}
								className={styles.contactLink}
							/>
						</a>

						<a
							title="send a hi on gmail"
							target="_blank"
							rel="noopener noreferrer"
							href="mailto:ritiksr25@gmail.com"
						>
							<FontAwesomeIcon
								icon={["fa", "envelope"]}
								className={styles.contactLink}
							/>
						</a>

						<a
							title="checkout my resume"
							target="_blank"
							rel="noopener noreferrer"
							href="https://bit.ly/ritiksr25-resume"
						>
							<FontAwesomeIcon
								icon={["fa", "arrow-circle-down"]}
								className={styles.contactLink}
							/>
						</a>
					</div>
				</div>
			</div>
		</LayoutComponent>
	);
}
