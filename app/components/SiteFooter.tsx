export const SiteFooter = () => {
  return (
    <footer className="border-black border-t-2">
      <div className="page-shell page-gutter stack-xs py-6 font-mono text-xs text-neutral-500">
        <p>
          Pagina non ufficiale, ma che funziona meglio. Dati da{" "}
          <a className="underline" href="https://www.baccanaleimola.it/">
            baccanaleimola.it
          </a>
          .
        </p>

        <p>
          Altri progettini su{" "}
          <a className="underline" href="https://mb.maletta.space">
            mb.maletta.space
          </a>
        </p>
      </div>
    </footer>
  );
};
