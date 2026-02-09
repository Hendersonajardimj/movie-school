import fs from "node:fs/promises";
import path from "node:path";

const postersDir = path.join(process.cwd(), "public", "posters");

const weekMappings = [
  { slug: "week-01", wikiTitle: "Network_(1976_film)" },
  { slug: "week-02", wikiTitle: "Grave_of_the_Fireflies" },
  { slug: "week-03", wikiTitle: "The_Battle_of_Algiers" },
  { slug: "week-04", wikiTitle: "Parasite_(2019_film)", fileTitle: "File:Parasite (2019 film).png" },
  { slug: "week-05", wikiTitle: "Minding_the_Gap" },
  { slug: "week-06", wikiTitle: "A_Patch_of_Blue", fileTitle: "File:Patch of blue mp.jpg" },
  { slug: "week-07", wikiTitle: "Moonlight_(2016_film)", fileTitle: "File:Moonlight (2016 film).png" },
  { slug: "week-08", wikiTitle: "Minari_(film)", fileTitle: "File:Minari (film).png" },
  { slug: "week-09", wikiTitle: "The_Lives_of_Others", fileTitle: "File:Leben der anderen.jpg" },
  { slug: "week-10", wikiTitle: "The_Social_Network" },
  { slug: "week-11", wikiTitle: "Princess_Mononoke" },
  { slug: "week-12", wikiTitle: "Idiocracy" },
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

async function getPosterUrl(wikiTitle) {
  const apiUrl = new URL("https://en.wikipedia.org/w/api.php");
  apiUrl.searchParams.set("action", "query");
  apiUrl.searchParams.set("format", "json");
  apiUrl.searchParams.set("prop", "images");
  apiUrl.searchParams.set("imlimit", "100");
  apiUrl.searchParams.set("titles", wikiTitle);
  apiUrl.searchParams.set("redirects", "1");

  const response = await fetch(apiUrl, {
    headers: {
      "User-Agent": "movie-school-poster-fetcher/1.0 (educational project)",
    },
  });

  if (!response.ok) {
    throw new Error(`Wikipedia API request failed: ${response.status}`);
  }

  const data = await response.json();
  const pages = data?.query?.pages ?? {};
  const firstPage = Object.values(pages)[0];

  const images = Array.isArray(firstPage?.images) ? firstPage.images : [];
  const candidates = images
    .map((image) => image.title)
    .filter((title) => typeof title === "string")
    .filter((title) => !title.toLowerCase().endsWith(".svg"))
    .filter((title) => /(poster|cover|one[- ]sheet|theatrical)/i.test(title));

  const imageTitle = candidates[0];

  if (!imageTitle) {
    throw new Error(`No poster-like image found for ${wikiTitle}`);
  }

  return getImageFileUrl(imageTitle);
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

async function main() {
  await fs.mkdir(postersDir, { recursive: true });

  for (const week of weekMappings) {
    const outputPath = path.join(postersDir, `${week.slug}.jpg`);

    try {
      const posterUrl = week.fileTitle
        ? await getImageFileUrl(week.fileTitle)
        : await getPosterUrl(week.wikiTitle);
      await downloadImage(posterUrl, outputPath);
      console.log(`Downloaded ${week.slug}.jpg from ${week.wikiTitle}`);
    } catch (error) {
      console.error(`Failed for ${week.slug}:`, error.message);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
