import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

const filmsDir = path.join(process.cwd(), "public", "posters", "films");
const weeksDir = path.join(process.cwd(), "content", "weeks");

const filmAssets = [
  {
    title: "The War of the Worlds (Orson Welles Radio Broadcast)",
    filename: "war-of-the-worlds-1938-radio.jpg",
    fileTitle: "File:Orson Welles 1938 War of the Worlds.jpg",
  },
  {
    title: "Network",
    filename: "network-1976.jpg",
    fileTitle: "File:Network (1976 poster).png",
  },
  {
    title: "Grave of the Fireflies",
    filename: "grave-of-the-fireflies.jpg",
    fileTitle: "File:Grave of the Fireflies Japanese poster.jpg",
  },
  {
    title: "Barefoot Gen",
    filename: "barefoot-gen-1983.jpg",
    fileTitle: "File:Hadashi-no-gen-japanese-movie-poster-md.jpg",
  },
  {
    title: "The Battle of Algiers",
    filename: "battle-of-algiers.jpg",
    fileTitle: "File:The Battle of Algiers poster.jpg",
  },
  {
    title: "Children of Men",
    filename: "children-of-men.jpg",
    fileTitle: "File:Children of men ver4.jpg",
  },
  {
    title: "Parasite",
    filename: "parasite-2019.jpg",
    fileTitle: "File:Parasite (2019 film).png",
  },
  {
    title: "Sorry to Bother You",
    filename: "sorry-to-bother-you.jpg",
    fileTitle: "File:Sorry to Bother You.png",
  },
  {
    title: "Minding the Gap",
    filename: "minding-the-gap.jpg",
    fileTitle: "File:Minding-the-Gap-poster.jpg",
  },
  {
    title: "Hoop Dreams",
    filename: "hoop-dreams.jpg",
    fileTitle: "File:Hoop dreamsposter.jpg",
  },
  {
    title: "A Patch of Blue",
    filename: "a-patch-of-blue.jpg",
    fileTitle: "File:Patch of blue mp.jpg",
  },
  {
    title: "Guess Who's Coming to Dinner",
    filename: "guess-whos-coming-to-dinner.jpg",
    fileTitle: "File:Guess Who's Coming to Dinner poster.jpg",
  },
  {
    title: "Moonlight",
    filename: "moonlight-2016.jpg",
    fileTitle: "File:Moonlight (2016 film).png",
  },
  {
    title: "Aftersun",
    filename: "aftersun-2022.jpg",
    fileTitle: "File:Aftersun.jpg",
  },
  {
    title: "Minari",
    filename: "minari-2020.jpg",
    fileTitle: "File:Minari (film).png",
  },
  {
    title: "The Farewell",
    filename: "the-farewell-2019.jpg",
    fileTitle: "File:The Farewell poster.jpg",
  },
  {
    title: "The Lives of Others",
    filename: "the-lives-of-others.jpg",
    fileTitle: "File:Leben der anderen.jpg",
  },
  {
    title: "All the President's Men",
    filename: "all-the-presidents-men.jpg",
    fileTitle: "File:All the president's men.jpg",
  },
  {
    title: "The Social Network",
    filename: "the-social-network.jpg",
    fileTitle: "File:The Social Network film poster.png",
  },
  {
    title: "Her",
    filename: "her-2013.jpg",
    fileTitle: "File:Her2013Poster.jpg",
  },
  {
    title: "Princess Mononoke",
    filename: "princess-mononoke.jpg",
    fileTitle: "File:Princess Mononoke Japanese poster.png",
  },
  {
    title: "WALL-E",
    filename: "wall-e.jpg",
    fileTitle: "File:WALL-E poster.jpg",
  },
  {
    title: "Idiocracy",
    filename: "idiocracy.jpg",
    fileTitle: "File:Idiocracy movie poster.jpg",
  },
  {
    title: "Brazil",
    filename: "brazil-1985.jpg",
    fileTitle: "File:Brazil (1985 film) poster.jpg",
  },
];

async function getImageFileUrl(imageTitle) {
  const imageInfoUrl = new URL("https://en.wikipedia.org/w/api.php");
  imageInfoUrl.searchParams.set("action", "query");
  imageInfoUrl.searchParams.set("format", "json");
  imageInfoUrl.searchParams.set("prop", "imageinfo");
  imageInfoUrl.searchParams.set("iiprop", "url");
  imageInfoUrl.searchParams.set("titles", imageTitle);

  const imageInfoResponse = await fetch(imageInfoUrl, {
    headers: {
      "User-Agent": "movie-school-poster-fetcher/1.0 (educational project)",
    },
  });

  if (!imageInfoResponse.ok) {
    throw new Error(`Wikipedia imageinfo request failed: ${imageInfoResponse.status}`);
  }

  const imageInfoData = await imageInfoResponse.json();
  const imagePages = imageInfoData?.query?.pages ?? {};
  const firstImagePage = Object.values(imagePages)[0];
  const source = firstImagePage?.imageinfo?.[0]?.url;

  if (!source || typeof source !== "string") {
    throw new Error(`No image URL found for ${imageTitle}`);
  }

  return source;
}

async function downloadImage(imageUrl, outputPath) {
  const response = await fetch(imageUrl, {
    headers: {
      "User-Agent": "movie-school-poster-fetcher/1.0 (educational project)",
    },
  });

  if (!response.ok) {
    throw new Error(`Image download failed: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  await fs.writeFile(outputPath, Buffer.from(arrayBuffer));
}

async function applyPostersToWeekFiles() {
  const posterByTitle = new Map(
    filmAssets.map((asset) => [asset.title, `/posters/films/${asset.filename}`]),
  );

  const files = await fs.readdir(weeksDir);

  for (const file of files) {
    if (!file.endsWith(".md")) {
      continue;
    }

    const filePath = path.join(weeksDir, file);
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = matter(raw);

    const films = Array.isArray(parsed.data.films) ? parsed.data.films : [];
    parsed.data.films = films.map((film) => {
      const poster = posterByTitle.get(film.title);
      if (!poster) {
        return film;
      }

      return {
        ...film,
        poster,
      };
    });

    const next = matter.stringify(`${parsed.content.trim()}\n`, parsed.data);
    await fs.writeFile(filePath, next, "utf8");
  }
}

async function main() {
  await fs.mkdir(filmsDir, { recursive: true });

  for (const film of filmAssets) {
    const outputPath = path.join(filmsDir, film.filename);

    try {
      const posterUrl = await getImageFileUrl(film.fileTitle);
      await downloadImage(posterUrl, outputPath);
      console.log(`Downloaded ${film.filename}`);
    } catch (error) {
      console.error(`Failed for ${film.title}:`, error.message);
    }
  }

  await applyPostersToWeekFiles();
  console.log("Updated week files with per-film poster paths.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
