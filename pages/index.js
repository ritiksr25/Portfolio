import LayoutComponent from "../components/LayoutComponent";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<LayoutComponent>
			<div className={styles.container}>
				<main className={styles.main}>
					<h1 className={styles.title}>
						Namaste 🙏, I am{" "}
						<a href="https://linkedin.com/in/ritiksr25">
							Ritik Srivastava!
						</a>
					</h1>
					<p className={styles.description}>
						Thanks for Passing by! This Site is currently under
						construction. See you soon!
					</p>
				</main>
			</div>
		</LayoutComponent>
	);
}
