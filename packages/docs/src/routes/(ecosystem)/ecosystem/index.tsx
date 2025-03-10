import { component$, useStyles$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import styles from '../ecosystem.css?inline';
import data from '../ecosystem.json';
import { MEDIA } from '../media/index';
import SHOWCASE from '../showcase/generated-pages.json';

export default component$(() => {
  useStyles$(styles);

  const videos = MEDIA.videos.slice(0, 6);
  const podcasts = MEDIA.podcasts.slice(0, 6);
  const presentations = MEDIA.presentations.slice(0, 6);
  const showcaseSites = SHOWCASE.slice(0, 6);

  return (
    <article class="ecosystem">
      <h1 class="text-6xl mb-3 text-center font-thin">Qwik+</h1>
      <h2 class="text-md text-slate-600 text-center mt-0 mb-10">There is even more ...</h2>

      <section class="grid grid-cols-[200px,1fr]">
        <h2 class="font-thin text-2xl">
          <Link href="/deployments/">Deployments</Link>
        </h2>
        <ul class="grid gap-1 grid-cols-4">{data.deployments.map(GridItem)}</ul>
      </section>

      <section class="grid grid-cols-[200px,1fr]">
        <h2 class="font-thin text-2xl">
          <Link href="/integrations/">Integrations</Link>
        </h2>
        <ul class="grid gap-1 grid-cols-4">{data.integrations.map(GridItem)}</ul>
      </section>

      <section class="grid grid-cols-[200px,1fr]">
        <h2 class="font-thin text-2xl">
          <Link href="/media/#videos">Videos</Link>
        </h2>
        <ul class="grid gap-1 grid-cols-3">{videos.map(GridItem)}</ul>
      </section>

      <section class="grid grid-cols-[200px,1fr]">
        <h2 class="font-thin text-2xl">
          <Link href="/media/#podcasts">Podcasts</Link>
        </h2>
        <ul class="grid gap-1 grid-cols-3">{podcasts.map(GridItem)}</ul>
      </section>

      <section class="grid grid-cols-[200px,1fr]">
        <h2 class="font-thin text-2xl">
          <Link href="/showcase/">Showcase</Link>
        </h2>
        <ul class="grid gap-1 grid-cols-3">{showcaseSites.map(GridItem)}</ul>
      </section>

      <section class="grid grid-cols-[200px,1fr]">
        <h2 class="font-thin text-2xl">
          <Link href="/media/#presentations">Presentations</Link>
        </h2>
        <ul class="grid gap-1 grid-cols-3">{presentations.map(GridItem)}</ul>
      </section>

      <section class="grid grid-cols-[200px,1fr]">
        <h2 class="font-thin text-2xl">
          <Link href="/community/groups/">Communities</Link>
        </h2>
        <ul class="grid gap-1 grid-cols-4">{data.communities.map(GridItem)}</ul>
      </section>

      <section class="grid grid-cols-[200px,1fr]">
        <h2 class="font-thin text-2xl">
          <Link href="/community/groups/">Social</Link>
        </h2>
        <ul class="grid gap-1 grid-cols-4">{data.social.map(GridItem)}</ul>
      </section>
    </article>
  );
});

export const head: DocumentHead = {
  title: 'Qwik Ecosystem',
};

export const GridItem = component$((props: GridItemProps) => {
  return (
    <li
      key={props.title}
      class="rounded-md bg-slate-800 text-white text-center overflow-hidden min-h-52"
    >
      <Link href={props.href}>
        <div class="grid h-36 items-center p-10">
          <img src={props.imgSrc} alt={props.title} class="m-auto max-h-20" />
        </div>
        <span class="block px-2 py-5 bg-slate-900">{props.title}</span>
      </Link>
    </li>
  );
});

interface GridItemProps {
  title: string;
  href: string;
  imgSrc: string;
}
