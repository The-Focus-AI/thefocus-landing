import childProcess from "child_process";
import fs from "fs";
import matter from "gray-matter";
import * as cheerio from "cheerio";
import { getSlug } from "./ids";

if (!process.env.BUTTONDOWN_API_KEY) {
  const cmd = 'op read "op://Development/Buttondown API/notesPlain"';
  process.env.BUTTONDOWN_API_KEY = await childProcess
    .execSync(cmd)
    .toString()
    .trim();
}

export async function getImages() {
  const url = new URL(`https://api.buttondown.com/v1/images`);
  const options = {
    method: "GET",
    headers: {
      Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
    },
  };

  console.log("url", url.toString());
  console.log("options", options);
  return fetch(url.toString(), options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => console.error("error", error));
}

export function upload_draft(title: string, body: string) {
  const url = new URL(`https://api.buttondown.com/v1/emails`);
  const options = {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
    },
    body: JSON.stringify({
      subject: title,
      body: body,
      status: "draft",
    }),
  };

  return fetch(url.toString(), options)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

export async function find_source_images(file: string) {
  const fileContents = fs.readFileSync(file, "utf8");
  const { content } = matter(fileContents);

  // Find all markdown image tags with ../assets in the path
  const imageRegex = /!\[([^\]]*)\]\((\.\.\/assets\/[^)]+)\)/g;
  const source_images = [];
  let match;

  while ((match = imageRegex.exec(content)) !== null) {
    source_images.push({
      alt: match[1],
      src: match[2],
    });
  }

  return source_images;
}

export async function find_dest_images(file: string) {
  const slug = getSlug({ id: file.replace(/src\/content\/posts\//, "") });
  const url = `https://thefocus.ai/posts/${slug}`;
  const html = await fetch(url).then((response) => response.text());
  const $ = cheerio.load(html);
  const images = $("img");

  const dest_images = [];
  for (let i = 0; i < images.length; i++) {
    const src = `https://thefocus.ai${$(images[i]).attr("src")}`;
    const alt = $(images[i]).attr("alt");
    dest_images.push({ src, alt });
  }

  return dest_images;
}

export async function find_image_mapping(file: string) {
  const source_images = await find_source_images(file);
  const dest_images = await find_dest_images(file);

  const image_mapping = {};
  console.log("source_images", source_images);
  for (const image of source_images) {
    console.log("source_images[i]", image);
    const source_image = image.src
      .replace(/^.*assets\//, "")
      .replace(/\..*/, ".");

    const dest_image = dest_images.find((dest_image) =>
      dest_image.src.includes(source_image)
    );
    if (!dest_image) {
      console.log("No dest image found for", source_image);
    } else if (image.src) {
      image_mapping[source_image] = {
        src: image.src,
        bin: dest_image.src,
      };
    }
  }

  console.log("image_mapping", image_mapping);
  return image_mapping;
}

export async function upload_images(file: string) {
  const fileContents = fs.readFileSync(file, "utf8");
  const { data, content } = matter(fileContents);
  const title = data.title || "Untitled Post";
  let body = content;

  const image_mapping = await find_image_mapping(file);
  for (const image of Object.values(image_mapping) as {
    src: string;
    bin: string;
    uploaded: string;
  }[]) {
    console.log("image", image);

    image.uploaded = `uploaded ${image.bin}`;
    body = body.replace(image.src, image.uploaded);
  }

  console.log("body", body);
}

export async function upload_image(bin: string) {
  const url = new URL(`https://api.buttondown.com/v1/images`);
  const options = {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
    },
    body: JSON.stringify({ file: bin, image: "scribe.webp" }),
  };

  return fetch(url.toString(), options)
    .then((response) => response.json())
    .then((data) => console.log(JSON.stringify(data, null, 2)))
    .catch((error) => console.error(error));
}

// --------------------------------

console.log(process.argv);
const command = process.argv[3];
console.log("command", command);
if (command === "images") {
  const images = await getImages();
  console.log("images", images);
  process.exit(0);
} else if (command === "upload_image") {
  const image = await upload_image(
    "https://thefocus.ai/_astro/scribe.CgFruGo-_Z2cPBPR.webp"
  );
  console.log("image", image);
  process.exit(0);
} else if (command === "find_images") {
  const images = await upload_images(process.argv[4]);
  console.log("images", images);
  process.exit(0);
} else if (command === "draft") {
  const draft = await upload_draft(process.argv[4]);
  console.log("draft", draft);
  process.exit(0);
} else {
  console.log("Unknown command ", command);
  process.exit(1);
}
