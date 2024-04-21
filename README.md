# ez-github-contributor

Markdown you see is markdown you get (MYSIMYG ≈ ez-github-contributor): A GitHub app for contributions without any knowledge of GitHub. This GitHub app aims to make it easier for people to contribute to open source documentation, without having the need to understand either Markdown or GitHub.

We are currently in active development. This involves building out the React website with a [Lexical editor](https://lexical.dev/docs/intro), and an integrated GitHub app that can be installed on relevant repositories.

Enabled repositories will allow markdown content to be used for Pull Request (relevant content in a file) or directly as an issue.

## Development

```
npm install
# npm install netlify-cli -g
netlify dev
```

We use Netlify so that we can also directly test our serverless functions.

---

We asked ChatGPT what it associates with "ez-github-contributor" and it spit out an image of an owl. :owl: We'll take it!

![](./public/owl-dall-e.webp)

## Resources

Here I am storing some resources I might need/want later:

- https://lexical.dev/docs/intro
- https://www.freecodecamp.org/news/how-to-access-secret-api-keys-using-netlify-functions-in-a-react-app/
- https://probot.github.io/docs/hello-world/
- https://github.com/probot/example-netlify-functions
- https://www.ravsam.in/blog/deploy-a-serverless-probot-github-app-on-netlify-functions/#deploying-on-netlify-functions
- github installation id is found under https://github.com/organizations/libscie/settings/installations/ - click on relevant app and look at the number at the end of the url