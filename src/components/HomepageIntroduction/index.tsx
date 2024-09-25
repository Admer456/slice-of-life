
import clsx from 'clsx';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

export default function HomepageIntroduction(): JSX.Element {
	const imageSource = useBaseUrl('/img/placeholder.png');
	return (
		<div className='text--center'>
			<Heading as='h1' className='padding-top--xs'>
				Hello and welcome!
			</Heading>
			<div className='container'>
				<div className='row'>
					<div className={`col col--9 ${styles.descriptionContainer}`}>
						<p className='text--left'>
							I'm Admer, a tinkerer from the hot, dry rocks of Herzegovina.
							<br /><br />
							This is my little corner on the Internet. Make yourself at home!
							<br />
							Here you can see some of my projects: engines, games, tools, educational
							efforts, all kinds of things. I got a bit of a blog too.
							<br /><br />
							This website is still quite fresh, so there's not a whole lot
							of content here. I've been meaning to build a pretty personal
							website for a while now, so it should get populated with stuff
							soon enough.
							<br /><br />
							Empty space. :3 (also foxes are cool)
						</p>
						<p className='text--right padding-top--none padding-bottom--xs'>
							<hr className='margin-top--none' />
							You can reach out to me via Discord or wherever, really.
							<br />Links to my social media are at the bottom of this page.
						</p>
					</div>
					<div className='col col--3'>
						<img src={imageSource} />
						<p>
							Excuse me while I find a decent selfie.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
