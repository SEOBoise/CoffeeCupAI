const cleanRoutes = new Map([
  ["/index.html", "/"],
  ["/about.html", "/about/"],
  ["/ai-audits.html", "/ai-audits/"],
  ["/ai-consulting.html", "/ai-consulting/"],
  ["/ai-job-loss.html", "/ai-job-loss/"],
  ["/ai-speaker.html", "/ai-speaker/"],
  ["/blog.html", "/blog/"],
  ["/blog-human-skills.html", "/blog/human-skills/"],
  ["/blog-questions-before-ai.html", "/blog/questions-before-ai/"],
  ["/blog-start-with-one-workflow.html", "/blog/start-with-one-workflow/"],
  ["/contact.html", "/contact/"],
  ["/privacy.html", "/privacy/"],
  ["/terms.html", "/terms/"],
  ["/sitemap.html", "/sitemap/"],
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cleanPath = cleanRoutes.get(url.pathname) ?? url.pathname;

    if (url.hostname === "www.coffeecupai.com" || cleanPath !== url.pathname) {
      url.protocol = "https:";
      url.hostname = "coffeecupai.com";
      url.pathname = cleanPath;
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
