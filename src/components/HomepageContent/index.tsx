import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

function FeatureCategory(title: string)
{
  return (
    <Heading as='h1' className={clsx('hero__title text--center', styles.featureCategoryHeading)}>
      {title}
    </Heading>
  );
}

function Feature(title: string, url: string, image: string, columnWidth: string, description: JSX.Element) {
  const imageSource = useBaseUrl(image);
  return (
    <a href={url} className={clsx('col', columnWidth, styles.featureContainer, styles.featureLink)}>
      <img className={styles.featureSvg} src={imageSource} />
      <div className="text--left padding-horiz--md">
        <br />
        <Heading as="h2">{title}</Heading>
        <p className={styles.featureDesc}>{description}</p>
      </div>
    </a>
  );
}

export default function HomepageContent(): JSX.Element {
  return (
    <div>
      <div className={styles.bgHighlight}>
        {FeatureCategory("Gamedev projects")}
        <div className='container'>
          <div className='row row--no-gutters padding-vert--sm'>
            {Feature("Elegy Engine (WiP)",
              "https://elegy.microfox.dev",
              "/img/homepage/elegy.png",
              "col--6",
              <p>
                A retro game engine, and a love letter to 90s gamedev and modding.
                Started development in late 2022, still ongoing and active!
              </p>
            )}
            {Feature("Cirkuz 33",
              "https://github.com/Admer456/ioq3-burek",
              "/img/homepage/c33.png",
              "col--6",
              <p>
                A retro FPS game built on a heavily modified idTech 3 fork.
                Developed between December 2020 and May 2021 for a local gamedev contest.
              </p>
            )}
          </div>
        </div>
      </div>

      {FeatureCategory("Educational")}
      <div className='container'>
        <div className='row row--no-gutters padding-vert--sm'>
          {Feature("Half-Life SDK Programming",
            "https://www.youtube.com/playlist?list=PLZmAT317GNn19tjUoC9dlT8nv4f8GHcjy",
            "/img/homepage/prog.png",
            "col--6",
            <p>
              A programming series for Half-Life modding!
            </p>
          )}
          {Feature("GoldSRC Mapping",
            "https://www.youtube.com/playlist?list=PLZmAT317GNn17TEIuUwFO_fZ4ONde1sVJ",
            "/img/homepage/gmap.png",
            "col--6",
            <p>
              A level design tutorial series for GoldSRC!<br />
              <br />
              Features J.A.C.K. and TrenchBroom.
            </p>
          )}
        </div>
        <div className='row row--no-gutters padding-vert--sm'>
          {Feature("Guides on The Whole Half-Life",
            "https://twhl.info/wiki/page/category%3AGoldsource_Tutorials",
            "/img/homepage/twhl.png",
            "col--6",
            <p>
              I occasionally maintain the Wiki pages here.
              From Half-Life SDK documentation to mapping tutorials and explanatory articles.
              It's important to keep the fire burning.
            </p>
          )}
          {Feature("Tutorials on GameBanana",
            "https://gamebanana.com/members/submissions/tuts/1418414",
            "/img/homepage/gb.png",
            "col--6",
            <p>
              This is where it all started back in 2015.
              I wrote my first tutorials here!
              You may find all kinds of Half-Life and Far Cry 1 stuff in here.
            </p>
          )}
        </div>
      </div>

      <div className={styles.bgHighlight}>
        {FeatureCategory("Half-Life mod tools")}
        <div className='container'>
          <div className='row row--no-gutters padding-vert--sm'>
            {Feature("gltf2mdl (WiP)",
              "https://github.com/Admer456/gltf2mdl",
              "/img/homepage/gltf2mdl.png",
              "col--6",
              <p>
                A tool that streamlines the Half-Life model importing process.
                Simply drag'n'drop your glTF 2.0 model and it'll spit out a Half-Life MDL file.
              </p>
            )}
            {Feature("TrenchBroom-Adm (WiP)",
              "https://github.com/Admer456/TrenchBroom",
              "/img/homepage/tb_adm.png",
              "col--6",
              <p>
                A fork of TrenchBroom with features to aid Half-Life level design, but also my own projects.
                Plenty features here won't end up in main TrenchBroom. Though, it's still possible!
              </p>
            )}
          </div>
        </div>
      </div>

      {FeatureCategory("Also worked on...")}
      <div className='container'>
        <div className='row row--no-gutters padding-vert--sm'>
          {Feature("Amygdala: Prelude",
            "https://store.steampowered.com/app/2411790/AMYGDALA_Prelude/",
            "/img/homepage/project_amy.png",
            "col--6",
            <p>
              Australian survival horror FPS set in the 1990s.
              I was mainly active here between late 2022 and late 2023, doing all kinds of gameplay and shader programming.
            </p>
          )}
          {Feature("Half-Life Decay: Solo Mission",
            "https://www.moddb.com/mods/half-life-decay-solo-mission",
            "/img/homepage/project_dsm.png",
            "col--6",
            <p>
              A mod that remasters Half-Life: Decay's delightful co-op campaign, and ports it to PC,
              as a proper singleplayer experience. I wrote its subtitle system!
              And a bunch of other stuff really.
            </p>
          )}
        </div>
        <div className='row row--no-gutters padding-vert--sm'>
          {Feature("Nail & Crescent",
            "https://www.youtube.com/watch?v=BIOJ6QURT5k",
            "/img/homepage/project_nac.png",
            "col--6",
            <p>
              A reimagining of the original Quake running on the Quake 2 RTX engine.
              I did some engine programming here in 2021.
            </p>
          )}
          {Feature("Half-Life: WAR",
            "https://www.moddb.com/mods/half-life-war",
            "/img/homepage/project_war.png",
            "col--6",
            <p>
              An unfortunately cancelled Half-Life mod which had a cool singleplayer campaign,
              and plenty of bombastic action. I did some gameplay programming as well as a bit of environment art.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
