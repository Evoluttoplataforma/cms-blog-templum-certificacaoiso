// Worker do CMS — servido sob certificacaoiso.com.br/acesso/*
// O app builda com base "/acesso"; aqui removemos o prefixo p/ casar com ./dist.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/acesso") {
      return Response.redirect(url.origin + "/acesso/", 301);
    }
    url.pathname = url.pathname.replace(/^\/acesso\/?/, "/");
    return env.ASSETS.fetch(new Request(url.toString(), request));
  },
};
