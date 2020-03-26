import fetch from "node-fetch";
import escape from "./escape";

const userAgent = "@kengotoda/rtd-graphql";

export default {
  ok: () => "ok",
  project: async (
    args: { slug: string },
    context: { authorization: string | undefined }
  ) => {
    const option = {
      headers: {
        Authorization: context.authorization || "",
        "User-Agent": userAgent,
      },
    };
    const slug = args.slug;
    return fetch(
      `https://readthedocs.org/api/v3/projects/${escape(slug)}/`,
      option
    ).then((res) => {
      if (res.status !== 200) {
        throw new Error(
          `Project not found for the given slug "${slug}": ${res.statusText}`
        );
      }
      return res.json();
    });
  },
};
